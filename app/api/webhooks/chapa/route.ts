import { NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const signature = req.headers.get('x-chapa-signature');
    const secret = process.env.CHAPA_WEBHOOK_SECRET || process.env.CHAPA_SECRET_KEY;
    
    const bodyText = await req.text();
    
    // Verify signature
    const hash = crypto.createHmac('sha256', secret as string).update(bodyText).digest('hex');
    
    if (hash !== signature) {
      console.error('Invalid Chapa Webhook Signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(bodyText);

    if (event.event === 'charge.success') {
      const chapaReference = event.tx_ref;

      // Find the order
      const order = await prisma.order.findUnique({
        where: { chapaReference },
        include: {
          orderItems: {
            include: {
              variant: {
                include: { product: true }
              }
            }
          }
        }
      });

      if (!order) {
        console.error(`Order not found for tx_ref: ${chapaReference}`);
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }

      // If already paid, ignore
      if (order.paymentStatus === 'PAID') {
        return NextResponse.json({ message: 'Order already processed' });
      }

      // 1. Update order status
      await prisma.order.update({
        where: { id: order.id },
        data: { paymentStatus: 'PAID' }
      });

      // 2. Decrement stock quantity
      for (const item of order.orderItems) {
        await prisma.variant.update({
          where: { id: item.variantId },
          data: {
            stockQuantity: {
              decrement: item.quantity
            }
          }
        });
      }

      // 3. Trigger WhatsApp notification via the standalone service
      const whatsappPayload = {
        orderId: order.id,
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        deliveryLandmark: order.deliveryLandmark,
        items: order.orderItems.map(item => ({
          name: item.variant.product.name,
          size: item.variant.size,
          color: item.variant.color,
          quantity: item.quantity
        }))
      };

      try {
        await fetch(process.env.WHATSAPP_SERVICE_URL || 'http://localhost:3001/send-notification', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(whatsappPayload)
        });
      } catch (err) {
        console.error('Failed to send WhatsApp notification. Is the service running?', err);
      }

      return NextResponse.json({ status: 'success' });
    }

    return NextResponse.json({ message: 'Event not handled' });
  } catch (error) {
    console.error('Chapa webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
