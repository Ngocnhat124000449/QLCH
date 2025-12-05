// components/product/product-images.tsx

"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductImagesProps {
  images: string[];
}

export function ProductImages({ images }: ProductImagesProps) {
  const [active, setActive] = useState(images[0]);

  return (
    <div className="flex flex-col gap-3">
      {/* Ảnh lớn */}
      <div className="relative aspect-square w-full overflow-hidden rounded-(--radius) bg-[hsl(var(--secondary))]">
        <Image
          src={active}
          alt="Product image"
          fill
          className="object-cover"
        />
      </div>

      {/* Thumbnail */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((img) => (
          <button
            key={img}
            onClick={() => setActive(img)}
            className={cn(
              "relative aspect-square overflow-hidden rounded-(--radius) border border-[hsl(var(--border))]",
              active === img && "ring-2 ring-[hsl(var(--primary))]"
            )}
          >
            <Image src={img} alt="" fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
