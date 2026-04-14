import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "dark";
  padding?: "sm" | "md" | "lg" | "none";
}

export function Card({ className, variant = "default", padding = "md", children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl",
        {
          "bg-surface-secondary shadow-card border border-black/[0.04]": variant === "default",
          "bg-surface-inverse text-fg-inverse shadow-card-dark": variant === "dark",
        },
        {
          "p-4": padding === "sm",
          "p-6": padding === "md",
          "p-8": padding === "lg",
          "p-0": padding === "none",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
