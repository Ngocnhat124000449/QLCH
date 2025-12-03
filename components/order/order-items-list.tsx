// components/order/order-items-list.tsx

import { OrderProductItem } from "./order-product-item";

interface OrderItemsListProps {
  items: {
    name: string;
    variant: string;
    price: number;
    quantity: number;
    image: string;
  }[];
}

export function OrderItemsList({ items }: OrderItemsListProps) {
  return (
    <div className=" rounded-(--radius) border border-[hsl(var(--border))] p-4">
      {items.map((item, i) => (
        <OrderProductItem key={i} {...item} />
      ))}
    </div>
  );
}
