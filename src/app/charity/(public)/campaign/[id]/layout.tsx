import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campaign | SancCharity",
  description: "Support this campaign on SancCharity",
};

export default function CampaignLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
