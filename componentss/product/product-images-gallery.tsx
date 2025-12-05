// components/product/product-images-gallery.tsx

"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductImagesGalleryProps {
  images: string[];
}

export function ProductImagesGallery({ images }: ProductImagesGalleryProps) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3 md:flex-row">
      {/* Thumbnail list */}
      <div className="flex md:flex-col gap-2 md:w-20">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative h-16 w-16 overflow-hidden  rounded-(--radius) border ${
              active === i
                ? "border-[hsl(var(--primary))]"
                : "border-[hsl(var(--border))]"
            }`}
          >
            <Image src={img} alt="" fill className="object-cover" />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative flex-1 aspect-square overflow-hidden  rounded-(--radius) border border-[hsl(var(--border))]">
        <Image
          src={images[active]}
          alt="Product"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
