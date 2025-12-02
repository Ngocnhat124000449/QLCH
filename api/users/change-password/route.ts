import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request) {
  try {
    const token = cookies().get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Chưa đăng nhập" },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) return NextResponse.json({ success: false }, { status: 401 });

    const { oldPassword, newPassword } = await req.json();

    const user = await prisma.users.findUnique({
      where: { UserID: decoded.userId },
    });

    if (!user) return NextResponse.json({ success: false }, { status: 404 });

    const match = await bcrypt.compare(oldPassword, user.PasswordHash);

    if (!match)
      return NextResponse.json(
        { success: false, message: "Mật khẩu cũ không đúng" },
        { status: 400 }
      );

    const newHash = await bcrypt.hash(newPassword, 10);

    await prisma.users.update({
      where: { UserID: user.UserID },
      data: { PasswordHash: newHash },
    });

    return NextResponse.json({ success: true, message: "Đổi mật khẩu thành công" });
  } catch (error) {
    console.error("Change password error:", error);
    return NextResponse.json(
      { success: false, message: "Đổi mật khẩu thất bại" },
      { status: 500 }
    );
  }
}
