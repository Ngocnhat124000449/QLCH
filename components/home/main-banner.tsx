"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

import { Card } from "@/components/ui/card";
import { CategoryPopover } from "./category-popover";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

/* ----------------------------
   Correct Prisma DTO Types
----------------------------- */

type CategoryDto = {
  CategoryID: number;
  CategoryName: string;
  Slug: string;
  icon: React.ElementType;
};

type ProductDto = {
  ProductID: number;
  Name: string;
  Slug: string;
  BasePrice: number;
  ThumbnailURL?: string | null;
  Category?: {
    CategoryID: number;           // 🔥 thêm ID để map chuẩn UI
    CategoryName: string;
    Slug: string;
  } | null;
};

type MainBannerProps = {
  categories: CategoryDto[];
  products: ProductDto[];
};

/* ----------------------------
   UI Mapping Functions
----------------------------- */

function mapCategoryDtoToUI(cat: CategoryDto) {
  return {
    id: cat.CategoryID,
    name: cat.CategoryName,
    slug: cat.Slug,
    icon: cat.icon
  };
}

function mapProductDtoToUI(p: ProductDto) {
  return {
    id: p.ProductID,
    name: p.Name,
    slug: p.Slug,
    basePrice: p.BasePrice,
    thumbnailUrl: p.ThumbnailURL ?? null,

    // 🔥 SỬA LỖI: CategoryUI yêu cầu có id
    category: p.Category
      ? {
          id: p.Category.CategoryID, // 🔥 THÊM ID → sửa lỗi hoàn toàn
          name: p.Category.CategoryName,
          slug: p.Category.Slug,
        }
      : null
  };
}

/* ----------------------------
        MAIN COMPONENT
----------------------------- */

export function MainBanner({ categories, products }: MainBannerProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryDto | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  const banners = [
    { src: "https://cellphones.com.vn/media/ltsoft/promotion/690x300_sliding_s24_ultra.png", alt: "Main Banner 1" },
    { src: "https://cellphones.com.vn/media/ltsoft/promotion/IP15-690-300-max.png", alt: "Main Banner 2" },
    { src: "https://cellphones.com.vn/media/ltsoft/promotion/macbook_air_m2_690x300.png", alt: "Main Banner 3" },
  ];

  const handleMouseEnterCategory = (category: CategoryDto) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveCategory(category);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => setActiveCategory(null), 120);
  };

  return (
    <div className="relative" onMouseLeave={handleMouseLeave}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

        {/* Sidebar category list */}
        <Card className="col-span-1 lg:col-span-2 hidden lg:block">
          <nav>
            <ul>
              {categories.map((cat) => (
                <li key={cat.CategoryID} onMouseEnter={() => handleMouseEnterCategory(cat)}>
                  <Link
                    href={`/categories/${cat.Slug}`}
                    className="flex items-center justify-between p-2.5 hover:bg-accent rounded-md"
                  >
                    <span className="flex items-center gap-2">
                      <cat.icon className="w-4 h-4 text-red-500" />
                      {cat.CategoryName}
                    </span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Card>

        {/* Main Banner */}
        <div className="col-span-1 lg:col-span-7">
          <Carousel
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {banners.map((banner, i) => (
                <CarouselItem key={i}>
                  <div className="relative w-full h-full rounded-lg overflow-hidden aspect-[2.3/1]">
                    <Image src={banner.src} alt={banner.alt} fill className="object-cover" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>

        {/* Right side cards */}
        <div className="col-span-1 lg:col-span-3 flex flex-col gap-4">
          <Card className="p-4">{/* Block 1 */}</Card>
          <Card className="p-4 hidden md:block">{/* Block 2 */}</Card>
        </div>
      </div>

      {/* Mega menu popover */}
      {activeCategory && (
        <div className="absolute top-0 left-[16.6%] w-[83.4%] z-20 hidden lg:block">
          <CategoryPopover
            category={mapCategoryDtoToUI(activeCategory)}
            products={products
              .filter((p) => p.Category?.CategoryID === activeCategory.CategoryID)
              .map(mapProductDtoToUI)}
          />
        </div>
      )}
    </div>
  );
}
