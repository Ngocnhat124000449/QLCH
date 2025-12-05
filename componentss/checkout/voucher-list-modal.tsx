// components/checkout/voucher-list-modal.tsx

"use client";

import { VoucherList } from "./voucher-list";
import { Button } from "@/components/ui/button";

interface VoucherListModalProps {
  open: boolean;
  vouchers: {
    id: number;
    code: string;
    name: string;
    discount: string;
    expiry: string;
  }[];
  onApply: (code: string) => void;
  onClose: () => void;
}

export function VoucherListModal({
  open,
  vouchers,
  onApply,
  onClose,
}: VoucherListModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="bg-[hsl(var(--card))] w-full max-w-md  rounded-(--radius) p-5 border border-[hsl(var(--border))] space-y-4">

        <h2 className="text-lg font-semibold">Chọn voucher</h2>

        <VoucherList vouchers={vouchers} onApply={onApply} />

        <Button variant="secondary" className="w-full" onClick={onClose}>
          Đóng
        </Button>
      </div>
    </div>
  );
}
