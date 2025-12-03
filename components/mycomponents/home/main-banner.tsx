'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Gift, BookOpen, GraduationCap, Repeat } from 'lucide-react';
import Autoplay from "embla-carousel-autoplay";

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CategoryPopover } from './category-popover';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

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
  category: { name: string; } | null;
};

type MainBannerProps = {
  categories: Category[];
  products: Product[];
};

export function MainBanner({ categories, products }: MainBannerProps) {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  const handleMouseEnterCategory = (category: Category) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setActiveCategory(category);
  };

  const handleMouseLeaveContainer = () => {
    timerRef.current = setTimeout(() => {
      setActiveCategory(null);
    }, 100); 
  };

  const handlePopoverMouseEnter = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const banners = [
    { src: "https://cellphones.com.vn/media/ltsoft/promotion/690x300_sliding_s24_ultra.png", alt: "Main Banner 1", hint: "promotional banner" },
    { src: "https://cellphones.com.vn/media/ltsoft/promotion/IP15-690-300-max.png", alt: "Main Banner 2", hint: "promotional banner" },
    { src: "https://cellphones.com.vn/media/ltsoft/promotion/macbook_air_m2_690x300.png", alt: "Main Banner 3", hint: "promotional banner" },
  ];

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-4" onMouseLeave={handleMouseLeaveContainer}>
      <Card className="col-span-1 lg:col-span-2 hidden lg:block">
        <nav>
          <ul>
            {categories.map((category) => (
              <li key={category.id} onMouseEnter={() => handleMouseEnterCategory(category)}>
                <Link href={`/categories/${category.slug}`} className="flex items-center justify-between p-2.5 text-sm hover:bg-accent hover:text-accent-foreground rounded-md">
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

      <div className="col-span-1 lg:col-span-7 h-full">
         <Carousel
          plugins={[plugin.current]}
          className="w-full h-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="h-full">
            {banners.map((banner, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <Image src={banner.src} alt={banner.alt} fill className="object-cover" data-ai-hint={banner.hint} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2"/>
        </Carousel>
      </div>

      <div className="col-span-1 lg:col-span-3 flex flex-col gap-4">
        <Card className="p-4">
            <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Image src="https://cellphones.com.vn/smember.png" alt="Smember" width={40} height={40} />
                </div>
                <div>
                    <h3 className="font-semibold">Chào mừng bạn đến với CellphoneS</h3>
                    <p className="text-xs text-muted-foreground">Nhập hội thành viên Smember</p>
                </div>
            </div>
            <div className="flex gap-2">
                <Button className="flex-1" size="sm">Đăng nhập</Button>
                <Button className="flex-1" size="sm" variant="outline">Đăng ký</Button>
            </div>
            <Link href="#" className="mt-3 flex items-center justify-center text-sm text-primary hover:underline">
                <Gift className="w-4 h-4 mr-1" />
                Xem ưu đãi Smember
                <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
        </Card>
        <Card className="p-4 flex-grow hidden md:block">
            <ul className="space-y-3">
                <li><Link href="#" className="flex items-center gap-2 text-sm hover:text-primary"><GraduationCap className="w-5 h-5 text-red-500" /> Ưu đãi cho giáo dục</Link></li>
                <li><Link href="#" className="flex items-center gap-2 text-sm hover:text-primary"><BookOpen className="w-5 h-5 text-red-500" /> Tựu trường lên cấp - Máy mới lên đời</Link></li>
                <li><Link href="#" className="flex items-center gap-2 text-sm hover:text-primary"><GraduationCap className="w-5 h-5 text-red-500" /> Laptop giảm thêm đến 500K</Link></li>
            </ul>
            <div className="my-3 border-t border-dashed"></div>
            <h4 className="text-sm font-semibold mb-2">Thu cũ lên đời giá hời</h4>
             <ul className="space-y-3">
                <li><Link href="#" className="flex items-center gap-2 text-sm hover:text-primary"><Repeat className="w-5 h-5 text-red-500" /> iPhone trợ giá đến 5 triệu</Link></li>
                <li><Link href="#" className="flex items-center gap-2 text-sm hover:text-primary"><Repeat className="w-5 h-5 text-red-500" /> Samsung trợ giá đến 4 triệu</Link></li>
                <li><Link href="#" className="flex items-center gap-2 text-sm hover:text-primary"><Repeat className="w-5 h-5 text-red-500" /> Laptop trợ giá đến 4 triệu</Link></li>
            </ul>
        </Card>
      </div>

      {activeCategory && (
        <CategoryPopover
          category={activeCategory}
          products={products.filter(p => p.category?.name === activeCategory.name)}
          onMouseEnter={handlePopoverMouseEnter}
        />
      )}
    </div>
  );
}
