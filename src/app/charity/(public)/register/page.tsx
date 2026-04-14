"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  CloudUpload,
  ShieldCheck,
  LockOpen,
  Lock,
  FileCheck,
  ExternalLink,
  Clock4,
} from "lucide-react";
import { ComingSoonOverlay } from "@/components/ui/ComingSoonOverlay";

const STEPS = ["Charity Info", "KYC Documents", "Stake SANC", "Confirm"] as const;

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center w-full mb-8">
      {STEPS.map((label, i) => {
        const completed = current > i || current === 3;
        const active = current === i && current < 3;
        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex items-center gap-2">
              <div
                className={`h-7 w-7 rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 ${
                  completed
                    ? "bg-[#DCFCE7] text-[#16A34A]"
                    : active
                    ? "bg-[#0EA5E9] text-white"
                    : "bg-[#F8FAFC] border-[1.5px] border-[#E2E8F0] text-[#94A3B8]"
                }`}
              >
                {completed ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span
                className={`text-[13px] whitespace-nowrap ${
                  completed
                    ? "font-semibold text-[#16A34A]"
                    : active
                    ? "font-semibold text-[#0EA5E9]"
                    : "font-medium text-[#94A3B8]"
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`flex-1 h-px mx-3 ${
                  current > i ? "bg-[#16A34A]" : "bg-[#E2E8F0]"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step 1 – Charity Info                                             */
/* ------------------------------------------------------------------ */
function StepCharityInfo({ onNext }: { onNext: () => void }) {
  return (
    <>
      <h2 className="text-[24px] font-bold text-[#0F172A]">Register Your Charity</h2>
      <p className="text-[14px] text-[#475569] mt-1 mb-6">
        Complete the following steps to register on the SancCharity platform
      </p>

      <div className="flex flex-col gap-[18px]">
        {/* Organization Name */}
        <div>
          <label className="block text-[13px] font-semibold text-[#475569] mb-1.5">
            Organization Name
          </label>
          <input
            type="text"
            placeholder="e.g. Hope Foundation"
            className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3.5 py-3 text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:border-[#0EA5E9]"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-[13px] font-semibold text-[#475569] mb-1.5">
            Description
          </label>
          <textarea
            placeholder="Describe your organization's mission and goals..."
            className="w-full h-20 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3.5 py-3 text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:border-[#0EA5E9] resize-none"
          />
        </div>

        {/* Logo Upload */}
        <div>
          <label className="block text-[13px] font-semibold text-[#475569] mb-1.5">
            Organization Logo
          </label>
          <div className="h-[100px] bg-[#F8FAFC] border-[1.5px] border-[#E2E8F0] rounded-lg flex flex-col items-center justify-center cursor-pointer">
            <CloudUpload className="h-8 w-8 text-[#94A3B8] mb-1.5" />
            <span className="text-[13px] text-[#94A3B8]">
              Click to upload logo (PNG, JPG, max 5MB)
            </span>
          </div>
        </div>

        {/* Website + Category row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-semibold text-[#475569] mb-1.5">
              Website URL
            </label>
            <input
              type="url"
              placeholder="https://"
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3.5 py-3 text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:border-[#0EA5E9]"
            />
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-[#475569] mb-1.5">
              Category
            </label>
            <select className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3.5 py-3 text-[14px] text-[#0F172A] outline-none focus:border-[#0EA5E9] appearance-none">
              <option value="">Select category</option>
              <option>Education</option>
              <option>Health</option>
              <option>Environment</option>
              <option>Disaster Relief</option>
              <option>Community</option>
              <option>Infrastructure</option>
            </select>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end mt-8">
        <ComingSoonOverlay action="Charity registration">
          <button
            className="flex items-center gap-2 bg-[#0EA5E9] text-white rounded-lg px-7 py-3 text-[14px] font-medium hover:bg-[#0EA5E9]/90 transition-colors"
            onClick={onNext}
          >
            Next: KYC Documents
            <ArrowRight className="h-4 w-4" />
          </button>
        </ComingSoonOverlay>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Step 2 – KYC Documents                                            */
/* ------------------------------------------------------------------ */
function StepKYC({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const docs = [
    {
      name: "Certificate of Registration",
      uploaded: true,
      file: "cert_registration.pdf · 1.1 GB",
    },
    { name: "Government-Issued ID", uploaded: false },
    { name: "Proof of Charity Status", uploaded: false },
  ];

  return (
    <>
      <h2 className="text-[24px] font-bold text-[#0F172A]">KYC Documents</h2>
      <p className="text-[14px] text-[#475569] mt-1 mb-6">
        Upload required verification documents. Accepted formats: PDF, JPG, PNG (max 10MB)
      </p>

      <div className="flex flex-col gap-4">
        {docs.map((doc) => (
          <div
            key={doc.name}
            className="bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] p-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-[14px] font-semibold text-[#0F172A]">{doc.name}</span>
              {doc.uploaded ? (
                <span className="text-[12px] font-medium text-[#16A34A] bg-[#DCFCE7] px-2.5 py-0.5 rounded-full">
                  Uploaded
                </span>
              ) : (
                <span className="text-[12px] font-medium text-[#DC2626] bg-[#FEF2F2] px-2.5 py-0.5 rounded-full">
                  Required
                </span>
              )}
            </div>
            {/* Upload area / file info */}
            {doc.uploaded ? (
              <div className="bg-[#F0F9FF] rounded-lg h-14 flex items-center px-4 text-[13px] text-[#0F172A]">
                {doc.file}
              </div>
            ) : (
              <div className="bg-[#F8FAFC] border-[1.5px] border-[#E2E8F0] rounded-lg h-14 flex items-center justify-center cursor-pointer">
                <span className="text-[13px] text-[#94A3B8]">
                  Click or drag to upload (PDF, JPG, PNG)
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 border border-[#E2E8F0] rounded-lg px-5 py-3 text-[14px] font-medium text-[#0F172A] hover:bg-[#F8FAFC] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <ComingSoonOverlay action="KYC document upload">
          <button
            className="flex items-center gap-2 bg-[#0EA5E9] text-white rounded-lg px-7 py-3 text-[14px] font-medium hover:bg-[#0EA5E9]/90 transition-colors"
            onClick={onNext}
          >
            Next: Stake SANC
            <ArrowRight className="h-4 w-4" />
          </button>
        </ComingSoonOverlay>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Step 3 – Stake SANC                                               */
/* ------------------------------------------------------------------ */
function StepStake({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <>
      <h2 className="text-[24px] font-bold text-[#0F172A]">Stake SANC</h2>
      <p className="text-[14px] text-[#475569] mt-1 mb-6">
        Secure your registration by staking SANC tokens
      </p>

      {/* Info banner */}
      <div className="bg-[#E0F2FE] rounded-xl p-4 flex gap-3 mb-6">
        <ShieldCheck className="h-5 w-5 text-[#0EA5E9] flex-shrink-0 mt-0.5" />
        <p className="text-[13px] text-[#0EA5E9] leading-relaxed">
          Staking 10,000,000 SANC secures your charity registration and demonstrates your
          commitment to the platform. Your stake is fully refundable after all campaigns are
          completed.
        </p>
      </div>

      {/* Stake details card */}
      <div className="bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] mb-6">
        <div className="flex items-center justify-between py-3.5 px-5">
          <span className="text-[14px] font-medium text-[#475569]">Required Stake</span>
          <span className="text-[14px] font-bold text-[#0F172A]">10,000,000 SANC</span>
        </div>
        <div className="h-px bg-[#E2E8F0]" />
        <div className="flex items-center justify-between py-3.5 px-5">
          <span className="text-[14px] font-medium text-[#475569]">Your SANC Balance</span>
          <span className="text-[14px] font-bold text-[#16A34A]">25,430,000 SANC</span>
        </div>
        <div className="h-px bg-[#E2E8F0]" />
        <div className="flex items-center justify-between py-3.5 px-5">
          <span className="text-[14px] font-medium text-[#475569]">Balance After Stake</span>
          <span className="text-[14px] font-semibold text-[#0F172A]">15,430,000 SANC</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-2.5 mb-8">
        <ComingSoonOverlay action="SANC token approval">
          <button className="w-full flex items-center justify-center gap-2 border-[1.5px] border-[#0EA5E9] rounded-lg py-3 text-[14px] font-medium text-[#0EA5E9] hover:bg-[#F0F9FF] transition-colors">
            <LockOpen className="h-4 w-4" />
            Approve SANC Spend
          </button>
        </ComingSoonOverlay>
        <ComingSoonOverlay action="SANC staking">
          <button
            className="w-full flex items-center justify-center gap-2 bg-[#0EA5E9] rounded-lg py-3 text-[14px] font-medium text-white hover:bg-[#0EA5E9]/90 transition-colors"
            onClick={onNext}
          >
            <Lock className="h-4 w-4" />
            Stake & Register
          </button>
        </ComingSoonOverlay>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 border border-[#E2E8F0] rounded-lg px-5 py-3 text-[14px] font-medium text-[#0F172A] hover:bg-[#F8FAFC] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <span className="text-[12px] italic text-[#94A3B8]">
          Stake is refundable after all campaigns complete
        </span>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Step 4 – Confirmation                                             */
/* ------------------------------------------------------------------ */
function StepConfirm() {
  return (
    <>
      {/* Success area */}
      <div className="flex flex-col items-center mt-2 mb-8">
        <div className="h-[72px] w-[72px] bg-[#DCFCE7] rounded-full flex items-center justify-center mb-5">
          <Check className="h-9 w-9 text-[#16A34A]" />
        </div>
        <h2 className="text-[24px] font-bold text-[#0F172A] mb-2">Registration Submitted!</h2>
        <p className="text-[14px] text-[#475569] text-center max-w-[400px]">
          Your application is pending KYC review by the SancCharity team
        </p>
      </div>

      {/* Details card */}
      <div className="bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] mb-5">
        <div className="flex items-center justify-between py-3 px-5">
          <span className="text-[14px] font-medium text-[#475569]">Organization</span>
          <span className="text-[14px] font-semibold text-[#0F172A]">Hope Foundation</span>
        </div>
        <div className="h-px bg-[#E2E8F0]" />
        <div className="flex items-center justify-between py-3 px-5">
          <span className="text-[14px] font-medium text-[#475569]">Documents</span>
          <span className="flex items-center gap-1.5 text-[14px] font-semibold text-[#0F172A]">
            <FileCheck className="h-4 w-4 text-[#16A34A]" />
            3/3 Uploaded
          </span>
        </div>
        <div className="h-px bg-[#E2E8F0]" />
        <div className="flex items-center justify-between py-3 px-5">
          <span className="text-[14px] font-medium text-[#475569]">Stake</span>
          <span className="text-[14px] font-semibold text-[#0F172A]">10,000,000 SANC</span>
        </div>
        <div className="h-px bg-[#E2E8F0]" />
        <div className="flex items-center justify-between py-3 px-5">
          <span className="text-[14px] font-medium text-[#475569]">Tx Hash</span>
          <span className="flex items-center gap-1.5 text-[14px] font-mono text-[#0EA5E9]">
            0x7a3B...3fd5
            <ExternalLink className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>

      {/* Review note */}
      <div className="bg-[#F0F9FF] rounded-xl p-3.5 flex items-start gap-3 mb-6">
        <Clock4 className="h-5 w-5 text-[#0EA5E9] flex-shrink-0 mt-0.5" />
        <p className="text-[13px] text-[#0EA5E9] leading-relaxed">
          Estimated review time: 2–3 business days. You&apos;ll be notified once your KYC is
          approved.
        </p>
      </div>

      {/* Dashboard button */}
      <Link
        href="/charity/manage"
        className="w-full flex items-center justify-center gap-2 bg-[#0EA5E9] text-white rounded-lg py-3.5 text-[14px] font-medium hover:bg-[#0EA5E9]/90 transition-colors"
      >
        Go to Dashboard
        <ArrowRight className="h-4 w-4" />
      </Link>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                          */
/* ------------------------------------------------------------------ */
export default function CharityRegisterPage() {
  const [step, setStep] = useState(0);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-start justify-center pt-12 pb-16 px-4">
      <div className="w-full max-w-[560px] bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-black/[0.04] p-10">
        <StepIndicator current={step} />

        {step === 0 && <StepCharityInfo onNext={() => setStep(1)} />}
        {step === 1 && <StepKYC onNext={() => setStep(2)} onBack={() => setStep(0)} />}
        {step === 2 && <StepStake onNext={() => setStep(3)} onBack={() => setStep(1)} />}
        {step === 3 && <StepConfirm />}
      </div>
    </div>
  );
}
