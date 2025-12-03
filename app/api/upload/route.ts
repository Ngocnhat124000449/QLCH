import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Không có file được gửi lên" },
        { status: 400 }
      );
    }

    // Chuyển file thành buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload lên Cloudinary
    const uploadRes = await cloudinary.uploader.upload_stream(
      {
        folder: "products",
      },
      (error, result) => {}
    );

    const uploadPromise = new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "products" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(buffer);
    });

    const uploaded: any = await uploadPromise;

    return NextResponse.json({
      url: uploaded.secure_url, // Đây là link dùng để lưu DB
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload thất bại" },
      { status: 500 }
    );
  }
}
