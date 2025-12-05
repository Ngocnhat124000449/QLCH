// lib/services/category-service.ts

export async function fetchCategories() {
  const res = await fetch("/api/categories", {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Không thể tải danh mục");

  return res.json();
}
