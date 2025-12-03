"use client";

import React from "react";
import Link from "next/link";
import { TheSanPham } from "@/components/mycomponents/home/the-san-pham";

type Category = {
  id: string;
  name: string;
  slug: string;
};

type Product = {
  id: string;
  name: string;
  slug: string;
  thumbnailUrl?: string | null;
  basePrice: number;
  category: { name: string } | null;
};

type DanhMucNoiProps = {
  category: Category;
  products: Product[];
  onMouseEnter: () => void;
};

export function DanhMucNoi({
  category,
  products,
  onMouseEnter,
}: DanhMucNoiProps) {
  return (
    <div
      className="absolute top-0 left-[calc(16.666667%_+_1rem)] w-[calc(83.333333%_-_1rem)] h-full bg-card shadow-lg rounded-r-lg z-20 p-6"
      onMouseEnter={onMouseEnter}
    >
      <h3 className="text-xl font-bold mb-4 text-foreground">
        Sản phẩm bán chạy - {category.name}
      </h3>

      <div className="grid grid-cols-4 gap-4">
        {products.slice(0, 4).map((product) => (
          <TheSanPham
            key={product.id}
            slug={product.slug}
            name={product.name}
            thumbnailUrl={product.thumbnailUrl}
           basePrice={product.basePrice}
            categoryName={product.category?.name}
          />
        ))}
      </div>

      <div className="mt-4 text-right">
        <Link
          href={`/categories/${category.slug}`}
          className="text-primary font-semibold hover:underline"
        >
          Xem tất cả sản phẩm
        </Link>
      </div>
    </div>
  );
}
