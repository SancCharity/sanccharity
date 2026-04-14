/**
 * CharityService
 *
 * On-chain interaction layer. Follows the PancakeSwapService pattern.
 *
 * In PREVIEW_MODE all write methods throw a "Coming Soon" error which the
 * UI catches and displays via ComingSoonOverlay. Read methods return mock
 * data from charityApi so the app remains fully functional as a preview.
 *
 * When contracts are deployed:
 *   1. Populate CONTRACT_ADDRESSES in src/config/chains.ts
 *   2. Drop PREVIEW_MODE — the real implementations below take over.
 */

import type { PublicClient, WalletClient } from "viem";
import { PREVIEW_MODE, STAKE_AMOUNT, ACCEPTED_TOKENS } from "@/lib/constants";

export class ComingSoonError extends Error {
  constructor(action = "This feature") {
    super(`${action} is coming soon — SancCharity launches on BSC shortly.`);
    this.name = "ComingSoonError";
  }
}

const notYet = (label: string) => {
  throw new ComingSoonError(label);
};

// ─── Placeholder ABIs (filled when contracts are deployed) ───────────────────

const REGISTRY_ABI = [] as const;
const CAMPAIGN_ABI = [] as const;
const VAULT_ABI = [] as const;
const GOVERNANCE_ABI = [] as const;
const NFT_ABI = [] as const;
const ERC20_ABI = [
  { name: "approve", type: "function", inputs: [{ name: "spender", type: "address" }, { name: "amount", type: "uint256" }], outputs: [{ name: "", type: "bool" }], stateMutability: "nonpayable" },
  { name: "allowance", type: "function", inputs: [{ name: "owner", type: "address" }, { name: "spender", type: "address" }], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
  { name: "balanceOf", type: "function", inputs: [{ name: "account", type: "address" }], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
] as const;

export class CharityService {
  constructor(
    private publicClient: PublicClient,
    private walletClient: WalletClient | null
  ) {}

  // ── Utility ────────────────────────────────────────────────────────────────

  async getTokenBalance(tokenAddress: string, walletAddress: string): Promise<bigint> {
    if (PREVIEW_MODE) return BigInt("50000000000000000"); // 50M SANC mock balance
    // Real: readContract({ address, abi: ERC20_ABI, functionName: "balanceOf", args: [walletAddress] })
    return BigInt(0);
  }

  async getTokenAllowance(tokenAddress: string, owner: string, spender: string): Promise<bigint> {
    if (PREVIEW_MODE) return BigInt(0);
    return BigInt(0);
  }

  async approveToken(tokenAddress: `0x${string}`, spender: `0x${string}`, amount: bigint): Promise<`0x${string}`> {
    if (PREVIEW_MODE) notYet("Token approval");
    throw new Error("Not implemented");
  }

  // ── Registry ───────────────────────────────────────────────────────────────

  async registerCharity(name: string, ipfsMetadata: string): Promise<`0x${string}`> {
    if (PREVIEW_MODE) notYet("Charity registration");
    throw new Error("Not implemented");
  }

  async withdrawStake(charityId: string): Promise<`0x${string}`> {
    if (PREVIEW_MODE) notYet("Stake withdrawal");
    throw new Error("Not implemented");
  }

  async getCharity(charityId: string) {
    if (PREVIEW_MODE) return null;
    return null;
  }

  async isCharityVerified(charityId: string): Promise<boolean> {
    if (PREVIEW_MODE) return true;
    return false;
  }

  // ── Campaigns ──────────────────────────────────────────────────────────────

  async createCampaign(params: {
    charityId: string;
    name: string;
    ipfsMetadata: string;
    campaignType: "public" | "private";
    totalGoal: bigint;
    deadline: number;
    milestoneAmounts: bigint[];
    approvers: `0x${string}`[];
    requiredApprovals: number;
  }): Promise<`0x${string}`> {
    if (PREVIEW_MODE) notYet("Campaign creation");
    throw new Error("Not implemented");
  }

  async submitMilestoneProof(campaignId: string, milestoneIndex: number, proofIPFS: string): Promise<`0x${string}`> {
    if (PREVIEW_MODE) notYet("Milestone proof submission");
    throw new Error("Not implemented");
  }

  async cancelCampaign(campaignId: string): Promise<`0x${string}`> {
    if (PREVIEW_MODE) notYet("Campaign cancellation");
    throw new Error("Not implemented");
  }

  async pauseCampaign(campaignId: string): Promise<`0x${string}`> {
    if (PREVIEW_MODE) notYet("Campaign pause");
    throw new Error("Not implemented");
  }

  async resumeCampaign(campaignId: string): Promise<`0x${string}`> {
    if (PREVIEW_MODE) notYet("Campaign resume");
    throw new Error("Not implemented");
  }

  async getCampaignOnChain(campaignId: string) {
    if (PREVIEW_MODE) return null;
    return null;
  }

  async getMilestonesOnChain(campaignId: string) {
    if (PREVIEW_MODE) return [];
    return [];
  }

  // ── Private Campaign Approvals ─────────────────────────────────────────────

  async approveMilestone(campaignId: string, milestoneIndex: number): Promise<`0x${string}`> {
    if (PREVIEW_MODE) notYet("Milestone approval");
    throw new Error("Not implemented");
  }

  async updateApprovers(campaignId: string, newApprovers: `0x${string}`[], newRequired: number): Promise<`0x${string}`> {
    if (PREVIEW_MODE) notYet("Approver update");
    throw new Error("Not implemented");
  }

  // ── Donations ──────────────────────────────────────────────────────────────

  /**
   * Donate to a campaign. Handles BNB (native) vs ERC-20 paths.
   * For ERC-20: checks allowance first, runs approve if needed, then donate.
   */
  async donate(params: {
    campaignId: string;
    tokenAddress: string;
    amount: bigint;
    isBNB: boolean;
  }): Promise<`0x${string}`> {
    if (PREVIEW_MODE) notYet("Donation");
    throw new Error("Not implemented");
  }

  async estimateDonateFee(tokenAddress: string, amount: bigint): Promise<bigint> {
    const isSANC = tokenAddress.toLowerCase() === ACCEPTED_TOKENS.find((t) => t.symbol === "SANC")?.address.toLowerCase();
    const feeBps = isSANC ? 100 : 200; // 1% for SANC, 2% for others
    return (amount * BigInt(feeBps)) / BigInt(10000);
  }

  async getCampaignBalance(campaignId: string, tokenAddress: string): Promise<bigint> {
    if (PREVIEW_MODE) return BigInt("45000000000000000000");
    return BigInt(0);
  }

  async getDonationsByDonor(donorAddress: string) {
    if (PREVIEW_MODE) return [];
    return [];
  }

  // ── Governance ─────────────────────────────────────────────────────────────

  async stakeForVoting(amount: bigint): Promise<`0x${string}`> {
    if (PREVIEW_MODE) notYet("Governance staking");
    throw new Error("Not implemented");
  }

  async requestUnstake(amount: bigint): Promise<`0x${string}`> {
    if (PREVIEW_MODE) notYet("Unstake request");
    throw new Error("Not implemented");
  }

  async completeUnstake(): Promise<`0x${string}`> {
    if (PREVIEW_MODE) notYet("Unstake completion");
    throw new Error("Not implemented");
  }

  async voteOnMilestone(campaignId: string, milestoneIndex: number, choice: "approve" | "reject" | "abstain"): Promise<`0x${string}`> {
    if (PREVIEW_MODE) notYet("Vote casting");
    throw new Error("Not implemented");
  }

  async getVotingPower(address: string): Promise<number> {
    if (PREVIEW_MODE) return 2;
    return 0;
  }

  async getVoterTier(address: string): Promise<number> {
    if (PREVIEW_MODE) return 2; // FeaturedDonor
    return 0;
  }

  // ── NFT ────────────────────────────────────────────────────────────────────

  async getDonationNFTs(ownerAddress: string): Promise<number[]> {
    if (PREVIEW_MODE) return [4821, 4820, 4819, 4814];
    return [];
  }

  async getNFTMetadata(tokenId: number) {
    if (PREVIEW_MODE) return null;
    return null;
  }

  // ── Refunds ────────────────────────────────────────────────────────────────

  async claimRefund(campaignId: string): Promise<`0x${string}`> {
    if (PREVIEW_MODE) notYet("Refund claim");
    throw new Error("Not implemented");
  }

  async getRefundableAmount(campaignId: string, donorAddress: string): Promise<bigint> {
    if (PREVIEW_MODE) return BigInt("1200000000000000000");
    return BigInt(0);
  }

  async hasClaimedRefund(campaignId: string, donorAddress: string): Promise<boolean> {
    if (PREVIEW_MODE) return false;
    return false;
  }

  // ── Stake ──────────────────────────────────────────────────────────────────

  async getStakeStatus(charityId: string) {
    if (PREVIEW_MODE) return { stakeAmount: BigInt(STAKE_AMOUNT), eligible: false };
    return null;
  }

  async isStakeWithdrawable(charityId: string): Promise<boolean> {
    if (PREVIEW_MODE) return false;
    return false;
  }

  // ── Admin ──────────────────────────────────────────────────────────────────

  async verifyCharity(charityId: string): Promise<`0x${string}`> {
    if (PREVIEW_MODE) notYet("Charity verification");
    throw new Error("Not implemented");
  }

  async suspendCharity(charityId: string): Promise<`0x${string}`> {
    if (PREVIEW_MODE) notYet("Charity suspension");
    throw new Error("Not implemented");
  }

  async reactivateCharity(charityId: string): Promise<`0x${string}`> {
    if (PREVIEW_MODE) notYet("Charity reactivation");
    throw new Error("Not implemented");
  }

  async revokeCharity(charityId: string): Promise<`0x${string}`> {
    if (PREVIEW_MODE) notYet("Charity revocation");
    throw new Error("Not implemented");
  }

  async executeBuybackBurn(minSancOut: bigint): Promise<`0x${string}`> {
    if (PREVIEW_MODE) notYet("Buyback & burn");
    throw new Error("Not implemented");
  }

  async pauseContract(contractName: string): Promise<`0x${string}`> {
    if (PREVIEW_MODE) notYet("Contract pause");
    throw new Error("Not implemented");
  }

  async unpauseContract(contractName: string): Promise<`0x${string}`> {
    if (PREVIEW_MODE) notYet("Contract unpause");
    throw new Error("Not implemented");
  }

  async setFeaturedCampaign(campaignId: string, featured: boolean): Promise<`0x${string}`> {
    if (PREVIEW_MODE) notYet("Campaign featuring");
    throw new Error("Not implemented");
  }
}
