// components/checkout/payment-method-item.tsx

"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface PaymentMethodItemProps {
  id: string;
  label: string;
  icon?: string; // icon/logo của momo/vnpay/cod
  selected?: boolean;
  onSelect: () => void;
}

export function PaymentMethodItem({
  id,
  label,
  icon,
  selected,
  onSelect,
}: PaymentMethodItemProps) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "w-full flex items-center justify-between  rounded-(--radius) border p-4 transition",
        selected
          ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.1)]"
          : "border-[hsl(var(--border))]"
      )}
    >
      {/* Label */}
      <div className="flex items-center gap-3">
        {icon && (
          <Image
            src={icon}
            alt={label}
            width={28}
            height={28}
            className="object-contain"
          />
        )}

        <span className="font-medium">{label}</span>
      </div>

      {/* Radio */}
      <div
        className={cn(
          "h-4 w-4 rounded-full border transition",
          selected
            ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))]"
            : "border-[hsl(var(--border))]"
        )}
      />
    </button>
  );
}
