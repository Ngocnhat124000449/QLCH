"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, ChevronRight } from "lucide-react";
import type { ProductUI } from "@/lib/types/product-service";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

type ProductQuickViewProps = {
  product: ProductUI;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

// Mock specs
const mockSpecs = [
  { label: "Màn hình", value: "6.7 inch, Super Retina XDR" },
  { label: "CPU", value: "A18 Bionic" },
  { label: "RAM", value: "8 GB" },
  { label: "Dung lượng", value: "256 GB" },
  { label: "Camera sau", value: "48MP + 12MP + 12MP" },
  { label: "Camera trước", value: "12MP" },
];

// Mock reviews
const mockReviews = [
  {
    author: "Nguyễn Văn A",
    rating: 5,
    comment: "Sản phẩm tuyệt vời, hiệu năng mạnh mẽ.",
    date: "2 ngày trước",
  },
  {
    author: "Trần Thị B",
    rating: 4,
    comment: "Máy dùng mượt, pin trâu.",
    date: "1 tuần trước",
  },
];

export function ProductQuickView({
  product,
  open,
  onOpenChange,
}: ProductQuickViewProps) {
  const averageRating =
    mockReviews.reduce((acc, r) => acc + r.rating, 0) / mockReviews.length;

  const { toast } = useToast();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-1">

          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-8">

            <div className="aspect-square relative bg-muted rounded-lg overflow-hidden">
              {product.thumbnailUrl && (
                <Image
                  src={product.thumbnailUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              )}

              <Badge variant="destructive" className="absolute top-3 left-3">
                GIẢM 15%
              </Badge>
            </div>

            {/* Reviews */}
            <div>
              <h4 className="font-semibold text-lg mb-3">
                Đánh giá của khách hàng
              </h4>

              <div className="space-y-4">
                {mockReviews.map((review, i) => (
                  <div key={i} className="border-l-4 border-primary pl-4">
                    <div className="flex items-center mb-1">
                      {[...Array(5)].map((_, j) => (
                        <Star
                          key={j}
                          className={`w-4 h-4 ${
                            j < review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm italic">"{review.comment}"</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      - {review.author}, {review.date}
                    </p>
                  </div>
                ))}
              </div>

              <Button variant="link" className="text-primary p-0 mt-4">
                Xem tất cả đánh giá
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-2xl font-bold">
                {product.name}
              </DialogTitle>

              {product.category && (
                <p className="text-sm text-muted-foreground">
                  {product.category.name}
                </p>
              )}
            </DialogHeader>

            <div className="flex items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(averageRating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-sm text-muted-foreground">
                ({mockReviews.length} đánh giá)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <p className="text-3xl font-bold text-primary">
                {Number(product.basePrice).toLocaleString("vi-VN")}₫
              </p>
              <p className="line-through text-sm text-muted-foreground">
                {(Number(product.basePrice) * 1.15).toLocaleString("vi-VN")}₫
              </p>
            </div>

            <DialogDescription className="mb-6">
              Mô tả sản phẩm đang cập nhật...
            </DialogDescription>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <Button className="bg-red-600 text-white hover:bg-red-700" size="lg">
                Mua ngay
              </Button>
              <Button variant="outline" size="lg">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Thêm vào giỏ hàng
              </Button>
            </div>

            <Separator className="my-4" />

            <div className="mb-6">
              <h4 className="font-semibold text-lg mb-3">
                Thông số kỹ thuật
              </h4>
              <ul className="space-y-2 text-sm">
                {mockSpecs.map((spec) => (
                  <li
                    key={spec.label}
                    className="flex justify-between bg-muted/50 p-2 rounded-md"
                  >
                    <span className="text-muted-foreground">{spec.label}</span>
                    <span className="font-medium">{spec.value}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator className="my-4" />

            <div>
              <h4 className="font-semibold text-lg mb-4">Đánh giá chi tiết</h4>
              <p className="text-sm">
                Nội dung mô tả chi tiết sẽ được cập nhật khi API cung cấp.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
