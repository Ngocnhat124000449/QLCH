// lib/types/product-service.ts
// -----------------------------------------------------
// Các kiểu dữ liệu chuẩn FE cho sản phẩm
// Không dùng Prisma DTO trực tiếp
// -----------------------------------------------------

// =======================================
// ⭐ 1) ProductUI — Dùng cho ProductCard, Home, Category
// =======================================
export interface ProductUI {
  id: number;                     
  name: string;                   
  slug: string;                   
  basePrice: number;              
  thumbnailUrl: string | null;    

  category?: {
    id: number;
    name: string;
    slug: string;
  } | null;
}


// =======================================
// ⭐ 2) ProductVariant — Màu / Dung lượng / Loại hàng
// Dùng cho chi tiết sản phẩm
// =======================================
export interface ProductVariant {
  variantId: number;
  productId: number;

  variantName: string;      // Ví dụ: "Đen 128GB", "Xanh 256GB"
  color?: string | null;    // Màu sắc (tùy sản phẩm)

  price: number;            // Giá bán theo variant
  stock: number;            // Số lượng còn trong kho
}


// =======================================
// ⭐ 3) ProductImage — Thư viện ảnh sản phẩm
// Dùng cho gallery ở chi tiết sản phẩm
// =======================================
export interface ProductImage {
  imageId: number;
  productId: number;

  imageUrl: string;       // URL ảnh
  color?: string | null;  // Ảnh thuộc variant nào (nếu có)
  isPrimary?: boolean;    // Ảnh đại diện
}


// =======================================
// ⭐ 4) ProductSpecification — Thông số kỹ thuật
// Dùng cho mục “Thông số kỹ thuật”
// =======================================
export interface ProductSpecification {
  id: number;
  productId: number;

  groupName: string;      // Ví dụ: "Màn hình", "Camera", "Pin"
  key: string;            // Ví dụ: "Kích thước", "Độ phân giải"
  value: string;          // Ví dụ: "6.7 inch OLED", "200MP"
}
