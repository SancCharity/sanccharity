import { RefundClaim, TaxSummary } from "@/types/charity";

const now = Math.floor(Date.now() / 1000);

export const mockRefundClaims: RefundClaim[] = [
  {
    campaignId: "7",
    campaignName: "Urban Garden Initiative",
    token: "0x0000000000000000000000000000000000000000",
    tokenSymbol: "BNB",
    refundAmount: "1200000000000000000",
    refundAmountUSD: 750,
    status: "claimable",
    cancelledAt: now - 5 * 86400,
  },
  {
    campaignId: "8",
    campaignName: "Coastal Cleanup Network",
    token: "0x55d398326f99059fF775485246999027B3197955",
    tokenSymbol: "USDT",
    refundAmount: "200000000000000000000",
    refundAmountUSD: 200,
    status: "claimed",
    cancelledAt: now - 30 * 86400,
  },
];

export const mockTaxSummary: TaxSummary = {
  year: 2026,
  totalDonatedUSD: 6312,
  totalTransactions: 4,
  uniqueCharities: 2,
  donations: [
    { campaignName: "School Building in Rural Kenya", charityName: "Kenya Education Trust", amountUSD: 3125, date: new Date((now - 7200) * 1000).toISOString().split("T")[0], token: "BNB" },
    { campaignName: "Medical Aid for Gaza", charityName: "Global Health Initiative", amountUSD: 1250, date: new Date((now - 18000) * 1000).toISOString().split("T")[0], token: "SANC" },
    { campaignName: "School Building in Rural Kenya", charityName: "Kenya Education Trust", amountUSD: 937, date: new Date((now - 86400) * 1000).toISOString().split("T")[0], token: "BNB" },
    { campaignName: "School Building in Rural Kenya", charityName: "Kenya Education Trust", amountUSD: 1000, date: new Date((now - 518400) * 1000).toISOString().split("T")[0], token: "BUSD" },
  ],
};
