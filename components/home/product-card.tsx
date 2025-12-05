"use client";

import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

// ----------------------
// UI TYPE CHUẨN
// ----------------------
export type ProductUI = {
  id: number;
  name: string;
  slug: string;
  basePrice: number;
  thumbnailUrl?: string | null;
};

type ProductCardProps = {
  product: ProductUI;
  variant?: "detailed" | "compact" | "default";
  className?: string;

  // 🔥 HotSale cần các props này
  onAddToCart?: (product: ProductUI) => void;
  onToggleWishlist?: (product: ProductUI) => void;
  isWishlisted?: boolean;
};

export function ProductCard({
  product,
  className,
  variant = "detailed",

  // thêm vào Props
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}: ProductCardProps) {
  const { toast } = useToast();

  // nếu HotSale không truyền props, dùng local state
  const [localWishlist, setLocalWishlist] = useState(false);
  const wish = isWishlisted ?? localWishlist;

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();

    if (onToggleWishlist) {
      onToggleWishlist(product);
    } else {
      setLocalWishlist(!localWishlist);
    }
  };

  const handleAdd = () => {
    if (onAddToCart) {
      return onAddToCart(product);
    }

    // fallback UI message
    toast({
      title: "Đã thêm vào giỏ",
      description: `"${product.name}" đã được thêm vào giỏ.`,
    });
  };

  return (
    <Card className={cn("group rounded-lg border shadow-sm hover:shadow-md transition-all p-2", className)}>
      <Link href={`/products/${product.slug}`}>
        
        {/* Ảnh */}
        <div className="aspect-square relative overflow-hidden rounded-md bg-muted">
          {product.thumbnailUrl ? (
            <Image
              src={product.thumbnailUrl}
              alt={product.name}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No image
            </div>
          )}
        </div>

        {/* Tên */}
        <p className="text-sm font-medium mt-2 line-clamp-2">{product.name}</p>

        {/* Giá */}
        <p className="text-base font-semibold text-red-600">
          {product.basePrice.toLocaleString("vi-VN")}₫
        </p>

        {/* Rating + Wishlist */}
        {variant === "detailed" && (
          <div className="flex items-center justify-between mt-2">

            {/* Rating */}
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              4.8
            </div>

            {/* Wishlist */}
            <button
              onClick={handleWishlist}
              className="text-xs flex items-center gap-1 hover:text-red-500"
            >
              <Heart className={cn("w-4 h-4", wish && "fill-red-500 text-red-500")} />
              Yêu thích
            </button>
          </div>
        )}
      </Link>

      {/* Add to cart */}
      <Button size="sm" onClick={handleAdd} className="mt-2 w-full">
        <ShoppingCart className="w-4 h-4 mr-2" />
        Thêm vào giỏ
      </Button>
    </Card>
  );
}
