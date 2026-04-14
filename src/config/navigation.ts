export const publicNavLinks = [
  { label: "How it Works", href: "/charity#how-it-works" },
  { label: "Campaigns", href: "/charity#campaigns" },
  { label: "Impact", href: "/charity/impact" },
  { label: "Governance", href: "/charity/governance" },
  { label: "For Charities", href: "/charity/register" },
  { label: "Donate", href: "/charity/donate" },
] as const;

export const walletDropdownLinks = [
  { label: "My Dashboard", href: "/charity/dashboard" },
  { label: "My NFTs", href: "/charity/dashboard?tab=nfts" },
] as const;

export const charityOwnerLinks = [
  { label: "Manage Charity", href: "/charity/manage" },
] as const;

export const adminSidebarLinks = [
  {
    section: "Overview",
    links: [
      { label: "Dashboard", href: "/charity/admin", icon: "LayoutDashboard" },
      { label: "Platform Metrics", href: "/charity/admin", tab: "metrics", icon: "BarChart3" },
      { label: "Activity Log", href: "/charity/admin", tab: "activity", icon: "FileText" },
    ],
  },
  {
    section: "Management",
    links: [
      { label: "KYC Queue", href: "/charity/admin", tab: "kyc", icon: "ClipboardCheck", badge: true },
      { label: "Charities", href: "/charity/admin", tab: "charities", icon: "Building2" },
      { label: "Campaigns", href: "/charity/admin", tab: "campaigns", icon: "Megaphone" },
    ],
  },
  {
    section: "Operations",
    links: [
      { label: "Buyback & Burn", href: "/charity/admin", tab: "buyback", icon: "Flame" },
      { label: "Treasury", href: "/charity/admin", tab: "treasury", icon: "Wallet" },
      { label: "Event Listener", href: "/charity/admin", tab: "events", icon: "Radio" },
    ],
  },
  {
    section: "Emergency",
    links: [
      { label: "Circuit Breaker", href: "/charity/admin", tab: "emergency", icon: "ShieldAlert" },
    ],
  },
] as const;
