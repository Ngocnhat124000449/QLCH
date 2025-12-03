// components/account/profile-form.tsx

"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ProfileFormProps {
  fullName: string;
  phone?: string;
  address?: string;
  onSave?: (data: any) => void;
}

export function ProfileForm({
  fullName,
  phone,
  address,
  onSave,
}: ProfileFormProps) {
  const [name, setName] = useState(fullName);
  const [phoneNumber, setPhoneNumber] = useState(phone || "");
  const [addr, setAddr] = useState(address || "");

  return (
    <form
      className="space-y-4  rounded-(--radius) border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSave?.({ name, phoneNumber, address: addr });
      }}
    >
      <h3 className="font-semibold text-lg">Cập nhật thông tin</h3>

      <div className="space-y-1">
        <label className="text-sm">Họ và tên</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full  rounded-(--radius) border px-3 py-2"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm">Số điện thoại</label>
        <input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full rounded-(--radius) border px-3 py-2"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm">Địa chỉ</label>
        <input
          value={addr}
          onChange={(e) => setAddr(e.target.value)}
          className="w-full  rounded-(--radius) border px-3 py-2"
        />
      </div>

      <Button className="w-full">Lưu thay đổi</Button>
    </form>
  );
}
