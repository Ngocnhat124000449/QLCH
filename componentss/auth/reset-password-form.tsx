// components/auth/reset-password-form.tsx

"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AuthInput } from "./auth-input";
import { AuthFormWrapper } from "./auth-form-wrapper";

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // Lấy token từ URL

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const tokenMissing = !token;

  return (
    <AuthFormWrapper
      title="Đặt lại mật khẩu"
      subtitle="Nhập mật khẩu mới để hoàn tất quá trình"
    >
      {/* Nếu thiếu token → báo lỗi */}
      {tokenMissing && (
        <div className="mb-4 text-sm text-red-600">
          Liên kết không hợp lệ hoặc đã hết hạn.
        </div>
      )}

      {/* Nhập mật khẩu */}
      <AuthInput
        label="Mật khẩu mới"
        type="password"
        value={password}
        onChange={setPassword}
      />

      {/* Nhập lại mật khẩu */}
      <AuthInput
        label="Xác nhận mật khẩu"
        type="password"
        value={confirm}
        onChange={setConfirm}
      />

      {/* Nút Submit */}
      <Button className="w-full mt-2" disabled={tokenMissing}>
        Xác nhận đặt lại mật khẩu
      </Button>

      {/* Link quay lại */}
      <div className="text-center mt-4 text-sm">
        Quay lại{" "}
        <Link href="/login" className="text-[hsl(var(--primary))] font-medium">
          Đăng nhập
        </Link>
      </div>
    </AuthFormWrapper>
  );
}
