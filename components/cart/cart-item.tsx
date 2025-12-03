// components/cart/cart-item.tsx
// Component: Hiển thị từng item trong giỏ hàng

"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface CartItemProps {
  id: number;
  name: string;
  variantName?: string;
  price: number;
  quantity: number;
  image: string;
  onIncrease?: () => void;
  onDecrease?: () => void;
  onRemove?: () => void;
}

export function CartItem({
  id,
  name,
  variantName,
  price,
  quantity,
  image,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) {
  return (
    <div className="flex w-full gap-3 rounded-(--radius) border border-[hsl(var(--border))] p-3">
      {/* Hình ảnh */}
      <div className="relative h-20 w-20 overflow-hidden rounded-(--radius) bg-[hsl(var(--secondary))]">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>

      {/* Thông tin sản phẩm */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <p className="text-sm font-medium text-[hsl(var(--foreground))] line-clamp-2">
            {name}
          </p>

          {variantName && (
            <p className="text-xs text-[hsl(var(--muted-foreground))]">
              Biến thể: {variantName}
            </p>
          )}
        </div>

        <p className="text-sm font-semibold">
          {(price * quantity).toLocaleString("vi-VN")}₫
        </p>
      </div>

      {/* Action: số lượng + xóa */}
      <div className="flex flex-col items-center justify-between">
        <button
          onClick={onRemove}
          className="text-[hsl(var(--destructive))] hover:text-[hsl(var(--destructive-foreground))]"
        >
          <Trash2 className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2 rounded-(--radius) border border-[hsl(var(--border))] px-2 py-1">
          <button
            onClick={onDecrease}
            className="text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))]"
          >
            <Minus className="h-4 w-4" />
          </button>

          <span className="w-5 text-center">{quantity}</span>

          <button
            onClick={onIncrease}
            className="text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))]"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
