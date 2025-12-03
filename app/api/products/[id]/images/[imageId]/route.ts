// app/api/products/[id]/images/[imageId]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string; imageId: string } }
) {
  try {
    const token = cookies().get("token")?.value;
    if (!token)
      return NextResponse.json(
        { success: false, message: "Chưa đăng nhập" },
        { status: 401 }
      );

    const user = verifyToken(token);
    if (!user || user.role !== "admin")
      return NextResponse.json(
        { success: false, message: "Bạn không có quyền xóa ảnh" },
        { status: 403 }
      );

    const imageId = Number(params.imageId);

    await prisma.productImages.delete({
      where: { ImageID: imageId },
    });

    return NextResponse.json({
      success: true,
      message: "Đã xóa ảnh",
    });
  } catch (error: any) {
    console.error("DELETE image error:", error);

    if (error?.code === "P2025") {
      return NextResponse.json(
        { success: false, message: "Không tìm thấy ảnh" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Không thể xóa ảnh" },
      { status: 500 }
    );
  }
}
