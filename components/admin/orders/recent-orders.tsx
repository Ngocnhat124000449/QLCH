"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { type Order } from "@/lib/services/orders";
import { formatDistanceVi } from "@/lib/utils/date";

type RecentOrdersProps = {
  orders: Order[];
};

export function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Đơn hàng gần đây</CardTitle>
        <CardDescription>
          {orders.length} đơn hàng đang chờ xử lý.
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-8">
        {orders.map((order) => (
          <div
            key={order.id}
            className="grid grid-cols-[auto_1fr_auto] items-center gap-4"
          >
            {/* Avatar */}
            <Avatar className="h-9 w-9">
              <AvatarImage
                src={order.user.avatarUrl ?? "/default-avatar.png"}
                alt={order.user.fullName}
              />
              <AvatarFallback>{order.user.fullName.charAt(0)}</AvatarFallback>
            </Avatar>

            {/* User Info */}
            <div className="grid gap-1 min-w-0">
              <p className="truncate text-sm font-medium leading-none">
                {order.user.fullName}
              </p>
              <p className="truncate text-sm text-muted-foreground">
                {order.user.email ?? "Không có email"}
              </p>
            </div>

            {/* Price + Time */}
            <div className="text-right whitespace-nowrap">
              <p className="font-medium">
                {Number(order.total).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceVi(order.createdAt)}
              </p>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {orders.length === 0 && (
          <p className="text-sm text-muted-foreground text-center">
            Không có đơn hàng nào cần xử lý.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
