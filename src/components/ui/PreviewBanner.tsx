"use client";

import { Rocket } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePreviewRole, type PreviewRole } from "@/providers/PreviewRoleProvider";
import { cn } from "@/lib/utils";

const ROLES: { label: string; value: PreviewRole; href: string }[] = [
  { label: "Donor",   value: "donor",   href: "/charity/dashboard" },
  { label: "Charity", value: "charity", href: "/charity/manage" },
];

export function PreviewBanner() {
  const { role, setRole } = usePreviewRole();
  const router = useRouter();

  const handleSwitch = (r: typeof ROLES[number]) => {
    setRole(r.value);
    router.push(r.href);
  };

  return (
    <div className="bg-surface-inverse text-fg-inverse py-2 px-4 flex items-center justify-between gap-4 text-sm">
      <div className="flex items-center gap-2 flex-1">
        <Rocket className="h-3.5 w-3.5 text-accent-primary flex-shrink-0" />
        <span className="text-[13px] font-medium hidden sm:inline">
          SancCharity is in preview — launching soon on BSC
        </span>
        <span className="text-[13px] font-medium sm:hidden">Preview mode</span>
      </div>

      {/* Role switcher */}
      <div className="flex items-center gap-1 bg-[#1E293B] rounded-lg p-1 flex-shrink-0">
        <span className="text-[10px] font-semibold text-[#64748B] uppercase px-1.5 hidden sm:inline">
          View as
        </span>
        {ROLES.map((r) => (
          <button
            key={r.value}
            onClick={() => handleSwitch(r)}
            className={cn(
              "px-3 py-1 rounded-md text-[11px] font-semibold transition-colors",
              role === r.value
                ? "bg-accent-primary text-fg-inverse"
                : "text-[#94A3B8] hover:text-fg-inverse"
            )}
          >
            {r.label}
          </button>
        ))}
      </div>
    </div>
  );
}
