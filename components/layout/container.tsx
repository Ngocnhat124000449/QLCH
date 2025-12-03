// components/layout/container.tsx
// Component: Container chuẩn cho toàn bộ layout

import { cn } from "@/lib/utils";

interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}

export function Container({ className, children }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-6xl px-4 md:px-6",
        className
      )}
    >
      {children}
    </div>
  );
}
