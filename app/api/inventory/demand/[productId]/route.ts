// app/api/inventory/demand/[productId]/route.ts
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

    const data = await prisma.productDemand.findFirst({
      where: { ProductID: Number(params.productId) }
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("GET demand error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const token = cookies().get("token")?.value;
    const user = token ? verifyToken(token) : null;

    if (!user || user.role !== "admin")
      return NextResponse.json({ success: false }, { status: 403 });

    const { Demand } = await req.json();

    const updated = await prisma.productDemand.upsert({
      where: { ProductID: Number(params.productId) },
      update: { Demand },
      create: {
        ProductID: Number(params.productId),
        Demand,
      }
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("PUT demand error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
