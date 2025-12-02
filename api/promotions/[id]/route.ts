// app/api/promotions/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

type Params = { params: { id: string } };

export async function GET(_req: Request, { params }: Params) {
  try {
    const token = cookies().get("token")?.value;
    const user = token ? verifyToken(token) : null;

    if (!user || user.role !== "admin")
      return NextResponse.json({ success: false }, { status: 403 });

    const promo = await prisma.promotions.findUnique({
      where: { PromotionID: Number(params.id) }
    });

    if (!promo)
      return NextResponse.json(
        { success: false, message: "Không tìm thấy mã giảm giá" },
        { status: 404 }
      );

    return NextResponse.json({ success: true, data: promo });
  } catch (error) {
    console.error("GET promotion error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: Params) {
  try {
    const token = cookies().get("token")?.value;
    const user = token ? verifyToken(token) : null;

    if (!user || user.role !== "admin")
      return NextResponse.json({ success: false }, { status: 403 });

    const data = await req.json();

    const updated = await prisma.promotions.update({
      where: { PromotionID: Number(params.id) },
      data: {
        PromotionName: data.PromotionName,
        Code: data.Code,
        DiscountType: data.DiscountType,
        DiscountValue: Number(data.DiscountValue),
        MinimumOrderValue: data.MinimumOrderValue
          ? Number(data.MinimumOrderValue)
          : null,
        UsageLimit: data.UsageLimit ?? null,
        IsActive: data.IsActive,
        StartDate: new Date(data.StartDate),
        EndDate: new Date(data.EndDate),
      }
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    console.error("PUT promotions error:", error);

    if (error?.code === "P2025")
      return NextResponse.json(
        { success: false, message: "Không tìm thấy mã giảm giá" },
        { status: 404 }
      );

    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const token = cookies().get("token")?.value;
    const user = token ? verifyToken(token) : null;

    if (!user || user.role !== "admin")
      return NextResponse.json({ success: false }, { status: 403 });

    await prisma.promotions.delete({
      where: { PromotionID: Number(params.id) }
    });

    return NextResponse.json({
      success: true,
      message: "Đã xóa mã giảm giá",
    });
  } catch (error: any) {
    console.error("DELETE promotions error:", error);

    if (error?.code === "P2025")
      return NextResponse.json(
        { success: false, message: "Không tìm thấy mã giảm giá" },
        { status: 404 }
      );

    return NextResponse.json({ success: false }, { status: 500 });
  }
}
