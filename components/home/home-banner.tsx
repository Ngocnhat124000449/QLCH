// components/home/home-banner.tsx
// Banner chính dạng slide cho trang Home

"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HomeBannerProps {
  images: string[];
}

export function HomeBanner({ images }: HomeBannerProps) {
  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));

  const next = () =>
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="relative mb-10 overflow-hidden  rounded-(--radius)">
      {/* Slide */}
      <div className="relative aspect-16/6 w-full">
        <Image
          src={images[index]}
          alt="banner"
          fill
          className="object-cover transition-all"
        />
      </div>

      {/* Nút điều hướng */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
