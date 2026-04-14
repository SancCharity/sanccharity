import { cn } from "@/lib/utils";

interface BadgeProps {
  variant?: "default" | "success" | "warning" | "error" | "info";
  size?: "sm" | "md";
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = "default", size = "sm", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-semibold",
        {
          "bg-accent-light text-accent-primary": variant === "default",
          "bg-success-bg text-success": variant === "success",
          "bg-warning-bg text-warning": variant === "warning",
          "bg-error-bg text-error": variant === "error",
          "bg-info-bg text-info": variant === "info",
        },
        {
          "px-2.5 py-0.5 text-micro": size === "sm",
          "px-3 py-1 text-caption": size === "md",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
