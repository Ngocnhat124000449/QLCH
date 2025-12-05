// components/product/product-specifications-table.tsx

interface SpecsProps {
  specs: { name: string; value: string }[];
}

export function ProductSpecificationsTable({ specs }: SpecsProps) {
  return (
    <table className="w-full border border-[hsl(var(--border))]  rounded-(--radius) text-sm">
      <tbody>
        {specs.map((s, i) => (
          <tr
            key={i}
            className="border-b border-[hsl(var(--border))] last:border-none"
          >
            <td className="bg-[hsl(var(--secondary))] p-2 w-1/3 font-medium">
              {s.name}
            </td>
            <td className="p-2">{s.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
