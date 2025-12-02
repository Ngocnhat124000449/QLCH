import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const token = cookies().get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Bạn chưa đăng nhập" },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: "Token không hợp lệ" },
        { status: 401 }
      );
    }

    const user = await prisma.users.findUnique({
      where: { UserID: decoded.userId },
      select: {
        UserID: true,
        FullName: true,
        Email: true,
        PhoneNumber: true,
        Address: true,
        Role: true,
        AvatarURL: true,
      },
    });

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.error("Me error:", error);
    return NextResponse.json(
      { success: false, message: "Không thể lấy thông tin người dùng" },
      { status: 500 }
    );
  }
}
export async function PUT(req: Request) {
  try {
    const token = cookies().get("token")?.value;
    if (!token) return NextResponse.json({ success: false }, { status: 401 });

    const decoded = verifyToken(token);
    if (!decoded) return NextResponse.json({ success: false }, { status: 401 });

    const { FullName, PhoneNumber, Address, AvatarURL } = await req.json();

    const updated = await prisma.users.update({
      where: { UserID: decoded.userId },
      data: {
        FullName,
        PhoneNumber,
        Address,
        AvatarURL,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Update user error:", error);
    return NextResponse.json(
      { success: false, message: "Cập nhật thất bại" },
      { status: 500 }
    );
  }
}
