// components/wishlist/wishlist-item.tsx
// Component: Item trong danh sách yêu thích (Wishlist)

"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PriceTag } from "@/components/product/price-tag";
import { Heart, ShoppingCart, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface WishlistItemProps {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  thumbnail: string;
  onRemove?: () => void;
  onAddToCart?: () => void;
  className?: string;
}

export function WishlistItem({
  id,
  name,
  price,
  oldPrice,
  thumbnail,
  onRemove,
  onAddToCart,
  className,
}: WishlistItemProps) {
  return (
    <div
      className={cn(
        "group flex gap-4 rounded-(--radius) border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3 shadow-sm transition hover:shadow-md",
        className
      )}
    >
      {/* Ảnh sản phẩm */}
      <Link
        href={`/products/${id}`}
        className="relative h-24 w-24 shrink-0 overflow-hidden rounded-(--radius) bg-[hsl(var(--secondary))]"
      >
        <Image
          src={thumbnail}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      {/* Thông tin sản phẩm */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <Link
            href={`/products/${id}`}
            className="line-clamp-2 text-sm font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))]"
          >
            {name}
          </Link>

          <PriceTag price={price} oldPrice={oldPrice} />
        </div>

        {/* Nút chức năng */}
        <div className="mt-2 flex items-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            className="flex-1"
            onClick={onAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
            Thêm vào giỏ
          </Button>

          <button
            onClick={onRemove}
            className="inline-flex h-9 w-9 items-center justify-center rounded-(--radius) border border-[hsl(var(--border))] text-[hsl(var(--destructive))] hover:bg-[hsl(var(--destructive)/0.1)]"
            aria-label="Xoá khỏi wishlist"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Icon tim - trang trí */}
      <div className="absolute right-3 top-3 hidden text-[hsl(var(--accent))] group-hover:block">
        <Heart className="h-4 w-4 fill-[hsl(var(--accent))]" />
      </div>
    </div>
  );
}
