// components/category/category-filter-sidebar.tsx

import { PriceFilter } from "./price-filter";
import { ColorFilter } from "./color-filter";

interface CategoryFilterSidebarProps {
  colors: string[];
  onPriceChange: (range: { min: number; max: number }) => void;
  onColorSelect: (color: string) => void;
}

export function CategoryFilterSidebar({
  colors,
  onPriceChange,
  onColorSelect,
}: CategoryFilterSidebarProps) {
  return (
    <aside className="w-full  rounded-(--radius) border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 md:w-64">
      <div className="space-y-4">
        <PriceFilter onApply={onPriceChange} />
        <ColorFilter colors={colors} onSelect={onColorSelect} />
      </div>
    </aside>
  );
}
