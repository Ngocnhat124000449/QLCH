// components/checkout/checkout-add-address-modal.tsx

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; phone: string; address: string }) => void;
}

export function CheckoutAddAddressModal({ open, onClose, onSubmit }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [addr, setAddr] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-[hsl(var(--card))] p-6  rounded-(--radius) w-[90%] max-w-md space-y-4 border border-[hsl(var(--border))]">

        <h2 className="text-lg font-semibold">Thêm địa chỉ mới</h2>

        <div className="space-y-2">
          <div>
            <label className="text-sm">Họ và tên</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded border px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="text-sm">Số điện thoại</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded border px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="text-sm">Địa chỉ cụ thể</label>
            <input
              value={addr}
              onChange={(e) => setAddr(e.target.value)}
              className="w-full rounded border px-3 py-2 mt-1"
            />
          </div>
        </div>

        <div className="flex gap-3 justify-end pt-3">
          <Button variant="secondary" onClick={onClose}>
            Hủy
          </Button>

          <Button
            onClick={() => {
              onSubmit({ name, phone, address: addr });
              onClose();
            }}
          >
            Lưu
          </Button>
        </div>
      </div>
    </div>
  );
}
