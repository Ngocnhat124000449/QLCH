"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { fetchCategories } from "@/lib/services/category-service";
import { updateProduct } from "@/lib/services/products";
import { useToast } from "@/hooks/use-toast";
import type { ProductDto } from "@/lib/types/product";

type EditProductDialogProps = {
  product: ProductDto;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProductUpdated: () => void;
};

export function EditProductDialog({
  product,
  open,
  onOpenChange,
  onProductUpdated,
}: EditProductDialogProps) {
  const { toast } = useToast();

  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<ProductDto["Status"]>("ACTIVE");

  const [thumbnailUrl, setThumbnailUrl] = useState("");

  // Load categories
  useEffect(() => {
    if (!open) return;
    async function load() {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch {
        toast({
          variant: "destructive",
          title: "Lỗi tải danh mục",
        });
      }
    }
    load();
  }, [open]);

  // Prefill product data
  useEffect(() => {
    if (!product) return;

    setName(product.Name);
setSlug(product.Slug);
setBasePrice(String(product.BasePrice));
setCategoryId(String(product.CategoryID));
setShortDescription(product.ShortDescription ?? "");
setDescription(product.Description ?? "");
setStatus(product.Status);
setThumbnailUrl(product.ThumbnailURL ?? "");


  }, [product]);

  // Upload preview
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return toast({
        variant: "destructive",
        title: "Tệp không hợp lệ",
        description: "Vui lòng chọn file ảnh.",
      });
    }

    const reader = new FileReader();
    reader.onloadend = () => setThumbnailUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  // Submit
  const handleSubmit = async () => {
    if (!name || !slug || !basePrice || !categoryId) {
      return toast({
        variant: "destructive",
        title: "Thiếu thông tin",
      });
    }

    setLoading(true);

    try {
      await updateProduct(product.ID, {
  Name: name,
  Slug: slug,
  BasePrice: Number(basePrice),
  CategoryID: Number(categoryId),
  ShortDescription: shortDescription,
  Description: description,
  Status: status,
  ThumbnailURL: thumbnailUrl,
});


      toast({
        title: "Cập nhật thành công",
      });

      onProductUpdated();
      onOpenChange(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Lỗi cập nhật",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa sản phẩm</DialogTitle>
          <DialogDescription>
            Cập nhật các thông tin của sản phẩm.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">

          {/* Fields */}
          <div className="grid md:grid-cols-2 gap-6">

            <div className="space-y-2">
              <Label htmlFor="name">Tên sản phẩm</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Giá</Label>
              <Input
                id="price"
                type="number"
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Danh mục</Label>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={String(cat.id)}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Trạng thái</Label>
              <Select value={status} onValueChange={(val) => setStatus(val as ProductDto["Status"])}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                  <SelectItem value="HIDDEN">HIDDEN</SelectItem>
                  <SelectItem value="ARCHIVED">ARCHIVED</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Ảnh đại diện</Label>
              <Input type="file" accept="image/*" onChange={handleFileChange} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Mô tả ngắn</Label>
            <Textarea value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Mô tả</Label>
            <Textarea rows={5} value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button disabled={loading} onClick={handleSubmit}>
            {loading ? "Đang lưu…" : "Lưu thay đổi"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
