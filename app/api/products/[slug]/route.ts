import { NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/services/products";

export async function GET(req: Request, { params }: { params: { slug: string }}) {
  const data = await getProductBySlug(params.slug);

  if (!data) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}
