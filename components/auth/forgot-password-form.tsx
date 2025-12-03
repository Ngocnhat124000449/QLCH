// components/auth/forgot-password-form.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AuthInput } from "./auth-input";
import { AuthFormWrapper } from "./auth-form-wrapper";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");

  return (
    <AuthFormWrapper
      title="Quên mật khẩu"
      subtitle="Nhập email của bạn để nhận hướng dẫn đặt lại mật khẩu"
    >
      {/* Email */}
      <AuthInput
        label="Email"
        value={email}
        onChange={setEmail}
      />

      {/* Submit */}
      <Button className="w-full mt-2">
        Gửi yêu cầu
      </Button>

      {/* Back to Login */}
      <div className="text-center mt-4 text-sm">
        Nhớ mật khẩu?{" "}
        <Link href="/login" className="text-[hsl(var(--primary))] font-medium">
          Đăng nhập lại
        </Link>
      </div>
    </AuthFormWrapper>
  );
}
