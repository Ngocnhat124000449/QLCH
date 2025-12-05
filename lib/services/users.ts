// lib/services/users.ts
// Service xử lý API Users — dùng cho bảng UserTable & ViewUserDialog

export type User = {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string | null;
  role: "ADMIN" | "USER";
  status: "ACTIVE" | "DISABLED";
  createdAt: string;
};

const BASE_URL = "/api/users";

// Lấy tất cả users
export async function getUsers(): Promise<User[]> {
  const res = await fetch(BASE_URL, { cache: "no-cache" });
  if (!res.ok) throw new Error("Không thể tải danh sách người dùng");
  return res.json();
}

// Lấy user theo ID
export async function getUserById(id: string): Promise<User> {
  const res = await fetch(`${BASE_URL}/${id}`, { cache: "no-cache" });
  if (!res.ok) throw new Error("Không thể tải thông tin người dùng");
  return res.json();
}

// Xóa user
export async function deleteUser(id: string): Promise<boolean> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  return res.ok;
}
