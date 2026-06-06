import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string | null;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeStyles = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-lg",
};

export function Avatar({ src, alt, fallback, size = "md", className }: AvatarProps) {
  const initials = fallback || "?";

  return (
    <div className={cn("relative flex shrink-0 overflow-hidden rounded-full", sizeStyles[size], className)}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt || ""} className="aspect-square h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[var(--color-surface-container-high)] text-[var(--color-on-surface-variant)] font-medium">
          {initials}
        </div>
      )}
    </div>
  );
}
