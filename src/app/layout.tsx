import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { WagmiProvider } from "@/providers/WagmiProvider";
import { PreviewRoleProvider } from "@/providers/PreviewRoleProvider";

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SancCharity — Transparent Charity on BSC",
  description:
    "On-chain charity donation platform with milestone-based escrow, community governance, and NFT receipts. Powered by Sanctuary Token (SANC).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable} font-sans antialiased bg-surface-primary`}>
        <WagmiProvider><PreviewRoleProvider>{children}</PreviewRoleProvider></WagmiProvider>
      </body>
    </html>
  );
}
