// app/api/reviews/user/route.ts
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
    if (!user)
      return NextResponse.json(
        { success: false, message: "Token không hợp lệ" },
        { status: 401 }
      );

    const reviews = await prisma.reviews.findMany({
      where: { UserID: user.userId },
      include: {
        Product: { select: { Name: true, ThumbnailURL: true } }
      },
      orderBy: { CreatedAt: "desc" }
    });

    return NextResponse.json({ success: true, data: reviews });
  } catch (error) {
    console.error("GET user reviews error:", error);
    return NextResponse.json(
      { success: false, message: "Không thể lấy review của người dùng" },
      { status: 500 }
    );
  }
}
