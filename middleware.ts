import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/auth";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // API nào cần đăng nhập trước khi vào
  const protectedRoutes = [
    "/api/users/me",
    "/api/cart",
    "/api/orders",
    "/api/wishlist",
  ];

  const adminRoutes = [
    "/api/products/admin",
    "/api/categories/admin",
    "/api/promotions",
  ];

  const path = req.nextUrl.pathname;

  // 1) Kiểm tra login
  if (protectedRoutes.some((p) => path.startsWith(p))) {
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Bạn chưa đăng nhập" },
        { status: 401 }
      );
    }
    const user = verifyToken(token);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Token không hợp lệ" },
        { status: 401 }
      );
    }
  }

  // 2) Kiểm tra quyền admin
  if (adminRoutes.some((p) => path.startsWith(p))) {
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Bạn chưa đăng nhập" },
        { status: 401 }
      );
    }
    const user = verifyToken(token);

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Bạn không có quyền truy cập" },
        { status: 403 }
      );
    }
  }

  return NextResponse.next();
}
