"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProductSpecsEditor, SpecItem } from "./product-specs-editor";
import { ProductVariantsEditor, VariantItem } from "./product-variants-editor";

export default function ProductCreateForm() {
  const [name, setName] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const [description, setDescription] = useState("");
  const [thumbnailURL, setThumbnailURL] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const [specs, setSpecs] = useState<SpecItem[]>([]);
  const [variants, setVariants] = useState<VariantItem[]>([]);

  const uploadImage = async (file: File) => {
    const form = new FormData();
    form.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    return data.url;
  };

  const handleThumbnailUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = await uploadImage(file);
    setThumbnailURL(url);
  };

  const handleImagesUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = await uploadImage(file);
    setImages([...images, url]);
  };

  const submitProduct = async () => {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Name: name,
        Description: description,
        Price: Number(price),
        Stock: Number(stock),
        CategoryID: Number(categoryID),
        ThumbnailURL: thumbnailURL,
        Images: images,
        Specifications: specs,
        Variants: variants,
      }),
    });

    const data = await res.json();
    alert("Tạo sản phẩm thành công!");
  };

  return (
    <Card className="p-6 space-y-6 border border-[hsl(var(--border))] bg-[hsl(var(--card))]">
      <h2 className="text-xl font-semibold mb-4">Tạo sản phẩm mới</h2>

      {/* BASIC INFO */}
      <div className="grid grid-cols-2 gap-4">
        <Input placeholder="Tên sản phẩm" value={name} onChange={(e) => setName(e.target.value)} />

        <Input
          placeholder="ID danh mục"
          type="number"
          value={categoryID}
          onChange={(e) => setCategoryID(e.target.value)}
        />

        <Input placeholder="Giá sản phẩm" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />

        <Input placeholder="Tồn kho" type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
      </div>

      <Textarea
        placeholder="Mô tả chi tiết sản phẩm"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* THUMBNAIL */}
      <div className="space-y-2">
        <label className="font-medium">Ảnh đại diện</label>
        <Input type="file" onChange={handleThumbnailUpload} />

        {thumbnailURL && (
          <img src={thumbnailURL} className="w-24 h-24 object-cover rounded-md border border-[hsl(var(--border))]" />
        )}
      </div>

      {/* MULTI IMAGES */}
      <div className="space-y-2">
        <label className="font-medium">Ảnh phụ</label>
        <Input type="file" onChange={handleImagesUpload} />

        <div className="flex gap-2 flex-wrap">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              className="w-20 h-20 object-cover rounded-md border border-[hsl(var(--border))]"
            />
          ))}
        </div>
      </div>

      {/* SPECS EDITOR */}
      <ProductSpecsEditor specs={specs} setSpecs={setSpecs} />

      {/* VARIANTS EDITOR */}
      <ProductVariantsEditor variants={variants} setVariants={setVariants} />

      <Button onClick={submitProduct} className="w-full">
        Tạo sản phẩm
      </Button>
    </Card>
  );
}
