import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | SancCharity",
  description: "Platform administration",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
