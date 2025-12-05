// components/product/price-tag.tsx

import { Badge } from "@/components/ui/badge";

interface PriceTagProps {
  price: number;
  oldPrice?: number;
}

export function PriceTag({ price, oldPrice }: PriceTagProps) {
  const discount =
    oldPrice && oldPrice > price
      ? Math.round(((oldPrice - price) / oldPrice) * 100)
      : null;

  return (
    <div className="flex items-center gap-2">
      <span className="text-base font-semibold text-[hsl(var(--foreground))]">
        {price.toLocaleString("vi-VN")}₫
      </span>

      {oldPrice && (
        <span className="text-xs text-[hsl(var(--muted-foreground))] line-through">
          {oldPrice.toLocaleString("vi-VN")}₫
        </span>
      )}

      {discount && (
        <Badge variant="accent" className="text-[10px]">
          -{discount}%
        </Badge>
      )}
    </div>
  );
}
