"use client";

import {
  Clock4,
  Headphones,
  FileText,
  CircleCheck,
  ExternalLink,
  ShieldCheck,
  Pencil,
  Check,
  Wallet,
} from "lucide-react";
import { ComingSoonOverlay } from "@/components/ui/ComingSoonOverlay";

const steps = [
  { label: "Organization Info", status: "Completed", color: "text-[#16A34A]", bg: "bg-[#DCFCE7]", iconColor: "text-[#16A34A]" },
  { label: "Documents", status: "Completed", color: "text-[#16A34A]", bg: "bg-[#DCFCE7]", iconColor: "text-[#16A34A]" },
  { label: "Wallet Verification", status: "Completed", color: "text-[#16A34A]", bg: "bg-[#DCFCE7]", iconColor: "text-[#16A34A]" },
  { label: "Admin Review", status: "In Progress", color: "text-[#D97706]", bg: "bg-[#FEF3C7]", iconColor: "text-[#D97706]" },
];

const orgFields = [
  [
    { label: "Organization Name", value: "Hope Foundation", link: false },
    { label: "Registration Number", value: "NGO-2024-0847", link: false },
    { label: "Country", value: "Nigeria", link: false },
  ],
  [
    { label: "Contact Email", value: "admin@hopefoundation.org", link: true },
    { label: "Organization Type", value: "Non-Profit (NGO)", link: false },
    { label: "Website", value: "hopefoundation.org", link: true },
  ],
];

const documents = [
  { name: "Certificate of Registration", size: "PDF · 2.4 MB" },
  { name: "Tax Exemption Letter", size: "PDF · 1.8 MB" },
  { name: "Board Resolution", size: "PDF · 956 KB" },
];

const timeline = [
  { event: "Documents submitted for review", date: "Apr 8, 2026 · 2:34 PM", dotColor: "bg-[#D97706]", ringColor: "ring-[#FEF3C7]" },
  { event: "Wallet verification completed", date: "Apr 7, 2026 · 11:15 AM", dotColor: "bg-[#16A34A]", ringColor: "ring-[#DCFCE7]" },
  { event: "Organization details submitted", date: "Apr 6, 2026 · 4:20 PM", dotColor: "bg-[#16A34A]", ringColor: "ring-[#DCFCE7]" },
  { event: "KYC application started", date: "Apr 6, 2026 · 3:45 PM", dotColor: "bg-fg-muted", ringColor: "ring-line-subtle" },
];

export default function KYCVerificationPage() {
  return (
    <div className="flex flex-col gap-6 px-12 py-8 max-w-[1344px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-[28px] font-bold text-fg-primary">KYC Verification</h1>
          <p className="text-sm text-fg-secondary">Manage your organization&apos;s identity verification</p>
        </div>
        <ComingSoonOverlay action="Contact Support">
          <button className="flex items-center gap-2 border border-line-subtle rounded-lg px-5 py-2.5 bg-white">
            <Headphones className="h-4 w-4 text-fg-secondary" />
            <span className="text-sm font-medium text-fg-secondary">Contact Support</span>
          </button>
        </ComingSoonOverlay>
      </div>

      {/* Status Banner */}
      <div className="flex items-center justify-between bg-[#FFFBEB] border border-[#FDE68A] rounded-2xl px-6 py-5">
        <div className="flex items-center gap-3.5">
          <div className="h-11 w-11 rounded-xl bg-[#FEF3C7] flex items-center justify-center">
            <Clock4 className="h-[22px] w-[22px] text-[#D97706]" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-lg font-bold text-[#92400E]">KYC Under Review</span>
            <span className="text-[13px] text-[#A16207]">Your verification documents are being reviewed. Estimated: 2–3 business days.</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-[#92400E] bg-[#FEF3C7] border border-[#FDE68A] rounded-full px-3.5 py-1.5">
            <span className="h-2 w-2 rounded-full bg-[#D97706]" />
            Pending Review
          </span>
          <span className="text-xs text-[#A16207]">Submitted: Apr 8, 2026</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Left Column */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Verification Progress */}
          <div className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col gap-5">
            <span className="text-base font-bold text-fg-primary">Verification Progress</span>
            <div className="flex items-start">
              {steps.map((step, i) => (
                <div key={step.label} className="flex items-center flex-1">
                  <div className="flex flex-col items-center gap-2 flex-1">
                    <div className={`h-10 w-10 rounded-full ${step.bg} flex items-center justify-center`}>
                      {step.status === "Completed" ? (
                        <Check className={`h-5 w-5 ${step.iconColor}`} />
                      ) : (
                        <Clock4 className={`h-5 w-5 ${step.iconColor}`} />
                      )}
                    </div>
                    <span className="text-xs font-semibold text-fg-primary text-center">{step.label}</span>
                    <span className={`text-[11px] font-medium ${step.color}`}>{step.status}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`h-0.5 w-[60px] -mt-8 flex-shrink-0 ${i < 2 ? "bg-[#16A34A]" : "bg-[#D97706]"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Organization Details */}
          <div className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-base font-bold text-fg-primary">Organization Details</span>
              <ComingSoonOverlay action="Edit Organization Details">
                <button className="flex items-center gap-1.5 border border-line-subtle rounded-lg px-3 py-1.5">
                  <Pencil className="h-3.5 w-3.5 text-fg-muted" />
                  <span className="text-xs font-medium text-fg-secondary">Edit</span>
                </button>
              </ComingSoonOverlay>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {orgFields.map((col, ci) => (
                <div key={ci} className="flex flex-col gap-4">
                  {col.map((field) => (
                    <div key={field.label} className="flex flex-col gap-1">
                      <span className="text-xs font-medium text-fg-muted">{field.label}</span>
                      <span className={`text-sm font-semibold ${field.link ? "text-accent-primary" : "text-fg-primary"}`}>
                        {field.value}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-[380px] flex flex-col gap-6 flex-shrink-0">
          {/* Submitted Documents */}
          <div className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-base font-bold text-fg-primary">Submitted Documents</span>
              <span className="text-[11px] font-semibold text-[#16A34A] bg-[#DCFCE7] rounded-full px-2.5 py-1">3/3 Uploaded</span>
            </div>
            {documents.map((doc) => (
              <div key={doc.name} className="flex items-center justify-between bg-surface-sage rounded-lg px-3.5 py-3">
                <div className="flex items-center gap-2.5">
                  <FileText className="h-[18px] w-[18px] text-accent-primary" />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[13px] font-semibold text-fg-primary">{doc.name}</span>
                    <span className="text-[11px] text-fg-muted">{doc.size}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CircleCheck className="h-4 w-4 text-[#16A34A]" />
                  <ExternalLink className="h-3.5 w-3.5 text-accent-primary" />
                </div>
              </div>
            ))}
          </div>

          {/* Wallet Verification */}
          <div className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col gap-4">
            <span className="text-base font-bold text-fg-primary">Wallet Verification</span>
            <div className="flex items-center justify-between bg-surface-sage rounded-lg px-4 py-3.5">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-lg bg-accent-light flex items-center justify-center">
                  <Wallet className="h-5 w-5 text-accent-primary" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[11px] font-medium text-fg-muted">Connected Wallet</span>
                  <span className="text-sm font-semibold text-fg-primary">0x7a3B...9f2E</span>
                </div>
              </div>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-[#16A34A] bg-[#DCFCE7] rounded-full px-2.5 py-1">
                <ShieldCheck className="h-3 w-3" />
                Verified
              </span>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04] flex flex-col gap-4">
            <span className="text-base font-bold text-fg-primary">Activity Timeline</span>
            {timeline.map((t) => (
              <div key={t.event} className="flex items-start gap-3">
                <div className={`h-2.5 w-2.5 rounded-full ${t.dotColor} ring-[3px] ${t.ringColor} mt-1.5 flex-shrink-0`} />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[13px] font-medium text-fg-primary">{t.event}</span>
                  <span className="text-[11px] text-fg-muted">{t.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
