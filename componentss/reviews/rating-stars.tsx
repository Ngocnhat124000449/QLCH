// components/reviews/rating-stars.tsx

import { Star } from "lucide-react";

interface RatingStarsProps {
  value: number; // 1 → 5
  size?: number;
}

export function RatingStars({ value, size = 16 }: RatingStarsProps) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, index) => {
        const filled = index + 1 <= value;
        return (
          <Star
            key={index}
            size={size}
            className={
              filled
                ? "text-yellow-500 fill-yellow-500"
                : "text-[hsl(var(--muted-foreground))]"
            }
          />
        );
      })}
    </div>
  );
}
