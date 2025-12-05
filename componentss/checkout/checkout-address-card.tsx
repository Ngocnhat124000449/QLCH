// components/checkout/checkout-address-card.tsx

"use client";

import { cn } from "@/lib/utils";

interface CheckoutAddressCardProps {
  id: number;
  name: string;
  phone: string;
  address: string;
  selected?: boolean;
  onSelect: () => void;
}

export function CheckoutAddressCard({
  id,
  name,
  phone,
  address,
  selected,
  onSelect,
}: CheckoutAddressCardProps) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "w-full text-left  rounded-(--radius) border p-4 transition",
        selected
          ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.1)]"
          : "border-[hsl(var(--border))]"
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{name}</h3>
        <div
          className={cn(
            "h-4 w-4 rounded-full border",
            selected
              ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))]"
              : "border-[hsl(var(--border))] bg-transparent"
          )}
        />
      </div>

      <p className="text-sm text-[hsl(var(--muted-foreground))]">{phone}</p>
      <p className="mt-1 text-sm">{address}</p>
    </button>
  );
}
