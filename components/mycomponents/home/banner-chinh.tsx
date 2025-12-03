'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Gift, BookOpen, GraduationCap, Repeat } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DanhMucNoi } from '@/components/mycomponents/home/danh-muc-noi';

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

type BannerChinhProps = {
  categories: Category[];
  products: Product[];
};

export function BannerChinh({ categories, products }: BannerChinhProps) {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  /* --------------------------- */
  /*  HOVER LOGIC                */
  /* --------------------------- */
  const handleMouseEnterCategory = (category: Category) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveCategory(category);
  };

  const handleMouseLeaveContainer = () => {
    timerRef.current = setTimeout(() => {
      setActiveCategory(null);
    }, 120);
  };

  const handlePopoverMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  /* --------------------------- */
  /*  BANNER IMAGES              */
  /* --------------------------- */
  const mainBanner = 'https://picsum.photos/seed/main-banner/800/400';
  const smallBanner1 = 'https://picsum.photos/seed/small-banner-1/260/120';
  const smallBanner2 = 'https://picsum.photos/seed/small-banner-2/260/120';
  const smallBanner3 = 'https://picsum.photos/seed/small-banner-3/260/120';

  return (
    <div
      className="relative grid grid-cols-1 lg:grid-cols-12 gap-4"
      onMouseLeave={handleMouseLeaveContainer}
    >
      {/* --------------------------------------- */}
      {/*  DANH MỤC BÊN TRÁI                     */}
      {/* --------------------------------------- */}
      <Card className="col-span-1 lg:col-span-2 hidden lg:block">
        <nav>
          <ul>
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <li
                  key={category.id}
                  onMouseEnter={() => handleMouseEnterCategory(category)}
                >
                  <Link
                    href={`/categories/${category.slug}`}
                    className="flex items-center justify-between p-2.5 text-sm hover:bg-accent hover:text-accent-foreground rounded-md"
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-red-500" />
                      {category.name}
                    </span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </Card>

      {/* --------------------------------------- */}
      {/*  BANNER CHÍNH + NHỎ                    */}
      {/* --------------------------------------- */}
      <div className="col-span-1 lg:col-span-7">
        <div className="flex flex-col gap-4">
          <div className="relative w-full aspect-w-2 aspect-h-1 rounded-lg overflow-hidden">
            <Image
              src={mainBanner}
              alt="Main Banner"
              fill
              className="object-cover"
            />
          </div>

          {/* BANNER NHỎ */}
          <div className="hidden md:grid grid-cols-3 gap-4">
            {[smallBanner1, smallBanner2, smallBanner3].map((src, i) => (
              <Link key={i} href="#" className="block">
                <Image
                  src={src}
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

      {/* --------------------------------------- */}
      {/*  KHỐI ĐĂNG NHẬP + ƯU ĐÃI               */}
      {/* --------------------------------------- */}
      <div className="col-span-1 lg:col-span-3 flex flex-col gap-4">
        {/* THẺ LOGIN */}
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

        {/* THẺ ƯU ĐÃI */}
        <Card className="p-4 flex-grow hidden md:block">
          <ul className="space-y-3">
            <li>
              <Link
                href="#"
                className="flex items-center gap-2 text-sm hover:text-primary"
              >
                <GraduationCap className="w-5 h-5 text-red-500" /> Ưu đãi cho giáo dục
              </Link>
            </li>

            <li>
              <Link
                href="#"
                className="flex items-center gap-2 text-sm hover:text-primary"
              >
                <BookOpen className="w-5 h-5 text-red-500" /> Tựu trường - Máy mới
              </Link>
            </li>

            <li>
              <Link
                href="#"
                className="flex items-center gap-2 text-sm hover:text-primary"
              >
                <GraduationCap className="w-5 h-5 text-red-500" /> Laptop giảm đến 500K
              </Link>
            </li>
          </ul>

          <div className="my-3 border-t border-dashed" />

          <h4 className="text-sm font-semibold mb-2">Thu cũ lên đời giá hời</h4>

          <ul className="space-y-3">
            <li>
              <Link href="#" className="flex items-center gap-2 text-sm hover:text-primary">
                <Repeat className="w-5 h-5 text-red-500" /> iPhone trợ giá 5 triệu
              </Link>
            </li>

            <li>
              <Link href="#" className="flex items-center gap-2 text-sm hover:text-primary">
                <Repeat className="w-5 h-5 text-red-500" /> Samsung trợ giá 4 triệu
              </Link>
            </li>

            <li>
              <Link href="#" className="flex items-center gap-2 text-sm hover:text-primary">
                <Repeat className="w-5 h-5 text-red-500" /> Laptop trợ giá 4 triệu
              </Link>
            </li>
          </ul>
        </Card>
      </div>

      {/* --------------------------------------- */}
      {/*  DANH MỤC NỔI (POPOVER)                */}
      {/* --------------------------------------- */}
      {activeCategory && (
        <DanhMucNoi
          category={activeCategory}
          products={products.filter(
            (p) => p.category?.name === activeCategory.name
          )}
          onMouseEnter={handlePopoverMouseEnter}
        />
      )}
    </div>
  );
}
