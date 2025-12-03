// app/api/users/register/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { FullName, Email, Password } = await req.json();

    if (!FullName || !Email || !Password) {
      return NextResponse.json(
        { success: false, message: "Thiếu thông tin bắt buộc" },
        { status: 400 }
      );
    }

    const exists = await prisma.users.findUnique({
      where: { Email },
    });

    if (exists) {
      return NextResponse.json(
        { success: false, message: "Email đã tồn tại" },
        { status: 400 }
      );
    }

    const hash = await bcrypt.hash(Password, 10);

    const user = await prisma.users.create({
      data: {
        FullName,
        Email,
        PasswordHash: hash,
        Role: "user",
      },
      select: {
        UserID: true,
        FullName: true,
        Email: true,
        Role: true,
        CreatedAt: true,
      },
    });

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { success: false, message: "Đăng ký thất bại" },
      { status: 500 }
    );
  }
}
