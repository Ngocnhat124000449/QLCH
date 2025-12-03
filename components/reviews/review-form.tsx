// components/reviews/review-form.tsx
// Component: Form gửi đánh giá sản phẩm

"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ReviewFormProps {
  onSubmit?: (data: { rating: number; comment: string }) => void;
}

export function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    onSubmit?.({ rating, comment });
    setRating(0);
    setComment("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 rounded-(--radius) border border-[hsl(var(--border))] p-4 shadow-sm"
    >
      <h3 className="mb-3 text-base font-semibold">Viết đánh giá của bạn</h3>

      {/* Rating chọn sao */}
      <div className="mb-3 flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <button
            key={i}
            type="button"
            onClick={() => setRating(i)}
            className="transition hover:scale-110"
          >
            <Star
              className={`h-6 w-6 ${
                i <= rating
                  ? "fill-yellow-400 stroke-yellow-500"
                  : "stroke-[hsl(var(--muted-foreground))]"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Comment */}
      <Textarea
        placeholder="Hãy chia sẻ trải nghiệm của bạn..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="text-sm"
      />

      {/* Submit */}
      <Button
        type="submit"
        variant="primary"
        className="mt-3 w-full"
        disabled={rating === 0}
      >
        Gửi đánh giá
      </Button>
    </form>
  );
}
