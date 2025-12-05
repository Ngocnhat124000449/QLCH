// components/auth/login-form.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AuthInput } from "./auth-input";
import { AuthFormWrapper } from "./auth-form-wrapper";
import { SocialLoginButtons } from "./social-login-buttons";


export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthFormWrapper
      title="Đăng nhập"
      subtitle="Chào mừng bạn quay trở lại!"
    >
      {/* Email */}
      <AuthInput
        label="Email"
        value={email}
        onChange={setEmail}
      />

      {/* Password */}
      <AuthInput
        label="Mật khẩu"
        type="password"
        value={password}
        onChange={setPassword}
      />

      {/* Login Button */}
      <Button className="w-full mt-2">
        Đăng nhập
      </Button>

      {/* Links */}
      <div className="text-center mt-4 text-sm">
        Chưa có tài khoản?{" "}
        <Link href="/register" className="text-[hsl(var(--primary))] font-medium">
          Đăng ký ngay
        </Link>
      </div>

      <div className="text-center mt-2 text-sm">
        <Link href="/forgot-password" className="text-[hsl(var(--accent))]">
          Quên mật khẩu?
        </Link>
      </div>
      <SocialLoginButtons
  onGoogle={() => {}}
  onFacebook={() => {}}
/>
    </AuthFormWrapper>
    
  );
}
