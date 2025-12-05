// components/ui/search-bar.tsx
// Component: Thanh tìm kiếm dùng ở navbar hoặc trang sản phẩm.

"use client";

import { Input } from "./input";
import { Button } from "./button";
import { Search } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  defaultValue?: string;
  onSearch?: (value: string) => void;
}

export function SearchBar({
  placeholder = "Tìm kiếm sản phẩm...",
  defaultValue = "",
  onSearch,
}: SearchBarProps) {
  const [value, setValue] = useState(defaultValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(value.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md items-center gap-2"
    >
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="h-9 text-sm"
      />
      <Button type="submit" size="sm" variant="primary">
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
}
