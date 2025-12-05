// lib/services/products.ts
// ----------------------------------------------------
// SERVICE GIAO TIẾP API SẢN PHẨM (CLIENT SIDE)
// Chuẩn FE: ProductUI, ProductVariant, ProductImage
// ----------------------------------------------------

import type {
  ProductUI,
  ProductVariant,
  ProductImage,
  ProductSpecification,
} from "@/lib/types/product-service";

import { mapProductDtoToUI } from "@/lib/mappers/product-mapper";


// ----------------------------------------------------
// 🔥 1) Hot Sale Products
// ----------------------------------------------------
export async function fetchHotSaleProducts(filter: string): Promise<ProductUI[]> {
  const res = await fetch(`/api/products/hot-sale?filter=${filter}`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  const data = await res.json();
  return data.items.map((p: any) => mapProductDtoToUI(p));
}


// ----------------------------------------------------
// 🔥 2) Lấy sản phẩm theo category
// ----------------------------------------------------
export async function fetchProductsByCategory(
  categorySlug: string,
  limit: number = 12
): Promise<ProductUI[]> {
  const res = await fetch(
    `/api/products?category=${categorySlug}&limit=${limit}`,
    { cache: "no-store" }
  );

  if (!res.ok) return [];

  const data = await res.json();
  return data.items.map((p: any) => mapProductDtoToUI(p));
}


// ----------------------------------------------------
// 🔥 3) Lấy toàn bộ sản phẩm (Admin / FE Section)
// ----------------------------------------------------
export async function fetchAllProducts(): Promise<ProductUI[]> {
  const res = await fetch(`/api/products`, { cache: "no-store" });

  if (!res.ok) return [];

  const data = await res.json();
  return data.items.map((p: any) => mapProductDtoToUI(p));
}


// ----------------------------------------------------
// 🔥 4) Lấy sản phẩm theo slug (trang chi tiết)
// ----------------------------------------------------
export async function fetchProductBySlug(slug: string): Promise<ProductUI | null> {
  const res = await fetch(`/api/products/${slug}`, { cache: "no-store" });

  if (!res.ok) return null;

  const data = await res.json();
  return mapProductDtoToUI(data);
}


// ----------------------------------------------------
// 🔥 5) Lấy danh sách phiên bản (màu, dung lượng…)
// ----------------------------------------------------
export async function fetchProductVariants(
  productId: number
): Promise<ProductVariant[]> {
  const res = await fetch(`/api/products/${productId}/variants`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  return await res.json();
}


// ----------------------------------------------------
// 🔥 6) Lấy danh sách ảnh sản phẩm
// ----------------------------------------------------
export async function fetchProductImages(
  productId: number
): Promise<ProductImage[]> {
  const res = await fetch(`/api/products/${productId}/images`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  return await res.json();
}


// ----------------------------------------------------
// 🔥 7) Lấy thông số kỹ thuật
// ----------------------------------------------------
export async function fetchProductSpecifications(
  productId: number
): Promise<ProductSpecification[]> {
  const res = await fetch(`/api/products/${productId}/specifications`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  return await res.json();
}


// ----------------------------------------------------
// 🔥 8) ADMIN — Tạo sản phẩm mới
// ----------------------------------------------------
export async function createProduct(data: any) {
  const res = await fetch(`/api/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Không thể tạo sản phẩm");

  return await res.json();
}


// ----------------------------------------------------
// 🔥 9) ADMIN — Cập nhật sản phẩm
// ----------------------------------------------------
export async function updateProduct(productId: number, data: any) {
  const res = await fetch(`/api/products/${productId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Không thể cập nhật sản phẩm");

  return await res.json();
}


// ----------------------------------------------------
// 🔥 10) ADMIN — Xóa sản phẩm
// ----------------------------------------------------
export async function deleteProduct(productId: number) {
  const res = await fetch(`/api/products/${productId}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Không thể xóa sản phẩm");

  return await res.json();
}
// ===============================
// ⭐ 9. Lấy danh sách sản phẩm mới nhất
// ===============================
export async function getRecentProducts(limit: number = 5): Promise<ProductUI[]> {
  const res = await fetch(`/api/products/recent?limit=${limit}`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  const data = await res.json();
  return data.items || [];
}
