// components/home/product-carousel.tsx

"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";

interface ProductCarouselProps {
  products: Array<{
    ProductID: number;
    Name: string;
    BasePrice: number;
    ThumbnailURL: string | null;
  }>;
}

export function ProductCarousel({ products }: ProductCarouselProps) {
  const [start, setStart] = useState(0);
  const show = 4;

  const prev = () =>
    setStart((s) => (s === 0 ? products.length - show : s - 1));

  const next = () =>
    setStart((s) => (s + show >= products.length ? 0 : s + 1));

  const view = products.slice(start, start + show);

  return (
    <div className="relative">
      {/* Nút điều hướng */}
      <button
        onClick={prev}
        className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/20 p-1 text-white"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        onClick={next}
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/20 p-1 text-white"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {view.map((p) => (
          <ProductCard
            key={p.ProductID}
            id={p.ProductID}
            name={p.Name}
            price={Number(p.BasePrice)}
            thumbnail={p.ThumbnailURL || "/placeholder.png"}
          />
        ))}
      </div>
    </div>
  );
}
