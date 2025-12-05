// components/checkout/shipping-estimated-time.tsx

interface ShippingEstimatedTimeProps {
  estimate: string; // có thể là text hoặc ngày đã tính toán
}

export function ShippingEstimatedTime({ estimate }: ShippingEstimatedTimeProps) {
  return (
    <div className=" rounded-(--radius) bg-[hsl(var(--secondary))] px-3 py-2 text-sm text-[hsl(var(--foreground))]">
      ⏱ {estimate}
    </div>
  );
}
