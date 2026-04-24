import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

async function isAuthed() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_token")?.value === process.env.ADMIN_SECRET;
}

export async function GET() {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        variants: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { variantId, stockQuantity } = await req.json();

    const updated = await prisma.variant.update({
      where: { id: variantId },
      data: { stockQuantity },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating variant:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
