// components/account/change-password-form.tsx

"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ChangePasswordFormProps {
  onSubmit?: (data: { oldPass: string; newPass: string }) => void;
}

export function ChangePasswordForm({ onSubmit }: ChangePasswordFormProps) {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");

  return (
    <form
      className="space-y-4  rounded-(--radius) border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (newPass === confirm) {
          onSubmit?.({ oldPass, newPass });
        }
      }}
    >
      <h3 className="text-lg font-semibold">Đổi mật khẩu</h3>

      <div>
        <label className="text-sm">Mật khẩu hiện tại</label>
        <input
          type="password"
          value={oldPass}
          onChange={(e) => setOldPass(e.target.value)}
          className="w-full  rounded-(--radius) border px-3 py-2"
        />
      </div>

      <div>
        <label className="text-sm">Mật khẩu mới</label>
        <input
          type="password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
          className="w-full rounded-(--radius) border px-3 py-2"
        />
      </div>

      <div>
        <label className="text-sm">Nhập lại mật khẩu</label>
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full rounded-(--radius) border px-3 py-2"
        />
      </div>

      <Button className="w-full">Đổi mật khẩu</Button>
    </form>
  );
}
