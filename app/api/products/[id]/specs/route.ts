// app/api/products/[id]/specs/route.ts
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

    const specs = await prisma.productSpecifications.findMany({
      where: { ProductID: productId },
      orderBy: { DisplayOrder: "asc" },
    });

    return NextResponse.json({ success: true, data: specs });
  } catch (error) {
    console.error("GET specs error:", error);
    return NextResponse.json(
      { success: false, message: "Không thể lấy thông số sản phẩm" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // 🔐 Kiểm tra đăng nhập
    const token = cookies().get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Chưa đăng nhập" },
        { status: 401 }
      );
    }

    const user = verifyToken(token);
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Không có quyền tạo thông số" },
        { status: 403 }
      );
    }

    const productId = Number(params.id);
    const { Name, Value, DisplayOrder } = await req.json();

    if (!Name || !Value) {
      return NextResponse.json(
        { success: false, message: "Name và Value là bắt buộc" },
        { status: 400 }
      );
    }

    const spec = await prisma.productSpecifications.create({
      data: {
        ProductID: productId,
        Name,
        Value,
        DisplayOrder: DisplayOrder ?? 0,
      },
    });

    return NextResponse.json({ success: true, data: spec }, { status: 201 });
  } catch (error) {
    console.error("POST specs error:", error);
    return NextResponse.json(
      { success: false, message: "Không thể tạo thông số" },
      { status: 500 }
    );
  }
}
