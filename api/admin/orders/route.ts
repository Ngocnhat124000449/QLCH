// app/api/admin/orders/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET() {
  const token = cookies().get("token")?.value;
  const user = token ? verifyToken(token) : null;

  if (!user || user.role !== "admin")
    return NextResponse.json({ success: false }, { status: 403 });

  const orders = await prisma.orders.findMany({
    include: {
      User: true,
      Items: {
        include: {
          Variant: {
            include: { Product: true }
          }
        }
      }
    },
    orderBy: { OrderDate: "desc" }
  });

  return NextResponse.json({ success: true, data: orders });
}
