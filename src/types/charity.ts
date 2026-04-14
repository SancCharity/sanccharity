// ============================================================
// SancCharity TypeScript Types — PRD v1.4 Section 5.5
// ============================================================

// --- Enums ---

export enum CharityStatus {
  Pending = "pending",
  Verified = "verified",
  Suspended = "suspended",
  Revoked = "revoked",
}

export enum CampaignType {
  Public = "public",
  Private = "private",
}

export enum CampaignStatus {
  Draft = "draft",
  Active = "active",
  Paused = "paused",
  Completed = "completed",
  Cancelled = "cancelled",
  Failed = "failed",
}

export enum MilestoneStatus {
  Locked = "locked",
  Active = "active",
  UnderReview = "under_review",
  Approved = "approved",
  Rejected = "rejected",
  Released = "released",
}

export enum VoteChoice {
  Abstain = "abstain",
  Approve = "approve",
  Reject = "reject",
}

export enum VoterTier {
  None = "none",
  Standard = "standard",
  FeaturedDonor = "featured_donor",
  EliteDonor = "elite_donor",
}

export enum CampaignCategory {
  Education = "Education",
  Health = "Health",
  Environment = "Environment",
  DisasterRelief = "Disaster Relief",
  AnimalWelfare = "Animal Welfare",
  Community = "Community",
  Technology = "Technology",
  ArtsCulture = "Arts & Culture",
}

// --- Core Interfaces ---

export interface Charity {
  id: string;
  chainId: number;
  ownerAddress: string;
  name: string;
  description: string;
  logoUrl: string;
  website: string;
  status: CharityStatus;
  kycVerified: boolean;
  campaignCount: number;
  registeredAt: number;
}

export interface Campaign {
  id: string;
  chainId: number;
  charity: Charity;
  name: string;
  description: string;
  category: CampaignCategory;
  location: string;
  coverImage: string;
  gallery: string[];
  campaignType: CampaignType;
  totalGoal: string; // wei string
  totalRaised: string;
  totalGoalUSD: number;
  totalRaisedUSD: number;
  donorCount: number;
  status: CampaignStatus;
  milestones: Milestone[];
  deadline: number;
  createdAt: number;
  featured: boolean;
  approvers: string[];
  requiredApprovals: number;
  accessToken?: string;
}

export interface Milestone {
  index: number;
  name: string;
  description: string;
  amount: string; // wei string
  amountUSD: number;
  deliverables: string[];
  status: MilestoneStatus;
  proofIPFS: string;
  reviewDeadline: number;
  votesFor: number;
  votesAgainst: number;
  totalVotingPower: number;
  approvalPercentage: number;
}

export interface MilestoneApproval {
  campaignId: string;
  milestoneIndex: number;
  approverAddress: string;
  approved: boolean;
  timestamp: number;
  txHash: string;
}

export interface Donation {
  id: string;
  campaignId: string;
  campaignName: string;
  charityName: string;
  donorAddress: string;
  token: string;
  tokenSymbol: string;
  amount: string; // wei string
  amountUSD: number;
  feeAmount: string;
  txHash: string;
  nftTokenId: number;
  timestamp: number;
}

export interface VoterInfo {
  address: string;
  stakedAmount: string;
  votingPower: number;
  tier: VoterTier;
  badges: string[];
  canSuggestCampaigns: boolean;
  votesCount: number;
  participationRate: number;
}

export interface ImpactData {
  totalDonationsUSD: number;
  totalDonors: number;
  totalCampaigns: number;
  completedCampaigns: number;
  sancBurned: string;
  matchingFundBalance: string;
  categoryBreakdown: CategoryBreakdownItem[];
  monthlyDonations: MonthlyDonation[];
}

export interface CategoryBreakdownItem {
  category: CampaignCategory;
  percentage: number;
  totalUSD: number;
  count: number;
}

export interface MonthlyDonation {
  month: string;
  amountUSD: number;
}

// --- Form State ---

export interface DonationFormState {
  campaignId: string;
  token: string;
  tokenSymbol: string;
  amount: string;
  isLoading: boolean;
  error: string | null;
  txHash: string | null;
  nftTokenId: number | null;
}

// --- Donor ---

export interface DonorProfile {
  address: string;
  displayName: string;
  totalDonatedUSD: number;
  donationCount: number;
  votingPower: number;
  tier: VoterTier;
  badges: string[];
  categoryBreakdown: { category: string; totalUSD: number; description: string }[];
  nftTokenIds: number[];
  feeSaved: number;
  campaignsSupported: number;
  campaignsActive: number;
  campaignsCompleted: number;
}

export interface RefundClaim {
  campaignId: string;
  campaignName: string;
  token: string;
  tokenSymbol: string;
  refundAmount: string;
  refundAmountUSD: number;
  status: "claimable" | "claimed";
  cancelledAt: number;
}

export interface TaxSummary {
  year: number;
  totalDonatedUSD: number;
  totalTransactions: number;
  uniqueCharities: number;
  donations: {
    campaignName: string;
    charityName: string;
    amountUSD: number;
    date: string;
    token: string;
  }[];
}

// --- Charity Management ---

export interface CharityDashboard {
  charityId: string;
  name: string;
  status: CharityStatus;
  stakeAmount: string;
  stakeEligibleForWithdrawal: boolean;
  totalRaised: string;
  totalRaisedUSD: number;
  activeCampaigns: number;
  milestonesCompleted: number;
  milestonesTotal: number;
  donorCount: number;
}

export interface CampaignManage {
  id: string;
  name: string;
  category: CampaignCategory;
  campaignType: CampaignType;
  totalGoal: string;
  totalGoalUSD: number;
  totalRaised: string;
  totalRaisedUSD: number;
  fundedPercent: number;
  status: CampaignStatus;
  activeMilestone: number;
  milestoneProgress: string;
  donorCount: number;
}

export interface ReleasedFund {
  milestoneIndex: number;
  milestoneName: string;
  amount: string;
  amountUSD: number;
  releasedAt: number;
  txHash: string;
}

export interface PendingRelease {
  milestoneIndex: number;
  milestoneName: string;
  amount: string;
  amountUSD: number;
  approvalPercent: number;
  votesFor: number;
  votesAgainst: number;
  reviewDeadline: number;
}

// --- Admin ---

export interface AdminDashboard {
  pendingKycCount: number;
  totalCharities: number;
  totalCampaigns: number;
  totalDonated: number;
  feeRevenue: number;
  flaggedActivity: number;
  feePoolBalances: FeePool[];
  contractPauseStates: Record<string, boolean>;
}

export interface KycReviewItem {
  charityId: string;
  ownerAddress: string;
  name: string;
  website: string;
  documentsIPFS: { type: string; hash: string; filename: string }[];
  submittedAt: number;
  status: "pending" | "approved" | "rejected";
}

export interface FeePool {
  token: string;
  tokenSymbol: string;
  balance: string;
  balanceUSD: number;
}

export interface BuybackRecord {
  id: string;
  tokenIn: string;
  tokenSymbol: string;
  amountIn: string;
  sancOut: string;
  burnTxHash: string;
  executedAt: number;
}

export interface AdminAction {
  id: string;
  adminAddress: string;
  action: string;
  targetType: string;
  targetId: string;
  details: string;
  txHash: string;
  timestamp: number;
}

// --- Public Charity Profile ---

export interface CharityProfile {
  id: string;
  chainId: number;
  name: string;
  description: string;
  logoUrl: string;
  website: string;
  location: string;
  verified: boolean;
  registeredAt: number;
  stakeAmount: string;
  kycSigners: number;
  trustScore: number;
  focusAreas: CampaignCategory[];
  totalRaised: string;
  totalRaisedUSD: number;
  campaignCount: number;
  activeCampaignCount: number;
  donorCount: number;
  milestonesCompleted: number;
  milestoneTotal: number;
  impactReports: ImpactReport[];
  activeCampaigns: Campaign[];
  socialLinks: { twitter?: string; telegram?: string; discord?: string };
}

export interface ImpactReport {
  id: string;
  campaignId: string;
  title: string;
  content: string;
  mediaIPFS: string[];
  beneficiaryCount: number;
  metrics: { label: string; value: string }[];
  publishedAt: number;
  year: number;
}

// --- NFT ---

export interface NFTReceipt {
  tokenId: number;
  donor: string;
  campaignId: string;
  campaignName: string;
  charityName: string;
  token: string;
  tokenSymbol: string;
  amount: string;
  amountUSD: number;
  feeAmount: string;
  timestamp: number;
  txHash: string;
  blockNumber: number;
  contractAddress: string;
  standard: string;
  taxReceiptURI: string;
  ipfsMetadataHash: string;
  donationTier: "Bronze" | "Silver" | "Gold";
  category: string;
  impactScore: number;
}

// --- User Management (Admin) ---

export interface UserProfile {
  address: string;
  role: "donor" | "staker" | "charity";
  displayName: string;
  tier: VoterTier;
  stakedAmount: string;
  totalDonatedUSD: number;
  donationCount: number;
  votingPower: number;
  badges: string[];
  flagged: boolean;
  registeredAt: number;
}

// --- API Response Wrappers ---

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

// --- Event Listener (Admin) ---

export interface EventListenerStatus {
  lastSyncedBlock: number;
  latestBlock: number;
  syncLag: number;
  chain: string;
  rpcEndpoint: string;
  eventsToday: number;
  failedEvents: number;
  lastEventProcessed: number;
  contractListeners: ContractListener[];
  recentEvents: RecentEvent[];
}

export interface ContractListener {
  name: string;
  address: string;
  lastEvent: string;
  blockNumber: number;
  status: "active" | "paused";
}

export interface RecentEvent {
  time: number;
  event: string;
  contract: string;
  txHash: string;
  status: "success" | "failed";
}

// --- Treasury ---

export interface TreasuryOverview {
  totalValue: string;
  totalValueUSD: number;
  matchingFund: string;
  matchingFundUSD: number;
  operationsFund: string;
  operationsFundUSD: number;
  totalEscrowed: string;
  totalEscrowedUSD: number;
  escrowAccounts: EscrowAccount[];
  recentMovements: FundMovement[];
}

export interface EscrowAccount {
  campaignId: string;
  campaignName: string;
  charityName: string;
  escrowed: string;
  escrowedUSD: number;
  released: string;
  releasedUSD: number;
  status: CampaignStatus;
}

export interface FundMovement {
  type: "release" | "donation" | "fee_split" | "buyback";
  description: string;
  amount: string;
  amountUSD: number;
  txHash: string;
  timestamp: number;
}

// --- Campaign Suggestion ---

export interface CampaignSuggestion {
  id: string;
  suggesterAddress: string;
  title: string;
  category: CampaignCategory;
  description: string;
  status: "pending" | "reviewed" | "accepted" | "rejected";
  createdAt: number;
}
