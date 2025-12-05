// components/reviews/rating-stars-input.tsx

"use client";

import { useState } from "react";
import { Star } from "lucide-react";

interface RatingStarsInputProps {
  value: number;
  onChange: (value: number) => void;
  size?: number;
}

export function RatingStarsInput({
  value,
  onChange,
  size = 24,
}: RatingStarsInputProps) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, index) => {
        const starValue = index + 1;
        const filled = hover >= starValue || (!hover && value >= starValue);

        return (
          <Star
            key={index}
            size={size}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onChange(starValue)}
            className={
              filled
                ? "cursor-pointer text-yellow-500 fill-yellow-500"
                : "cursor-pointer text-[hsl(var(--muted-foreground))]"
            }
          />
        );
      })}
    </div>
  );
}
