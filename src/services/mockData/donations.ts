import { Donation } from "@/types/charity";

const now = Math.floor(Date.now() / 1000);

export const mockDonations: Donation[] = [
  { id: "1", campaignId: "1", campaignName: "School Building in Rural Kenya", charityName: "Kenya Education Trust", donorAddress: "0x7a3F...e9B2", token: "0x0000000000000000000000000000000000000000", tokenSymbol: "BNB", amount: "5000000000000000000", amountUSD: 3125, feeAmount: "100000000000000000", txHash: "0x8f4a...3c2d", nftTokenId: 4821, timestamp: now - 7200 },
  { id: "2", campaignId: "3", campaignName: "Medical Aid for Gaza", charityName: "Global Health Initiative", donorAddress: "0xB4c1...3fA7", token: "0x4670f3a2A8D35021257cda028c7ae3Cb854C7CaF", tokenSymbol: "SANC", amount: "2500000000", amountUSD: 1250, feeAmount: "25000000", txHash: "0xa2b3...7d4e", nftTokenId: 4820, timestamp: now - 18000 },
  { id: "3", campaignId: "1", campaignName: "School Building in Rural Kenya", charityName: "Kenya Education Trust", donorAddress: "0x2eD8...71cF", token: "0x0000000000000000000000000000000000000000", tokenSymbol: "BNB", amount: "1500000000000000000", amountUSD: 937, feeAmount: "30000000000000000", txHash: "0xc5d6...9e0f", nftTokenId: 4819, timestamp: now - 86400 },
  { id: "4", campaignId: "2", campaignName: "Amazon Reforestation", charityName: "Green Earth Foundation", donorAddress: "0xFa92...8dE1", token: "0x4670f3a2A8D35021257cda028c7ae3Cb854C7CaF", tokenSymbol: "SANC", amount: "500000000", amountUSD: 250, feeAmount: "5000000", txHash: "0xe7f8...1a2b", nftTokenId: 4818, timestamp: now - 172800 },
  { id: "5", campaignId: "4", campaignName: "Tech Education Hub Lagos", charityName: "Code for Africa", donorAddress: "0x9c1A...b4D3", token: "0x0000000000000000000000000000000000000000", tokenSymbol: "BNB", amount: "3200000000000000000", amountUSD: 2000, feeAmount: "64000000000000000", txHash: "0x1c2d...5e6f", nftTokenId: 4817, timestamp: now - 259200 },
  { id: "6", campaignId: "3", campaignName: "Medical Aid for Gaza", charityName: "Global Health Initiative", donorAddress: "0x5dF4...2aB8", token: "0x55d398326f99059fF775485246999027B3197955", tokenSymbol: "USDT", amount: "500000000000000000000", amountUSD: 500, feeAmount: "10000000000000000000", txHash: "0x3e4f...7g8h", nftTokenId: 4816, timestamp: now - 345600 },
  { id: "7", campaignId: "6", campaignName: "Clean Water for Rural Communities", charityName: "Kenya Education Trust", donorAddress: "0xA1b2...C3d4", token: "0x0000000000000000000000000000000000000000", tokenSymbol: "BNB", amount: "2500000000000000000", amountUSD: 1562, feeAmount: "50000000000000000", txHash: "0x5i6j...9k0l", nftTokenId: 4815, timestamp: now - 432000 },
  { id: "8", campaignId: "1", campaignName: "School Building in Rural Kenya", charityName: "Kenya Education Trust", donorAddress: "0xD5e6...F7g8", token: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56", tokenSymbol: "BUSD", amount: "1000000000000000000000", amountUSD: 1000, feeAmount: "20000000000000000000", txHash: "0x7m8n...1o2p", nftTokenId: 4814, timestamp: now - 518400 },
];

export const mockRecentDonations = mockDonations.slice(0, 5);
