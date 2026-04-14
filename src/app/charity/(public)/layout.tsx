import type { Metadata } from "next";
import { PreviewBanner } from "@/components/ui/PreviewBanner";
import { PublicNav } from "@/components/layout/PublicNav";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: { template: "%s | SancCharity", default: "SancCharity — Transparent Giving on BSC" },
  description: "On-chain charity platform with milestone escrow, community governance, and NFT receipts. Powered by Sanctuary Token (SANC).",
  openGraph: { siteName: "SancCharity", type: "website" },
};

export default function PublicCharityLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <PreviewBanner />
      <PublicNav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
