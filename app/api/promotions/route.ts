// app/api/promotions/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  try {
    const token = cookies().get("token")?.value;
    const user = token ? verifyToken(token) : null;

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Không có quyền truy cập" },
        { status: 403 }
      );
    }

    const promotions = await prisma.promotions.findMany({
      orderBy: { StartDate: "desc" }
    });

    return NextResponse.json({ success: true, data: promotions });
  } catch (error) {
    console.error("GET promotions error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const token = cookies().get("token")?.value;
    const user = token ? verifyToken(token) : null;

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Không có quyền tạo khuyến mãi" },
        { status: 403 }
      );
    }

    const data = await req.json();

    const promotion = await prisma.promotions.create({
      data: {
        PromotionName: data.PromotionName,
        Code: data.Code,
        DiscountType: data.DiscountType,  // "percentage" | "fixed"
        DiscountValue: Number(data.DiscountValue),
        MinimumOrderValue: data.MinimumOrderValue
          ? Number(data.MinimumOrderValue)
          : null,
        UsageLimit: data.UsageLimit ?? null,
        StartDate: new Date(data.StartDate),
        EndDate: new Date(data.EndDate),
      }
    });

    return NextResponse.json({ success: true, data: promotion }, { status: 201 });
  } catch (error) {
    console.error("POST promotions error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
