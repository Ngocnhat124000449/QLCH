// components/product/product-detail-tabs.tsx

"use client";

import { useState } from "react";

interface ProductDetailTabsProps {
  description?: string;
  specs: React.ReactNode;
  reviews: React.ReactNode;
}

export function ProductDetailTabs({
  description,
  specs,
  reviews,
}: ProductDetailTabsProps) {
  const [tab, setTab] = useState("description");

  return (
    <div className="mt-8">
      {/* Tabs */}
      <div className="flex border-b border-[hsl(var(--border))]">
        {[
          { key: "description", label: "Mô tả" },
          { key: "specs", label: "Thông số" },
          { key: "reviews", label: "Đánh giá" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 text-sm ${
              tab === t.key
                ? "border-b-2 border-[hsl(var(--primary))] font-medium"
                : "text-[hsl(var(--muted-foreground))]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-4 text-sm">
        {tab === "description" && (
          <p className="whitespace-pre-line">{description}</p>
        )}

        {tab === "specs" && specs}

        {tab === "reviews" && reviews}
      </div>
    </div>
  );
}
