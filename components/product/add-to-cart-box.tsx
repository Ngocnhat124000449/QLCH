// components/product/add-to-cart-box.tsx

"use client";

import { QuantitySelector } from "./quantity-selector";
import { Button } from "@/components/ui/button";

interface AddToCartBoxProps {
  variantName: string;
  onAdd: () => void;
  quantity: number;
  onQuantityChange: (qty: number) => void;
}

export function AddToCartBox({
  variantName,
  onAdd,
  quantity,
  onQuantityChange,
}: AddToCartBoxProps) {
  return (
    <div className=" rounded-(--radius) border border-[hsl(var(--border))] p-4 shadow-sm space-y-4">
      <div className="space-y-1">
        <span className="text-sm font-medium">Phiên bản</span>
        <p className="text-sm text-[hsl(var(--foreground))]">{variantName}</p>
      </div>

      <QuantitySelector value={quantity} onChange={onQuantityChange} />

      <Button className="w-full" onClick={onAdd}>
        Thêm vào giỏ hàng
      </Button>
    </div>
  );
}
