// components/auth/register-form.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AuthInput } from "./auth-input";
import { AuthFormWrapper } from "./auth-form-wrapper";
import { SocialLoginButtons } from "./social-login-buttons";

export function RegisterForm() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  return (
    <AuthFormWrapper
      title="Đăng ký tài khoản"
      subtitle="Tạo tài khoản mới để tiếp tục mua sắm"
    >
      {/* Full Name */}
      <AuthInput
        label="Họ và tên"
        value={fullname}
        onChange={setFullname}
      />

      {/* Email */}
      <AuthInput
        label="Email"
        value={email}
        onChange={setEmail}
      />

      {/* Phone */}
      <AuthInput
        label="Số điện thoại"
        value={phone}
        onChange={setPhone}
      />

      {/* Password */}
      <AuthInput
        label="Mật khẩu"
        type="password"
        value={password}
        onChange={setPassword}
      />

      {/* Confirm Password */}
      <AuthInput
        label="Nhập lại mật khẩu"
        type="password"
        value={confirm}
        onChange={setConfirm}
      />

      {/* Register Button */}
      <Button className="w-full mt-3">
        Đăng ký
      </Button>

      {/* Link to Login */}
      <div className="text-center mt-4 text-sm">
        Đã có tài khoản?{" "}
        <Link href="/login" className="text-[hsl(var(--primary))] font-medium">
          Đăng nhập
        </Link>
      </div>
      <SocialLoginButtons
  onGoogle={() => {}}
  onFacebook={() => {}}
/>
    </AuthFormWrapper>
  );
}
