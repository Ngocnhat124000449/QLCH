import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

type Params = { params: { id: string } };

export async function GET(_req: Request, { params }: Params) {
  const token = cookies().get("token")?.value;
  const user = token ? verifyToken(token) : null;

  if (!user || user.role !== "admin")
    return NextResponse.json({ success: false }, { status: 403 });

  const id = Number(params.id);

  const data = await prisma.users.findUnique({
    where: { UserID: id },
    select: {
      UserID: true,
      FullName: true,
      Email: true,
      Role: true,
      Status: true,
    },
  });

  return NextResponse.json({ success: true, data });
}

export async function DELETE(_req: Request, { params }: Params) {
  const token = cookies().get("token")?.value;
  const user = token ? verifyToken(token) : null;

  if (!user || user.role !== "admin")
    return NextResponse.json({ success: false }, { status: 403 });

  const id = Number(params.id);

  await prisma.users.delete({
    where: { UserID: id },
  });

  return NextResponse.json({ success: true, message: "Đã xóa user" });
}
