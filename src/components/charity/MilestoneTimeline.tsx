"use client";

import { Milestone, MilestoneStatus } from "@/types/charity";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn, formatCurrency, formatCountdown } from "@/lib/utils";
import { CheckCircle2, Circle, Clock, AlertCircle } from "lucide-react";

interface MilestoneTimelineProps {
  milestones: Milestone[];
}

const statusConfig: Record<MilestoneStatus, { label: string; variant: "default" | "success" | "warning" | "error" | "info"; icon: typeof Circle }> = {
  [MilestoneStatus.Released]: { label: "Released", variant: "success", icon: CheckCircle2 },
  [MilestoneStatus.Approved]: { label: "Approved", variant: "success", icon: CheckCircle2 },
  [MilestoneStatus.UnderReview]: { label: "Under Review", variant: "warning", icon: Clock },
  [MilestoneStatus.Active]: { label: "Active", variant: "default", icon: Circle },
  [MilestoneStatus.Rejected]: { label: "Rejected", variant: "error", icon: AlertCircle },
  [MilestoneStatus.Locked]: { label: "Locked", variant: "default", icon: Circle },
};

export function MilestoneTimeline({ milestones }: MilestoneTimelineProps) {
  return (
    <div className="space-y-4">
      {milestones.map((milestone, i) => {
        const config = statusConfig[milestone.status];
        const isActive = milestone.status === MilestoneStatus.UnderReview || milestone.status === MilestoneStatus.Active;
        const isLocked = milestone.status === MilestoneStatus.Locked;

        return (
          <div key={milestone.index} className="relative">
            {/* Connector line */}
            {i < milestones.length - 1 && (
              <div className={cn(
                "absolute left-5 top-14 w-0.5 h-6",
                milestone.status === MilestoneStatus.Released ? "bg-success" : "bg-border-subtle"
              )} />
            )}

            <div className={cn(
              "flex items-start gap-4 p-4 rounded-xl border transition-colors",
              isActive ? "bg-surface-secondary border-accent-primary/20 shadow-card" : "bg-surface-secondary border-black/[0.04]",
              isLocked && "opacity-60"
            )}>
              {/* Step number */}
              <div className={cn(
                "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold",
                milestone.status === MilestoneStatus.Released ? "bg-success text-fg-inverse" :
                milestone.status === MilestoneStatus.UnderReview ? "bg-accent-primary text-fg-inverse" :
                "bg-surface-sage text-fg-muted"
              )}>
                {milestone.index + 1}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-semibold text-fg-primary">{milestone.name}</h4>
                    <p className="text-caption text-fg-muted">{formatCurrency(milestone.amountUSD)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={config.variant} size="sm">{config.label}</Badge>
                    {milestone.status === MilestoneStatus.UnderReview && (
                      <span className="text-caption text-accent-primary font-semibold">
                        {milestone.approvalPercentage}% Approval
                      </span>
                    )}
                  </div>
                </div>

                {/* Vote progress for UnderReview */}
                {milestone.status === MilestoneStatus.UnderReview && (
                  <div className="mt-3">
                    <ProgressBar value={milestone.approvalPercentage} size="md" />
                    <p className="text-caption text-fg-muted mt-1">
                      {formatCountdown(milestone.reviewDeadline)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
