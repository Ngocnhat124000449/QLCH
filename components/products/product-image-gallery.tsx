// components/product/product-image-gallery.tsx
// Hiển thị thư viện ảnh sản phẩm + ảnh chính theo phiên bản màu

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/lib/types/product";

interface ProductImageGalleryProps {
  images: ProductImage[];                // danh sách ảnh từ API
  initialVariantName: string;            // màu / phiên bản ban đầu
}

export function ProductImageGallery({
  images,
  initialVariantName,
}: ProductImageGalleryProps) {
  
  // chọn ảnh theo màu → nếu không có thì lấy ảnh đầu tiên
  const [selectedImage, setSelectedImage] = useState<ProductImage>(
    images.find((img) => img.color === initialVariantName) || images[0]
  );

  // nếu phiên bản đổi (ví dụ chọn variant màu khác)
  useEffect(() => {
    const newImage = images.find((img) => img.color === initialVariantName);
    if (newImage) setSelectedImage(newImage);
  }, [initialVariantName, images]);

  return (
    <div className="flex flex-col gap-4">
      
      {/* Ảnh chính */}
      <Card className="overflow-hidden aspect-square relative">
        <Image
          src={selectedImage.imageUrl}
          alt={selectedImage.color || "Product image"}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain transition-opacity duration-300"
          priority
        />
      </Card>

      {/* Thumbnail */}
      <div className="grid grid-cols-5 gap-2">
        {images.map((image) => (
          <button
            key={image.imageId}
            onClick={() => setSelectedImage(image)}
            className={cn(
              "overflow-hidden rounded-md aspect-square relative border-2 transition-colors",
              selectedImage.imageId === image.imageId
                ? "border-primary"
                : "border-transparent hover:border-primary/50"
            )}
          >
            <Image
              src={image.imageUrl}
              alt={`Thumbnail ${image.color || ""}`}
              fill
              sizes="20vw"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
