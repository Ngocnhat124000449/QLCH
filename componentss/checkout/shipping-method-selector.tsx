// components/checkout/shipping-method-selector.tsx

"use client";

import { ShippingMethodItem } from "./shipping-method-item";

interface ShippingMethodSelectorProps {
  methods: {
    id: string;
    name: string;
    fee: number;
    estimate: string;
  }[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

export function ShippingMethodSelector({
  methods,
  selectedId,
  onSelect,
}: ShippingMethodSelectorProps) {
  return (
    <div className=" rounded-(--radius) border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 space-y-4">
      <h2 className="text-lg font-semibold">Phương thức vận chuyển</h2>

      <div className="grid gap-3">
        {methods.map((m) => (
          <ShippingMethodItem
            key={m.id}
            {...m}
            selected={selectedId === m.id}
            onSelect={() => onSelect(m.id)}
          />
        ))}
      </div>
    </div>
  );
}
