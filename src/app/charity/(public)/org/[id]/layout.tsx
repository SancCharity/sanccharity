import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Charity Profile | SancCharity",
  description: "Verified charity profile on SancCharity",
};

export default function OrgLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
