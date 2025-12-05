// components/checkout/shipping-method-item.tsx

"use client";

import { cn } from "@/lib/utils";

interface ShippingMethodItemProps {
  id: string;
  name: string;
  fee: number;
  estimate: string; // Ví dụ: "Giao nhanh 2-4 ngày"
  selected?: boolean;
  onSelect: () => void;
}

export function ShippingMethodItem({
  id,
  name,
  fee,
  estimate,
  selected,
  onSelect,
}: ShippingMethodItemProps) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "w-full  rounded-(--radius) border p-4 flex items-center justify-between transition",
        selected
          ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.1)]"
          : "border-[hsl(var(--border))]"
      )}
    >
      <div className="space-y-1 text-left">
        <p className="font-medium">{name}</p>
        <p className="text-xs text-[hsl(var(--muted-foreground))]">{estimate}</p>
      </div>

      <div className="flex items-center gap-4">
        <span className="font-semibold text-[hsl(var(--foreground))]">
          {fee.toLocaleString("vi-VN")}₫
        </span>

        <div
          className={cn(
            "h-4 w-4 rounded-full border transition",
            selected
              ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))]"
              : "border-[hsl(var(--border))]"
          )}
        />
      </div>
    </button>
  );
}
