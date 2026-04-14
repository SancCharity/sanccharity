import {
  AdminDashboard,
  KycReviewItem,
  BuybackRecord,
  AdminAction,
  FeePool,
  TreasuryOverview,
  EventListenerStatus,
  CampaignStatus,
} from "@/types/charity";

const now = Math.floor(Date.now() / 1000);

// ── Dashboard ────────────────────────────────────────────────────────────────

export const mockAdminDashboard: AdminDashboard = {
  pendingKycCount: 3,
  totalCharities: 47,
  totalCampaigns: 127,
  totalDonated: 2847350,
  feeRevenue: 56947,
  flaggedActivity: 2,
  feePoolBalances: [
    { token: "0x0000000000000000000000000000000000000000", tokenSymbol: "BNB", balance: "12400000000000000000", balanceUSD: 7750 },
    { token: "0x4670f3a2A8D35021257cda028c7ae3Cb854C7CaF", tokenSymbol: "SANC", balance: "8500000000", balanceUSD: 4250 },
    { token: "0x55d398326f99059fF775485246999027B3197955", tokenSymbol: "USDT", balance: "9300000000000000000000", balanceUSD: 9300 },
    { token: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56", tokenSymbol: "BUSD", balance: "6200000000000000000000", balanceUSD: 6200 },
  ],
  contractPauseStates: {
    CharityRegistry: false,
    CampaignManager: false,
    DonationVault: false,
    CharityGovernance: false,
    DonationNFT: false,
  },
};

// ── KYC Queue ────────────────────────────────────────────────────────────────

export const mockKycQueue: KycReviewItem[] = [
  {
    charityId: "101",
    ownerAddress: "0xD4e5F6a7B8c9D0e1F2a3B4c5D6e7F8a9B0c1D2e3",
    name: "Ocean Guardians Foundation",
    website: "https://oceanguardians.org",
    documentsIPFS: [
      { type: "Business Registration", hash: "QmOcean1bizReg9x4kF9pRt2v", filename: "business_registration.pdf" },
      { type: "Government ID", hash: "QmOcean2govId7y5lG0qSu3w", filename: "director_id.pdf" },
      { type: "Proof of Charity Status", hash: "QmOcean3charity8z6mH1rTv4x", filename: "charity_certificate.pdf" },
    ],
    submittedAt: now - 2 * 86400,
    status: "pending",
  },
  {
    charityId: "102",
    ownerAddress: "0xF0a1B2c3D4e5F6a7B8c9D0e1F2a3B4c5D6e7F8a9",
    name: "Children First Initiative",
    website: "https://childrenfirst.ngo",
    documentsIPFS: [
      { type: "Business Registration", hash: "QmChild1bizReg1a2b3c4d5e", filename: "registration.pdf" },
      { type: "Government ID", hash: "QmChild2govId6f7g8h9i0j1k", filename: "id_document.pdf" },
      { type: "Proof of Charity Status", hash: "QmChild3cert2l3m4n5o6p7q", filename: "ngo_certificate.pdf" },
    ],
    submittedAt: now - 5 * 86400,
    status: "pending",
  },
  {
    charityId: "103",
    ownerAddress: "0xA1b2C3d4E5f6A7b8C9d0E1f2A3b4C5d6E7f8A9b0",
    name: "Rural Water Access Project",
    website: "https://ruralwater.org",
    documentsIPFS: [
      { type: "Business Registration", hash: "QmWater1bizReg8r9s0t1u2v", filename: "registration.pdf" },
      { type: "Government ID", hash: "QmWater2govId3w4x5y6z7a8b", filename: "director_id.pdf" },
      { type: "Proof of Charity Status", hash: "QmWater3cert9c0d1e2f3g4h", filename: "charity_cert.pdf" },
    ],
    submittedAt: now - 7 * 86400,
    status: "pending",
  },
];

// ── Fee Pools ─────────────────────────────────────────────────────────────────

export const mockFeePools: FeePool[] = mockAdminDashboard.feePoolBalances;

// ── Buyback History ──────────────────────────────────────────────────────────

export const mockBuybackHistory: BuybackRecord[] = [
  {
    id: "bb-1",
    tokenIn: "0x0000000000000000000000000000000000000000",
    tokenSymbol: "BNB",
    amountIn: "8200000000000000000",
    sancOut: "12300000000000",
    burnTxHash: "0xbb1burn2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9",
    executedAt: now - 14 * 86400,
  },
  {
    id: "bb-2",
    tokenIn: "0x55d398326f99059fF775485246999027B3197955",
    tokenSymbol: "USDT",
    amountIn: "15000000000000000000000",
    sancOut: "22500000000000",
    burnTxHash: "0xbb2burn5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1",
    executedAt: now - 30 * 86400,
  },
  {
    id: "bb-3",
    tokenIn: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
    tokenSymbol: "BUSD",
    amountIn: "9800000000000000000000",
    sancOut: "14700000000000",
    burnTxHash: "0xbb3burn8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4",
    executedAt: now - 45 * 86400,
  },
];

// ── Treasury ─────────────────────────────────────────────────────────────────

export const mockTreasury: TreasuryOverview = {
  totalValue: "180000000000000000000",
  totalValueUSD: 112500,
  matchingFund: "45200000000000000000",
  matchingFundUSD: 28250,
  operationsFund: "33900000000000000000",
  operationsFundUSD: 21188,
  totalEscrowed: "101000000000000000000",
  totalEscrowedUSD: 63063,
  escrowAccounts: [
    {
      campaignId: "1",
      campaignName: "School Building in Rural Kenya",
      charityName: "Kenya Education Trust",
      escrowed: "45200000000000000000",
      escrowedUSD: 28250,
      released: "25000000000000000000",
      releasedUSD: 15625,
      status: CampaignStatus.Active,
    },
    {
      campaignId: "2",
      campaignName: "Amazon Reforestation",
      charityName: "Green Earth Foundation",
      escrowed: "18000000000000000000",
      escrowedUSD: 11250,
      released: "12000000000000000000",
      releasedUSD: 7500,
      status: CampaignStatus.Active,
    },
    {
      campaignId: "3",
      campaignName: "Medical Aid for Gaza",
      charityName: "Global Health Initiative",
      escrowed: "37800000000000000000",
      escrowedUSD: 23625,
      released: "37500000000000000000",
      releasedUSD: 23438,
      status: CampaignStatus.Active,
    },
  ],
  recentMovements: [
    { type: "release", description: "Milestone 1 released — School Building in Rural Kenya", amount: "25000000000000000000", amountUSD: 15625, txHash: "0xrel1abc123", timestamp: now - 10 * 86400 },
    { type: "donation", description: "Donation received — 5 BNB to School Building", amount: "5000000000000000000", amountUSD: 3125, txHash: "0xdon1def456", timestamp: now - 7200 },
    { type: "buyback", description: "Buyback & burn — 8.2 BNB → 12.3M SANC burned", amount: "8200000000000000000", amountUSD: 5125, txHash: "0xbb1burn2c3", timestamp: now - 14 * 86400 },
    { type: "fee_split", description: "Fee distribution — 2 BNB split (buyback 40% / match 30% / ops 30%)", amount: "2000000000000000000", amountUSD: 1250, txHash: "0xfee1ghi789", timestamp: now - 2 * 86400 },
  ],
};

// ── Event Listener ────────────────────────────────────────────────────────────

export const mockEventListenerStatus: EventListenerStatus = {
  lastSyncedBlock: 38241057,
  latestBlock: 38241059,
  syncLag: 2,
  chain: "BSC Mainnet",
  rpcEndpoint: "https://bsc-dataseed1.binance.org",
  eventsToday: 47,
  failedEvents: 0,
  lastEventProcessed: now - 120,
  contractListeners: [
    { name: "CharityRegistry", address: "0xRegistry00000000000000000000000000001", lastEvent: "CharityVerified", blockNumber: 38241050, status: "active" },
    { name: "CampaignManager", address: "0xCampaign000000000000000000000000001", lastEvent: "MilestoneSubmitted", blockNumber: 38241055, status: "active" },
    { name: "DonationVault", address: "0xVault00000000000000000000000000000001", lastEvent: "DonationReceived", blockNumber: 38241057, status: "active" },
    { name: "CharityGovernance", address: "0xGovernance0000000000000000000000001", lastEvent: "VoteCast", blockNumber: 38241032, status: "active" },
    { name: "DonationNFT", address: "0xDonationNFT000000000000000000000000001", lastEvent: "Transfer", blockNumber: 38241057, status: "active" },
  ],
  recentEvents: [
    { time: now - 120, event: "DonationReceived", contract: "DonationVault", txHash: "0x8f4a2b3c1d5e6f7a", status: "success" },
    { time: now - 3600, event: "VoteCast", contract: "CharityGovernance", txHash: "0xa2b3c4d5e6f7a8b9", status: "success" },
    { time: now - 7200, event: "MilestoneSubmitted", contract: "CampaignManager", txHash: "0xc5d6e7f8a9b0c1d2", status: "success" },
    { time: now - 14400, event: "CharityVerified", contract: "CharityRegistry", txHash: "0xe7f8a9b0c1d2e3f4", status: "success" },
    { time: now - 21600, event: "DonationReceived", contract: "DonationVault", txHash: "0xf9a0b1c2d3e4f5a6", status: "success" },
  ],
};

// ── Admin Activity Log ────────────────────────────────────────────────────────

export const mockAdminActions: AdminAction[] = [
  { id: "act-1", adminAddress: "0x0000000000000000000000000000000000000001", action: "verify", targetType: "charity", targetId: "5", details: '{"name":"Global Aid Network"}', txHash: "0xverify1abc", timestamp: now - 2 * 86400 },
  { id: "act-2", adminAddress: "0x0000000000000000000000000000000000000001", action: "feature", targetType: "campaign", targetId: "1", details: '{"name":"School Building in Rural Kenya","featured":true}', txHash: "", timestamp: now - 3 * 86400 },
  { id: "act-3", adminAddress: "0x0000000000000000000000000000000000000001", action: "buyback", targetType: "contract", targetId: "DonationVault", details: '{"tokenIn":"BNB","amountIn":"8.2","sancOut":"12300000","burned":true}', txHash: "0xbb1burn2c3d4e5f6", timestamp: now - 14 * 86400 },
  { id: "act-4", adminAddress: "0x0000000000000000000000000000000000000001", action: "suspend", targetType: "charity", targetId: "6", details: '{"name":"Charity X","reason":"KYC discrepancy"}', txHash: "0xsuspend1xyz", timestamp: now - 20 * 86400 },
  { id: "act-5", adminAddress: "0x0000000000000000000000000000000000000001", action: "verify", targetType: "charity", targetId: "4", details: '{"name":"Code for Africa"}', txHash: "0xverify2def", timestamp: now - 25 * 86400 },
  { id: "act-6", adminAddress: "0x0000000000000000000000000000000000000001", action: "pause", targetType: "contract", targetId: "CharityGovernance", details: '{"reason":"Maintenance"}', txHash: "0xpause1ghi", timestamp: now - 60 * 86400 },
  { id: "act-7", adminAddress: "0x0000000000000000000000000000000000000001", action: "unpause", targetType: "contract", targetId: "CharityGovernance", details: '{"reason":"Maintenance complete"}', txHash: "0xunpause1jkl", timestamp: now - 59 * 86400 },
];
