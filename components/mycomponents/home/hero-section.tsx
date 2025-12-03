"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  Gift,
  BookOpen,
  GraduationCap,
  Repeat,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CategoryPopover } from "@/components/mycomponents/home/category-popover";

type Category = {
  id: string;
  name: string;
  slug: string;
  icon: React.ElementType;
};

type Product = {
  id: string;
  name: string;
  slug: string;
  thumbnailUrl?: string | null;
  basePrice: number;
  category: { name: string } | null;
};

type HeroSectionProps = {
  categories: Category[];
  products: Product[];
};

export function HeroSection({ categories, products }: HeroSectionProps) {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  // Temporary banner images
  const mainBanner = "https://picsum.photos/seed/main-banner/800/400";
  const smallBanner1 = "https://picsum.photos/seed/small-banner-1/260/120";
  const smallBanner2 = "https://picsum.photos/seed/small-banner-2/260/120";
  const smallBanner3 = "https://picsum.photos/seed/small-banner-3/260/120";

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* LEFT CATEGORY LIST */}
      <Card className="col-span-1 lg:col-span-2 hidden lg:block">
        <nav onMouseLeave={() => setActiveCategory(null)}>
          <ul>
            {categories.map((category) => (
              <li
                key={category.id}
                onMouseEnter={() => setActiveCategory(category)}
              >
                <Link
                  href={`/categories/${category.slug}`}
                  className="flex items-center justify-between p-2.5 text-sm hover:bg-accent hover:text-accent-foreground rounded-md"
                >
                  <span className="flex items-center gap-2">
                    <category.icon className="w-4 h-4 text-red-500" />
                    {category.name}
                  </span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Card>

      {/* MAIN BANNER */}
      <div className="col-span-1 lg:col-span-7">
        <div className="flex flex-col gap-4">
          <div className="relative aspect-[2/1] rounded-lg overflow-hidden">
            <Image
              src={mainBanner}
              alt="Main Banner"
              fill
              className="object-cover"
            />
          </div>

          {/* SMALL BANNERS */}
          <div className="hidden md:grid grid-cols-3 gap-4">
            {[smallBanner1, smallBanner2, smallBanner3].map((banner, i) => (
              <Link href="#" className="block" key={i}>
                <Image
                  src={banner}
                  alt={`Small Banner ${i + 1}`}
                  width={260}
                  height={120}
                  className="rounded-lg w-full"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="col-span-1 lg:col-span-3 flex flex-col gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <Image
                src="https://cellphones.com.vn/smember.png"
                alt="Smember"
                width={40}
                height={40}
              />
            </div>

            <div>
              <h3 className="font-semibold">Chào mừng bạn đến với CellphoneS</h3>
              <p className="text-xs text-muted-foreground">
                Nhập hội thành viên Smember
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1" size="sm">
              Đăng nhập
            </Button>
            <Button className="flex-1" size="sm" variant="outline">
              Đăng ký
            </Button>
          </div>

          <Link
            href="#"
            className="mt-3 flex items-center justify-center text-sm text-primary hover:underline"
          >
            <Gift className="w-4 h-4 mr-1" />
            Xem ưu đãi Smember
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </Card>

        <Card className="p-4 flex-grow hidden md:block">
          <ul className="space-y-3">
            <li>
              <Link
                href="#"
                className="flex items-center gap-2 text-sm hover:text-primary"
              >
                <GraduationCap className="w-5 h-5 text-red-500" />
                Ưu đãi cho giáo dục
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-2 text-sm hover:text-primary"
              >
                <BookOpen className="w-5 h-5 text-red-500" />
                Tựu trường lên cấp - Máy mới lên đời
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-2 text-sm hover:text-primary"
              >
                <GraduationCap className="w-5 h-5 text-red-500" />
                Laptop giảm thêm đến 500K
              </Link>
            </li>
          </ul>

          <div className="my-3 border-t border-dashed"></div>

          <h4 className="text-sm font-semibold mb-2">
            Thu cũ lên đời giá hời
          </h4>

          <ul className="space-y-3">
            <li>
              <Link
                href="#"
                className="flex items-center gap-2 text-sm hover:text-primary"
              >
                <Repeat className="w-5 h-5 text-red-500" />
                iPhone trợ giá đến 5 triệu
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-2 text-sm hover:text-primary"
              >
                <Repeat className="w-5 h-5 text-red-500" />
                Samsung trợ giá đến 4 triệu
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-2 text-sm hover:text-primary"
              >
                <Repeat className="w-5 h-5 text-red-500" />
                Laptop trợ giá đến 4 triệu
              </Link>
            </li>
          </ul>
        </Card>
      </div>

      {/* CATEGORY POPOVER */}
      {activeCategory && (
        <CategoryPopover
          category={activeCategory}
          products={products.filter(
            (p) => p.category?.name === activeCategory.name
          )}
          onMouseEnter={() => setActiveCategory(activeCategory)}
        />
      )}
    </div>
  );
}
