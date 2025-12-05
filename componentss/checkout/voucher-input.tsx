// components/checkout/voucher-input.tsx

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface VoucherInputProps {
  onApply: (code: string) => void;
  onOpenList?: () => void;
}

export function VoucherInput({ onApply, onOpenList }: VoucherInputProps) {
  const [code, setCode] = useState("");

  return (
    <div className=" rounded-(--radius) border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 space-y-3">
      <h2 className="text-lg font-semibold">Mã giảm giá</h2>

      <div className="flex gap-2">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Nhập mã voucher..."
          className="flex-1  rounded-(--radius) border border-[hsl(var(--border))] px-3 py-2 text-sm bg-[hsl(var(--card))]"
        />

        <Button
          onClick={() => {
            if (code.trim()) onApply(code);
          }}
          className="whitespace-nowrap"
        >
          Áp dụng
        </Button>
      </div>

      {onOpenList && (
        <Button
          variant="secondary"
          size="sm"
          className="w-full"
          onClick={onOpenList}
        >
          Chọn voucher có sẵn
        </Button>
      )}
    </div>
  );
}
