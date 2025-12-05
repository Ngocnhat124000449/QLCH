// components/checkout/checkout-layout.tsx

interface CheckoutLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
  step?: number;
}

export function CheckoutLayout({ left, right, step = 2 }: CheckoutLayoutProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left (2/3) */}
      <div className="lg:col-span-2">{left}</div>

      {/* Right (1/3) */}
      <div className="lg:col-span-1">{right}</div>
    </div>
  );
}
