// components/auth/social-login-buttons.tsx

"use client";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Button } from "@/components/ui/button";

interface SocialLoginButtonsProps {
  onGoogle?: () => void;
  onFacebook?: () => void;
}
 
export function SocialLoginButtons({
  onGoogle,
  onFacebook,
}: SocialLoginButtonsProps) {
  return (
    <div className="space-y-3 mt-4">
      {/* Google Login */}
      <Button
        variant="secondary"
        className="w-full flex items-center gap-3"
        onClick={onGoogle}
      >
        <FcGoogle className="h-5 w-5" />
        <span>Tiếp tục với Google</span>
      </Button>

      {/* Facebook Login */}
      <Button
        variant="secondary"
        className="w-full flex items-center gap-3 bg-[#1877f2]! text-white!"
        onClick={onFacebook}
      >
        <FaFacebook className="h-5 w-5" />
        <span>Tiếp tục với Facebook</span>
      </Button>
    </div>
  );
}
