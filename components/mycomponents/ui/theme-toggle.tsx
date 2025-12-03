// components/ui/theme-toggle.tsx
// Component: Nút chuyển Light/Dark sử dụng class .dark trên <html>

"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "./button";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const html = document.documentElement;
    const current = html.classList.contains("dark");
    setIsDark(current);
  }, []);

  const toggleTheme = () => {
    if (typeof document === "undefined") return;
    const html = document.documentElement;
    const next = !isDark;
    setIsDark(next);
    html.classList.toggle("dark", next);
  };

  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      onClick={toggleTheme}
      aria-label="Chuyển chế độ sáng/tối"
    >
      <span className="relative flex items-center justify-center">
        <Sun
          className={`h-4 w-4 transition-transform duration-200 ${
            isDark ? "scale-0 -rotate-90" : "scale-100 rotate-0"
          }`}
        />
        <Moon
          className={`absolute h-4 w-4 transition-transform duration-200 ${
            isDark ? "scale-100 rotate-0" : "scale-0 rotate-90"
          }`}
        />
      </span>
    </Button>
  );
}
