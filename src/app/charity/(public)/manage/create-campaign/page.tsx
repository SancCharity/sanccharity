"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ComingSoonOverlay } from "@/components/ui/ComingSoonOverlay";
import { CampaignType } from "@/types/charity";
import {
  X, ChevronDown, Calendar, Plus, Trash2, ArrowRight, ArrowLeft,
  Check, Users, Globe, Lock, Copy, Link2,
} from "lucide-react";

const STEPS = ["Campaign Type", "Basic Info", "Milestones", "Review"] as const;

export default function CreateCampaignPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [campaignType, setCampaignType] = useState<CampaignType>(CampaignType.Public);
  const [approvers, setApprovers] = useState<string[]>(["", ""]);
  const [requiredApprovals, setRequiredApprovals] = useState(2);
  const [milestones, setMilestones] = useState([{ title: "", amount: "", description: "" }]);
  const [submitted, setSubmitted] = useState(false);

  const accessToken = "a3f9c12d4e8b";

  const addApprover = () => {
    if (approvers.length < 5) setApprovers([...approvers, ""]);
  };

  const removeApprover = (idx: number) => {
    const next = approvers.filter((_, i) => i !== idx);
    setApprovers(next);
    if (requiredApprovals > next.length) setRequiredApprovals(next.length);
  };

  const updateApprover = (idx: number, val: string) => {
    setApprovers(approvers.map((a, i) => (i === idx ? val : a)));
  };

  const addMilestone = () => {
    setMilestones([...milestones, { title: "", amount: "", description: "" }]);
  };

  const removeMilestone = (idx: number) => {
    setMilestones(milestones.filter((_, i) => i !== idx));
  };

  const updateMilestone = (idx: number, field: "title" | "amount" | "description", val: string) => {
    setMilestones(milestones.map((ms, i) => (i === idx ? { ...ms, [field]: val } : ms)));
  };

  const canSubmit = campaignType === CampaignType.Public
    || approvers.filter((a) => a.trim()).length >= 2;

  return (
    <div className="min-h-screen bg-surface-primary flex items-start justify-center py-12 px-4">
      <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] p-5 sm:p-8 flex flex-col gap-5">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-[22px] font-bold text-fg-primary">Create New Campaign</h1>
          <button onClick={() => router.push("/charity/manage")}>
            <X className="h-6 w-6 text-fg-muted" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-1.5">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-1.5 flex-1 last:flex-none">
              <div className="flex items-center gap-1.5 shrink-0">
                <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  i < step
                    ? "bg-[#DCFCE7] text-[#16A34A]"
                    : i === step
                    ? "bg-accent-primary text-fg-inverse"
                    : "bg-surface-sage text-fg-muted"
                }`}>
                  {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </div>
                <span className={`text-[12px] whitespace-nowrap hidden sm:block ${
                  i < step ? "font-semibold text-[#16A34A]" : i === step ? "font-semibold text-accent-primary" : "font-medium text-fg-muted"
                }`}>
                  {s}
                </span>
              </div>
              {i < STEPS.length - 1 && <div className="flex-1 h-px bg-line-subtle min-w-[8px]" />}
            </div>
          ))}
        </div>

        {/* ── Step 0: Campaign Type ── */}
        {step === 0 && (
          <div className="flex flex-col gap-4">
            <p className="text-[13px] text-fg-secondary">
              Choose how milestone approvals and donor access will work for this campaign.
            </p>

            {/* Public card */}
            <button
              onClick={() => setCampaignType(CampaignType.Public)}
              className={`w-full rounded-xl border-2 p-4 text-left transition-colors ${
                campaignType === CampaignType.Public
                  ? "border-accent-primary bg-accent-light"
                  : "border-line-subtle bg-surface-primary hover:border-accent-primary/40"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                  campaignType === CampaignType.Public ? "bg-accent-primary" : "bg-surface-sage"
                }`}>
                  <Globe className={`h-4 w-4 ${campaignType === CampaignType.Public ? "text-white" : "text-fg-muted"}`} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-semibold text-fg-primary">Public Campaign</span>
                  {campaignType === CampaignType.Public && (
                    <span className="text-[11px] font-medium bg-accent-primary text-white px-2 py-0.5 rounded-full">Selected</span>
                  )}
                </div>
              </div>
              <ul className="flex flex-col gap-1 pl-1">
                {["Listed on the browse page", "66% community approval for milestone releases", "Open to all donors", "Community-voted fund releases"].map(f => (
                  <li key={f} className="flex items-center gap-2 text-[12px] text-fg-secondary">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent-primary flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </button>

            {/* Private card */}
            <button
              onClick={() => setCampaignType(CampaignType.Private)}
              className={`w-full rounded-xl border-2 p-4 text-left transition-colors ${
                campaignType === CampaignType.Private
                  ? "border-accent-primary bg-accent-light"
                  : "border-line-subtle bg-surface-primary hover:border-accent-primary/40"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                  campaignType === CampaignType.Private ? "bg-accent-primary" : "bg-surface-sage"
                }`}>
                  <Lock className={`h-4 w-4 ${campaignType === CampaignType.Private ? "text-white" : "text-fg-muted"}`} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-semibold text-fg-primary">Private Campaign</span>
                  {campaignType === CampaignType.Private && (
                    <span className="text-[11px] font-medium bg-accent-primary text-white px-2 py-0.5 rounded-full">Selected</span>
                  )}
                </div>
              </div>
              <ul className="flex flex-col gap-1 pl-1">
                {["Unlisted — share via link only", "Designated approvers (2–5 wallets)", "Multi-sig milestone approval (M-of-N)", "Suitable for nonprofits & faith-based orgs"].map(f => (
                  <li key={f} className="flex items-center gap-2 text-[12px] text-fg-secondary">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent-primary flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </button>
          </div>
        )}

        {/* ── Step 1: Basic Info ── */}
        {step === 1 && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-fg-primary">Campaign Name</label>
              <input
                type="text"
                placeholder="e.g. Build a School in Rural Kenya"
                className="h-[42px] rounded-lg bg-surface-primary border border-line-subtle px-3.5 text-[13px] text-fg-primary placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-accent-primary/20"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-fg-primary">Category</label>
              <div className="h-[42px] rounded-lg bg-surface-primary border border-line-subtle px-3.5 flex items-center justify-between">
                <span className="text-[13px] text-fg-muted">Select category</span>
                <ChevronDown className="h-4 w-4 text-fg-muted" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-fg-primary">Funding Goal</label>
              <div className="h-[42px] rounded-lg bg-surface-primary border border-line-subtle px-3.5 flex items-center justify-between">
                <span className="text-[13px] text-fg-muted">0.00</span>
                <span className="text-[13px] font-semibold text-fg-muted">USDT</span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-fg-primary">Deadline</label>
              <div className="h-[42px] rounded-lg bg-surface-primary border border-line-subtle px-3.5 flex items-center justify-between">
                <span className="text-[13px] text-fg-muted">Select end date</span>
                <Calendar className="h-4 w-4 text-fg-muted" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-fg-primary">Description</label>
              <div className="h-[100px] rounded-lg bg-surface-primary border border-line-subtle px-3.5 py-3">
                <span className="text-[13px] text-fg-muted">Describe your campaign goals and how the funds will be used...</span>
              </div>
            </div>

            {/* Approvers — Private campaigns only */}
            {campaignType === CampaignType.Private && (
              <div className="flex flex-col gap-3 rounded-xl border border-line-subtle p-4 bg-surface-sage">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-accent-primary" />
                  <span className="text-[13px] font-semibold text-fg-primary">Approver Wallets</span>
                  <span className="text-[11px] text-fg-muted ml-auto">min 2 · max 5</span>
                </div>
                <p className="text-[12px] text-fg-secondary">
                  These wallet addresses will sign off on each milestone before funds release.
                </p>
                {approvers.map((addr, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={addr}
                      onChange={e => updateApprover(i, e.target.value)}
                      placeholder={`Approver ${i + 1} — 0x…`}
                      className="flex-1 h-[38px] rounded-lg bg-white border border-line-subtle px-3 text-[12px] font-mono text-fg-primary placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-accent-primary/20"
                    />
                    {approvers.length > 2 && (
                      <button onClick={() => removeApprover(i)} className="shrink-0">
                        <Trash2 className="h-4 w-4 text-error" />
                      </button>
                    )}
                  </div>
                ))}
                {approvers.length < 5 && (
                  <button
                    onClick={addApprover}
                    className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-line-subtle py-2 text-[12px] font-medium text-accent-primary hover:bg-white/60 transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Approver
                  </button>
                )}
                <div className="flex items-center gap-3 pt-1">
                  <span className="text-[12px] font-medium text-fg-secondary">Required approvals:</span>
                  <select
                    value={requiredApprovals}
                    onChange={e => setRequiredApprovals(Number(e.target.value))}
                    className="h-[34px] rounded-lg bg-white border border-line-subtle px-2.5 text-[12px] text-fg-primary focus:outline-none"
                  >
                    {Array.from({ length: approvers.length }, (_, i) => i + 1).map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                  <span className="text-[12px] text-fg-muted">of {approvers.length} approvers</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Step 2: Milestones ── */}
        {step === 2 && (
          <div className="flex flex-col gap-4">
            <p className="text-[13px] text-fg-secondary">
              {campaignType === CampaignType.Private
                ? "Break your campaign into milestones. Funds release when your designated approvers sign off on each milestone."
                : "Break your campaign into milestones. Funds are released when the community approves each milestone."}
            </p>
            {milestones.map((ms, i) => (
              <div key={i} className="bg-surface-sage rounded-xl p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-semibold text-fg-primary">Milestone {i + 1}</span>
                  {milestones.length > 1 && (
                    <button onClick={() => removeMilestone(i)}>
                      <Trash2 className="h-4 w-4 text-error" />
                    </button>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-medium text-fg-muted">Title</label>
                  <input
                    type="text"
                    value={ms.title}
                    onChange={e => updateMilestone(i, "title", e.target.value)}
                    placeholder="e.g. Land acquisition"
                    className="h-[38px] rounded-lg bg-white border border-line-subtle px-3 text-[13px] text-fg-primary placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-accent-primary/20"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-medium text-fg-muted">Amount (USDT)</label>
                  <input
                    type="text"
                    value={ms.amount}
                    onChange={e => updateMilestone(i, "amount", e.target.value)}
                    placeholder="0.00"
                    className="h-[38px] rounded-lg bg-white border border-line-subtle px-3 text-[13px] text-fg-primary placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-accent-primary/20"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-medium text-fg-muted">Description</label>
                  <textarea
                    value={ms.description}
                    onChange={e => updateMilestone(i, "description", e.target.value)}
                    placeholder="What will be accomplished..."
                    className="h-[60px] rounded-lg bg-white border border-line-subtle px-3 py-2 text-[13px] text-fg-primary placeholder:text-fg-muted resize-none focus:outline-none focus:ring-2 focus:ring-accent-primary/20"
                  />
                </div>
              </div>
            ))}
            <button
              onClick={addMilestone}
              className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-line-subtle py-2.5 text-[13px] font-medium text-accent-primary hover:bg-surface-sage transition-colors"
            >
              <Plus className="h-4 w-4" /> Add Milestone
            </button>
          </div>
        )}

        {/* ── Step 3: Review ── */}
        {step === 3 && !submitted && (
          <div className="flex flex-col gap-4">
            <div className="bg-surface-sage rounded-xl p-4 flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-fg-primary">Campaign Summary</h3>
              <div className="flex justify-between text-[13px]">
                <span className="text-fg-muted">Name</span>
                <span className="font-medium text-fg-primary">Build a School in Rural Kenya</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-fg-muted">Type</span>
                <span className={`font-medium flex items-center gap-1.5 ${campaignType === CampaignType.Private ? "text-accent-primary" : "text-fg-primary"}`}>
                  {campaignType === CampaignType.Private ? <Lock className="h-3.5 w-3.5" /> : <Globe className="h-3.5 w-3.5" />}
                  {campaignType === CampaignType.Private ? "Private (Unlisted)" : "Public"}
                </span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-fg-muted">Category</span>
                <span className="font-medium text-fg-primary">Education</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-fg-muted">Goal</span>
                <span className="font-medium text-fg-primary">150,000 USDT</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-fg-muted">Deadline</span>
                <span className="font-medium text-fg-primary">Dec 31, 2026</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-fg-muted">Milestones</span>
                <span className="font-medium text-fg-primary">{milestones.length}</span>
              </div>
            </div>

            {/* Private-only: approvers summary */}
            {campaignType === CampaignType.Private && (
              <div className="bg-surface-sage rounded-xl p-4 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-accent-primary" />
                  <h3 className="text-sm font-semibold text-fg-primary">Multi-Sig Approvers</h3>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-fg-muted">Visibility</span>
                  <span className="font-medium text-fg-primary">Unlisted — share via link</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-fg-muted">Required</span>
                  <span className="font-medium text-fg-primary">{requiredApprovals} of {approvers.length} approvers</span>
                </div>
                {approvers.filter(a => a).map((a, i) => (
                  <div key={i} className="flex justify-between text-[13px]">
                    <span className="text-fg-muted">Approver {i + 1}</span>
                    <span className="font-mono text-fg-primary text-[12px]">{a || "0x…"}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-xl p-3.5 text-[12px] font-medium text-[#92400E]">
              {campaignType === CampaignType.Private
                ? "Private campaigns are unlisted. Only donors with your access link can find and donate. No platform fee — 100% of donations go to your charity."
                : "Once submitted, the campaign will be reviewed by the community. A 2% platform fee applies (1% when donors pay with SANC)."}
            </div>
          </div>
        )}

        {/* ── Step 3: Post-submit access link (private only) ── */}
        {step === 3 && submitted && (
          <div className="flex flex-col items-center gap-5">
            <div className="h-16 w-16 rounded-full bg-[#DCFCE7] flex items-center justify-center">
              <Check className="h-8 w-8 text-[#16A34A]" />
            </div>
            <div className="text-center">
              <h3 className="text-[18px] font-bold text-fg-primary mb-1">
                {campaignType === CampaignType.Private ? "Private Campaign Created" : "Campaign Submitted"}
              </h3>
              <p className="text-[13px] text-fg-secondary">
                {campaignType === CampaignType.Private
                  ? "Share the link below with your donors to accept contributions."
                  : "Your campaign is pending community review."}
              </p>
            </div>

            {campaignType === CampaignType.Private && (
              <div className="w-full flex flex-col gap-2">
                <span className="text-[12px] font-semibold text-fg-secondary">Donor Access Link</span>
                <div className="flex items-center gap-2 bg-surface-primary border border-line-subtle rounded-lg px-3.5 py-2.5">
                  <Link2 className="h-4 w-4 text-accent-primary flex-shrink-0" />
                  <span className="flex-1 text-[12px] font-mono text-fg-primary truncate">
                    /charity/campaign/preview?access={accessToken}
                  </span>
                  <button
                    onClick={() => navigator.clipboard.writeText(`/charity/campaign/preview?access=${accessToken}`)}
                    className="flex items-center gap-1 text-[12px] font-medium text-accent-primary hover:text-accent-primary/80"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    Copy
                  </button>
                </div>
                <p className="text-[11px] text-fg-muted">
                  Only donors with this link can view and donate to this campaign.
                </p>
              </div>
            )}

            <button
              onClick={() => router.push("/charity/manage")}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-accent-primary px-6 py-3 text-sm font-semibold text-fg-inverse"
            >
              Back to Dashboard <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Footer navigation */}
        {!(step === 3 && submitted) && (
          <div className="flex items-center justify-between">
            {step === 0 ? (
              <button
                onClick={() => router.push("/charity/manage")}
                className="rounded-lg border border-line-subtle px-6 py-3 text-sm font-semibold text-fg-secondary"
              >
                Cancel
              </button>
            ) : (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 rounded-lg border border-line-subtle px-6 py-3 text-sm font-semibold text-fg-secondary"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
            )}

            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="flex items-center gap-2 rounded-lg bg-accent-primary px-6 py-3 text-sm font-semibold text-fg-inverse"
              >
                Next: {STEPS[step + 1]} <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <ComingSoonOverlay action="Submit campaign">
                <button
                  onClick={() => { if (canSubmit) setSubmitted(true); }}
                  disabled={!canSubmit}
                  className="flex items-center gap-2 rounded-lg bg-accent-primary px-6 py-3 text-sm font-semibold text-fg-inverse disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Campaign <ArrowRight className="h-4 w-4" />
                </button>
              </ComingSoonOverlay>
            )}
          </div>
        )}

        <p className="text-xs italic text-fg-muted text-center">Only verified charities can create campaigns</p>
      </div>
    </div>
  );
}
