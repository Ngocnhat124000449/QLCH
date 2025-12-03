// components/product/product-info.tsx

import { PriceTag } from "./price-tag";
import { RatingStars } from "@/components/reviews/rating-stars";

interface ProductInfoProps {
  name: string;
  price: number;
  oldPrice?: number;
  rating?: number;
  sold?: number;
}

export function ProductInfo({
  name,
  price,
  oldPrice,
  rating = 0,
  sold = 0,
}: ProductInfoProps) {
  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold">{name}</h1>

      <div className="flex items-center gap-3">
        <RatingStars value={rating} />
        <span className="text-sm text-[hsl(var(--muted-foreground))]">
          Đã bán {sold}
        </span>
      </div>

      <PriceTag price={price} oldPrice={oldPrice} />
    </div>
  );
}
