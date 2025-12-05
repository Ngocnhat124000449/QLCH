// Đây là kiểu Category dùng cho UI (MegaMenu, Header, Home...)
// Không được nhầm với CategoryDTO từ Prisma.

export interface CategoryUI {
  id: number;
  name: string;
  slug: string;
  icon?: React.ElementType; // Icon có thể có hoặc không
}
