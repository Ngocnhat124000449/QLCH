// lib/services/cart.ts
export async function addToCart(productId: string, quantity: number = 1) {
  const res = await fetch("/api/cart", {
    method: "POST",
    body: JSON.stringify({ productId, quantity }),
  });

  if (!res.ok) throw new Error("Không thêm được sản phẩm vào giỏ");

  return res.json();
}
