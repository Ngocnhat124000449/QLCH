// components/checkout/checkout-address-selector.tsx

"use client";

import { CheckoutAddressCard } from "./checkout-address-card";
import { CheckoutAddAddressButton } from "./checkout-add-address-button";

interface CheckoutAddressSelectorProps {
  addresses: {
    id: number;
    name: string;
    phone: string;
    address: string;
    isDefault?: boolean;
  }[];
  selectedId?: number;
  onSelect: (id: number) => void;
  onAddNew?: () => void;
}

export function CheckoutAddressSelector({
  addresses,
  selectedId,
  onSelect,
  onAddNew,
}: CheckoutAddressSelectorProps) {
  return (
    <div className="rounded-(--radius) border border-[hsl(var(--border))] p-4 space-y-4 bg-[hsl(var(--card))]">

      <h2 className="text-lg font-semibold">Địa chỉ giao hàng</h2>

      <div className="grid gap-3">
        {addresses.map((addr) => (
          <CheckoutAddressCard
            key={addr.id}
            {...addr}
            selected={selectedId === addr.id}
            onSelect={() => onSelect(addr.id)}
          />
        ))}
      </div>

      <CheckoutAddAddressButton onClick={onAddNew} />
    </div>
  );
}
