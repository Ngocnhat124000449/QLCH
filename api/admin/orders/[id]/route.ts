// app/api/admin/orders/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const token = cookies().get("token")?.value;
  const user = token ? verifyToken(token) : null;

  if (!user || user.role !== "admin")
    return NextResponse.json({ success: false }, { status: 403 });

  const { Status } = await req.json();
  const orderId = Number(params.id);

  const updated = await prisma.orders.update({
    where: { OrderID: orderId },
    data: { Status },
  });

  return NextResponse.json({ success: true, data: updated });
}
