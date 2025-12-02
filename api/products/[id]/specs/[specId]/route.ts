// app/api/products/[id]/specs/[specId]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function PUT(
  req: Request,
  { params }: { params: { id: string; specId: string } }
) {
  try {
    const token = cookies().get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Chưa đăng nhập" },
        { status: 401 }
      );
    }

    const user = verifyToken(token);
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Không có quyền cập nhật thông số" },
        { status: 403 }
      );
    }

    const specId = Number(params.specId);

    const { Name, Value, DisplayOrder } = await req.json();

    const updated = await prisma.productSpecifications.update({
      where: { SpecificationID: specId },
      data: {
        Name,
        Value,
        DisplayOrder: DisplayOrder ?? undefined,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    console.error("PUT specs error:", error);

    if (error?.code === "P2025") {
      return NextResponse.json(
        { success: false, message: "Không tìm thấy thông số" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Không thể cập nhật thông số" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string; specId: string } }
) {
  try {
    const token = cookies().get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Chưa đăng nhập" },
        { status: 401 }
      );
    }

    const user = verifyToken(token);
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Không có quyền xóa thông số" },
        { status: 403 }
      );
    }

    const specId = Number(params.specId);

    await prisma.productSpecifications.delete({
      where: { SpecificationID: specId },
    });

    return NextResponse.json({
      success: true,
      message: "Đã xóa thông số",
    });
  } catch (error: any) {
    console.error("DELETE specs error:", error);

    if (error?.code === "P2025") {
      return NextResponse.json(
        { success: false, message: "Không tìm thấy thông số" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Không thể xóa thông số" },
      { status: 500 }
    );
  }
}
