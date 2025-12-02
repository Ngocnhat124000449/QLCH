// app/api/orders/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const token = cookies().get("token")?.value;
    const orderId = Number(params.id);

    if (!token) return NextResponse.json({ success: false }, { status: 401 });

    const user = verifyToken(token);

    const order = await prisma.orders.findUnique({
      where: { OrderID: orderId },
      include: {
        Items: {
          include: {
            Variant: {
              include: { Product: true }
            }
          }
        },
        User: true,
      }
    });

    if (!order)
      return NextResponse.json(
        { success: false, message: "Không tìm thấy đơn hàng" },
        { status: 404 }
      );

    // User chỉ xem đơn hàng của mình (trừ admin)
    if (user.role !== "admin" && user.userId !== order.UserID) {
      return NextResponse.json({ success: false }, { status: 403 });
    }

    return NextResponse.json({ success: true, data: order });
  } catch (error) {
    console.error("GET order detail error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
