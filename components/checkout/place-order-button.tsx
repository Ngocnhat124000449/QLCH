// components/checkout/place-order-button.tsx

"use client";

import { Button } from "@/components/ui/button";

interface PlaceOrderButtonProps {
  disabled?: boolean;
  onPlaceOrder: () => void;
}

export function PlaceOrderButton({
  disabled,
  onPlaceOrder,
}: PlaceOrderButtonProps) {
  return (
    <Button
      disabled={disabled}
      className="w-full py-3 text-base font-semibold"
      onClick={onPlaceOrder}
    >
      Đặt hàng ngay
    </Button>
  );
}
