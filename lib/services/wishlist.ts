// lib/services/wishlist.ts
export async function toggleWishlist(productId: string) {
  const res = await fetch("/api/wishlist", {
    method: "POST",
    body: JSON.stringify({ productId }),
  });

  if (!res.ok) throw new Error("Không thêm/xóa sản phẩm khỏi wishlist");

  return res.json();
}
