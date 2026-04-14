import { ImpactData, CampaignCategory } from "@/types/charity";

export const mockImpactData: ImpactData = {
  totalDonationsUSD: 2847350,
  totalDonors: 18492,
  totalCampaigns: 127,
  completedCampaigns: 86,
  sancBurned: "4200000000000000",
  matchingFundBalance: "45200000000000000000",
  categoryBreakdown: [
    { category: CampaignCategory.Education, percentage: 28, totalUSD: 797258, count: 36 },
    { category: CampaignCategory.Health, percentage: 22, totalUSD: 626417, count: 28 },
    { category: CampaignCategory.Environment, percentage: 18, totalUSD: 512523, count: 23 },
    { category: CampaignCategory.DisasterRelief, percentage: 13, totalUSD: 370156, count: 17 },
    { category: CampaignCategory.Community, percentage: 8, totalUSD: 227788, count: 10 },
    { category: CampaignCategory.AnimalWelfare, percentage: 5, totalUSD: 142368, count: 6 },
    { category: CampaignCategory.Technology, percentage: 4, totalUSD: 113894, count: 5 },
    { category: CampaignCategory.ArtsCulture, percentage: 2, totalUSD: 56947, count: 2 },
  ],
  monthlyDonations: [
    { month: "Nov", amountUSD: 280000 },
    { month: "Dec", amountUSD: 320000 },
    { month: "Jan", amountUSD: 395000 },
    { month: "Feb", amountUSD: 310000 },
    { month: "Mar", amountUSD: 460000 },
    { month: "Apr", amountUSD: 482100 },
  ],
};

export const mockPlatformStats = {
  totalDonated: "$2.4M+",
  totalDonors: "12,847",
  campaignsCompleted: "86",
  sancBurned: "1.2B",
};
