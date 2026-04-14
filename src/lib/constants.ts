export const PREVIEW_MODE = process.env.NEXT_PUBLIC_PREVIEW_MODE !== "false";

// Stake
export const STAKE_AMOUNT = 10_000_000;
export const STAKE_AMOUNT_RAW = "10000000000000000"; // 10M with 9 decimals

// Fees
export const PLATFORM_FEE_BPS = 200; // 2%
export const SANC_DISCOUNT_BPS = 100; // 1%
export const BUYBACK_BURN_PCT = 40;
export const MATCHING_FUND_PCT = 30;
export const OPERATIONS_PCT = 30;

// Governance
export const QUORUM_BPS = 6600; // 66%
export const VOTING_PERIOD_DAYS = 14;
export const UNSTAKE_COOLDOWN_DAYS = 3;

// Tier thresholds (SANC tokens)
export const TIER_STANDARD_MIN = 1_000_000;
export const TIER_FEATURED_MIN = 10_000_000;
export const TIER_ELITE_MIN = 50_000_000;

// Large donation warning
export const LARGE_DONATION_THRESHOLD_BNB = 10;

// Admin address (for preview mode role detection)
export const MOCK_ADMIN_ADDRESS = "0x0000000000000000000000000000000000000001";
export const MOCK_CHARITY_ADDRESSES = [
  "0x0000000000000000000000000000000000000002",
  "0x0000000000000000000000000000000000000003",
];

// Accepted tokens
export const ACCEPTED_TOKENS = [
  { symbol: "BNB", address: "0x0000000000000000000000000000000000000000", decimals: 18, fee: 2 },
  { symbol: "SANC", address: "0x4670f3a2A8D35021257cda028c7ae3Cb854C7CaF", decimals: 9, fee: 1 },
  { symbol: "USDT", address: "0x55d398326f99059fF775485246999027B3197955", decimals: 18, fee: 2 },
  { symbol: "BUSD", address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56", decimals: 18, fee: 2 },
];
