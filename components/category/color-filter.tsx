// components/category/color-filter.tsx

"use client";

import { cn } from "@/lib/utils";

interface ColorFilterProps {
  colors: string[];
  selected?: string;
  onSelect?: (value: string) => void;
}

export function ColorFilter({
  colors,
  selected,
  onSelect,
}: ColorFilterProps) {
  return (
    <div className=" rounded-(--radius) border border-[hsl(var(--border))] p-3">
      <h3 className="mb-2 text-sm font-semibold">Màu sắc</h3>

      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => onSelect?.(color)}
            className={cn(
              " rounded-(--radius) border px-3 py-1.5 text-xs",
              selected === color
                ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.1)]"
                : "border-[hsl(var(--border))]"
            )}
          >
            {color}
          </button>
        ))}
      </div>
    </div>
  );
}
