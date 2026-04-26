"use client";

import { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import Link from "next/link";
import {
  BookOpen, Wallet, Heart, Building2, ShieldCheck, Vote, Award, BarChart3,
  ArrowRight, Coins, FileText, Globe, ChevronDown, ChevronRight, AlertCircle,
  CheckCircle2, ArrowDownUp, Lock, Flame, Users, Zap, HelpCircle, Wrench,
  ExternalLink, Copy, Info, Timer, Eye, Gift, Target, Layers,
} from "lucide-react";

/* ─── Accordion ─────────────────────────────────────────────────────────── */
function Accordion({ title, icon: Icon, children, defaultOpen = false }: {
  title: string; icon: React.ElementType; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-black/[0.06] rounded-2xl bg-white overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-3 p-5 sm:p-6 text-left hover:bg-[#FAFBFC] transition-colors">
        <div className="h-9 w-9 rounded-xl bg-[#F0F9FF] flex items-center justify-center shrink-0">
          <Icon className="h-[18px] w-[18px] text-[#0EA5E9]" />
        </div>
        <span className="flex-1 text-[15px] font-bold text-[#0F172A]">{title}</span>
        {open ? <ChevronDown className="h-4 w-4 text-[#94A3B8]" /> : <ChevronRight className="h-4 w-4 text-[#94A3B8]" />}
      </button>
      {open && <div className="px-5 sm:px-6 pb-6 pt-0">{children}</div>}
    </div>
  );
}

/* ─── Step list ─────────────────────────────────────────────────────────── */
function Steps({ steps }: { steps: { title: string; detail: string }[] }) {
  return (
    <ol className="flex flex-col gap-3 mt-3">
      {steps.map((s, i) => (
        <li key={i} className="flex gap-3">
          <span className="h-6 w-6 rounded-full bg-[#0EA5E9] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
          <div>
            <span className="text-[13px] font-semibold text-[#0F172A]">{s.title}</span>
            <p className="text-[13px] text-[#475569] leading-relaxed mt-0.5">{s.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ─── Info callout ──────────────────────────────────────────────────────── */
function Callout({ type = "info", children }: { type?: "info" | "warning" | "tip"; children: React.ReactNode }) {
  const styles = {
    info:    { bg: "bg-[#F0F9FF]", border: "border-[#0EA5E9]/20", icon: Info,         color: "text-[#0369A1]" },
    warning: { bg: "bg-[#FFF7ED]", border: "border-[#F59E0B]/20", icon: AlertCircle,   color: "text-[#92400E]" },
    tip:     { bg: "bg-[#F0FDF4]", border: "border-[#22C55E]/20", icon: CheckCircle2,  color: "text-[#166534]" },
  };
  const s = styles[type];
  return (
    <div className={`${s.bg} border ${s.border} rounded-xl p-4 flex gap-3 mt-4`}>
      <s.icon className={`h-4 w-4 ${s.color} mt-0.5 shrink-0`} />
      <div className={`text-[13px] ${s.color} leading-relaxed`}>{children}</div>
    </div>
  );
}

/* ─── Code block ────────────────────────────────────────────────────────── */
function CodeBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#F8FAFC] rounded-lg px-4 py-2.5 mt-3 flex items-center justify-between gap-2">
      <div className="min-w-0">
        <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-medium">{label}</span>
        <p className="text-xs sm:text-sm font-mono text-[#0F172A] break-all">{value}</p>
      </div>
      <button onClick={() => navigator.clipboard.writeText(value)} className="shrink-0 p-1.5 rounded-lg hover:bg-[#E2E8F0] transition-colors" title="Copy">
        <Copy className="h-3.5 w-3.5 text-[#64748B]" />
      </button>
    </div>
  );
}

/* ─── Table ─────────────────────────────────────────────────────────────── */
function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto mt-3 rounded-xl border border-black/[0.06]">
      <table className="w-full text-[13px]">
        <thead>
          <tr className="bg-[#F8FAFC]">
            {headers.map((h) => (
              <th key={h} className="text-left px-4 py-2.5 font-semibold text-[#0F172A] whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-black/[0.04]">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2.5 text-[#475569] whitespace-nowrap">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <PageContainer className="py-12 sm:py-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white border border-black/[0.06] rounded-full px-4 py-1.5 text-xs font-medium text-[#64748B] mb-4">
            <BookOpen className="h-3.5 w-3.5" /> Documentation
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-3">SancCharity Docs</h1>
          <p className="text-[15px] text-[#64748B] max-w-2xl mx-auto leading-relaxed">
            Complete guide to donating, registering a charity, governance, staking, NFT receipts, and platform architecture. Step-by-step instructions for every user role.
          </p>
        </div>

        {/* Quick Nav */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { label: "Getting Started", href: "#getting-started", icon: Zap, color: "#0EA5E9" },
              { label: "For Donors", href: "#donors", icon: Heart, color: "#EF4444" },
              { label: "For Charities", href: "#charities", icon: Building2, color: "#22C55E" },
              { label: "Governance", href: "#governance", icon: Vote, color: "#8B5CF6" },
              { label: "Fees & Tokens", href: "#fees", icon: Coins, color: "#F59E0B" },
              { label: "NFT Receipts", href: "#nft", icon: Award, color: "#EC4899" },
              { label: "Architecture", href: "#architecture", icon: Layers, color: "#0F172A" },
              { label: "FAQ", href: "#faq", icon: HelpCircle, color: "#64748B" },
            ].map((q) => (
              <a key={q.label} href={q.href} className="bg-white rounded-xl border border-black/[0.06] px-3.5 py-3 flex items-center gap-2.5 hover:shadow-md transition-shadow">
                <q.icon className="h-4 w-4 shrink-0" style={{ color: q.color }} />
                <span className="text-[13px] font-semibold text-[#0F172A]">{q.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto flex flex-col gap-4">

          {/* ═══ GETTING STARTED ═══ */}
          <div id="getting-started" />
          <div className="flex items-center gap-2 mt-4 mb-1">
            <Zap className="h-4 w-4 text-[#0EA5E9]" />
            <h2 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider">Getting Started</h2>
          </div>

          <Accordion title="Connect Your Wallet" icon={Wallet} defaultOpen>
            <p className="text-[13px] text-[#475569] leading-relaxed">SancCharity is a decentralized application (dApp) on BNB Smart Chain. You interact with it through a Web3 wallet — no username or password needed.</p>
            <Steps steps={[
              { title: "Install a wallet", detail: "Download MetaMask (browser extension or mobile app), Trust Wallet, or any WalletConnect-compatible wallet." },
              { title: "Add BNB Smart Chain", detail: "In MetaMask: Settings → Networks → Add Network. Enter Chain ID 56, RPC URL https://bsc-dataseed.binance.org, symbol BNB, explorer https://bscscan.com." },
              { title: "Fund your wallet", detail: "Buy BNB on an exchange (Binance, Coinbase) and withdraw to your wallet address. You need a small amount of BNB for gas fees on every transaction." },
              { title: "Connect to SancCharity", detail: "Click \"Connect Wallet\" in the site header. Select your wallet provider, approve the connection request, and verify you're on BSC Mainnet (Chain ID 56)." },
            ]} />
            <CodeBlock label="BSC RPC URL" value="https://bsc-dataseed.binance.org" />
            <CodeBlock label="Chain ID" value="56" />
            <Callout type="warning">Never share your seed phrase or private key with anyone. SancCharity will never ask for it. All transactions are signed locally in your wallet.</Callout>
          </Accordion>

          <Accordion title="Supported Wallets & Browsers" icon={Globe}>
            <DataTable
              headers={["Wallet", "Platform", "Connection"]}
              rows={[
                ["MetaMask", "Chrome, Firefox, Brave, iOS, Android", "Direct inject or WalletConnect"],
                ["Trust Wallet", "iOS, Android", "WalletConnect"],
                ["Coinbase Wallet", "Chrome, iOS, Android", "WalletConnect"],
                ["SafePal", "iOS, Android, Hardware", "WalletConnect"],
                ["TokenPocket", "iOS, Android", "WalletConnect"],
              ]}
            />
            <Callout type="tip">For the best desktop experience, use MetaMask on Chrome or Brave. For mobile, Trust Wallet connects seamlessly via WalletConnect.</Callout>
          </Accordion>

          {/* ═══ FOR DONORS ═══ */}
          <div id="donors" />
          <div className="flex items-center gap-2 mt-8 mb-1">
            <Heart className="h-4 w-4 text-[#EF4444]" />
            <h2 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider">For Donors</h2>
          </div>

          <Accordion title="How to Donate" icon={Heart}>
            <p className="text-[13px] text-[#475569] leading-relaxed">Donations on SancCharity go to milestone-based escrow — not directly to the charity. Funds are released progressively as the charity completes each milestone, verified by community governance.</p>
            <Steps steps={[
              { title: "Browse campaigns", detail: "Visit the Campaigns page or browse featured campaigns on the homepage. Each campaign shows its goal, progress, milestones, and the charity behind it." },
              { title: "Select a campaign", detail: "Click into a campaign to see full details — milestone breakdown, donor count, time remaining, and the charity's verification status." },
              { title: "Choose your token", detail: "Select BNB, SANC, USDT, or BUSD. SANC donations have 0% platform fee. Other tokens carry a 1.5% fee at launch." },
              { title: "Enter amount", detail: "Type a dollar amount or token quantity. Quick-select buttons ($100, $250, $500, $1K, $5K) are available for convenience." },
              { title: "Review & confirm", detail: "The confirmation modal shows: donation amount, platform fee (if any), estimated gas, and net amount reaching escrow. Click Confirm and approve in your wallet." },
              { title: "Transaction completes", detail: "Once confirmed on-chain, your donation is recorded in escrow. An NFT receipt is automatically minted to your wallet. You'll see it in your donation history." },
            ]} />
            <Callout type="info">Funds are held in smart contract escrow until the charity completes a milestone and the community votes to release. This is not &quot;locked&quot; — it&apos;s progressive, verified disbursement.</Callout>
          </Accordion>

          <Accordion title="Donation Fees Explained" icon={Coins}>
            <p className="text-[13px] text-[#475569] leading-relaxed mb-1">The platform fee depends on which token you donate with and the campaign type.</p>
            <DataTable
              headers={["Token", "Platform Fee", "Token Tax", "Net to Escrow"]}
              rows={[
                ["SANC", "0%", "0% (DonationManager excluded)", "100% of donation"],
                ["BNB", "1.5%", "None", "98.5% of donation"],
                ["USDT", "1.5%", "None", "98.5% of donation"],
                ["BUSD", "1.5%", "None", "98.5% of donation"],
              ]}
            />
            <Callout type="tip">Private campaigns (invite-only) always have 0% platform fee regardless of token. The 1.5% rate is a launch promotion — it may increase to 2% as volume grows.</Callout>
            <div className="mt-4">
              <span className="text-[13px] font-semibold text-[#0F172A]">Where do fees go?</span>
              <DataTable
                headers={["Allocation", "Percentage", "Purpose"]}
                rows={[
                  ["Buyback & Burn", "40%", "Buy SANC from market and send to dead address"],
                  ["Matching Fund", "30%", "Top up high-impact campaigns"],
                  ["Operations", "30%", "Platform development, hosting, audits"],
                ]}
              />
            </div>
          </Accordion>

          <Accordion title="NFT Donation Receipts" icon={Award}>
            <p className="text-[13px] text-[#475569] leading-relaxed">Every donation automatically mints a unique ERC-721 NFT to your wallet. This is your permanent, on-chain proof of charitable contribution.</p>
            <div className="mt-3">
              <span className="text-[13px] font-semibold text-[#0F172A]">What&apos;s stored in the NFT:</span>
              <DataTable
                headers={["Field", "Description"]}
                rows={[
                  ["Donor Address", "Your wallet address"],
                  ["Campaign ID", "The campaign you donated to"],
                  ["Amount", "Exact token amount donated"],
                  ["Token", "BNB, SANC, USDT, or BUSD"],
                  ["Timestamp", "Block timestamp of the donation"],
                  ["Transaction Hash", "On-chain tx hash for verification"],
                  ["Fee Paid", "Platform fee amount (0 for SANC)"],
                ]}
              />
            </div>
            <Callout type="info">NFT metadata is stored on IPFS for permanence. Even if the SancCharity frontend goes offline, your receipt is verifiable on-chain and via any IPFS gateway.</Callout>
          </Accordion>

          <Accordion title="Track Your Impact" icon={BarChart3}>
            <p className="text-[13px] text-[#475569] leading-relaxed">The Impact Dashboard aggregates all on-chain donation data into a visual overview.</p>
            <Steps steps={[
              { title: "Connect your wallet", detail: "Your dashboard is personalized — it shows only your donations when you filter by 'My Impact'." },
              { title: "View global stats", detail: "Total donated (USD equivalent), number of donors, campaigns funded, and tokens burned are displayed at the top." },
              { title: "Category breakdown", detail: "See how donations are distributed across categories: Education, Health, Environment, Disaster Relief, Community, etc." },
              { title: "Leaderboard", detail: "Top donors are ranked by total contribution. Your rank is highlighted if you're in the top 100." },
              { title: "Activity feed", detail: "Real-time feed of recent donations, milestone approvals, and campaign completions across the platform." },
            ]} />
          </Accordion>

          {/* ═══ FOR CHARITIES ═══ */}
          <div id="charities" />
          <div className="flex items-center gap-2 mt-8 mb-1">
            <Building2 className="h-4 w-4 text-[#22C55E]" />
            <h2 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider">For Charities</h2>
          </div>

          <Accordion title="Register Your Organization" icon={Building2}>
            <p className="text-[13px] text-[#475569] leading-relaxed">SancCharity is open to registered nonprofits worldwide. No EIN or US-specific tax ID required.</p>
            <Steps steps={[
              { title: "Connect your charity wallet", detail: "This wallet will receive milestone-released funds. Use a dedicated organizational wallet, not a personal one." },
              { title: "Fill in organization details", detail: "Name, country, description, website (optional), and category (Education, Health, Environment, etc.)." },
              { title: "Upload registration documents", detail: "Government-issued nonprofit registration certificate, articles of incorporation, or equivalent. Any jurisdiction accepted." },
              { title: "Stake SANC (USD-based threshold)", detail: "Stake a USD-equivalent amount of SANC tokens. The actual SANC quantity varies with market price — checked by an on-chain oracle at registration time. Your exact SANC amount is returned if you leave in good standing." },
              { title: "Submit for verification", detail: "Your application enters the verification queue. Automated KYB checks run first; manual review follows if needed." },
              { title: "Verification decision", detail: "Approved charities can create campaigns immediately. Rejected applications receive a reason and can resubmit with corrections." },
            ]} />
            <Callout type="info">Verification typically takes 24–72 hours. Automated KYB (via Sumsub, Persona, or Dojah depending on region) handles most cases instantly.</Callout>
            <Callout type="info">Refund policy: When a charity deregisters in good standing, the exact SANC tokens staked are returned — not the USD equivalent. If SANC appreciated, the charity profits. If it depreciated, milestone payouts (released in USDT) have already funded the charity&apos;s work.</Callout>
            <div className="mt-4">
              <span className="text-[13px] font-semibold text-[#0F172A]">Accepted documents by region:</span>
              <DataTable
                headers={["Region", "Accepted Documents"]}
                rows={[
                  ["Nigeria", "CAC Certificate, SCUML Registration"],
                  ["USA", "IRS 501(c)(3) Letter, EIN"],
                  ["UK", "Charity Commission Registration"],
                  ["EU", "National nonprofit registration"],
                  ["India", "80G Certificate, FCRA Registration"],
                  ["Kenya", "NGO Coordination Board Certificate"],
                  ["Others", "Government nonprofit registration certificate"],
                ]}
              />
            </div>
          </Accordion>

          <Accordion title="Create & Manage Campaigns" icon={FileText}>
            <p className="text-[13px] text-[#475569] leading-relaxed">Campaigns are the core unit of fundraising. Each campaign has a goal, milestones, and a timeline.</p>
            <Steps steps={[
              { title: "Navigate to Manage → Create Campaign", detail: "Only verified charities can create campaigns. If your org is pending verification, this option is disabled." },
              { title: "Set campaign details", detail: "Title, description, cover image, category, and funding goal (in USD equivalent)." },
              { title: "Define milestones", detail: "Break your campaign into 2–10 milestones. Each milestone has a title, description, and percentage of total funds. Example: Milestone 1 (30%) — Purchase building materials." },
              { title: "Choose visibility", detail: "Public campaigns are listed on the platform and searchable. Private campaigns are accessible only via direct link — useful for targeted fundraising." },
              { title: "Publish", detail: "Review everything and publish. The campaign goes live immediately. You can edit the description but not milestones after the first donation." },
            ]} />
            <Callout type="warning">Milestones are immutable once a campaign receives its first donation. Plan your milestone structure carefully before publishing.</Callout>
            <div className="mt-4">
              <span className="text-[13px] font-semibold text-[#0F172A]">Campaign lifecycle:</span>
              <DataTable
                headers={["Stage", "Status", "What Happens"]}
                rows={[
                  ["Created", "Active", "Campaign is live, accepting donations"],
                  ["Goal reached", "Funded", "Fundraising complete, milestone releases begin"],
                  ["Milestone submitted", "Under Review", "Charity submits proof, governance votes"],
                  ["Vote passes", "Releasing", "Smart contract releases milestone funds to charity wallet"],
                  ["All milestones done", "Completed", "Campaign archived, final stats visible on Impact Dashboard"],
                ]}
              />
            </div>
          </Accordion>

          <Accordion title="Milestone Escrow & Fund Release" icon={ShieldCheck}>
            <p className="text-[13px] text-[#475569] leading-relaxed">All donations are held in smart contract escrow. Funds are never sent directly to the charity. They&apos;re released per milestone, verified by community governance.</p>
            <Steps steps={[
              { title: "Donations accumulate in escrow", detail: "As donors contribute, funds are held in the DonationManager contract — not in any wallet controlled by the charity or SancCharity." },
              { title: "Charity completes a milestone", detail: "The charity submits evidence of completion (photos, receipts, reports) and requests a milestone release." },
              { title: "Governance vote", detail: "SANC stakers vote to approve or reject the release. Quorum: 66%. Voting period: 14 days. Weighted by tier (1x/2x/3x)." },
              { title: "Funds released", detail: "If approved, the smart contract automatically transfers the milestone's share of funds to the charity's registered wallet." },
              { title: "Repeat for each milestone", detail: "The process repeats for every milestone until the campaign is fully disbursed." },
            ]} />
            <Callout type="tip">This progressive release model protects donors from fraud. Charities are incentivized to deliver results because their next tranche depends on community approval.</Callout>
          </Accordion>

          <Accordion title="Automated Proof Verification" icon={Eye}>
            <p className="text-[13px] text-[#475569] leading-relaxed">Every milestone proof submission passes through an automated verification layer before the community votes. This eliminates the need for third-party human reviewers.</p>
            <DataTable
              headers={["Check", "What It Does", "Catches"]}
              rows={[
                ["GPS/EXIF Validation", "Verifies photo location and timestamp metadata", "Photos not taken at claimed site or date"],
                ["Reverse Image Search", "Checks if images exist elsewhere online", "Stolen or recycled photos from other projects"],
                ["AI Content Detection", "Flags synthetic/AI-generated images and docs", "Deepfakes, AI-generated evidence"],
                ["Duplicate Flagging", "Detects same proof reused across milestones", "Evidence submitted multiple times"],
                ["Timestamp Consistency", "Cross-references file, blockchain, and claim dates", "Backdated or future-dated evidence"],
              ]}
            />
            <Callout type="info">The automated report (Clean or Flagged) is attached to every milestone vote. Community voters review the report alongside the evidence — they&apos;re not eyeballing raw photos, they&apos;re reviewing validated data.</Callout>
          </Accordion>

          <Accordion title="Converting Crypto to Local Currency" icon={Globe}>
            <p className="text-[13px] text-[#475569] leading-relaxed">When milestone funds are released, charities receive USDT (stablecoin) for price stability. They can then convert to local currency via integrated off-ramp partners without leaving the platform.</p>
            <Steps steps={[
              { title: "Milestone approved", detail: "Community governance votes to release. Funds arrive in the charity's wallet as USDT." },
              { title: "Click \"Convert to local currency\"", detail: "The charity dashboard shows a conversion widget powered by a regional off-ramp partner." },
              { title: "Enter destination", detail: "M-Pesa number, bank account, UPI ID, or mobile money — depending on the charity's country." },
              { title: "Receive local currency", detail: "Conversion happens within minutes. The charity receives fiat directly — no exchange account needed." },
            ]} />
            <DataTable
              headers={["Region", "Off-ramp Partner", "Receives"]}
              rows={[
                ["Kenya", "Kotani Pay / Yellow Card", "M-Pesa (KES)"],
                ["Nigeria", "Yellow Card / Quidax", "Bank transfer (NGN)"],
                ["South Africa", "Luno / VALR", "Bank transfer (ZAR)"],
                ["India", "WazirX / CoinDCX", "UPI / Bank (INR)"],
                ["Global", "Transak / Binance P2P", "Local bank or mobile money"],
              ]}
            />
            <Callout type="tip">Releasing in USDT instead of BNB protects charities from price volatility between milestone approval and fiat conversion.</Callout>
          </Accordion>

          {/* ═══ GOVERNANCE ═══ */}
          <div id="governance" />
          <div className="flex items-center gap-2 mt-8 mb-1">
            <Vote className="h-4 w-4 text-[#8B5CF6]" />
            <h2 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider">Governance & Staking</h2>
          </div>

          <Accordion title="Staking SANC" icon={Lock}>
            <p className="text-[13px] text-[#475569] leading-relaxed">Staking SANC activates your governance rights. Your staked amount determines your voter tier and voting power multiplier.</p>
            <DataTable
              headers={["Tier", "Minimum Stake", "Voting Power", "Perks"]}
              rows={[
                ["Standard", "1,000,000 SANC", "1x", "Basic voting rights"],
                ["Featured Donor", "10,000,000 SANC", "2x", "2x vote weight, featured badge"],
                ["Elite Donor", "50,000,000 SANC", "3x", "3x vote weight, elite badge, priority proposals"],
              ]}
            />
            <Steps steps={[
              { title: "Go to Governance page", detail: "Navigate to /charity/governance and connect your wallet." },
              { title: "Enter stake amount", detail: "Minimum 1M SANC for Standard tier governance. Enter the amount and click Stake. Higher tiers (10M Featured, 50M Elite) unlock greater voting power." },
              { title: "Approve token spend", detail: "Your wallet will prompt you to approve the StakingPool contract to spend your SANC. This is a one-time approval." },
              { title: "Confirm stake transaction", detail: "Sign the stake transaction. Once confirmed, your tier is active and you can vote immediately." },
            ]} />
            <Callout type="warning">Unstaking has a 3-day cooldown period. During cooldown, your tokens remain locked and your voting power is suspended. Plan accordingly before governance votes.</Callout>
          </Accordion>

          <Accordion title="Voting on Proposals" icon={Vote}>
            <p className="text-[13px] text-[#475569] leading-relaxed">Governance proposals cover milestone releases, platform parameter changes, and community initiatives. Every vote is recorded on-chain.</p>
            <Steps steps={[
              { title: "View active proposals", detail: "The Governance dashboard shows all active proposals with their description, deadline, and current vote tally." },
              { title: "Review the proposal", detail: "Read the full proposal text, any attached evidence (for milestone releases), and community discussion." },
              { title: "Cast your vote", detail: "Choose Approve, Reject, or Abstain. Your vote is weighted by your tier. Sign the transaction in your wallet." },
              { title: "Wait for quorum", detail: "A proposal needs 66% quorum (of total staked SANC) to be valid. Voting period is 14 days." },
              { title: "Outcome", detail: "If quorum is met and majority approves → action executes (funds release, parameter change, etc.). If rejected or quorum not met → proposal fails." },
            ]} />
            <DataTable
              headers={["Parameter", "Value"]}
              rows={[
                ["Quorum threshold", "66% of total staked SANC"],
                ["Voting period", "14 days"],
                ["Vote options", "Approve, Reject, Abstain"],
                ["Weight calculation", "Staked amount × tier multiplier"],
                ["Execution", "Automatic on-chain if approved"],
              ]}
            />
          </Accordion>

          {/* ═══ FEES & TOKENS ═══ */}
          <div id="fees" />
          <div className="flex items-center gap-2 mt-8 mb-1">
            <Coins className="h-4 w-4 text-[#F59E0B]" />
            <h2 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider">Fees & Token Economics</h2>
          </div>

          <Accordion title="SANC Token Overview" icon={Coins}>
            <p className="text-[13px] text-[#475569] leading-relaxed">SANC is the native utility and governance token of the Sanctuary ecosystem.</p>
            <DataTable
              headers={["Property", "Value"]}
              rows={[
                ["Total Supply", "777,777,777,777,777 (777.7T)"],
                ["Network", "BNB Smart Chain (BEP-20)"],
                ["Decimals", "9"],
                ["Buy / Sell Tax", "5% / 5%"],
                ["Auditor", "SourceHat"],
                ["Liquidity", "Locked on-chain"],
              ]}
            />
            <CodeBlock label="Contract Address" value="0x4670f3a2A8D35021257cda028c7ae3Cb854C7CaF" />
            <CodeBlock label="Burn Address" value="0x000000000000000000000000000000000000dEaD" />
            <div className="mt-4">
              <span className="text-[13px] font-semibold text-[#0F172A]">5% tax breakdown (same for buy & sell):</span>
              <DataTable
                headers={["Allocation", "Rate", "Purpose"]}
                rows={[
                  ["Liquidity Pool", "1%", "Auto-added to PancakeSwap LP"],
                  ["Marketing", "1%", "Community growth, partnerships"],
                  ["Development", "1%", "Platform and contract development"],
                  ["Charity", "1%", "Charity matching pool"],
                  ["Burn", "1%", "Sent to dead address permanently"],
                ]}
              />
            </div>
            <Callout type="tip">The DonationManager contract is excluded from the 5% tax. When you donate SANC, 100% of your tokens reach escrow — zero tax, zero platform fee.</Callout>
          </Accordion>

          <Accordion title="Accepted Tokens" icon={ArrowDownUp}>
            <DataTable
              headers={["Token", "Contract", "Decimals", "Platform Fee"]}
              rows={[
                ["BNB", "Native (0x0...0)", "18", "1.5%"],
                ["SANC", "0x4670...7CaF", "9", "0%"],
                ["USDT", "0x55d3...7955", "18", "1.5%"],
                ["BUSD", "0xe9e7...87D56", "18", "1.5%"],
              ]}
            />
            <Callout type="info">All tokens are swappable on PancakeSwap. Once SancSwap launches, you&apos;ll be able to convert tokens directly within the platform.</Callout>
          </Accordion>

          {/* ═══ NFT ═══ */}
          <div id="nft" />
          <div className="flex items-center gap-2 mt-8 mb-1">
            <Award className="h-4 w-4 text-[#EC4899]" />
            <h2 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider">NFT Receipts</h2>
          </div>

          <Accordion title="How NFT Receipts Work" icon={Award}>
            <p className="text-[13px] text-[#475569] leading-relaxed">Every donation automatically mints a unique ERC-721 NFT to the donor&apos;s wallet. No extra action needed — it&apos;s part of the donation transaction.</p>
            <Steps steps={[
              { title: "Donate to any campaign", detail: "Using any accepted token (BNB, SANC, USDT, BUSD)." },
              { title: "NFT mints automatically", detail: "The DonationNFT contract mints a unique token to your wallet in the same transaction as your donation." },
              { title: "Metadata stored on IPFS", detail: "Amount, campaign, timestamp, tx hash, and fee details are written to IPFS-hosted JSON metadata." },
              { title: "View in your wallet", detail: "The NFT appears in MetaMask, Trust Wallet, or any ERC-721 compatible viewer. It also shows on your SancCharity profile." },
              { title: "Verify anytime", detail: "Click the NFT to see its on-chain data, IPFS metadata link, and BscScan transaction." },
            ]} />
            <Callout type="info">NFTs are permanent and decentralized. Even if SancCharity&apos;s frontend is offline, your receipt is verifiable on BscScan and IPFS.</Callout>
          </Accordion>

          {/* ═══ ARCHITECTURE ═══ */}
          <div id="architecture" />
          <div className="flex items-center gap-2 mt-8 mb-1">
            <Layers className="h-4 w-4 text-[#0F172A]" />
            <h2 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider">Platform Architecture</h2>
          </div>

          <Accordion title="Smart Contract Architecture" icon={Layers}>
            <p className="text-[13px] text-[#475569] leading-relaxed">SancCharity runs on five core smart contracts deployed on BNB Smart Chain.</p>
            <DataTable
              headers={["Contract", "Role", "Key Features"]}
              rows={[
                ["SANC Token", "BEP-20 utility token", "5% tax, auto-LP, auto-burn, fee exclusion"],
                ["DonationManager", "Core donation logic", "Multi-token, escrow, NFT minting, fee routing"],
                ["GovernanceVoting", "On-chain governance", "Weighted votes, quorum, time-locked execution"],
                ["StakingPool", "Stake SANC for governance", "Tiered staking, 3-day cooldown, USD-based charity stake"],
                ["PriceOracle", "SANC/USD price feed", "PancakeSwap TWAP + Chainlink BNB/USD"],
                ["DonationNFT", "ERC-721 receipts", "Auto-mint, IPFS metadata, non-transferable option"],
              ]}
            />
            <Callout type="info">
              For contract addresses, deployment status, and security details, see the{" "}
              <Link href="/charity/contracts" className="font-semibold underline">Smart Contracts</Link> page.
            </Callout>
          </Accordion>

          <Accordion title="Donation Flow (Technical)" icon={Target}>
            <p className="text-[13px] text-[#475569] leading-relaxed">Step-by-step flow of a donation transaction through the contract stack:</p>
            <div className="mt-3 bg-[#F8FAFC] rounded-xl p-4 text-[12px] font-mono text-[#475569] leading-relaxed space-y-1">
              <p>1. User calls <span className="text-[#0EA5E9]">DonationManager.donate(campaignId, token, amount)</span></p>
              <p>2. Contract checks: campaign active? token accepted? amount &gt; 0?</p>
              <p>3. If SANC → 0% fee (contract is excludeFromFee). Else → 1.5% fee deducted.</p>
              <p>4. Fee routed to <span className="text-[#0EA5E9]">FeeDistributor</span>: 40% buyback+burn, 30% matching, 30% ops.</p>
              <p>5. Net amount locked in <span className="text-[#0EA5E9]">EscrowVault[campaignId][milestoneIndex]</span>.</p>
              <p>6. <span className="text-[#0EA5E9]">DonationNFT.mint(donor, metadata)</span> called — receipt minted.</p>
              <p>7. Event emitted: <span className="text-[#0EA5E9]">DonationReceived(donor, campaignId, token, amount, nftId)</span></p>
            </div>
          </Accordion>

          {/* ═══ FAQ ═══ */}
          <div id="faq" />
          <div className="flex items-center gap-2 mt-8 mb-1">
            <HelpCircle className="h-4 w-4 text-[#64748B]" />
            <h2 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider">Frequently Asked Questions</h2>
          </div>

          <Accordion title="Is SancCharity free to use?" icon={HelpCircle}>
            <p className="text-[13px] text-[#475569] leading-relaxed">
              <strong className="text-[#0F172A]">For donors:</strong> Donating with SANC is completely free (0% platform fee, 0% token tax on the donation contract). BNB/USDT/BUSD donations carry a 1.5% platform fee. All transactions require a small BNB gas fee paid to network validators.
            </p>
            <p className="text-[13px] text-[#475569] leading-relaxed mt-2">
              <strong className="text-[#0F172A]">For charities:</strong> Registration, campaign creation, and receiving funds are free. No subscription or monthly fees.
            </p>
          </Accordion>

          <Accordion title="Are my funds locked forever?" icon={HelpCircle}>
            <p className="text-[13px] text-[#475569] leading-relaxed">
              No. Funds are held in milestone-based escrow and released progressively as the charity completes deliverables. Each milestone release is voted on by SANC stakers within a 14-day window. This is not &quot;locked until the campaign ends&quot; — it&apos;s phased release tied to real-world progress.
            </p>
          </Accordion>

          <Accordion title="Can charities outside the US use SancCharity?" icon={HelpCircle}>
            <p className="text-[13px] text-[#475569] leading-relaxed">
              Yes. SancCharity is globally accessible. Unlike platforms like Endaoment that require a US EIN, SancCharity accepts government-issued nonprofit registration documents from any country. Verification is document-based and jurisdiction-agnostic.
            </p>
          </Accordion>

          <Accordion title="What happens if a milestone vote fails?" icon={HelpCircle}>
            <p className="text-[13px] text-[#475569] leading-relaxed">
              If a milestone release vote is rejected (or fails to reach 66% quorum), the funds remain in escrow. The charity can submit additional evidence and request a re-vote. If a campaign is abandoned, governance can vote to refund donors proportionally.
            </p>
          </Accordion>

          <Accordion title="Is the SANC token an investment?" icon={HelpCircle}>
            <p className="text-[13px] text-[#475569] leading-relaxed">
              SANC is a <strong className="text-[#0F172A]">utility and governance token</strong>. It provides fee-free donations, governance voting power, and deflationary mechanics. Nothing on this platform constitutes financial advice. Always do your own research before purchasing any cryptocurrency.
            </p>
          </Accordion>

          <Accordion title="How do I get SANC tokens?" icon={HelpCircle}>
            <p className="text-[13px] text-[#475569] leading-relaxed">SANC is available on PancakeSwap. You can swap BNB, USDT, or BUSD for SANC directly.</p>
            <Steps steps={[
              { title: "Go to PancakeSwap", detail: "Visit pancakeswap.finance/swap" },
              { title: "Set output token", detail: "Paste SANC contract address: 0x4670f3a2A8D35021257cda028c7ae3Cb854C7CaF" },
              { title: "Set slippage to 6–7%", detail: "The 5% buy tax requires slightly higher slippage tolerance." },
              { title: "Swap", detail: "Enter the amount and confirm. SANC will appear in your wallet." },
            ]} />
          </Accordion>

          <Accordion title="Troubleshooting" icon={Wrench}>
            <DataTable
              headers={["Issue", "Solution"]}
              rows={[
                ["Wallet won't connect", "Clear browser cache, disable conflicting extensions, try incognito mode"],
                ["Transaction stuck/pending", "Increase gas price in MetaMask, or wait for network congestion to clear"],
                ["SANC not showing in wallet", "Add custom token: paste contract address, decimals 9, symbol SANC"],
                ["Swap fails on PancakeSwap", "Increase slippage to 6–7% (5% tax + price movement)"],
                ["NFT not visible", "Wait 1–2 minutes for indexing, then refresh. Check BscScan for the mint tx"],
                ["Wrong network", "Switch to BSC Mainnet (Chain ID 56) in your wallet settings"],
                ["Donation shows 0 fee but expected 1.5%", "You donated with SANC — 0% fee is correct"],
              ]}
            />
          </Accordion>

        </div>

        {/* Bottom CTA */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-gradient-to-br from-[#0F172A] to-[#1E3A5F] rounded-2xl p-6 sm:p-8 text-white text-center">
            <h2 className="text-lg font-bold mb-2">Need more?</h2>
            <p className="text-[13px] text-white/70 mb-5 max-w-md mx-auto">Technical contract references, tokenomics deep-dive, and security audit details.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/charity/contracts" className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 transition-colors text-sm font-semibold px-5 py-2 rounded-full">
                Smart Contracts <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link href="/charity/tokenomics" className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 transition-colors text-sm font-semibold px-5 py-2 rounded-full">
                Tokenomics <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link href="/charity/audit" className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 transition-colors text-sm font-semibold px-5 py-2 rounded-full">
                Audit Report <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
