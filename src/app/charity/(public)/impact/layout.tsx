import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impact Dashboard | SancCharity",
  description: "Platform-wide impact metrics and donation statistics",
};

export default function ImpactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
