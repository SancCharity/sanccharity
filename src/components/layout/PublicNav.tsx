"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { publicNavLinks, walletDropdownLinks, charityOwnerLinks } from "@/config/navigation";
import { Button } from "@/components/ui/Button";
import { Heart, Menu, X, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { formatAddress } from "@/lib/utils";
import { injected } from "wagmi/connectors";
import { MOCK_CHARITY_ADDRESSES } from "@/lib/constants";
import { usePreviewRole } from "@/providers/PreviewRoleProvider";

function isNavActive(pathname: string, href: string): boolean {
  if (href.includes("#")) {
    const hash = href.split("#")[1];
    if (hash === "campaigns") return pathname.startsWith("/charity/campaign");
    return false;
  }
  if (href === "/charity") return pathname === "/charity";
  return pathname === href || pathname.startsWith(href + "/");
}

export function PublicNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { role } = usePreviewRole();

  const isCharityOwner =
    role === "charity" ||
    (isConnected &&
      !!address &&
      MOCK_CHARITY_ADDRESSES.map((a) => a.toLowerCase()).includes(address.toLowerCase()));

  const isAdmin = role === "admin";

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [dropdownOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav className="bg-surface-secondary border-b border-line-subtle sticky top-0 z-40">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/charity" className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-accent-primary" />
              <span className="text-lg font-bold text-fg-primary">SancCharity</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {publicNavLinks.map((link) => {
                const active = isNavActive(pathname, link.href);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                      active ? "text-accent-primary font-semibold" : "text-fg-secondary hover:text-fg-primary"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
              {isCharityOwner && (
                <Link href="/charity/manage" className={cn("px-4 py-2 text-sm font-medium rounded-lg transition-colors", isNavActive(pathname, "/charity/manage") ? "text-accent-primary font-semibold" : "text-fg-secondary hover:text-fg-primary")}>
                  Manage
                </Link>
              )}
              {isAdmin && (
                <Link href="/charity/admin/super" className="px-4 py-2 text-sm font-medium rounded-lg text-[#EF4444] hover:bg-[#FEE2E2] transition-colors">
                  Admin
                </Link>
              )}
            </div>

            {/* Desktop Wallet */}
            <div className="hidden md:flex items-center gap-3">
              {isConnected && address ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-accent-primary text-fg-inverse rounded-full text-sm font-semibold"
                  >
                    {formatAddress(address)}
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-surface-secondary rounded-xl shadow-card-dark border border-line-subtle py-2 z-50 modal-panel">
                      {walletDropdownLinks.map((link) => (
                        <Link key={link.label} href={link.href} className="block px-4 py-2 text-sm text-fg-secondary hover:bg-surface-sage" onClick={() => setDropdownOpen(false)}>
                          {link.label}
                        </Link>
                      ))}
                      {isCharityOwner && charityOwnerLinks.map((link) => (
                        <Link key={link.label} href={link.href} className="block px-4 py-2 text-sm text-fg-secondary hover:bg-surface-sage" onClick={() => setDropdownOpen(false)}>
                          {link.label}
                        </Link>
                      ))}
                      <div className="my-1 border-t border-line-subtle" />
                      <button onClick={() => { disconnect(); setDropdownOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-error hover:bg-error-bg">
                        Disconnect
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Button size="sm" onClick={() => connect({ connector: injected() })}>
                  Connect Wallet
                </Button>
              )}
            </div>

            {/* Hamburger */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-surface-sage transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6 text-fg-primary" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden modal-backdrop">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer panel */}
          <div className="mobile-drawer absolute right-0 top-0 h-full w-[280px] bg-surface-secondary flex flex-col shadow-2xl">
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 h-16 border-b border-line-subtle flex-shrink-0">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-accent-primary" />
                <span className="font-bold text-fg-primary">SancCharity</span>
              </div>
              <button onClick={() => setMobileOpen(false)} className="p-1 rounded-lg hover:bg-surface-sage" aria-label="Close menu">
                <X className="h-5 w-5 text-fg-secondary" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-1">
              {publicNavLinks.map((link) => {
                const active = isNavActive(pathname, link.href);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={cn(
                      "flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium transition-colors",
                      active ? "bg-accent-light text-accent-primary font-semibold" : "text-fg-secondary hover:bg-surface-sage hover:text-fg-primary"
                    )}
                  >
                    {link.label}
                    {active && <ChevronRight className="h-4 w-4" />}
                  </Link>
                );
              })}
              {isCharityOwner && (
                <Link href="/charity/manage" className={cn("flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium transition-colors", isNavActive(pathname, "/charity/manage") ? "bg-accent-light text-accent-primary font-semibold" : "text-fg-secondary hover:bg-surface-sage hover:text-fg-primary")}>
                  Manage Charity
                  {isNavActive(pathname, "/charity/manage") && <ChevronRight className="h-4 w-4" />}
                </Link>
              )}
              {isAdmin && (
                <Link href="/charity/admin/super" className="flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium text-[#EF4444] hover:bg-[#FEE2E2] transition-colors">
                  Admin Dashboard
                  <ChevronRight className="h-4 w-4" />
                </Link>
              )}
            </nav>

            {/* Wallet section */}
            <div className="px-4 py-5 border-t border-line-subtle flex-shrink-0">
              {isConnected && address ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2.5 bg-surface-sage rounded-lg px-3 py-2.5">
                    <div className="h-2 w-2 rounded-full bg-success" />
                    <span className="text-sm font-mono font-semibold text-fg-primary">{formatAddress(address)}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    {walletDropdownLinks.map((link) => (
                      <Link key={link.label} href={link.href} className="px-2 py-1.5 text-sm text-fg-secondary hover:text-fg-primary">
                        {link.label}
                      </Link>
                    ))}
                    {isCharityOwner && charityOwnerLinks.map((link) => (
                      <Link key={link.label} href={link.href} className="px-2 py-1.5 text-sm text-fg-secondary hover:text-fg-primary">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                  <button onClick={() => { disconnect(); setMobileOpen(false); }} className="w-full text-center py-2.5 rounded-lg border border-[#FECACA] text-[#DC2626] text-sm font-medium">
                    Disconnect
                  </button>
                </div>
              ) : (
                <Button fullWidth onClick={() => { connect({ connector: injected() }); setMobileOpen(false); }}>
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
