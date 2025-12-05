"use client";

import { useState, useEffect, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { updateUserProfile } from "@/lib/services/user-profile";

type UserProfile = {
  id: number;
  FullName: string | null;
  AvatarURL: string | null;
  PhoneNumber: string | null;
  Email: string;
};

type UserProfileDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const DetailItem = ({ label, value }: { label: string; value: ReactNode }) => (
  <div className="flex flex-col space-y-1">
    <p className="text-sm font-medium text-muted-foreground">{label}</p>
    <div className="text-sm">{value}</div>
  </div>
);

export function UserProfileDialog({ open, onOpenChange }: UserProfileDialogProps) {
  const { toast } = useToast();

  const [user, setUser] = useState<UserProfile | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [avatarURL, setAvatarURL] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  // -----------------------------
  // LOAD USER INFO FROM API
  // -----------------------------
  useEffect(() => {
    if (!open) return;

    const fetchUser = async () => {
      try {
        const res = await fetch("/api/users/me");
        const data = await res.json();

        setUser(data);
        setFullName(data.FullName ?? "");
        setAvatarURL(data.AvatarURL);
        setPhoneNumber(data.PhoneNumber ?? "");
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, [open]);

  // -----------------------------
  // HANDLE AVATAR UPLOAD
  // -----------------------------
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const base64 = await toBase64(file);

    const uploadRes = await fetch("/api/upload", {
      method: "POST",
      body: JSON.stringify({ file: base64 }),
    });

    const data = await uploadRes.json();
    setAvatarURL(data.secure_url);
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject();
      reader.readAsDataURL(file);
    });

  // -----------------------------
  // SAVE CHANGES → API
  // -----------------------------
  const handleSave = async () => {
    try {
      await updateUserProfile({
        FullName: fullName,
        AvatarURL: avatarURL ?? null,
        PhoneNumber: phoneNumber || null,
      });

      toast({
        title: "Đã lưu thay đổi",
        description: "Thông tin tài khoản đã được cập nhật.",
      });

      setIsEditing(false);

    } catch (err) {
      console.error(err);
      toast({
        title: "Lỗi cập nhật",
        description: "Không thể lưu thông tin.",
        variant: "destructive",
      });
    }
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Tài khoản của tôi</DialogTitle>
          <DialogDescription>
            Quản lý thông tin cá nhân của bạn.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col space-y-4">
          {/* Avatar */}
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={avatarURL ?? ""} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>

            {isEditing && (
              <Input type="file" accept="image/*" onChange={handleFileChange} />
            )}
          </div>

          <Separator />

          {/* THÔNG TIN */}
          <DetailItem
            label="Email"
            value={user.Email}
          />

          {isEditing ? (
            <>
              <Label className="mt-2">Họ và tên</Label>
              <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />

              <Label className="mt-2">Số điện thoại</Label>
              <Input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </>
          ) : (
            <>
              <DetailItem label="Họ và tên" value={user.FullName || "Chưa cập nhật"} />
              <DetailItem label="Số điện thoại" value={user.PhoneNumber || "Chưa cập nhật"} />
            </>
          )}
        </div>

        <DialogFooter className="mt-4">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Hủy
              </Button>
              <Button onClick={handleSave}>Lưu thay đổi</Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Chỉnh sửa</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
