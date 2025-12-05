// components/order/order-status-badge.tsx

import { cn } from "@/lib/utils";

interface OrderStatusBadgeProps {
  status: string;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const styles: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
    processing: "bg-blue-100 text-blue-700 border-blue-300",
    shipping: "bg-purple-100 text-purple-700 border-purple-300",
    completed: "bg-green-100 text-green-700 border-green-300",
    cancelled: "bg-red-100 text-red-700 border-red-300",
  };

  return (
    <span
      className={cn(
        "inline-block  rounded-(--radius) border px-3 py-1 text-xs font-medium",
        styles[status] || "bg-gray-100 text-gray-700"
      )}
    >
      {status}
    </span>
  );
}
