// components/checkout/checkout-step-bar.tsx

interface CheckoutStepBarProps {
  step: number; // 1 = cart, 2 = checkout, 3 = success
}

export function CheckoutStepBar({ step }: CheckoutStepBarProps) {
  const steps = [
    { id: 1, label: "Giỏ hàng" },
    { id: 2, label: "Thanh toán" },
    { id: 3, label: "Hoàn tất" },
  ];

  return (
    <div className="flex items-center justify-center gap-6 py-4">
      {steps.map((s, i) => (
        <div key={s.id} className="flex items-center gap-2">
          <div
            className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-semibold border ${
              step >= s.id
                ? "bg-[hsl(var(--primary))] text-white"
                : "bg-[hsl(var(--secondary))] text-[hsl(var(--muted-foreground))]"
            }`}
          >
            {s.id}
          </div>

          <span
            className={`text-sm ${
              step >= s.id ? "font-medium" : "text-[hsl(var(--muted-foreground))]"
            }`}
          >
            {s.label}
          </span>

          {i < steps.length - 1 && (
            <div className="w-10 h-px bg-[hsl(var(--border))]" />
          )}
        </div>
      ))}
    </div>
  );
}
