// lib/services/cart-service.ts
// Service gọi API giỏ hàng

export type CartItemPayload = {
  productId: string;
  quantity: number;
};

export async function getCart() {
  const res = await fetch("/api/cart", { cache: "no-store" });
  return res.json();
}

export async function addToCart(payload: CartItemPayload) {
  const res = await fetch("/api/cart", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function updateCart(payload: CartItemPayload) {
  const res = await fetch("/api/cart", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function removeCartItem(itemId: string) {
  const res = await fetch(`/api/cart/item/${itemId}`, {
    method: "DELETE",
  });
  return res.json();
}
