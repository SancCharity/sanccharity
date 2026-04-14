import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Governance | SancCharity",
  description: "Vote on milestone releases and shape the future of SancCharity",
};

export default function GovernanceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
