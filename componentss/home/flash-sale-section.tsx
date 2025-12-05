// components/home/flash-sale-section.tsx

"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/product/product-card";

interface FlashSaleProps {
  products: any[];
  endTime: string; // ISO time
}

export function FlashSaleSection({ products, endTime }: FlashSaleProps) {
  const [countdown, setCountdown] = useState("");

  // Cập nhật đếm ngược mỗi giây
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const end = new Date(endTime);
      const diff = end.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown("00:00:00");
        clearInterval(timer);
        return;
      }

      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setCountdown(`${h}:${m}:${s}`);
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <section className="my-10">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xl font-semibold">⏱ Flash Sale</h2>
        <span className="rounded-md bg-[hsl(var(--destructive))] px-3 py-1 text-sm text-white">
          {countdown}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {products.map((p) => (
          <ProductCard
            key={p.ProductID}
            id={p.ProductID}
            name={p.Name}
            price={Number(p.BasePrice)}
            thumbnail={p.ThumbnailURL || "/placeholder.png"}
          />
        ))}
      </div>
    </section>
  );
}
