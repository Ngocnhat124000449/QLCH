// components/product/variant-selector.tsx

"use client";

import { cn } from "@/lib/utils";

interface VariantSelectorProps {
  label: string;
  options: { id: number; name: string }[];
  selectedId?: number;
  onSelect: (id: number) => void;
}

export function VariantSelector({
  label,
  options,
  selectedId,
  onSelect,
}: VariantSelectorProps) {
  return (
    <div className="space-y-1">
      <span className="text-sm font-medium">{label}</span>

      <div className="flex flex-wrap gap-2">
        {options.map((op) => (
          <button
            key={op.id}
            onClick={() => onSelect(op.id)}
            className={cn(
              " rounded-(--radius) border px-3 py-1 text-sm",
              selectedId === op.id
                ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.1)]"
                : "border-[hsl(var(--border))]"
            )}
          >
            {op.name}
          </button>
        ))}
      </div>
    </div>
  );
}
