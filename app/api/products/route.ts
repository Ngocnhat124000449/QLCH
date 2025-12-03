// app/api/products/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") || "1") || 1;
    const pageSize = Number(searchParams.get("pageSize") || "12") || 12;

    const search = searchParams.get("search") || "";
    const categoryId = searchParams.get("categoryId");
    const onlyActive = searchParams.get("onlyActive") === "true";
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    const where: any = {};

    if (search) {
      where.OR = [
        { Name: { contains: search, mode: "insensitive" } },
        { Description: { contains: search, mode: "insensitive" } },
        { DetailedDescription: { contains: search, mode: "insensitive" } },
      ];
    }

    if (categoryId) {
      where.CategoryID = Number(categoryId);
    }

    if (onlyActive) {
      where.Status = true;
    }

    if (minPrice || maxPrice) {
      where.BasePrice = {};
      if (minPrice) where.BasePrice.gte = Number(minPrice);
      if (maxPrice) where.BasePrice.lte = Number(maxPrice);
    }

    const [items, total] = await Promise.all([
      prisma.products.findMany({
        where,
        include: {
          Category: true,
          Images: true,
          Specs: true,
          Variants: true,
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { CreatedAt: "desc" },
      }),
      prisma.products.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: items,
      meta: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { success: false, message: "Không thể lấy danh sách sản phẩm" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
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
        { success: false, message: "Không có quyền tạo sản phẩm" },
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
      Status = true,
      CategoryID,
    } = body;

    if (!Name || BasePrice == null || Stock == null) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, BasePrice, Stock là bắt buộc",
        },
        { status: 400 }
      );
    }

    const product = await prisma.products.create({
      data: {
        Name,
        Description,
        DetailedDescription,
        BasePrice: Number(BasePrice),
        ThumbnailURL,
        Stock: Number(Stock),
        Status,
        CategoryID: CategoryID ?? null,
      },
    });

    return NextResponse.json(
      { success: true, data: product },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json(
      { success: false, message: "Không thể tạo sản phẩm" },
      { status: 500 }
    );
  }
}
