"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type ProductCardProps = {
  slug: string;
  name: string;
  thumbnailUrl?: string | null;
  basePrice: number;  // 🔥 sửa từ string → number
  categoryName?: string | null;
};

export function ProductCard({
  slug,
  name,
  thumbnailUrl,
  basePrice,
  categoryName,
}: ProductCardProps) {
  return (
    <Card className="group flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
      <Link href={`/products/${slug}`} className="flex flex-1 flex-col">
        <div className="overflow-hidden">
          <div className="aspect-[4/3] relative bg-muted">
            {thumbnailUrl ? (
              <Image
                src={thumbnailUrl}
                alt={name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                No image
              </div>
            )}
          </div>
        </div>

        <div className="p-4 space-y-2 flex-1 flex flex-col">
          {categoryName && (
            <p className="text-xs text-muted-foreground">{categoryName}</p>
          )}

          <p className="line-clamp-2 text-base font-medium text-foreground flex-grow">
            {name}
          </p>

          <p className="text-lg font-bold text-primary">
            {basePrice.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </p>
        </div>
      </Link>

      <div className="px-4 pb-4 mt-auto">
        <Button
          className="w-full"
          variant="default"
          size="sm"
          onClick={() => {
            console.log(`Adding product ${slug} to cart`);
          }}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Thêm vào giỏ
        </Button>
      </div>
    </Card>
  );
}
