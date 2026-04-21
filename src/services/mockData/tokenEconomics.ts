import {
  TokenEconomics,
  OrgTypeStats,
  RefundStats,
  BenchmarkData,
  NFTMintStats,
  OrgType,
} from "@/types/charity";

export const mockTokenEconomics: TokenEconomics = {
  donationSplit: [
    { token: "BNB",  symbol: "BNB",  amountUSD: 1_740_000, percentage: 61, donorCount: 9_847 },
    { token: "SANC", symbol: "SANC", amountUSD:   656_350, percentage: 23, donorCount: 4_291 },
    { token: "USDT", symbol: "USDT", amountUSD:   451_000, percentage: 16, donorCount: 4_354 },
  ],
  feeDiscountUptakePercent: 34,
  totalFeeSavedUSD: 8_240,
  sancBurnedLifetime: 4_200_000,
  burnRateMonthly: 287_000,
  stakingConcentration: {
    topTenPercent: 48,
    uniqueStakers: 1_847,
    avgStakeUSD: 1_290,
    giniCoefficient: 0.61,
  },
  registrationStakeTotalUSD: 23_500,
  stakeHistory: [
    { month: "Nov", valueUSD: 18_200 },
    { month: "Dec", valueUSD: 19_800 },
    { month: "Jan", valueUSD: 22_100 },
    { month: "Feb", valueUSD: 20_600 },
    { month: "Mar", valueUSD: 21_900 },
    { month: "Apr", valueUSD: 23_500 },
  ],
};

export const mockOrgTypeStats: OrgTypeStats[] = [
  {
    orgType: OrgType.Nonprofit,
    label: "Nonprofit",
    charityCount: 28,
    totalRaisedUSD: 1_920_000,
    avgCampaignSizeUSD: 68_500,
    milestoneApprovalRate: 84,
    avgTrustScore: 87,
  },
  {
    orgType: OrgType.Church,
    label: "Church / Faith-based",
    charityCount: 12,
    totalRaisedUSD: 640_000,
    avgCampaignSizeUSD: 53_300,
    milestoneApprovalRate: 79,
    avgTrustScore: 82,
  },
  {
    orgType: OrgType.SocialEnterprise,
    label: "Social Enterprise",
    charityCount: 7,
    totalRaisedUSD: 287_000,
    avgCampaignSizeUSD: 41_000,
    milestoneApprovalRate: 71,
    avgTrustScore: 74,
  },
];

export const mockRefundStats: RefundStats = {
  totalRefundClaims: 143,
  totalRefundedUSD: 48_320,
  failedCampaigns: 9,
  cancelledCampaigns: 14,
  failureRatePercent: 7.1,
  avgRefundDays: 2.4,
  refundsByMonth: [
    { month: "Nov", count: 18, amountUSD: 6_200 },
    { month: "Dec", count: 24, amountUSD: 8_400 },
    { month: "Jan", count: 31, amountUSD: 11_200 },
    { month: "Feb", count: 22, amountUSD: 7_800 },
    { month: "Mar", count: 27, amountUSD: 9_320 },
    { month: "Apr", count: 21, amountUSD: 5_400 },
  ],
};

export const mockBenchmarks: BenchmarkData[] = [
  { metric: "milestoneApprovalRate", label: "Milestone Approval Rate", charityValue: 91,  platformAverage: 78, unit: "%",    higherIsBetter: true  },
  { metric: "avgDonationUSD",        label: "Avg Donation Size",       charityValue: 142, platformAverage: 98, unit: "USD",  higherIsBetter: true  },
  { metric: "donorRetention",        label: "Donor Return Rate",       charityValue: 38,  platformAverage: 31, unit: "%",    higherIsBetter: true  },
  { metric: "campaignFundingRate",   label: "Campaign Funding Rate",   charityValue: 83,  platformAverage: 72, unit: "%",    higherIsBetter: true  },
  { metric: "avgDaysToMilestone",    label: "Avg Days to Milestone",   charityValue: 18,  platformAverage: 24, unit: "days", higherIsBetter: false },
];

export const mockNFTMintStats: NFTMintStats = {
  totalMinted: 18_492,
  bronze: 11_847,
  silver: 4_832,
  gold: 1_813,
};

// Stake value tracker — per-charity breakdown
export const mockStakeValueTracker = [
  { name: "Kenya Education Trust",   sancStaked: "18,000,000", currentUSD: 1_080, change30d: +12.4, tier: "Tier 2 — 6 mo" },
  { name: "Hope Foundation",         sancStaked: "58,000,000", currentUSD: 3_480, change30d: +12.4, tier: "Tier 2 — 6 mo" },
  { name: "Community Aid Network",   sancStaked:  "5,000,000", currentUSD:   300, change30d: -3.1,  tier: "Tier 0 — 1 mo" },
  { name: "Rural Health Initiative", sancStaked:  "1,000,000", currentUSD:    60, change30d: -3.1,  tier: "Below min ⚠" },
  { name: "Green Horizons",          sancStaked: "25,000,000", currentUSD: 1_500, change30d: +12.4, tier: "Tier 1 — 3 mo" },
];
