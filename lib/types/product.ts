// lib/types/product.ts
// ===========================
// FE TYPES (UI)
// ===========================

// 1️⃣ ProductUI — dùng cho FE hiển thị
export interface ProductUI {
  id: number;
  name: string;
  slug: string;
  basePrice: number;
  thumbnailUrl: string | null;

  description?: string;

  category?: {
    id: number;
    name: string;
    slug: string;
  } | null;
}

// 2️⃣ ProductVariant — phiên bản
export interface ProductVariant {
  variantId: number;
  variantName: string;
  price: number;
  stock: number;
}

// 3️⃣ ProductImage — ảnh
export interface ProductImage {
  imageId: number;
  imageUrl: string;
  color?: string;
}

// 4️⃣ ProductSpecification — thông số kỹ thuật
export interface ProductSpecification {
  specId: number;
  groupName: string;
  key: string;
  value: string;
}

// ===========================
// SERVER DTO (API → FE)
// Dành cho ProductMapper map sang ProductUI
// ===========================

// ============================
// DTO TỪ API (SERVER → CLIENT)
// Dữ liệu dạng Prisma RAW (UPPERCASE)
// ============================

export interface ProductDto {
  ID: number;
  Name: string;
  Slug: string;
  BasePrice: number;

  ThumbnailURL: string | null;

  ShortDescription?: string | null;
  Description?: string | null;

  Status: "ACTIVE" | "HIDDEN" | "ARCHIVED";

  CategoryID: number;

  Category?: {
    ID: number;
    CategoryName: string;
    Slug: string;
  } | null;

  CreatedAt: string;
  UpdatedAt: string;
}

