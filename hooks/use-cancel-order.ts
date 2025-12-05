"use client";

import { cancelOrder } from "@/lib/services/orders";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function useCancelOrder() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function cancel(orderId: string) {
    try {
      setLoading(true);
      await cancelOrder(orderId);

      toast({
        title: "Đã hủy đơn hàng",
        description: `Đơn hàng #${orderId.slice(-6).toUpperCase()} đã bị hủy.`,
      });
      return true;
    } catch {
      toast({
        title: "Lỗi",
        description: "Không thể hủy đơn hàng.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  }

  return { cancel, loading };
}
