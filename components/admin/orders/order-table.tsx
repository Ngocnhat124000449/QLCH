"use client";

import React, { useState, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { type Order, type OrderStatus } from "@/lib/services/orders";
import { OrderStatusDropdown } from "./order-status-dropdown";
import { formatVietnamDate } from "@/lib/utils/date";
import { useUpdateOrderStatus } from "@/hooks/use-update-order-status";
import { useCancelOrder } from "@/hooks/use-cancel-order";
import { useToast } from "@/hooks/use-toast";

type OrderTableProps = {
  orders: Order[];
};

export function OrderTable({ orders: initialOrders }: OrderTableProps) {
  const [orders, setOrders] = useState(initialOrders);
  const { toast } = useToast();

  const { change: changeStatus } = useUpdateOrderStatus();
  const { cancel: cancelOrder } = useCancelOrder();

  useEffect(() => {
    setOrders(initialOrders);
  }, [initialOrders]);

  const handleStatusChange = async (orderId: string, status: OrderStatus) => {
    const success = await changeStatus(orderId, status);
    if (!success) return;

    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const handleCancel = async (orderId: string) => {
    const success = await cancelOrder(orderId);
    if (!success) return;

    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, status: "CANCELLED" as OrderStatus } : o
      )
    );
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Danh sách đơn hàng</CardTitle>
        <CardDescription>Tổng quan tất cả đơn hàng.</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto">
        <Table className="min-w-[900px]">
          <TableHeader>
            <TableRow>
              <TableHead>Mã đơn</TableHead>
              <TableHead>Khách hàng</TableHead>
              <TableHead>Ngày đặt</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Tổng tiền</TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium text-primary">
                  #{order.id.slice(-6).toUpperCase()}
                </TableCell>

                <TableCell>{order.user.fullName}</TableCell>

                <TableCell>{formatVietnamDate(order.createdAt)}</TableCell>

                <TableCell>
                  <OrderStatusDropdown
                    orderId={order.id}
                    currentStatus={order.status}
                    onStatusChange={handleStatusChange}
                  />
                </TableCell>

                <TableCell className="text-right font-semibold">
                  {Number(order.total).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </TableCell>

                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Hành động</DropdownMenuLabel>

                      <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => handleCancel(order.id)}
                      >
                        Hủy đơn hàng
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </CardContent>
    </Card>
  );
}
