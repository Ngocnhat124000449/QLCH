// components/checkout/payment-method-selector.tsx

"use client";

import { PaymentMethodItem } from "./payment-method-item";

interface PaymentMethodSelectorProps {
  selectedId?: string;
  onSelect: (id: string) => void;
}

export function PaymentMethodSelector({
  selectedId,
  onSelect,
}: PaymentMethodSelectorProps) {
  const methods = [
    {
      id: "cod",
      label: "Thanh toán khi nhận hàng (COD)",
      icon: "/icons/cod.png", // đặt icon của bạn
    },
    {
      id: "bank",
      label: "Chuyển khoản ngân hàng",
      icon: "/icons/bank.png",
    },
    {
      id: "momo",
      label: "Thanh toán bằng MoMo",
      icon: "/icons/momo.png",
    },
    {
      id: "vnpay",
      label: "Thanh toán qua VNPAY",
      icon: "/icons/vnpay.png",
    },
    {
      id: "zalopay",
      label: "Thanh toán qua ZaloPay",
      icon: "/icons/zalopay.png",
    },
  ];

  return (
    <div className=" rounded-(--radius) border border-[hsl(var(--border))] p-4 bg-[hsl(var(--card))] space-y-4">
      <h2 className="text-lg font-semibold">Phương thức thanh toán</h2>

      <div className="grid gap-3">
        {methods.map((m) => (
          <PaymentMethodItem
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
