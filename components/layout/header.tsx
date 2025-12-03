// components/layout/header.tsx
// Component: Thanh điều hướng chính của website

"use client";

import Link from "next/link";
import { Container } from "./container";
import { SearchBar } from "@/components/ui/search-bar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ShoppingCart, User, Heart } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export function Header() {
  const router = useRouter();
  const params = useSearchParams();
  const q = params.get("q") || "";

  const onSearch = (value: string) => {
    const query = value ? `?q=${encodeURIComponent(value)}` : "";
    router.push(`/products${query}`);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[hsl(var(--border))] bg-[hsl(var(--background))]/90 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] text-base font-bold">
            Q
          </div>
          <span className="text-sm font-semibold tracking-tight">
            Quantum Store
          </span>
        </Link>

        {/* Search */}
        <div className="hidden flex-1 justify-center md:flex">
          <SearchBar defaultValue={q} onSearch={onSearch} />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/wishlist"
            className="rounded-full border border-[hsl(var(--border))] p-2 hover:bg-[hsl(var(--secondary))]"
          >
            <Heart className="h-4 w-4" />
          </Link>
          <Link
            href="/cart"
            className="rounded-full border border-[hsl(var(--border))] p-2 hover:bg-[hsl(var(--secondary))]"
          >
            <ShoppingCart className="h-4 w-4" />
          </Link>
          <Link
            href="/account"
            className="rounded-full border border-[hsl(var(--border))] p-2 hover:bg-[hsl(var(--secondary))]"
          >
            <User className="h-4 w-4" />
          </Link>
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}
