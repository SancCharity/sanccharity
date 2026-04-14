import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Charity Portal | SancCharity",
  description: "Manage your charity, campaigns, and milestones",
};

export default function ManageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
