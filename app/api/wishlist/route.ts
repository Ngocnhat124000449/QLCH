// app/api/wishlist/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  try {
    const token = cookies().get("token")?.value;

    if (!token)
      return NextResponse.json({ success: false, message: "Chưa đăng nhập" }, { status: 401 });

    const user = verifyToken(token);

    const wishlist = await prisma.wishlistItems.findMany({
      where: { UserID: user.userId },
      include: {
        Product: {
          include: {
            Images: true,
            Variants: true,
          }
        }
      },
      orderBy: { AddedAt: "desc" }
    });

    return NextResponse.json({ success: true, data: wishlist });
  } catch (error) {
    console.error("GET wishlist error:", error);
    return NextResponse.json(
      { success: false, message: "Không thể lấy danh sách yêu thích" },
      { status: 500 }
    );
  }
}
export async function POST(req: Request) {
  try {
    const token = cookies().get("token")?.value;
    if (!token)
      return NextResponse.json({ success: false, message: "Chưa đăng nhập" }, { status: 401 });

    const user = verifyToken(token);
    const { ProductID } = await req.json();

    if (!ProductID) {
      return NextResponse.json(
        { success: false, message: "Thiếu ProductID" },
        { status: 400 }
      );
    }

    // Kiểm tra sản phẩm tồn tại chưa
    const exists = await prisma.products.findUnique({
      where: { ProductID },
    });

    if (!exists) {
      return NextResponse.json(
        { success: false, message: "Sản phẩm không tồn tại" },
        { status: 404 }
      );
    }

    // Kiểm tra user đã thêm vào wishlist chưa
    const duplicate = await prisma.wishlistItems.findFirst({
      where: { UserID: user.userId, ProductID }
    });

    if (duplicate) {
      return NextResponse.json(
        { success: false, message: "Sản phẩm đã có trong wishlist" },
        { status: 400 }
      );
    }

    const item = await prisma.wishlistItems.create({
      data: {
        UserID: user.userId,
        ProductID,
      },
    });

    return NextResponse.json(
      { success: true, data: item, message: "Đã thêm vào wishlist" },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST wishlist error:", error);
    return NextResponse.json(
      { success: false, message: "Không thể thêm vào wishlist" },
      { status: 500 }
    );
  }
}
export async function DELETE(req: Request) {
  try {
    const token = cookies().get("token")?.value;

    if (!token)
      return NextResponse.json({ success: false, message: "Chưa đăng nhập" }, { status: 401 });

    const user = verifyToken(token);
    const { ProductID } = await req.json();

    if (!ProductID)
      return NextResponse.json(
        { success: false, message: "Thiếu ProductID" },
        { status: 400 }
      );

    await prisma.wishlistItems.deleteMany({
      where: { UserID: user.userId, ProductID }
    });

    return NextResponse.json({
      success: true,
      message: "Đã xóa khỏi wishlist"
    });
  } catch (error) {
    console.error("DELETE wishlist error:", error);
    return NextResponse.json(
      { success: false, message: "Không thể xóa sản phẩm khỏi wishlist" },
      { status: 500 }
    );
  }
}
