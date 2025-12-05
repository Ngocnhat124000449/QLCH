"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { CategoryPopover } from "./category-popover";

import type { ProductUI } from "@/lib/types/product-service";
import type { CategoryUI } from "@/lib/types/category-service";

type MegaMenuProps = {
  categories: CategoryUI[];
  products: ProductUI[];   // 🔥 Sửa: dùng ProductUI thay vì Product
  onClose: () => void;
};

export function MegaMenu({ categories, products, onClose }: MegaMenuProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryUI | null>(
    categories[0] ?? null
  );

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnterCategory = (category: CategoryUI) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveCategory(category);
  };

  const handleMouseLeaveContainer = () => {
    timerRef.current = setTimeout(() => {}, 100);
  };

  const handlePopoverMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  return (
    <div
      className="absolute top-full left-0 w-full bg-background shadow-lg border-t z-20 animate-in fade-in-20 slide-in-from-top-5 duration-300"
      onMouseLeave={handleMouseLeaveContainer}
    >
      <div className="container mx-auto grid grid-cols-12">
        
        {/* LEFT MENU */}
        <Card className="col-span-3 rounded-none rounded-bl-lg border-t-0 border-l-0 border-b-0 h-[450px] overflow-y-auto">
          <nav>
            <ul>
              {categories.map((cat) => (
                <li key={cat.id} onMouseEnter={() => handleMouseEnterCategory(cat)}>
                  <Link
                    href={`/categories/${cat.slug}`}
                    onClick={onClose}
                    className={`flex items-center justify-between p-3 text-sm transition-colors
                      ${
                        activeCategory?.id === cat.id
                          ? "bg-primary/10 text-primary font-semibold"
                          : "hover:bg-accent"
                      }`}
                  >
                    <span className="flex items-center gap-3">
                      {cat.icon && <cat.icon className="w-5 h-5" />}
                      {cat.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Card>

        {/* RIGHT PANEL */}
        <div className="col-span-9 h-[450px] overflow-y-auto">
          {activeCategory && (
            <CategoryPopover
              category={activeCategory}
              products={products.filter(
                (p) => p.category?.name === activeCategory.name
              )}
              onMouseEnter={handlePopoverMouseEnter}
              className="shadow-none border-none rounded-br-lg"
            />
          )}
        </div>
      </div>
    </div>
  );
}
