// app/api/promotions/check/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { Code, OrderTotal } = await req.json();

    if (!Code)
      return NextResponse.json(
        { success: false, message: "Thiếu mã giảm giá" },
        { status: 400 }
      );

    const promo = await prisma.promotions.findFirst({
      where: {
        Code,
        IsActive: true,
      }
    });

    if (!promo)
      return NextResponse.json(
        { success: false, message: "Mã giảm giá không tồn tại" },
        { status: 404 }
      );

    const now = new Date();

    if (promo.StartDate > now || promo.EndDate < now)
      return NextResponse.json(
        { success: false, message: "Mã giảm giá đã hết hạn" },
        { status: 400 }
      );

    if (promo.UsageLimit && promo.UsedCount! >= promo.UsageLimit)
      return NextResponse.json(
        { success: false, message: "Mã giảm giá đã đạt giới hạn sử dụng" },
        { status: 400 }
      );

    if (promo.MinimumOrderValue && OrderTotal < promo.MinimumOrderValue)
      return NextResponse.json(
        { success: false, message: "Đơn hàng không đạt giá trị tối thiểu" },
        { status: 400 }
      );

    // Tính toán giảm giá
    let discountAmount = 0;

    if (promo.DiscountType === "percentage") {
      discountAmount = (Number(promo.DiscountValue) / 100) * OrderTotal;
    } else {
      discountAmount = Number(promo.DiscountValue);
    }

    return NextResponse.json({
      success: true,
      data: {
        PromotionID: promo.PromotionID,
        Code: promo.Code,
        DiscountAmount: discountAmount,
      }
    });
  } catch (error) {
    console.error("CHECK promotion error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
