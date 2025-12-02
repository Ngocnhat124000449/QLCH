"use client";

import { useEffect, useState } from "react";

export default function TopBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const text = "🔥 Black Fire-Day 2025 sắp trở lại – Đăng ký ngay để nhận ưu đãi cực lớn! 🔥";

  return (
    <div
      className={
        // Nền dựa trên màu theme
        "relative overflow-hidden w-full " +
        "text-sm font-medium select-none " +
        "py-2 text-center " +
        "transition-all duration-500 ease-out " +
        "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] " +
        (visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3")
      }
    >
      {/* Text chạy ngang */}
      <div className="absolute whitespace-nowrap animate-marquee">
        {text}
      </div>

      {/* Bản sao để chạy nối đuôi nhau */}
      <div className="absolute whitespace-nowrap animate-marquee left-full">
        {text}
      </div>
    </div>
  );
}
