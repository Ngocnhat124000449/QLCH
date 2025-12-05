// hooks/use-update-order-status.ts
"use client";

import { useState } from "react";
import { updateOrderStatus, type OrderStatus } from "@/lib/services/orders";

export function useUpdateOrderStatus() {
  const [loading, setLoading] = useState(false);

  const change = async (orderId: string, status: OrderStatus) => {
    try {
      setLoading(true);

      const success = await updateOrderStatus(orderId, status);
      return success;
    } catch (error) {
      console.error("Error updating order:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { change, loading };
}
