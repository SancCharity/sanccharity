import { CampaignSuggestion, CampaignCategory } from "@/types/charity";

const now = Math.floor(Date.now() / 1000);

export const mockCampaignSuggestions: CampaignSuggestion[] = [
  {
    id: "sug-1",
    suggesterAddress: "0xB4c1D2e3F4a5B6c7D8e9F0a1B2c3D4e5F6a7B8c9",
    title: "Solar Energy for Rural Schools in Sub-Saharan Africa",
    category: CampaignCategory.Education,
    description:
      "Install solar panels and battery storage at 20 off-grid schools across Kenya, Tanzania, and Uganda — enabling evening study and powering computers for 4,000+ students.",
    status: "pending",
    createdAt: now - 3 * 86400,
  },
  {
    id: "sug-2",
    suggesterAddress: "0xB4c1D2e3F4a5B6c7D8e9F0a1B2c3D4e5F6a7B8c9",
    title: "Ocean Plastic Removal — Southeast Asia",
    category: CampaignCategory.Environment,
    description:
      "Fund three ocean cleanup vessels operating in the waters between Indonesia, the Philippines, and Vietnam, targeting 500 tonnes of plastic per vessel annually.",
    status: "reviewed",
    createdAt: now - 14 * 86400,
  },
  {
    id: "sug-3",
    suggesterAddress: "0xB4c1D2e3F4a5B6c7D8e9F0a1B2c3D4e5F6a7B8c9",
    title: "Mental Health Clinics in Conflict Zones",
    category: CampaignCategory.Health,
    description:
      "Establish mobile mental health units staffed by trained counsellors in post-conflict regions across the Middle East and North Africa.",
    status: "accepted",
    createdAt: now - 30 * 86400,
  },
];
