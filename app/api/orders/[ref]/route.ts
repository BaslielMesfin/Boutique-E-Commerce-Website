import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ ref: string }> }
) {
  try {
    const { ref } = await params;

    const order = await prisma.order.findUnique({
      where: { chapaReference: ref },
      include: {
        orderItems: {
          include: {
            variant: {
              include: { product: true },
            },
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: order.id,
      customerName: order.customerName,
      customerPhone: order.customerPhone,
      deliverySubCity: order.deliverySubCity,
      deliveryWoreda: order.deliveryWoreda,
      totalAmount: order.totalAmount,
      chapaReference: order.chapaReference,
      paymentStatus: order.paymentStatus,
      createdAt: order.createdAt,
      items: order.orderItems.map((oi) => ({
        name: oi.variant.product.name,
        size: oi.variant.size,
        color: oi.variant.color,
        quantity: oi.quantity,
        price: oi.priceAtPurchase,
        image: oi.variant.product.images?.[0] || "",
      })),
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
  }
}
