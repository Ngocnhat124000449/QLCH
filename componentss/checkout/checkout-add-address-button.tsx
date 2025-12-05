// components/checkout/checkout-add-address-button.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface Props {
  onClick?: () => void;
}

export function CheckoutAddAddressButton({ onClick }: Props) {
  return (
    <Button
      variant="secondary"
      size="sm"
      className="w-full flex items-center gap-2"
      onClick={onClick}
    >
      <Plus className="h-4 w-4" />
      Thêm địa chỉ mới
    </Button>
  );
}
