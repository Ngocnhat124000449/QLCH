// components/auth/auth-form-wrapper.tsx

interface AuthFormWrapperProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function AuthFormWrapper({ title, subtitle, children }: AuthFormWrapperProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-(--radius) border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-sm">
        
        {/* Title */}
        <h1 className="text-2xl font-semibold mb-2 text-center">
          {title}
        </h1>

        {subtitle && (
          <p className="text-sm text-[hsl(var(--muted-foreground))] text-center mb-6">
            {subtitle}
          </p>
        )}

        {children}
      </div>
    </div>
  );
}
