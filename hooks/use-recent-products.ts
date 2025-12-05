// d:/nnn/qlch/lib/services/products.ts
// Service gọi API sản phẩm

export type Product = {
  id: string;
  name: string;
  slug: string;
  thumbnailUrl?: string | null;
  basePrice: number;
  status: string;
  category?: { name: string } | null;
};

export async function getRecentProducts(limit: number = 5): Promise<Product[]> {
  try {
    const res = await fetch(`/api/products?limit=${limit}&sort=desc`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Không thể tải danh sách sản phẩm");

    return await res.json();
  } catch (error) {
    console.error("Lỗi gọi API sản phẩm:", error);
    return [];
  }
}
