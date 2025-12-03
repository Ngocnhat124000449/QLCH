// app/api/products/[id]/variants/route.ts
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

    const variants = await prisma.productVariants.findMany({
      where: { ProductID: productId },
      orderBy: { CreatedAt: "desc" },
    });

    return NextResponse.json({ success: true, data: variants });
  } catch (error) {
    console.error("GET variants error:", error);
    return NextResponse.json(
      { success: false, message: "Không thể lấy danh sách biến thể" },
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
    const productId = Number(params.id);

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Chưa đăng nhập" },
        { status: 401 }
      );
    }

    const user = verifyToken(token);
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Không có quyền tạo biến thể" },
        { status: 403 }
      );
    }

    const body = await req.json();

    const {
      VariantName,
      Color,
      Storage,
      Price,
      Stock,
      SKU,
      ImageURL,
      Status = true,
    } = body;

    if (!VariantName || Price == null || Stock == null) {
      return NextResponse.json(
        { success: false, message: "VariantName, Price, Stock là bắt buộc" },
        { status: 400 }
      );
    }

    const variant = await prisma.productVariants.create({
      data: {
        ProductID: productId,
        VariantName,
        Color,
        Storage,
        Price: Number(Price),
        Stock: Number(Stock),
        SKU,
        ImageURL,
        Status,
      },
    });

    return NextResponse.json({ success: true, data: variant }, { status: 201 });
  } catch (error) {
    console.error("POST variant error:", error);
    return NextResponse.json(
      { success: false, message: "Không thể tạo biến thể sản phẩm" },
      { status: 500 }
    );
  }
}
