// components/account/address-form.tsx

"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface AddressFormProps {
  initial?: {
    name: string;
    phone: string;
    address: string;
  };
  onSubmit: (data: any) => void;
}

export function AddressForm({ initial, onSubmit }: AddressFormProps) {
  const [name, setName] = useState(initial?.name || "");
  const [phone, setPhone] = useState(initial?.phone || "");
  const [addr, setAddr] = useState(initial?.address || "");

  return (
    <form
      className="space-y-4 rounded-(--radius) border p-4 bg-[hsl(var(--card))]"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ name, phone, address: addr });
      }}
    >
      <h3 className="font-semibold text-lg">Địa chỉ</h3>

      <div className="space-y-1">
        <label className="text-sm">Họ và tên</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded border px-3 py-2"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm">Số điện thoại</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded border px-3 py-2"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm">Địa chỉ cụ thể</label>
        <input
          value={addr}
          onChange={(e) => setAddr(e.target.value)}
          className="w-full rounded border px-3 py-2"
        />
      </div>

      <Button className="w-full">Lưu</Button>
    </form>
  );
}
