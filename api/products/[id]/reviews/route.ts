// app/api/products/[id]/reviews/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productId = Number(params.id);

    if (!productId) {
      return NextResponse.json(
        { success: false, message: "ProductID không hợp lệ" },
        { status: 400 }
      );
    }

    const reviews = await prisma.reviews.findMany({
      where: { ProductID: productId, IsVisible: true },
      include: {
        User: {
          select: { FullName: true, AvatarURL: true }
        }
      },
      orderBy: { CreatedAt: "desc" }
    });

    return NextResponse.json({ success: true, data: reviews });
  } catch (error) {
    console.error("GET reviews error:", error);
    return NextResponse.json(
      { success: false, message: "Không thể lấy đánh giá" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const token = cookies().get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Chưa đăng nhập" },
        { status: 401 }
      );
    }

    const user = verifyToken(token);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Token không hợp lệ" },
        { status: 401 }
      );
    }

    const productId = Number(params.id);
    const { Rating, Comment } = await req.json();

    if (!Rating || Rating < 1 || Rating > 5) {
      return NextResponse.json(
        { success: false, message: "Rating phải từ 1 đến 5" },
        { status: 400 }
      );
    }

    const review = await prisma.reviews.create({
      data: {
        UserID: user.userId,
        ProductID: productId,
        Rating,
        Comment,
      },
    });

    return NextResponse.json({ success: true, data: review }, { status: 201 });
  } catch (error) {
    console.error("POST review error:", error);
    return NextResponse.json(
      { success: false, message: "Không thể tạo review" },
      { status: 500 }
    );
  }
}
