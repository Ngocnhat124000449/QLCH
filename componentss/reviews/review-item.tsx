// components/reviews/review-item.tsx
// Component: Hiển thị một đánh giá của người dùng

import { Star } from "lucide-react";
import Image from "next/image";

interface ReviewItemProps {
  userName: string;
  avatar?: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

export function ReviewItem({
  userName,
  avatar,
  rating,
  comment,
  createdAt,
}: ReviewItemProps) {
  return (
    <div className="flex gap-3 rounded-(--radius) border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3 shadow-sm">
      {/* Avatar */}
      <div className="relative h-10 w-10 overflow-hidden rounded-full bg-[hsl(var(--secondary))]">
        <Image
          src={avatar || "/default-avatar.png"}
          alt={userName}
          fill
          className="object-cover"
        />
      </div>

      {/* Nội dung đánh giá */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between">
          <p className="font-medium text-sm">{userName}</p>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            {createdAt}
          </p>
        </div>

        {/* Rating */}
        <div className="mt-1 flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i <= rating
                  ? "fill-yellow-400 stroke-yellow-500"
                  : "stroke-[hsl(var(--muted-foreground))]"
              }`}
            />
          ))}
        </div>

        {/* Comment */}
        {comment && (
          <p className="mt-2 text-sm text-[hsl(var(--foreground))]">{comment}</p>
        )}
      </div>
    </div>
  );
}
