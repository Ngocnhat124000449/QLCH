// app/api/wishlist/all/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function DELETE() {
  try {
    const token = cookies().get("token")?.value;
    if (!token)
      return NextResponse.json({ success: false, message: "Chưa đăng nhập" }, { status: 401 });

    const user = verifyToken(token);

    await prisma.wishlistItems.deleteMany({
      where: { UserID: user.userId }
    });

    return NextResponse.json({
      success: true,
      message: "Đã xóa toàn bộ wishlist"
    });
  } catch (error) {
    console.error("DELETE all wishlist error:", error);
    return NextResponse.json(
      { success: false, message: "Không thể xóa wishlist" },
      { status: 500 }
    );
  }
}
