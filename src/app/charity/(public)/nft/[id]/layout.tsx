import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donation NFT | SancCharity",
  description: "On-chain donation receipt NFT",
};

export default function NftLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
