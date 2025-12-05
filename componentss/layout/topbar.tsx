// components/layout/topbar.tsx
// Component: Thanh thông báo chạy trên đầu trang (Free Ship, Khuyến mãi...)

export function Topbar() {
  return (
    <div className="w-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] py-1 overflow-hidden">
      <p className="animate-marquee whitespace-nowrap text-xs font-medium">
        🎉 Giảm giá đến 50% – Miễn phí vận chuyển toàn quốc – Ưu đãi độc quyền tại Quantum Store!
      </p>
    </div>
  );
}
