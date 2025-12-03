// app/api/inventory/low-stock/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  try {
    const token = cookies().get("token")?.value;
    const user = token ? verifyToken(token) : null;

    if (!user || user.role !== "admin")
      return NextResponse.json({ success: false }, { status: 403 });

    const items = await prisma.inventoryLevels.findMany({
      where: {
        CurrentStock: { lte:  prisma.inventoryLevels.fields.LowStockThreshold }
      },
      include: {
        Product: true,
      }
    });

    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    console.error("GET low-stock error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
