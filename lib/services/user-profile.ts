// lib/services/user-profile.ts
// Service cập nhật thông tin người dùng vào PostgreSQL qua API Next.js

export type UpdateUserProfileInput = {
  FullName?: string | null;
  AvatarURL?: string | null;
  PhoneNumber?: string | null;
};

export async function updateUserProfile(data: UpdateUserProfileInput) {
  const res = await fetch("/api/users/me", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.message || "Cập nhật thông tin thất bại");
  }

  return await res.json();
}
