"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { type OrderStatus } from "@/lib/services/orders";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

type OrderStatusDropdownProps = {
  currentStatus: OrderStatus;
  orderId: string;
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
};

const statusVariants: Record<OrderStatus, "default" | "secondary" | "destructive" | "outline"> = {
  PENDING: "secondary",
  PROCESSING: "outline",
  SHIPPING: "default",
  COMPLETED: "default",
  CANCELLED: "destructive",
};

const statusText: Record<OrderStatus, string> = {
  PENDING: "Chờ xử lý",
  PROCESSING: "Đang xử lý",
  SHIPPING: "Đang giao",
  COMPLETED: "Hoàn thành",
  CANCELLED: "Đã hủy",
};

const allStatuses: OrderStatus[] = [
  "PENDING",
  "PROCESSING",
  "SHIPPING",
  "COMPLETED",
  "CANCELLED",
];

export function OrderStatusDropdown({
  currentStatus,
  orderId,
  onStatusChange,
}: OrderStatusDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <Badge
            variant={statusVariants[currentStatus]}
            className={cn(
              "cursor-pointer hover:opacity-80 transition-opacity",
              currentStatus === "COMPLETED" &&
                "bg-green-600 text-white border-transparent hover:bg-green-600/80",
              currentStatus === "SHIPPING" &&
                "bg-blue-500 text-white border-transparent hover:bg-blue-500/80",
              currentStatus === "PROCESSING" &&
                "text-yellow-800 bg-yellow-100 border-yellow-300"
            )}
          >
            {statusText[currentStatus]}
          </Badge>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {allStatuses.map((status) => (
          <DropdownMenuItem
            key={status}
            onSelect={() => onStatusChange(orderId, status)}
          >
            <div className="flex items-center justify-between w-full">
              <span>{statusText[status]}</span>
              {currentStatus === status && <Check className="h-4 w-4 ml-2" />}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
