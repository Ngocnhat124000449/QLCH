// app/api/cart/item/[itemId]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function DELETE(
  _req: Request,
  { params }: { params: { itemId: string } }
) {
  try {
    const token = cookies().get("token")?.value;
    if (!token)
      return NextResponse.json(
        { success: false, message: "Chưa đăng nhập" },
        { status: 401 }
      );

    const user = verifyToken(token);
    const itemId = Number(params.itemId);

    // Kiểm tra item có thuộc giỏ của user không
    const item = await prisma.cartItems.findUnique({
      where: { CartItemID: itemId },
      include: { Cart: true }
    });

    if (!item || item.Cart.UserID !== user.userId) {
      return NextResponse.json(
        { success: false, message: "Không có quyền xóa item này" },
        { status: 403 }
      );
    }

    await prisma.cartItems.delete({
      where: { CartItemID: itemId }
    });

    return NextResponse.json({
      success: true,
      message: "Đã xóa item khỏi giỏ"
    });
  } catch (error) {
    console.error("DELETE cart item error:", error);
    return NextResponse.json(
      { success: false, message: "Không thể xóa item" },
      { status: 500 }
    );
  }
}
