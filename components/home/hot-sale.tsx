'use client';

import React, { useEffect, useState } from 'react';
import { Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from './product-card';

import { fetchHotSaleProducts } from '@/lib/services/products';
import { mapProductToUI } from '@/lib/mappers/product-mapper';

// FIX COUNTDOWN — hook trả về dạng array, không phải object
import { useCountdown } from '@/hooks/use-countdown';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import { cn } from '@/lib/utils';

// 💥 QUAN TRỌNG: Dùng ProductUI của PRODUCT-CARD (không dùng product-service)
import type { ProductUI } from './product-card';

type HotSaleProps = {
    onAddToCart: (product: ProductUI) => void;
    onToggleWishlist: (product: ProductUI) => void;
    isProductInWishlist: (productId: number) => boolean;
};

const CountdownBlock = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center">
        <div className="w-10 h-10 bg-white text-red-500 rounded-md flex items-center justify-center text-lg font-bold dark:bg-zinc-700/80 dark:text-white">
            {String(value).padStart(2, '0')}
        </div>
        <span className="text-xs mt-1 text-white/80 dark:text-zinc-400">{label}</span>
    </div>
);

export function HotSale({ onAddToCart, onToggleWishlist, isProductInWishlist }: HotSaleProps) {

    const [products, setProducts] = useState<ProductUI[]>([]);
    const [loading, setLoading] = useState(true);

    const [activeFilter, setActiveFilter] = useState("smartphones");

    const filters = [
        { label: "Điện thoại, Tablet", value: "smartphones" },
        { label: "Phụ kiện, PC", value: "accessories" },
        { label: "Gia dụng, Điện máy", value: "home-appliance" },
    ];

    // ============================
    // FETCH HOT SALE PRODUCTS
    // ============================
    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const data = await fetchHotSaleProducts(activeFilter);

                // MAP về ProductUI chuẩn UI
                const mapped = data.map(mapProductToUI);
                setProducts(mapped);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [activeFilter]);

    // ============================
    // COUNTDOWN FIXED
    // ============================
    const saleEndTime = new Date();
    saleEndTime.setHours(23, 59, 59, 999);

    // ✔ Hook trả array → destructuring array
    const [hours, minutes, seconds] = useCountdown(saleEndTime);

    const plugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

    return (
        <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-xl p-4 md:p-6 shadow-2xl dark:bg-zinc-800/90 dark:bg-none">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                    <Flame className="w-8 h-8 text-white animate-pulse" />
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white uppercase tracking-wider">
                        Hot Sale Cuối Tuần
                    </h2>
                </div>

                <div className="flex items-center gap-2 text-white text-sm">
                    <span>KẾT THÚC TRONG:</span>
                    <div className="flex items-center gap-1.5">
                        <CountdownBlock value={hours} label="Giờ" />
                        <span className="font-bold text-xl">:</span>
                        <CountdownBlock value={minutes} label="Phút" />
                        <span className="font-bold text-xl">:</span>
                        <CountdownBlock value={seconds} label="Giây" />
                    </div>
                </div>
            </div>

            {/* FILTER BUTTONS */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
                {filters.map(f => (
                    <Button
                        key={f.value}
                        variant="secondary"
                        onClick={() => setActiveFilter(f.value)}
                        className={cn(
                            "rounded-full bg-white/20 text-white hover:bg-white/30 border-none",
                            activeFilter === f.value &&
                            "bg-white text-red-500 hover:bg-white"
                        )}
                    >
                        {f.label}
                    </Button>
                ))}
            </div>

            {/* PRODUCT CAROUSEL */}
            <Carousel
                opts={{ align: "start", loop: true }}
                plugins={[plugin.current]}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
                className="relative"
            >
                <CarouselContent className="-ml-4">

                    {loading && (
                        <div className="text-white text-center w-full py-10">Đang tải...</div>
                    )}

                    {!loading && products.length === 0 && (
                        <div className="text-white text-center w-full py-10">
                            Không có sản phẩm Hot Sale
                        </div>
                    )}

                    {!loading && products.map((p) => (
                        <CarouselItem
                            key={p.id}
                            className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4"
                        >
                            <ProductCard
                                product={p}
                                onAddToCart={onAddToCart}
                                onToggleWishlist={onToggleWishlist}
                                isWishlisted={isProductInWishlist(p.id)}
                                className="bg-white/95 dark:bg-zinc-900"
                            />
                        </CarouselItem>
                    ))}

                </CarouselContent>

                <CarouselPrevious className="absolute left-[-1.5rem] top-1/2 -translate-y-1/2" />
                <CarouselNext className="absolute right-[-1.5rem] top-1/2 -translate-y-1/2" />
            </Carousel>
        </div>
    );
}
