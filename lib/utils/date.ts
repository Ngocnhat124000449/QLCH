// lib/utils/date.ts
// ==============================================
// Các hàm format ngày dành cho giao diện Việt Nam
// ==============================================

import { format, formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

// Format dd/MM/yyyy
export function formatVietnamDate(date: string | Date) {
  return format(new Date(date), "dd/MM/yyyy", { locale: vi });
}

// Format thời gian từ hiện tại đến thời điểm: “5 phút trước”, “2 ngày trước”
export function formatDistanceVi(date: string | Date) {
  return formatDistanceToNow(new Date(date), {
    locale: vi,
    addSuffix: true, // thêm “trước”
  });
}
