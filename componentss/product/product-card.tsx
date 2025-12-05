// components/product/product-card.tsx
// Card sản phẩm hiển thị ở trang Home, Category, Search

"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { PriceTag } from "./price-tag";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  thumbnail: string;
  variantCount?: number;
  className?: string;
}

export function ProductCard({
  id,
  name,
  price,
  oldPrice,
  thumbnail,
  variantCount,
  className,
}: ProductCardProps) {
  return (
    <div
      className={cn(
        "group rounded-(--radius) border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3 shadow-sm transition hover:shadow-md",
        className
      )}
    >
      <Link href={`/products/${id}`} className="block">
        <div className="relative aspect-square w-full overflow-hidden rounded-(--radius) bg-[hsl(var(--secondary))]">
          <Image
            src={thumbnail}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="mt-3 flex flex-col gap-1">
          <h3 className="line-clamp-2 text-sm font-medium text-[hsl(var(--foreground))]">
            {name}
          </h3>

          <PriceTag price={price} oldPrice={oldPrice} />

          {variantCount && variantCount > 1 && (
            <Badge variant="accent" className="w-fit">
              {variantCount} lựa chọn
            </Badge>
          )}
        </div>
      </Link>

      <Button
        size="sm"
        variant="secondary"
        className="mt-3 w-full"
      >
        <ShoppingCart className="h-4 w-4" />
        Thêm vào giỏ
      </Button>
    </div>
  );
}
