// components/checkout/voucher-item.tsx

"use client";

import { Button } from "@/components/ui/button";

interface VoucherItemProps {
  id: number;
  code: string;
  name: string;
  discount: string;
  expiry: string;
  onApply: () => void;
}

export function VoucherItem({
  id,
  code,
  name,
  discount,
  expiry,
  onApply,
}: VoucherItemProps) {
  return (
    <div className=" rounded-(--radius) border border-[hsl(var(--border))] p-4 bg-[hsl(var(--card))] flex justify-between items-start">
      <div>
        <h3 className="font-medium">{name}</h3>

        <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
          Mã: {code}
        </p>

        <p className="text-sm text-green-600 font-medium mt-1">
          Giảm: {discount}
        </p>

        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
          Hạn sử dụng: {expiry}
        </p>
      </div>

      <Button size="sm" onClick={onApply}>
        Dùng
      </Button>
    </div>
  );
}
