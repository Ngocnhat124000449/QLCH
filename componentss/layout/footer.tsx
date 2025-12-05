// components/layout/footer.tsx
// Component: Footer cuối trang của website

import Link from "next/link";
import { Container } from "./container";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-[hsl(var(--border))] bg-[hsl(var(--card))]">
      <Container className="py-10 grid grid-cols-1 gap-8 text-sm md:grid-cols-4">
        
        {/* Cột 1 - Logo */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] text-base font-bold">
              Q
            </div>
            <span className="text-base font-semibold">Quantum Store</span>
          </div>

          <p className="text-[hsl(var(--muted-foreground))]">
            Cửa hàng sản phẩm công nghệ – chất lượng, giá tốt, giao hàng nhanh.
          </p>
        </div>

        {/* Cột 2 */}
        <div>
          <h4 className="mb-2 font-semibold">Thông tin</h4>
          <ul className="space-y-2 text-[hsl(var(--muted-foreground))]">
            <li><Link href="/about">Giới thiệu</Link></li>
            <li><Link href="/contact">Liên hệ</Link></li>
            <li><Link href="/policy">Chính sách bảo hành</Link></li>
            <li><Link href="/terms">Điều khoản sử dụng</Link></li>
          </ul>
        </div>

        {/* Cột 3 */}
        <div>
          <h4 className="mb-2 font-semibold">Hỗ trợ</h4>
          <ul className="space-y-2 text-[hsl(var(--muted-foreground))]">
            <li><Link href="/guide">Hướng dẫn mua hàng</Link></li>
            <li><Link href="/shipping">Chính sách giao hàng</Link></li>
            <li><Link href="/returns">Đổi trả hàng</Link></li>
            <li><Link href="/faq">Câu hỏi thường gặp</Link></li>
          </ul>
        </div>

        {/* Cột 4 */}
        <div>
          <h4 className="mb-2 font-semibold">Kết nối</h4>
          <ul className="space-y-2 text-[hsl(var(--muted-foreground))]">
            <li>Hotline: 1900 9999</li>
            <li>Email: support@quantum.com</li>
            <li>Facebook</li>
            <li>Zalo</li>
          </ul>
        </div>
      </Container>

      {/* Copyright */}
      <div className="border-t border-[hsl(var(--border))] py-4 text-center text-xs text-[hsl(var(--muted-foreground))]">
        © 2025 Quantum Store. All rights reserved.
      </div>
    </footer>
  );
}
