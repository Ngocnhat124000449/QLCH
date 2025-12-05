// lib/services/categories.ts
// Client-side service → gọi API lấy danh mục

export type Category = {
  id: number;
  name: string;
  slug: string;
  imageUrl?: string | null;
};

// -------------------------
// Lấy danh sách danh mục
// -------------------------
export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch("/api/categories", { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Không thể tải danh mục");
  }

  const data = await res.json();

  // API có thể trả: [array] hoặc {items: array}
  const items = Array.isArray(data) ? data : data.items ?? [];

  return items.map((cat: any) => ({
    id: cat.CategoryID,
    name: cat.CategoryName,
    slug: (cat.Slug ?? cat.CategoryName)
      .toLowerCase()
      .replace(/\s+/g, "-"),
    imageUrl: cat.ImageURL ?? null,
  }));
}

// -------------------------
// Lấy 1 danh mục theo ID
// -------------------------
export async function getCategoryById(id: number): Promise<Category> {
  const res = await fetch(`/api/categories/${id}`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Không thể tải danh mục");
  }

  const cat = await res.json();

  return {
    id: cat.CategoryID,
    name: cat.CategoryName,
    slug: (cat.Slug ?? cat.CategoryName)
      .toLowerCase()
      .replace(/\s+/g, "-"),
    imageUrl: cat.ImageURL ?? null,
  };
}
