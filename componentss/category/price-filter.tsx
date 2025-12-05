// components/category/price-filter.tsx

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface PriceFilterProps {
  onApply: (range: { min: number; max: number }) => void;
}

export function PriceFilter({ onApply }: PriceFilterProps) {
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  return (
    <div className=" rounded-(--radius) border border-[hsl(var(--border))] p-3">
      <h3 className="mb-2 text-sm font-semibold">Giá</h3>

      <div className="flex gap-2">
        <input
          placeholder="Tối thiểu"
          value={min}
          onChange={(e) => setMin(e.target.value)}
          className="w-full  rounded-(--radius) border border-[hsl(var(--border))] px-2 py-1 text-sm bg-[hsl(var(--card))]"
        />
        <input
          placeholder="Tối đa"
          value={max}
          onChange={(e) => setMax(e.target.value)}
          className="w-full  rounded-(--radius) border border-[hsl(var(--border))] px-2 py-1 text-sm bg-[hsl(var(--card))]"
        />
      </div>

      <Button
        size="sm"
        className="mt-2 w-full"
        onClick={() =>
          onApply({
            min: Number(min) || 0,
            max: Number(max) || 999999999,
          })
        }
      >
        Áp dụng
      </Button>
    </div>
  );
}
