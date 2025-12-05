// components/reviews/review-list.tsx
// Component: Render danh sách nhiều review

import { ReviewItem } from "./review-item";

interface ReviewListProps {
  reviews: Array<{
    ReviewID: number;
    User: {
      FullName: string;
      AvatarURL?: string;
    };
    Rating: number;
    Comment?: string;
    CreatedAt: string;
  }>;
}

export function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <div className="py-6 text-center text-sm text-[hsl(var(--muted-foreground))]">
        Chưa có đánh giá nào.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {reviews.map((rev) => (
        <ReviewItem
          key={rev.ReviewID}
          userName={rev.User.FullName}
          avatar={rev.User.AvatarURL}
          rating={rev.Rating}
          comment={rev.Comment}
          createdAt={new Date(rev.CreatedAt).toLocaleDateString("vi-VN")}
        />
      ))}
    </div>
  );
}
