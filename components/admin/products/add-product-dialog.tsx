"use client";

import { useEffect, useState } from "react";
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
import { createProduct } from "@/lib/services/products";
import { useToast } from "@/hooks/use-toast";

type AddProductDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProductAdded: () => void;
};

export function AddProductDialog({
  open,
  onOpenChange,
  onProductAdded,
}: AddProductDialogProps) {
  const { toast } = useToast();

  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");

  // Load categories
  useEffect(() => {
    async function load() {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch {
        toast({
          variant: "destructive",
          title: "Lỗi tải danh mục",
          description: "Không thể tải danh sách danh mục.",
        });
      }
    }
    if (open) load();
  }, [open]);

  const handleSubmit = async () => {
    if (!name || !price || !categoryId) {
      return toast({
        variant: "destructive",
        title: "Thiếu thông tin",
        description: "Vui lòng nhập đầy đủ các trường bắt buộc.",
      });
    }

    setLoading(true);

    try {
      await createProduct({
        name,
        basePrice: Number(price),
        categoryId,
        description,
      });

      toast({
        title: "Thành công",
        description: `Sản phẩm "${name}" đã được tạo.`,
      });

      onProductAdded();
      onOpenChange(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Thêm sản phẩm mới</DialogTitle>
          <DialogDescription>
            Nhập thông tin cho sản phẩm mới.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Tên sản phẩm */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Tên sản phẩm
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>

          {/* Giá */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Giá
            </Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="col-span-3"
            />
          </div>

          {/* Danh mục */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Danh mục</Label>
            <Select onValueChange={setCategoryId} defaultValue={categoryId}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Chọn danh mục" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Mô tả */}
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right pt-2">
              Mô tả
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Đang thêm…" : "Thêm sản phẩm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
