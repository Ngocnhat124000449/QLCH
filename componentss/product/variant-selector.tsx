// components/product/variant-selector.tsx

"use client";

import { cn } from "@/lib/utils";

interface VariantSelectorProps {
  label: string;
  options: string[];
  selected?: string;
  onChange?: (value: string) => void;
}

export function VariantSelector({
  label,
  options,
  selected,
  onChange,
}: VariantSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium">{label}</p>

      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isActive = opt === selected;
          return (
            <button
              key={opt}
              onClick={() => onChange?.(opt)}
              className={cn(
                "rounded-(--radius) border px-3 py-1.5 text-sm shadow-sm transition",
                "border-[hsl(var(--border))] hover:bg-[hsl(var(--secondary))]",
                isActive &&
                  "border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.1)]"
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
