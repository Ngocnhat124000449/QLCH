// app/api/products/[id]/variants/[variantId]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function PUT(
  req: Request,
  { params }: { params: { id: string; variantId: string } }
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

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Không có quyền cập nhật biến thể" },
        { status: 403 }
      );
    }

    const variantId = Number(params.variantId);

    const body = await req.json();

    const {
      VariantName,
      Color,
      Storage,
      Price,
      Stock,
      SKU,
      ImageURL,
      Status,
    } = body;

    const updated = await prisma.productVariants.update({
      where: { VariantID: variantId },
      data: {
        VariantName,
        Color,
        Storage,
        Price: Price !== undefined ? Number(Price) : undefined,
        Stock: Stock !== undefined ? Number(Stock) : undefined,
        SKU,
        ImageURL,
        Status,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    console.error("PUT variant error:", error);

    if (error?.code === "P2025") {
      return NextResponse.json(
        { success: false, message: "Không tìm thấy biến thể để cập nhật" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Không thể cập nhật biến thể" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string; variantId: string } }
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

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Không có quyền xóa biến thể" },
        { status: 403 }
      );
    }

    const variantId = Number(params.variantId);

    await prisma.productVariants.delete({
      where: { VariantID: variantId },
    });

    return NextResponse.json({
      success: true,
      message: "Đã xóa biến thể",
    });
  } catch (error: any) {
    console.error("DELETE variant error:", error);

    if (error?.code === "P2025") {
      return NextResponse.json(
        { success: false, message: "Không tìm thấy biến thể" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Không thể xóa biến thể" },
      { status: 500 }
    );
  }
}
