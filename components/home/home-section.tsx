// components/home/home-section.tsx
// Wrapper tái sử dụng cho mọi section ở Home

interface HomeSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function HomeSection({ title, description, children }: HomeSectionProps) {
  return (
    <section className="my-10">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-[hsl(var(--foreground))]">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            {description}
          </p>
        )}
      </div>

      {children}
    </section>
  );
}
