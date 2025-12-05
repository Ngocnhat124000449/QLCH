import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  const where: any = {};

  if (category) {
    where.Category = {
      CategoryName: category
    };
  }

  const products = await prisma.products.findMany({
    where,
    take: 10,
    include: {
      Category: true,
      Images: true,
      Variants: true,
    },
    orderBy: {
      CreatedAt: "desc"
    }
  });

  return NextResponse.json(products);
}
