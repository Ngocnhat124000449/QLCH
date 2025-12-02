// app/api/inventory/sales/[productId]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function GET(
  _req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const token = cookies().get("token")?.value;
    const user = token ? verifyToken(token) : null;

    if (!user || user.role !== "admin")
      return NextResponse.json({ success: false }, { status: 403 });

    const data = await prisma.salesHistory.findMany({
      where: { ProductID: Number(params.productId) },
      orderBy: { SaleDate: "desc" }
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("GET sales history error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
