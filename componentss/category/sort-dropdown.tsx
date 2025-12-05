// components/category/sort-dropdown.tsx

"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface SortDropdownProps {
  onChange: (value: string) => void;
}

export function SortDropdown({ onChange }: SortDropdownProps) {
  const [open, setOpen] = useState(false);

  const options = [
    { label: "Mới nhất", value: "newest" },
    { label: "Giá thấp → cao", value: "price_asc" },
    { label: "Giá cao → thấp", value: "price_desc" },
    { label: "Bán chạy", value: "bestseller" },
  ];

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1  rounded-(--radius) border border-[hsl(var(--border))] px-3 py-2 text-sm"
      >
        Sắp xếp
        <ChevronDown className="h-4 w-4" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40  rounded-(--radius) border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-sm">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className="block w-full px-3 py-2 text-left text-sm hover:bg-[hsl(var(--secondary))]"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
