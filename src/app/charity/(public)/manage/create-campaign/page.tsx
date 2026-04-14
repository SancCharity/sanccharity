"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ComingSoonOverlay } from "@/components/ui/ComingSoonOverlay";
import { X, ChevronDown, Calendar, Plus, Trash2, ArrowRight, ArrowLeft, Check } from "lucide-react";

const steps = ["Basic Info", "Milestones", "Review"];

export default function CreateCampaignPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [milestones, setMilestones] = useState([
    { title: "", amount: "", description: "" },
  ]);

  const addMilestone = () => {
    setMilestones([...milestones, { title: "", amount: "", description: "" }]);
  };

  const removeMilestone = (idx: number) => {
    setMilestones(milestones.filter((_, i) => i !== idx));
  };

  return (
    <div className="min-h-screen bg-surface-primary flex items-start justify-center py-12 px-4">
      <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] p-8 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-[22px] font-bold text-fg-primary">Create New Campaign</h1>
          <button onClick={() => router.push("/charity/manage")}>
            <X className="h-6 w-6 text-fg-muted" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  i <= step
                    ? "bg-accent-primary text-fg-inverse"
                    : "bg-surface-sage text-fg-muted"
                }`}>
                  {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </div>
                <span className={`text-[13px] ${
                  i <= step ? "font-semibold text-accent-primary" : "font-medium text-fg-muted"
                }`}>
                  {s}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="flex-1 h-px bg-line-subtle min-w-[20px]" />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Basic Info */}
        {step === 0 && (
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
          </div>
        )}

        {/* Step 2: Milestones */}
        {step === 1 && (
          <div className="flex flex-col gap-4">
            <p className="text-[13px] text-fg-secondary">
              Break your campaign into milestones. Funds are released when the community approves each milestone.
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
                    placeholder="e.g. Land acquisition"
                    className="h-[38px] rounded-lg bg-white border border-line-subtle px-3 text-[13px] text-fg-primary placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-accent-primary/20"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-medium text-fg-muted">Amount (USDT)</label>
                  <input
                    type="text"
                    placeholder="0.00"
                    className="h-[38px] rounded-lg bg-white border border-line-subtle px-3 text-[13px] text-fg-primary placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-accent-primary/20"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-medium text-fg-muted">Description</label>
                  <textarea
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

        {/* Step 3: Review */}
        {step === 2 && (
          <div className="flex flex-col gap-4">
            <div className="bg-surface-sage rounded-xl p-4 flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-fg-primary">Campaign Summary</h3>
              <div className="flex justify-between text-[13px]">
                <span className="text-fg-muted">Name</span>
                <span className="font-medium text-fg-primary">Build a School in Rural Kenya</span>
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
                <span className="font-medium text-fg-primary">3</span>
              </div>
            </div>
            <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-xl p-3.5 text-[12px] font-medium text-[#92400E]">
              Once submitted, the campaign will be reviewed by the community. A 2% platform fee applies to all donations.
            </div>
          </div>
        )}

        {/* Footer */}
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

          {step < 2 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-2 rounded-lg bg-accent-primary px-6 py-3 text-sm font-semibold text-fg-inverse"
            >
              Next: {steps[step + 1]} <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <ComingSoonOverlay action="Submit campaign for review">
              <button className="flex items-center gap-2 rounded-lg bg-accent-primary px-6 py-3 text-sm font-semibold text-fg-inverse">
                Submit Campaign <ArrowRight className="h-4 w-4" />
              </button>
            </ComingSoonOverlay>
          )}
        </div>

        <p className="text-xs italic text-fg-muted text-center">Only verified charities can create campaigns</p>
      </div>
    </div>
  );
}
