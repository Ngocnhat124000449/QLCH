"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { ProductCard } from "./product-card";

import type { CategoryUI } from "@/lib/types/category-service";
import type { ProductUI } from "@/lib/types/product-service";

type CategoryPopoverProps = {
  category: CategoryUI;
  products: ProductUI[];
  onMouseEnter?: () => void;
  className?: string;
};

export function CategoryPopover({
  category,
  products,
  onMouseEnter,
  className
}: CategoryPopoverProps) {

  return (
    <Card
      className={`bg-background shadow-xl border p-6 grid grid-cols-4 gap-4 ${className}`}
      onMouseEnter={onMouseEnter}
    >
      {/* LEFT: CATEGORY INFO */}
      <div className="col-span-1">
        <h3 className="text-lg font-semibold">{category.name}</h3>

        <Link
          href={`/categories/${category.slug}`}
          className="flex items-center gap-1 text-sm text-primary mt-2 hover:underline"
        >
          Xem tất cả <ChevronRight size={16} />
        </Link>
      </div>

      {/* RIGHT: PRODUCT LIST */}
      <div className="col-span-3 grid grid-cols-3 gap-4">
        {products.slice(0, 8).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            variant="compact"
          />
        ))}
      </div>
    </Card>
  );
}
