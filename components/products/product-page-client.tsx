// Client page hiển thị giao diện sản phẩm
"use client";

import { Header } from "@/components/home/header";
import { Footer } from "@/components/layout/footer";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

import { Home } from "lucide-react";

import { ProductImageGallery } from "@/components/products/product-image-gallery";
import { ProductDetailsClient } from "@/components/products/product-details-client";
import { ProductSpecifications } from "@/components/products/product-specifications";

// ✅ IMPORT ĐÚNG TYPE
import type {
  ProductUI,
  ProductVariant,
  ProductImage,
  ProductSpecification
} from "@/lib/types/product";

type ProductPageClientProps = {
  product: ProductUI;
  variants: ProductVariant[];
  images: ProductImage[];
  specifications: ProductSpecification[];
};

export function ProductPageClient({
  product,
  variants,
  images,
  specifications
}: ProductPageClientProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* FIX: Header cần props */}
      <Header categories={[]} products={[]} />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Trang chủ
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              {product.category && (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink href={`/categories/${product.category.slug}`}>
                      {product.category.name}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </>
              )}

              <BreadcrumbItem>
                <BreadcrumbPage>{product.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

            {/* LEFT: Ảnh + Specs */}
            <div>
              <ProductImageGallery
                images={images}
                initialVariantName={variants[0]?.variantName ?? ""}

              />

              <div className="hidden lg:block mt-8">
                <ProductSpecifications specifications={specifications} />
              </div>
            </div>

            {/* RIGHT: Chi tiết sản phẩm */}
            <div>
              <ProductDetailsClient
                product={product}
                variants={variants}
                specifications={specifications}
              />
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
