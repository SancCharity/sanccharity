import { VoterInfo, VoterTier } from "@/types/charity";

export const mockVoterInfo: VoterInfo = {
  address: "0x7a3F...e9B2",
  stakedAmount: "12000000000000000", // 12M SANC (9 decimals)
  votingPower: 2,
  tier: VoterTier.FeaturedDonor,
  badges: ["Early Supporter", "Top Voter"],
  canSuggestCampaigns: false,
  votesCount: 24,
  participationRate: 87,
};

export const mockEliteVoterInfo: VoterInfo = {
  address: "0xB4c1...3fA7",
  stakedAmount: "55000000000000000", // 55M SANC
  votingPower: 3,
  tier: VoterTier.EliteDonor,
  badges: ["Elite Donor", "Campaign Suggester", "Governance Champion"],
  canSuggestCampaigns: true,
  votesCount: 61,
  participationRate: 94,
};

export interface ActiveVote {
  campaignId: string;
  campaignName: string;
  charityName: string;
  milestoneIndex: number;
  milestoneName: string;
  milestoneAmount: number;
  votesFor: number;
  votesAgainst: number;
  totalVotingPower: number;
  approvalPercentage: number;
  reviewDeadline: number;
  hasVoted: boolean;
  userVote?: "approve" | "reject" | "abstain";
}

export const mockActiveVotes: ActiveVote[] = [
  {
    campaignId: "1",
    campaignName: "School Building in Rural Kenya",
    charityName: "Kenya Education Trust",
    milestoneIndex: 1,
    milestoneName: "Structural Construction",
    milestoneAmount: 50000,
    votesFor: 156,
    votesAgainst: 60,
    totalVotingPower: 216,
    approvalPercentage: 72,
    reviewDeadline: Math.floor(Date.now() / 1000) + 8 * 86400,
    hasVoted: false,
  },
  {
    campaignId: "3",
    campaignName: "Medical Aid for Gaza",
    charityName: "Global Health Initiative",
    milestoneIndex: 2,
    milestoneName: "Training Program",
    milestoneAmount: 25000,
    votesFor: 98,
    votesAgainst: 14,
    totalVotingPower: 112,
    approvalPercentage: 88,
    reviewDeadline: Math.floor(Date.now() / 1000) + 3 * 86400,
    hasVoted: true,
    userVote: "approve",
  },
];

export interface VoteHistoryItem {
  campaignId: string;
  campaignName: string;
  milestoneName: string;
  choice: "approve" | "reject" | "abstain";
  votingPower: number;
  outcome: "passed" | "rejected" | "pending";
  approvalPct: number;
  votedAt: number;
}

const now = Math.floor(Date.now() / 1000);

export const mockVoteHistory: VoteHistoryItem[] = [
  { campaignId: "5", campaignName: "Disaster Relief Fund Myanmar", milestoneName: "Emergency Shelters", choice: "approve", votingPower: 2, outcome: "passed", approvalPct: 98, votedAt: now - 30 * 86400 },
  { campaignId: "5", campaignName: "Disaster Relief Fund Myanmar", milestoneName: "Food & Water Supply", choice: "approve", votingPower: 2, outcome: "passed", approvalPct: 96, votedAt: now - 20 * 86400 },
  { campaignId: "5", campaignName: "Disaster Relief Fund Myanmar", milestoneName: "Medical Aid", choice: "approve", votingPower: 2, outcome: "passed", approvalPct: 99, votedAt: now - 10 * 86400 },
  { campaignId: "1", campaignName: "School Building in Rural Kenya", milestoneName: "Foundation & Land Prep", choice: "approve", votingPower: 2, outcome: "passed", approvalPct: 94, votedAt: now - 45 * 86400 },
  { campaignId: "2", campaignName: "Amazon Reforestation", milestoneName: "Nursery Setup", choice: "approve", votingPower: 2, outcome: "passed", approvalPct: 97, votedAt: now - 60 * 86400 },
];
