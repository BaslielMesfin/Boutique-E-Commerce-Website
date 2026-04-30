import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      customerName, 
      customerPhone, 
      deliverySubCity, 
      deliveryWoreda, 
      deliveryLandmark, 
      items 
    } = body;

    // Validate request
    if (!customerName || !customerPhone || !items || !items.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let totalAmount = 0;
    const orderItemsData = [];

    // Calculate total amount and verify variants
    for (const item of items) {
      const variant = await prisma.variant.findUnique({
        where: { id: item.variantId },
        include: { product: true }
      });

      if (!variant) {
        return NextResponse.json({ error: `Variant not found: ${item.variantId}` }, { status: 404 });
      }

      if (variant.stockQuantity < item.quantity) {
        return NextResponse.json({ error: `Insufficient stock for ${variant.product.name} (${variant.size}, ${variant.color})` }, { status: 400 });
      }

      const price = variant.product.basePrice;
      totalAmount += price * item.quantity;

      orderItemsData.push({
        variantId: variant.id,
        quantity: item.quantity,
        priceAtPurchase: price,
      });
    }

    const chapaReference = `TXN-${uuidv4()}`;

    // Create Order in DB
    const order = await prisma.order.create({
      data: {
        customerName,
        customerPhone,
        deliverySubCity,
        deliveryWoreda,
        deliveryLandmark: deliveryLandmark || undefined,
        totalAmount,
        chapaReference,
        paymentStatus: 'PENDING',
        orderItems: {
          create: orderItemsData,
        }
      }
    });

    // Initialize Chapa transaction
    const phoneDigits = customerPhone.replace(/\D/g, '');
    const chapaPayload = {
      amount: totalAmount.toString(),
      currency: 'ETB',
      email: `${phoneDigits}@habesha.store`,
      first_name: customerName.split(' ')[0] || 'Customer',
      last_name: customerName.split(' ').slice(1).join(' ') || 'Customer',
      phone_number: customerPhone,
      tx_ref: chapaReference,
      callback_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout/success?ref=${chapaReference}`,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout/success?ref=${chapaReference}`,
      customization: {
        title: 'Habesha Store',
        description: 'Order payment'
      }
    };

    const chapaResponse = await fetch('https://api.chapa.co/v1/transaction/initialize', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.CHAPA_SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(chapaPayload)
    });

    const chapaData = await chapaResponse.json();

    if (chapaData.status !== 'success') {
      console.error('Chapa initialization failed:', chapaData);
      return NextResponse.json({ error: 'Payment initialization failed' }, { status: 500 });
    }

    return NextResponse.json({ 
      checkoutUrl: chapaData.data.checkout_url,
      orderId: order.id
    });

  } catch (error: any) {
    console.error('Checkout error:', error);
    // Return specific Prisma error if possible
    if (error?.code) {
      return NextResponse.json({ error: `Database error: ${error.code}` }, { status: 500 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
