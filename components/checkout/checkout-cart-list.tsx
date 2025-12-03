// components/checkout/checkout-cart-list.tsx

import { CheckoutCartItem } from "./checkout-cart-item";

interface CheckoutCartListProps {
  items: {
    name: string;
    variant: string;
    quantity: number;
    price: number;
    image: string;
  }[];
}

export function CheckoutCartList({ items }: CheckoutCartListProps) {
  return (
    <div className=" rounded-(--radius) border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
      <h2 className="text-lg font-semibold mb-4">Sản phẩm</h2>

      <div className="space-y-3">
        {items.map((item, i) => (
          <CheckoutCartItem key={i} {...item} />
        ))}
      </div>
    </div>
  );
}
