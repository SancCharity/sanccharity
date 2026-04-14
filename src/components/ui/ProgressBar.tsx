import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  size?: "sm" | "md";
  color?: string;
  className?: string;
}

export function ProgressBar({ value, size = "sm", color, className }: ProgressBarProps) {
  const clampedValue = Math.min(Math.max(value, 0), 100);

  return (
    <div className={cn("w-full bg-accent-light rounded-full overflow-hidden", size === "sm" ? "h-1.5" : "h-2.5", className)}>
      <div
        className={cn("h-full rounded-full transition-all duration-500", color || "bg-accent-primary")}
        style={{ width: `${clampedValue}%` }}
      />
    </div>
  );
}
