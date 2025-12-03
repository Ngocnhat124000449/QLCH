// components/order/order-item-card.tsx

import Link from "next/link";
import { OrderStatusBadge } from "./order-status-badge";

interface OrderItemCardProps {
  orderId: number;
  totalAmount: number;
  createdAt: string;
  status: string;
  itemCount: number;
}

export function OrderItemCard({
  orderId,
  totalAmount,
  createdAt,
  status,
  itemCount,
}: OrderItemCardProps) {
  return (
    <Link
      href={`/orders/${orderId}`}
      className="block  rounded-(--radius) border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 hover:shadow-md transition"
    >
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Đơn hàng #{orderId}</h3>
        <OrderStatusBadge status={status} />
      </div>

      <div className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
        Ngày đặt: {new Date(createdAt).toLocaleDateString("vi-VN")}
      </div>

      <div className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
        Số lượng sản phẩm: {itemCount}
      </div>

      <div className="mt-2 font-semibold text-[hsl(var(--foreground))]">
        Tổng tiền: {totalAmount.toLocaleString("vi-VN")}₫
      </div>
    </Link>
  );
}
