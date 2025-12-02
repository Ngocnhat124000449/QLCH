// app/api/categories/[id]/route.ts
// API chi tiết danh mục + cập nhật + xóa (admin)

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
        { success: false, message: "CategoryID không hợp lệ" },
        { status: 400 }
      );
    }

    const category = await prisma.categories.findUnique({
      where: { CategoryID: id },
    });

    if (!category) {
      return NextResponse.json(
        { success: false, message: "Không tìm thấy danh mục" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    console.error("GET /api/categories/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Không thể lấy thông tin danh mục" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: Params) {
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
        { success: false, message: "Không có quyền cập nhật danh mục" },
        { status: 403 }
      );
    }

    const id = Number(params.id);
    if (!id) {
      return NextResponse.json(
        { success: false, message: "CategoryID không hợp lệ" },
        { status: 400 }
      );
    }

    const { CategoryName, Description, ImageURL, IsActive } = await req.json();

    const updated = await prisma.categories.update({
      where: { CategoryID: id },
      data: {
        CategoryName,
        Description,
        ImageURL,
        IsActive,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    console.error("PUT /api/categories/[id] error:", error);

    if (error?.code === "P2025") {
      return NextResponse.json(
        { success: false, message: "Không tìm thấy danh mục" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Không thể cập nhật danh mục" },
      { status: 500 }
    );
  }
}

export async function DELETE(_req: Request, { params }: Params) {
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
        { success: false, message: "Không có quyền xóa danh mục" },
        { status: 403 }
      );
    }

    const id = Number(params.id);
    if (!id) {
      return NextResponse.json(
        { success: false, message: "CategoryID không hợp lệ" },
        { status: 400 }
      );
    }

    await prisma.categories.delete({
      where: { CategoryID: id },
    });

    return NextResponse.json({
      success: true,
      message: "Đã xóa danh mục",
    });
  } catch (error: any) {
    console.error("DELETE /api/categories/[id] error:", error);

    if (error?.code === "P2025") {
      return NextResponse.json(
        { success: false, message: "Không tìm thấy danh mục" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Không thể xóa danh mục" },
      { status: 500 }
    );
  }
}
