// components/category/pagination.tsx

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onChange }: PaginationProps) {
  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className=" rounded-(--radius) border border-[hsl(var(--border))] px-3 py-1 text-sm disabled:opacity-40"
      >
        Trước
      </button>

      <span className="text-sm">{page} / {totalPages}</span>

      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className=" rounded-(--radius) border border-[hsl(var(--border))] px-3 py-1 text-sm disabled:opacity-40"
      >
        Sau
      </button>
    </div>
  );
}
