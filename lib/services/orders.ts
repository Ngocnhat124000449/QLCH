"use client";

export type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPING"
  | "COMPLETED"
  | "CANCELLED";

export type Order = {
  id: string;
  user: {
    email: string;
    avatarUrl: string; fullName: string 
};
  createdAt: string;
  status: OrderStatus;
  total: number;
};

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  const res = await fetch(`/api/admin/orders/${orderId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    throw new Error("Không thể cập nhật trạng thái đơn hàng");
  }

  return res.json();
}

export async function cancelOrder(orderId: string) {
  const res = await fetch(`/api/orders/${orderId}/cancel`, {
    method: "PUT",
  });

  if (!res.ok) {
    throw new Error("Không thể hủy đơn hàng");
  }

  return res.json();
}
export async function updateProduct(id: string, data: any) {
  const res = await fetch(`/api/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Không thể cập nhật sản phẩm");
  }

  return res.json();
}
