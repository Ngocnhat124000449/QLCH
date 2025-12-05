// lib/mappers/product-mapper.ts
// Mapper chuyển Product (API DTO hoặc Prisma DTO) → ProductUI (dùng cho FE)

import type { ProductDto } from "@/lib/types/product";
import type { ProductUI } from "@/lib/types/product-service";

/**
 * Mapper dùng cho dữ liệu dạng DTO từ Prisma API:
 * - ProductID, Name, Slug, BasePrice, ThumbnailURL, Category{...}
 */
export function mapProductDtoToUI(dto: any): ProductUI {
  return {
    id: Number(dto.ProductID ?? dto.id),
    name: dto.Name ?? dto.name,
    slug: dto.Slug ?? dto.slug,
    basePrice: Number(dto.BasePrice ?? dto.basePrice),
    thumbnailUrl: dto.ThumbnailURL ?? dto.thumbnailUrl ?? null,

    category: dto.Category
      ? {
          id: Number(dto.Category.CategoryID ?? dto.Category.id),
          name: dto.Category.CategoryName ?? dto.Category.name,
          slug: dto.Category.Slug ?? dto.Category.slug,
        }
      : null,
  };
}

/**
 * Mapper dùng cho Product lấy từ FE API (services/products.ts)
 */
export function mapProductToUI(p: Product): ProductUI {
  return {
    id: Number(p.id),
    name: p.name,
    slug: p.slug,
    basePrice: p.basePrice,
    thumbnailUrl: p.thumbnailUrl ?? null,

    category: p.category
      ? {
          id: Number(p.category.id), // Quan trọng — tránh lỗi category thiếu id
          name: p.category.name,
          slug: p.category.slug,
        }
      : null,
  };
}
