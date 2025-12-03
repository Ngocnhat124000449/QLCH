// app/api/orders/single/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const token = cookies().get("token")?.value;
    if (!token)
      return NextResponse.json({ success: false, message: "Chưa đăng nhập" }, { status: 401 });

    const user = verifyToken(token);
    const { VariantID, Quantity, ShippingAddress, PaymentMethod, Note } =
      await req.json();

    if (!VariantID || !Quantity)
      return NextResponse.json(
        { success: false, message: "Thiếu VariantID hoặc Quantity" },
        { status: 400 }
      );

    const variant = await prisma.productVariants.findUnique({
      where: { VariantID },
    });

    if (!variant)
      return NextResponse.json(
        { success: false, message: "Không tìm thấy biến thể" },
        { status: 404 }
      );

    if (Quantity > variant.Stock) {
      return NextResponse.json(
        { success: false, message: "Không đủ tồn kho" },
        { status: 400 }
      );
    }

    const totalPrice = Number(variant.Price) * Quantity;

    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.orders.create({
        data: {
          UserID: user.userId,
          ShippingAddress,
          PaymentMethod,
          Note,
          TotalAmount: totalPrice,
          Status: "pending",
        },
      });

      await tx.orderItems.create({
        data: {
          OrderID: newOrder.OrderID,
          VariantID,
          Quantity,
          UnitPrice: variant.Price,
          TotalPrice: totalPrice,
        },
      });

      await tx.productVariants.update({
        where: { VariantID },
        data: { Stock: variant.Stock - Quantity },
      });

      await tx.salesHistory.create({
        data: {
          ProductID: variant.ProductID,
          Quantity,
        },
      });

      return newOrder;
    });

    return NextResponse.json({ success: true, data: order });
  } catch (error) {
    console.error("Single checkout error:", error);
    return NextResponse.json(
      { success: false, message: "Không thể thanh toán sản phẩm" },
      { status: 500 }
    );
  }
}
