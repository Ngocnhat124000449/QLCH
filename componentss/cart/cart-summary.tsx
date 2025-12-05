// components/cart/cart-summary.tsx
// Component: Tổng hợp đơn hàng (tổng tiền, mã giảm giá, checkout)

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CartSummaryProps {
  subtotal: number;
  discount?: number;
  shipping?: number;
  onApplyPromo?: (code: string) => void;
  onCheckout?: () => void;
}

import { useState } from "react";

export function CartSummary({
  subtotal,
  discount = 0,
  shipping = 0,
  onApplyPromo,
  onCheckout,
}: CartSummaryProps) {
  const [promo, setPromo] = useState("");

  const total = subtotal - discount + shipping;

  return (
    <div className="w-full rounded-(--radius) border border-[hsl(var(--border))] p-4 shadow-sm">
      <h3 className="mb-3 text-base font-semibold">Tổng quan đơn hàng</h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Tạm tính:</span>
          <span className="font-medium">{subtotal.toLocaleString("vi-VN")}₫</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-[hsl(var(--accent))]">
            <span>Giảm giá:</span>
            <span>-{discount.toLocaleString("vi-VN")}₫</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Phí vận chuyển:</span>
          <span>{shipping === 0 ? "Miễn phí" : `${shipping.toLocaleString("vi-VN")}₫`}</span>
        </div>

        <hr className="my-2 border-[hsl(var(--border))]" />

        <div className="flex justify-between text-base font-semibold">
          <span>Tổng cộng:</span>
          <span>{total.toLocaleString("vi-VN")}₫</span>
        </div>
      </div>

      {/* Mã giảm giá */}
      <div className="mt-4 flex gap-2">
        <Input
          placeholder="Nhập mã giảm giá"
          value={promo}
          onChange={(e) => setPromo(e.target.value)}
          className="flex-1"
        />
        <Button
          variant="primary"
          onClick={() => onApplyPromo?.(promo)}
        >
          Áp dụng
        </Button>
      </div>

      <Button
        variant="primary"
        className="mt-4 w-full"
        onClick={onCheckout}
      >
        Tiến hành thanh toán
      </Button>
    </div>
  );
}
