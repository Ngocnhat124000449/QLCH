// lib/services/wishlist-service.ts

export async function getWishlist() {
  const res = await fetch("/api/wishlist", { cache: "no-store" });
  return res.json();
}

export async function addToWishlist(productId: string) {
  const res = await fetch("/api/wishlist", {
    method: "POST",
    body: JSON.stringify({ productId }),
  });
  return res.json();
}

export async function removeFromWishlist(productId: string) {
  const res = await fetch(`/api/wishlist`, {
    method: "DELETE",
    body: JSON.stringify({ productId }),
  });
  return res.json();
}

export async function clearWishlist() {
  return fetch("/api/wishlist/all", {
    method: "DELETE",
  });
}
