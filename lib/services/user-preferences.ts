// OPTIONAL — nếu bạn muốn lưu theme vào DB

export async function updateUserTheme(userId: string, theme: string) {
  const res = await fetch(`/api/users/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ theme }),
  });

  if (!res.ok) {
    throw new Error("Không thể cập nhật theme cho người dùng.");
  }

  return res.json();
}
