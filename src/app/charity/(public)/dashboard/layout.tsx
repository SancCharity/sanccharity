import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Dashboard | SancCharity",
  description: "Your donation history, NFTs, and governance activity",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
