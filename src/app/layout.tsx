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
  title: "SancCharity — Blockchain-Verified Charitable Giving",
  description:
    "Blockchain-verified charitable giving, open to the world. Powered by Sanctuary Token.",
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
