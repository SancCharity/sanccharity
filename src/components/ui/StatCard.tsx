import { cn } from "@/lib/utils";
import { Card } from "./Card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  subtext?: string;
  icon?: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  variant?: "default" | "dark";
  className?: string;
}

export function StatCard({ label, value, subtext, icon: Icon, trend, trendUp, variant = "default", className }: StatCardProps) {
  return (
    <Card variant={variant} className={className}>
      <div className="flex items-start justify-between">
        <div>
          <p className={cn("text-caption", variant === "dark" ? "text-fg-inverse/70" : "text-fg-muted")}>{label}</p>
          <p className={cn("text-2xl font-bold mt-1", variant === "dark" ? "text-fg-inverse" : "text-fg-primary")}>{value}</p>
          {subtext && (
            <p className={cn("text-caption mt-1", variant === "dark" ? "text-fg-inverse/60" : "text-fg-muted")}>{subtext}</p>
          )}
          {trend && (
            <p className={cn("text-caption mt-1 font-medium", trendUp ? "text-success" : "text-error")}>{trend}</p>
          )}
        </div>
        {Icon && (
          <div className={cn("p-2 rounded-xl", variant === "dark" ? "bg-white/10" : "bg-surface-sage")}>
            <Icon className={cn("h-5 w-5", variant === "dark" ? "text-fg-inverse/70" : "text-accent-primary")} />
          </div>
        )}
      </div>
    </Card>
  );
}
