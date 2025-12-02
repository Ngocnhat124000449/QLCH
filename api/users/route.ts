// GET /api/users (admin)
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

    const users = await prisma.users.findMany({
      select: {
        UserID: true,
        FullName: true,
        Email: true,
        Role: true,
        Status: true,
        CreatedAt: true,
      },
    });

    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    console.error("Admin get users error:", error);
    return NextResponse.json(
      { success: false, message: "Không thể lấy danh sách user" },
      { status: 500 }
    );
  }
}
