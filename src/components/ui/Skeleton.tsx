import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Skeleton({ className, style }: SkeletonProps) {
  return <div className={cn("skeleton", className)} style={style} />;
}

/** A skeleton row that mimics a stat card */
export function StatCardSkeleton() {
  return (
    <div className="flex-1 bg-white rounded-2xl p-5 shadow-card border border-black/[0.04] flex flex-col gap-3">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-3 w-20" />
    </div>
  );
}

/** A skeleton row that mimics a campaign card */
export function CampaignCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-card border border-black/[0.04] overflow-hidden">
      <Skeleton className="h-44 w-full rounded-none" />
      <div className="p-5 flex flex-col gap-3">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
        <Skeleton className="h-2 w-full mt-1" />
        <div className="flex justify-between">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  );
}

/** A skeleton for a table row */
export function TableRowSkeleton({ cols = 5 }: { cols?: number }) {
  return (
    <div className="flex items-center px-6 py-3.5 gap-4">
      {Array.from({ length: cols }).map((_, i) => (
        <Skeleton key={i} className="h-4 flex-1" style={{ maxWidth: i === 0 ? 200 : undefined }} />
      ))}
    </div>
  );
}

/** Full page loading skeleton for the landing page */
export function LandingPageSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col gap-10">
      <div className="flex flex-col items-center gap-4 py-8">
        <Skeleton className="h-10 w-96" />
        <Skeleton className="h-5 w-72" />
        <Skeleton className="h-10 w-40 mt-2" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {[...Array(4)].map((_, i) => <StatCardSkeleton key={i} />)}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[...Array(6)].map((_, i) => <CampaignCardSkeleton key={i} />)}
      </div>
    </div>
  );
}
