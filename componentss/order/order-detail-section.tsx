// components/order/order-detail-section.tsx

import { OrderItemsList } from "./order-items-list";
import { OrderSummary } from "./order-summary";
import { OrderStatusBadge } from "./order-status-badge";

interface OrderDetailSectionProps {
  orderId: number;
  createdAt: string;
  status: string;
  items: any[];
  total: number;
}

export function OrderDetailSection({
  orderId,
  createdAt,
  status,
  items,
  total,
}: OrderDetailSectionProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Đơn hàng #{orderId}</h1>
        <OrderStatusBadge status={status} />
      </div>

      <div className="text-sm text-[hsl(var(--muted-foreground))]">
        Ngày đặt: {new Date(createdAt).toLocaleString("vi-VN")}
      </div>

      <OrderItemsList items={items} />

      <OrderSummary total={total} />
    </div>
  );
}
