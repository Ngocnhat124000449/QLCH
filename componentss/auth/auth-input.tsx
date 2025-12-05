// components/auth/auth-input.tsx

interface AuthInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
}

export function AuthInput({ label, type = "text", value, onChange }: AuthInputProps) {
  return (
    <div className="mb-4">
      <label className="text-sm font-medium mb-1 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-(--radius) border border-[hsl(var(--border))] px-3 py-2 bg-[hsl(var(--card))]"
      />
    </div>
  );
}
