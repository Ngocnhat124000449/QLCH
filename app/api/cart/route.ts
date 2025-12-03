// app/api/cart/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  try {
    const token = cookies().get("token")?.value;
    if (!token)
      return NextResponse.json(
        { success: false, message: "Chưa đăng nhập" },
        { status: 401 }
      );

    const user = verifyToken(token);

    // Kiểm tra giỏ hàng có tồn tại chưa → nếu chưa tạo mới
    let cart = await prisma.cart.findUnique({
      where: { UserID: user.userId },
      include: {
        Items: {
          include: {
            Variant: {
              include: { Product: true }
            }
          }
        }
      }
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { UserID: user.userId },
        include: { Items: true }
      });
    }

    return NextResponse.json({ success: true, data: cart });
  } catch (error) {
    console.error("GET cart error:", error);
    return NextResponse.json(
      { success: false, message: "Không thể lấy giỏ hàng" },
      { status: 500 }
    );
  }
}
export async function POST(req: Request) {
  try {
    const token = cookies().get("token")?.value;
    if (!token)
      return NextResponse.json(
        { success: false, message: "Chưa đăng nhập" },
        { status: 401 }
      );

    const user = verifyToken(token);
    const { VariantID, Quantity } = await req.json();

    if (!VariantID || !Quantity) {
      return NextResponse.json(
        { success: false, message: "Thiếu VariantID hoặc Quantity" },
        { status: 400 }
      );
    }

    // Lấy hoặc tạo giỏ
    let cart = await prisma.cart.findUnique({ where: { UserID: user.userId } });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { UserID: user.userId }
      });
    }

    // Kiểm tra item đã tồn tại chưa
    const exists = await prisma.cartItems.findFirst({
      where: {
        CartID: cart.CartID,
        VariantID
      }
    });

    let item;

    if (exists) {
      // Tăng số lượng
      item = await prisma.cartItems.update({
        where: { CartItemID: exists.CartItemID },
        data: { Quantity: exists.Quantity + Quantity }
      });
    } else {
      item = await prisma.cartItems.create({
        data: {
          CartID: cart.CartID,
          VariantID,
          Quantity
        }
      });
    }

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error("POST cart error:", error);
    return NextResponse.json(
      { success: false, message: "Không thể thêm sản phẩm vào giỏ" },
      { status: 500 }
    );
  }
}
export async function PUT(req: Request) {
  try {
    const token = cookies().get("token")?.value;
    if (!token)
      return NextResponse.json(
        { success: false, message: "Chưa đăng nhập" },
        { status: 401 }
      );

    const user = verifyToken(token);
    const { CartItemID, Quantity } = await req.json();

    if (!CartItemID || Quantity == null)
      return NextResponse.json(
        { success: false, message: "Thiếu CartItemID hoặc Quantity" },
        { status: 400 }
      );

    const updated = await prisma.cartItems.update({
      where: { CartItemID },
      data: { Quantity }
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    console.error("PUT cart error:", error);

    if (error?.code === "P2025")
      return NextResponse.json(
        { success: false, message: "Không tìm thấy item" },
        { status: 404 }
      );

    return NextResponse.json(
      { success: false, message: "Không thể cập nhật giỏ hàng" },
      { status: 500 }
    );
  }
}
export async function DELETE() {
  try {
    const token = cookies().get("token")?.value;
    if (!token)
      return NextResponse.json(
        { success: false, message: "Chưa đăng nhập" },
        { status: 401 }
      );

    const user = verifyToken(token);

    const cart = await prisma.cart.findUnique({
      where: { UserID: user.userId }
    });

    if (!cart)
      return NextResponse.json({ success: true, message: "Giỏ hàng rỗng" });

    await prisma.cartItems.deleteMany({
      where: { CartID: cart.CartID }
    });

    return NextResponse.json({
      success: true,
      message: "Đã xóa toàn bộ giỏ hàng"
    });
  } catch (error) {
    console.error("DELETE cart error:", error);
    return NextResponse.json(
      { success: false, message: "Không thể xóa giỏ hàng" },
      { status: 500 }
    );
  }
}
