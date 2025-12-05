"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { CategoryPopover } from "./category-popover";

import type { CategoryUI } from "@/lib/types/category-service";
import type { ProductUI } from "@/lib/types/product";

type HeaderProps = {
  categories: CategoryUI[];
  products: ProductUI[];   // ✅ FIXED
};

export function Header({ categories, products }: HeaderProps) {
  const [openMenu, setOpenMenu] = useState(false);
  const [hoverCategory, setHoverCategory] = useState<CategoryUI | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleEnter = (cat: CategoryUI) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setHoverCategory(cat);
    setOpenMenu(true);
  };

  const handleLeave = () => {
    timerRef.current = setTimeout(() => {
      setOpenMenu(false);
    }, 120);
  };

  return (
    <header className="relative bg-background border-b">
      <nav className="flex items-center gap-6 px-6 h-16">
        <Link href="/" className="text-xl font-bold">
          LOGO
        </Link>

        <div className="relative" onMouseLeave={handleLeave}>
          <button className="px-4 py-2 font-semibold hover:text-primary">
            Danh mục
          </button>

          {/* MegaMenu */}
          {openMenu && hoverCategory && (
            <div className="absolute top-full left-0 w-[900px] z-50">
              <CategoryPopover
                category={hoverCategory}
                products={products.filter(
                  (p) => p.category?.name === hoverCategory.name
                )}
              />
            </div>
          )}

          {/* Hover categories */}
          <div className="absolute bg-white shadow-md mt-2 rounded">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="px-4 py-2 hover:bg-accent cursor-pointer"
                onMouseEnter={() => handleEnter(cat)}
              >
                {cat.name}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
