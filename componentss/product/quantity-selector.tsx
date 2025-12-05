// components/product/quantity-selector.tsx

"use client";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export function QuantitySelector({ value, onChange }: QuantitySelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange(Math.max(1, value - 1))}
        className="h-8 w-8  rounded-(--radius) border"
      >
        -
      </button>

      <span className="w-8 text-center">{value}</span>

      <button
        onClick={() => onChange(value + 1)}
        className="h-8 w-8  rounded-(--radius) border"
      >
        +
      </button>
    </div>
  );
}
