// app/api/orders/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const token = cookies().get("token")?.value;
    if (!token)
      return NextResponse.json({ success: false, message: "Chưa đăng nhập" }, { status: 401 });

    const user = verifyToken(token);
    const { ShippingAddress, PaymentMethod, Note } = await req.json();

    // Lấy giỏ hàng của user
    const cart = await prisma.cart.findUnique({
      where: { UserID: user.userId },
      include: {
        Items: {
          include: { Variant: true }
        }
      }
    });

    if (!cart || cart.Items.length === 0) {
      return NextResponse.json(
        { success: false, message: "Giỏ hàng trống" },
        { status: 400 }
      );
    }

    // Kiểm tra tồn kho
    for (const item of cart.Items) {
      if (item.Quantity > item.Variant.Stock) {
        return NextResponse.json(
          {
            success: false,
            message: `Biến thể ${item.Variant.VariantName} không đủ tồn kho`,
          },
          { status: 400 }
        );
      }
    }

    // Tính tổng tiền
    const totalAmount = cart.Items.reduce(
      (sum, item) => sum + Number(item.Variant.Price) * item.Quantity,
      0
    );

    // Tạo đơn hàng + trừ tồn kho + tạo lịch sử
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.orders.create({
        data: {
          UserID: user.userId,
          ShippingAddress,
          PaymentMethod,
          Note,
          TotalAmount: totalAmount,
          Status: "pending",
        }
      });

      // Tạo item cho order
      for (const item of cart.Items) {
        await tx.orderItems.create({
          data: {
            OrderID: newOrder.OrderID,
            VariantID: item.VariantID,
            Quantity: item.Quantity,
            UnitPrice: item.Variant.Price,
            TotalPrice: Number(item.Variant.Price) * item.Quantity,
          }
        });

        // Trừ tồn kho của Variant
        await tx.productVariants.update({
          where: { VariantID: item.VariantID },
          data: { Stock: item.Variant.Stock - item.Quantity }
        });

        // Ghi lịch sử bán
        await tx.salesHistory.create({
          data: {
            ProductID: item.Variant.ProductID,
            Quantity: item.Quantity,
          }
        });
      }

      // Xóa hết giỏ hàng
      await tx.cartItems.deleteMany({
        where: { CartID: cart.CartID },
      });

      return newOrder;
    });

    return NextResponse.json({ success: true, data: order });
  } catch (error) {
    console.error("POST /orders error:", error);
    return NextResponse.json(
      { success: false, message: "Không thể tạo đơn hàng" },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    const token = cookies().get("token")?.value;
    if (!token) return NextResponse.json({ success: false }, { status: 401 });

    const user = verifyToken(token);

    const orders = await prisma.orders.findMany({
      where: { UserID: user.userId },
      include: {
        Items: {
          include: {
            Variant: {
              include: { Product: true }
            }
          }
        }
      },
      orderBy: { OrderDate: "desc" }
    });

    return NextResponse.json({ success: true, data: orders });
  } catch (error) {
    console.error("GET /orders error:", error);
    return NextResponse.json(
      { success: false, message: "Không thể lấy đơn hàng" },
      { status: 500 }
    );
  }
}
