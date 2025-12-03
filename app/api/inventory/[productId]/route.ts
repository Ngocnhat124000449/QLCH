// app/api/inventory/[productId]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function GET(
  _req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const token = cookies().get("token")?.value;
    const user = token ? verifyToken(token) : null;

    if (!user || user.role !== "admin")
      return NextResponse.json({ success: false }, { status: 403 });

    const productId = Number(params.productId);
    const data = await prisma.inventoryLevels.findFirst({
      where: { ProductID: productId },
      include: { Product: true },
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("GET inventory error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const token = cookies().get("token")?.value;
    const user = token ? verifyToken(token) : null;

    if (!user || user.role !== "admin")
      return NextResponse.json({ success: false }, { status: 403 });

    const productId = Number(params.productId);
    const { CurrentStock, LowStockThreshold } = await req.json();

    const updated = await prisma.inventoryLevels.upsert({
      where: { ProductID: productId },
      update: {
        CurrentStock,
        LowStockThreshold: LowStockThreshold ?? undefined,
      },
      create: {
        ProductID: productId,
        CurrentStock,
        LowStockThreshold: LowStockThreshold ?? 5,
      },
    });

    return NextResponse.json({
      success: true,
      data: updated,
      warning:
        updated.CurrentStock <= updated.LowStockThreshold
          ? "⚠️ Tồn kho thấp"
          : null,
    });
  } catch (error) {
    console.error("PUT inventory error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
