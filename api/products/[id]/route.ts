// app/api/products/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

type Params = { params: { id: string } };

export async function GET(_req: Request, { params }: Params) {
  try {
    const id = Number(params.id);
    if (!id) {
      return NextResponse.json(
        { success: false, message: "ProductID không hợp lệ" },
        { status: 400 }
      );
    }

    const product = await prisma.products.findUnique({
      where: { ProductID: id },
      include: {
        Category: true,
        Images: true,
        Specs: true,
        Variants: true,
        Reviews: {
          where: { IsVisible: true },
          include: { User: true },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Không tìm thấy sản phẩm" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error("GET /api/products/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Không thể lấy thông tin sản phẩm" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: Params) {
  try {
    const id = Number(params.id);
    if (!id) {
      return NextResponse.json(
        { success: false, message: "ProductID không hợp lệ" },
        { status: 400 }
      );
    }

    // 🔐 check admin
    const cookieStore = await cookies();
const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Chưa đăng nhập" },
        { status: 401 }
      );
    }

    const user = verifyToken(token);
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Không có quyền cập nhật sản phẩm" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const {
      Name,
      Description,
      DetailedDescription,
      BasePrice,
      ThumbnailURL,
      Stock,
      Status,
      CategoryID,
    } = body;

    const updated = await prisma.products.update({
      where: { ProductID: id },
      data: {
        Name,
        Description,
        DetailedDescription,
        BasePrice:
          BasePrice !== undefined && BasePrice !== null
            ? Number(BasePrice)
            : undefined,
        ThumbnailURL,
        Stock:
          Stock !== undefined && Stock !== null ? Number(Stock) : undefined,
        Status,
        CategoryID,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    console.error("PUT /api/products/[id] error:", error);

    if (error?.code === "P2025") {
      return NextResponse.json(
        { success: false, message: "Không tìm thấy sản phẩm" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Không thể cập nhật sản phẩm" },
      { status: 500 }
    );
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const id = Number(params.id);
    if (!id) {
      return NextResponse.json(
        { success: false, message: "ProductID không hợp lệ" },
        { status: 400 }
      );
    }

    // 🔐 check admin
    const cookieStore = await cookies();
const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Chưa đăng nhập" },
        { status: 401 }
      );
    }

    const user = verifyToken(token);
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Không có quyền xóa sản phẩm" },
        { status: 403 }
      );
    }

    await prisma.products.delete({
      where: { ProductID: id },
    });

    return NextResponse.json({
      success: true,
      message: "Đã xóa sản phẩm",
    });
  } catch (error: any) {
    console.error("DELETE /api/products/[id] error:", error);

    if (error?.code === "P2025") {
      return NextResponse.json(
        { success: false, message: "Không tìm thấy sản phẩm" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Không thể xóa sản phẩm" },
      { status: 500 }
    );
  }
}
