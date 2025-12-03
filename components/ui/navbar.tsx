// components/ui/navbar.tsx
// Component: Thanh điều hướng chính (logo, menu, tìm kiếm, icon giỏ hàng / yêu thích / tài khoản)

"use client";

import Link from "next/link";
import { ShoppingCart, Heart, User } from "lucide-react";
import { SearchBar } from "./search-bar";
import { ThemeToggle } from "./theme-toggle";
import { useRouter, useSearchParams } from "next/navigation";

export function Navbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  const handleSearch = (value: string) => {
    const query = value ? `?q=${encodeURIComponent(value)}` : "";
    router.push(`/products${query}`);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[hsl(var(--border))] bg-[hsl(var(--background))]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4">
        {/* Logo + nav left */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] text-sm font-bold">
              Q
            </div>
            <span className="text-sm font-semibold tracking-tight">
              Quantum Store
            </span>
          </Link>

          <nav className="hidden items-center gap-3 text-xs font-medium text-[hsl(var(--muted-foreground))] md:flex">
            <Link href="/products" className="hover:text-[hsl(var(--foreground))]">
              Sản phẩm
            </Link>
            <Link
              href="/categories"
              className="hover:text-[hsl(var(--foreground))]"
            >
              Danh mục
            </Link>
            <Link
              href="/promotions"
              className="hover:text-[hsl(var(--foreground))]"
            >
              Khuyến mãi
            </Link>
          </nav>
        </div>

        {/* Search */}
        <div className="flex flex-1 justify-center">
          <SearchBar defaultValue={q} onSearch={handleSearch} />
        </div>

        {/* Actions right */}
        <div className="flex items-center gap-2">
          <Link
            href="/wishlist"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))]"
          >
            <Heart className="h-4 w-4" />
          </Link>
          <Link
            href="/cart"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))]"
          >
            <ShoppingCart className="h-4 w-4" />
          </Link>
          <Link
            href="/account"
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))] sm:inline-flex"
          >
            <User className="h-4 w-4" />
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
