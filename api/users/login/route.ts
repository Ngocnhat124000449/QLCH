// app/api/users/login/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { Email, Password } = await req.json();

    const user = await prisma.users.findUnique({
      where: { Email },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Sai email hoặc mật khẩu" },
        { status: 400 }
      );
    }

    const ok = await bcrypt.compare(Password, user.PasswordHash);

    if (!ok) {
      return NextResponse.json(
        { success: false, message: "Sai email hoặc mật khẩu" },
        { status: 400 }
      );
    }

    const token = signToken({
      userId: user.UserID,
      role: user.Role,
      email: user.Email,
    });

    const res = NextResponse.json({
      success: true,
      message: "Đăng nhập thành công",
      user: {
        UserID: user.UserID,
        FullName: user.FullName,
        Email: user.Email,
        Role: user.Role,
      },
    });

    // Lưu token vào cookie
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return res;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Đăng nhập thất bại" },
      { status: 500 }
    );
  }
}
