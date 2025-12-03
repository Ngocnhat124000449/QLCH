// app/api/products/[id]/images/route.ts
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

    const images = await prisma.productImages.findMany({
      where: { ProductID: productId },
      orderBy: [
        { IsMain: "desc" },
        { DisplayOrder: "asc" }
      ],
    });

    return NextResponse.json({ success: true, data: images });
  } catch (error) {
    console.error("GET images error:", error);
    return NextResponse.json(
      { success: false, message: "Không thể lấy danh sách ảnh" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // 🔒 Kiểm tra đăng nhập
    const token = cookies().get("token")?.value;
    if (!token)
      return NextResponse.json(
        { success: false, message: "Chưa đăng nhập" },
        { status: 401 }
      );

    const user = verifyToken(token);
    if (!user || user.role !== "admin")
      return NextResponse.json(
        { success: false, message: "Không có quyền thêm ảnh" },
        { status: 403 }
      );

    const productId = Number(params.id);
    const { ImageURL, Color, DisplayOrder, IsMain = false } = await req.json();

    if (!ImageURL) {
      return NextResponse.json(
        { success: false, message: "ImageURL là bắt buộc" },
        { status: 400 }
      );
    }

    // Nếu ảnh là ảnh chính → set ảnh khác về false
    if (IsMain) {
      await prisma.productImages.updateMany({
        where: { ProductID: productId },
        data: { IsMain: false },
      });
    }

    const newImage = await prisma.productImages.create({
      data: {
        ProductID: productId,
        ImageURL,
        Color,
        DisplayOrder: DisplayOrder ?? 0,
        IsMain,
      },
    });

    return NextResponse.json(
      { success: true, data: newImage },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST image error:", error);
    return NextResponse.json(
      { success: false, message: "Không thể thêm ảnh sản phẩm" },
      { status: 500 }
    );
  }
}
