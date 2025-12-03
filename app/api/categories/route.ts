// app/api/categories/route.ts
// API danh sách danh mục + tạo danh mục (admin)

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  try {
    const categories = await prisma.categories.findMany({
      orderBy: { CreatedAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("GET /api/categories error:", error);
    return NextResponse.json(
      { success: false, message: "Không thể lấy danh sách danh mục" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
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
        { success: false, message: "Không có quyền tạo danh mục" },
        { status: 403 }
      );
    }

    const { CategoryName, Description, ImageURL, IsActive = true } =
      await req.json();

    if (!CategoryName) {
      return NextResponse.json(
        { success: false, message: "CategoryName là bắt buộc" },
        { status: 400 }
      );
    }

    const category = await prisma.categories.create({
      data: {
        CategoryName,
        Description,
        ImageURL,
        IsActive,
      },
    });

    return NextResponse.json(
      { success: true, data: category },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/categories error:", error);
    return NextResponse.json(
      { success: false, message: "Không thể tạo danh mục" },
      { status: 500 }
    );
  }
}
