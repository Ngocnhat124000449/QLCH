// app/api/products/[id]/reviews/[reviewId]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

type Params = { params: { id: string; reviewId: string } };

export async function PUT(req: Request, { params }: Params) {
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

    const reviewId = Number(params.reviewId);
    const { Rating, Comment } = await req.json();

    const review = await prisma.reviews.findUnique({
      where: { ReviewID: reviewId }
    });

    if (!review)
      return NextResponse.json(
        { success: false, message: "Không tìm thấy review" },
        { status: 404 }
      );

    // User chỉ được sửa review của mình
    if (user.role !== "admin" && user.userId !== review.UserID) {
      return NextResponse.json(
        { success: false, message: "Không có quyền cập nhật review" },
        { status: 403 }
      );
    }

    const updated = await prisma.reviews.update({
      where: { ReviewID: reviewId },
      data: {
        Rating: Rating ?? review.Rating,
        Comment: Comment ?? review.Comment
      }
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("PUT review error:", error);
    return NextResponse.json(
      { success: false, message: "Không thể cập nhật review" },
      { status: 500 }
    );
  }
}

export async function DELETE(_req: Request, { params }: Params) {
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

    const reviewId = Number(params.reviewId);

    const review = await prisma.reviews.findUnique({
      where: { ReviewID: reviewId }
    });

    if (!review)
      return NextResponse.json(
        { success: false, message: "Không tìm thấy review" },
        { status: 404 }
      );

    // Admin hoặc chính chủ review
    if (user.role !== "admin" && user.userId !== review.UserID) {
      return NextResponse.json(
        { success: false, message: "Không có quyền xóa review" },
        { status: 403 }
      );
    }

    // Xóa = ẩn (soft delete)
    const deleted = await prisma.reviews.update({
      where: { ReviewID: reviewId },
      data: { IsVisible: false }
    });

    return NextResponse.json({
      success: true,
      message: "Đã ẩn review",
      data: deleted
    });
  } catch (error) {
    console.error("DELETE review error:", error);
    return NextResponse.json(
      { success: false, message: "Không thể xóa review" },
      { status: 500 }
    );
  }
}
