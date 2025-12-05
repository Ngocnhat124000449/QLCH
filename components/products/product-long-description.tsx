// components/product/product-long-description.tsx
// Component mô tả chi tiết sản phẩm (hiển thị hình ảnh + nội dung dài)

"use client";

import Image from "next/image";

export function ProductLongDescription() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold font-headline text-center">
        Đánh giá chi tiết sản phẩm
      </h2>

      {/* --- Thiết kế sản phẩm --- */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold font-headline">
          Thiết kế sang trọng, bền bỉ
        </h3>

        <p className="text-muted-foreground">
          Sản phẩm sở hữu khung viền titan cao cấp, mang lại vẻ ngoài sang
          trọng và độ bền vượt trội. Mặt lưng kính nhám không chỉ chống bám
          vân tay hiệu quả mà còn tạo cảm giác cầm nắm chắc chắn, thoải mái.
        </p>

        <div className="aspect-video relative rounded-lg overflow-hidden">
          <Image
            src="https://picsum.photos/seed/design/800/450"
            alt="Thiết kế sản phẩm"
            fill
            sizes="100vw"
            className="object-cover"
            data-ai-hint="product design"
          />
        </div>
      </section>

      {/* --- Hiệu năng --- */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold font-headline">
          Hiệu năng đỉnh cao
        </h3>

        <p className="text-muted-foreground">
          Được trang bị con chip A18 Pro mạnh mẽ, sản phẩm xử lý tốt mọi tác
          vụ từ cơ bản đến đồ họa nặng. Chơi game mượt mà, dựng video 4K không
          giật lag — mọi thứ đều vượt kỳ vọng.
        </p>

        <div className="aspect-video relative rounded-lg overflow-hidden">
          <Image
            src="https://picsum.photos/seed/performance/800/450"
            alt="Hiệu năng sản phẩm"
            fill
            sizes="100vw"
            className="object-cover"
            data-ai-hint="product performance"
          />
        </div>
      </section>

      {/* --- Camera --- */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold font-headline">
          Camera chuyên nghiệp
        </h3>

        <p className="text-muted-foreground">
          Hệ thống camera sau nâng cấp với cảm biến 48MP, chụp thiếu sáng tốt,
          độ chi tiết cao. Cinematic 4K và zoom quang 5x giúp bạn ghi lại những
          khoảnh khắc mang chất lượng điện ảnh thực sự.
        </p>

        <div className="aspect-video relative rounded-lg overflow-hidden">
          <Image
            src="https://picsum.photos/seed/camera/800/450"
            alt="Camera sản phẩm"
            fill
            sizes="100vw"
            className="object-cover"
            data-ai-hint="product camera"
          />
        </div>
      </section>
    </div>
  );
}
