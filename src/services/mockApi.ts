/**
 * MockApiClient
 *
 * Mirrors every endpoint in PRD section 4.3.
 * All methods add a small simulated latency so the app feels realistic.
 * When the real FastAPI backend is ready, charityApi.ts swaps this out
 * with a real HTTP client — zero component changes required.
 */

import { mockCampaigns } from "./mockData/campaigns";
import { mockCharities } from "./mockData/charities";
import { mockDonations, mockRecentDonations } from "./mockData/donations";
import { mockImpactData, mockPlatformStats } from "./mockData/impact";
import { mockVoterInfo, mockActiveVotes, mockVoteHistory } from "./mockData/governance";
import { mockNFTs } from "./mockData/nfts";
import {
  mockAdminDashboard,
  mockKycQueue,
  mockFeePools,
  mockBuybackHistory,
  mockTreasury,
  mockEventListenerStatus,
  mockAdminActions,
} from "./mockData/admin";
import { mockUserProfiles, mockDonorProfile } from "./mockData/users";
import { mockRefundClaims, mockTaxSummary } from "./mockData/refunds";
import { mockCampaignSuggestions } from "./mockData/suggestions";

import type {
  Campaign,
  Charity,
  Donation,
  ImpactData,
  VoterInfo,
  NFTReceipt,
  AdminDashboard,
  KycReviewItem,
  FeePool,
  BuybackRecord,
  AdminAction,
  TreasuryOverview,
  EventListenerStatus,
  UserProfile,
  DonorProfile,
  RefundClaim,
  TaxSummary,
  CampaignSuggestion,
  MilestoneApproval,
  CharityProfile,
  CharityDashboard,
  CampaignManage,
  ReleasedFund,
  PendingRelease,
  PaginatedResponse,
  ImpactReport,
} from "@/types/charity";
import { CharityStatus } from "@/types/charity";
import { mockCampaignSuggestions as suggestions } from "./mockData/suggestions";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

function paginate<T>(items: T[], page = 1, pageSize = 10): PaginatedResponse<T> {
  const total = items.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  return { data: items.slice(start, start + pageSize), total, page, pageSize, totalPages };
}

// ─── MockApiClient ────────────────────────────────────────────────────────────

export class MockApiClient {
  // ── Charity Endpoints ──────────────────────────────────────────────────────

  async registerCharity(payload: { name: string; description: string; logoUrl: string; website: string; category: string; kycDocumentsIPFS: string }): Promise<{ charityId: string }> {
    await delay();
    return { charityId: `charity-${Date.now()}` };
  }

  async listCharities(params?: { page?: number; pageSize?: number; status?: string }): Promise<PaginatedResponse<Charity>> {
    await delay();
    let items = mockCharities;
    if (params?.status) items = items.filter((c) => c.status === params.status);
    return paginate(items, params?.page, params?.pageSize);
  }

  async updateCharity(id: string, payload: Partial<Charity>): Promise<Charity> {
    await delay();
    const charity = mockCharities.find((c) => c.id === id) ?? mockCharities[0];
    return { ...charity, ...payload };
  }

  // ── Campaign Endpoints ─────────────────────────────────────────────────────

  async listCampaigns(params?: {
    category?: string;
    status?: string;
    search?: string;
    featured?: boolean;
    page?: number;
    pageSize?: number;
  }): Promise<PaginatedResponse<Campaign>> {
    await delay();
    // Only public campaigns on browse page per PRD CA-11
    let items = mockCampaigns.filter((c) => c.campaignType === "public");
    if (params?.category) items = items.filter((c) => c.category === params.category);
    if (params?.status) items = items.filter((c) => c.status === params.status);
    if (params?.featured) items = items.filter((c) => c.featured);
    if (params?.search) {
      const q = params.search.toLowerCase();
      items = items.filter((c) => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q));
    }
    return paginate(items, params?.page, params?.pageSize);
  }

  async getCampaignByAccessToken(id: string, token: string): Promise<Campaign | null> {
    await delay();
    const campaign = mockCampaigns.find((c) => c.id === id && c.accessToken === token);
    return campaign ?? null;
  }

  async getCampaign(id: string): Promise<Campaign | null> {
    await delay();
    return mockCampaigns.find((c) => c.id === id) ?? null;
  }

  async getCampaignDonations(id: string, params?: { page?: number; pageSize?: number }): Promise<PaginatedResponse<Donation>> {
    await delay();
    const items = mockDonations.filter((d) => d.campaignId === id);
    return paginate(items, params?.page, params?.pageSize);
  }

  async getCampaignMilestones(id: string) {
    await delay();
    const campaign = mockCampaigns.find((c) => c.id === id);
    return campaign?.milestones ?? [];
  }

  async getMilestoneApprovals(campaignId: string, milestoneIndex: number): Promise<MilestoneApproval[]> {
    await delay();
    // Mock: private campaign 7, milestone 0 has been approved by 2 of 3 approvers
    if (campaignId === "7" && milestoneIndex === 0) {
      return [
        { campaignId: "7", milestoneIndex: 0, approverAddress: "0xD4e5F6a7B8c9D0e1F2a3B4c5D6e7F8a9B0c1D2e3", approved: true, timestamp: Math.floor(Date.now() / 1000) - 5 * 86400, txHash: "0xapproval1" },
        { campaignId: "7", milestoneIndex: 0, approverAddress: "0xF0a1B2c3D4e5F6a7B8c9D0e1F2a3B4c5D6e7F8a9", approved: true, timestamp: Math.floor(Date.now() / 1000) - 4 * 86400, txHash: "0xapproval2" },
      ];
    }
    return [];
  }

  async submitMilestoneApproval(campaignId: string, milestoneIndex: number, _signature: string): Promise<{ success: boolean }> {
    await delay(600);
    return { success: true };
  }

  // ── Donation Endpoints ─────────────────────────────────────────────────────

  async getDonationsByDonor(address: string, params?: { page?: number; pageSize?: number; status?: string; token?: string }): Promise<PaginatedResponse<Donation>> {
    await delay();
    // In preview, show all mock donations regardless of address
    let items = mockDonations;
    if (params?.token) items = items.filter((d) => d.tokenSymbol === params.token);
    return paginate(items, params?.page, params?.pageSize);
  }

  async getRecentDonations(): Promise<Donation[]> {
    await delay(200);
    return mockRecentDonations;
  }

  async getDonationStats() {
    await delay(200);
    return mockPlatformStats;
  }

  // ── Governance Endpoints ───────────────────────────────────────────────────

  async getActiveVotes() {
    await delay();
    return mockActiveVotes;
  }

  async getVoteHistory(address: string) {
    await delay();
    return mockVoteHistory;
  }

  async getVoterInfo(address: string): Promise<VoterInfo> {
    await delay(200);
    return mockVoterInfo;
  }

  // ── Impact Endpoints ───────────────────────────────────────────────────────

  async getImpactDashboard(): Promise<ImpactData> {
    await delay(400);
    return mockImpactData;
  }

  async getCampaignImpact(id: string) {
    await delay();
    return mockImpactData;
  }

  // ── Charity Profile Endpoints ──────────────────────────────────────────────

  async getCharityProfile(id: string): Promise<CharityProfile> {
    await delay();
    const charity = mockCharities.find((c) => c.id === id) ?? mockCharities[0];
    const campaigns = mockCampaigns.filter((c) => c.charity.id === id);
    return {
      id: charity.id,
      chainId: charity.chainId,
      name: charity.name,
      description: charity.description,
      logoUrl: charity.logoUrl,
      website: charity.website,
      location: "East Africa",
      verified: charity.kycVerified,
      registeredAt: charity.registeredAt,
      stakeAmount: "10000000000000000",
      kycSigners: 3,
      trustScore: 8.7,
      focusAreas: campaigns.map((c) => c.category).filter((v, i, a) => a.indexOf(v) === i),
      totalRaised: campaigns.reduce((sum, c) => sum + Number(c.totalRaised), 0).toString(),
      totalRaisedUSD: campaigns.reduce((sum, c) => sum + c.totalRaisedUSD, 0),
      campaignCount: charity.campaignCount,
      activeCampaignCount: campaigns.filter((c) => c.status === "active").length,
      donorCount: campaigns.reduce((sum, c) => sum + c.donorCount, 0),
      milestonesCompleted: campaigns.flatMap((c) => c.milestones).filter((m) => m.status === "released").length,
      milestoneTotal: campaigns.flatMap((c) => c.milestones).length,
      impactReports: [],
      activeCampaigns: campaigns.filter((c) => c.status === "active"),
      socialLinks: {},
    };
  }

  async getCharityCampaigns(id: string): Promise<Campaign[]> {
    await delay();
    return mockCampaigns.filter((c) => c.charity.id === id);
  }

  async getCharityMilestones(id: string) {
    await delay();
    return mockCampaigns.filter((c) => c.charity.id === id).flatMap((c) => c.milestones);
  }

  async getCharityImpactReports(id: string): Promise<ImpactReport[]> {
    await delay();
    return [];
  }

  async getCharityTrustScore(id: string) {
    await delay(200);
    return { trustScore: 8.7, breakdown: { kycStatus: 10, milestoneCompletionRate: 9.2, donorSatisfaction: 8.5, campaignSuccessRate: 8.0, governanceParticipation: 7.8 } };
  }

  // ── NFT Endpoints ──────────────────────────────────────────────────────────

  async getNFT(tokenId: number): Promise<NFTReceipt | null> {
    await delay();
    return mockNFTs.find((n) => n.tokenId === tokenId) ?? null;
  }

  async getNFTVerification(tokenId: number) {
    await delay(200);
    const nft = mockNFTs.find((n) => n.tokenId === tokenId);
    if (!nft) return null;
    return { ipfsHash: nft.ipfsMetadataHash, blockNumber: nft.blockNumber, contractAddress: nft.contractAddress };
  }

  // ── Donor Dashboard Endpoints ──────────────────────────────────────────────

  async getDonorProfile(address: string): Promise<DonorProfile> {
    await delay();
    return mockDonorProfile;
  }

  async updateDonorProfile(address: string, payload: { displayName: string }): Promise<DonorProfile> {
    await delay(400);
    return { ...mockDonorProfile, ...payload };
  }

  async getDonorDonations(address: string, params?: { page?: number; pageSize?: number; status?: string; token?: string }): Promise<PaginatedResponse<Donation>> {
    return this.getDonationsByDonor(address, params);
  }

  async getDonorNFTs(address: string): Promise<NFTReceipt[]> {
    await delay();
    return mockNFTs;
  }

  async getDonorImpact(address: string) {
    await delay();
    return mockDonorProfile.categoryBreakdown;
  }

  async getDonorTaxSummary(address: string): Promise<TaxSummary> {
    await delay();
    return mockTaxSummary;
  }

  async getDonorTaxSummaryDownload(address: string): Promise<Blob> {
    await delay(600);
    const content = `SancCharity Tax Receipt — ${mockTaxSummary.year}\nTotal Donated: $${mockTaxSummary.totalDonatedUSD}\nTransactions: ${mockTaxSummary.totalTransactions}`;
    return new Blob([content], { type: "text/plain" });
  }

  async getDonorRefunds(address: string): Promise<RefundClaim[]> {
    await delay();
    return mockRefundClaims;
  }

  // ── Charity Management Endpoints ───────────────────────────────────────────

  async getCharityDashboard(charityId: string): Promise<CharityDashboard> {
    await delay();
    const campaigns = mockCampaigns.filter((c) => c.charity.id === charityId);
    return {
      charityId,
      name: mockCharities.find((c) => c.id === charityId)?.name ?? "Your Charity",
      status: CharityStatus.Verified,
      stakeAmount: "10000000000000000",
      stakeEligibleForWithdrawal: false,
      totalRaised: campaigns.reduce((sum, c) => sum + Number(c.totalRaised), 0).toString(),
      totalRaisedUSD: campaigns.reduce((sum, c) => sum + c.totalRaisedUSD, 0),
      activeCampaigns: campaigns.filter((c) => c.status === "active").length,
      milestonesCompleted: campaigns.flatMap((c) => c.milestones).filter((m) => m.status === "released").length,
      milestonesTotal: campaigns.flatMap((c) => c.milestones).length,
      donorCount: campaigns.reduce((sum, c) => sum + c.donorCount, 0),
    };
  }

  async getManageCampaigns(charityId: string): Promise<CampaignManage[]> {
    await delay();
    return mockCampaigns
      .filter((c) => c.charity.id === charityId)
      .map((c) => ({
        id: c.id,
        name: c.name,
        category: c.category,
        campaignType: c.campaignType,
        totalGoal: c.totalGoal,
        totalGoalUSD: c.totalGoalUSD,
        totalRaised: c.totalRaised,
        totalRaisedUSD: c.totalRaisedUSD,
        fundedPercent: Math.round((c.totalRaisedUSD / c.totalGoalUSD) * 100),
        status: c.status,
        activeMilestone: c.milestones.findIndex((m) => m.status === "active" || m.status === "under_review"),
        milestoneProgress: `${c.milestones.filter((m) => m.status === "released").length} / ${c.milestones.length}`,
        donorCount: c.donorCount,
      }));
  }

  async createCampaign(_charityId: string, _payload: Partial<Campaign>): Promise<{ campaignId: string }> {
    await delay(800);
    return { campaignId: `campaign-${Date.now()}` };
  }

  async updateCampaign(_charityId: string, campaignId: string, _payload: Partial<Campaign>): Promise<Campaign> {
    await delay();
    return mockCampaigns.find((c) => c.id === campaignId) ?? mockCampaigns[0];
  }

  async cancelCampaign(_charityId: string, _campaignId: string): Promise<{ success: boolean }> {
    await delay(600);
    return { success: true };
  }

  async pauseCampaign(_charityId: string, _campaignId: string): Promise<{ success: boolean }> {
    await delay();
    return { success: true };
  }

  async resumeCampaign(_charityId: string, _campaignId: string): Promise<{ success: boolean }> {
    await delay();
    return { success: true };
  }

  async getReleasedFunds(_charityId: string): Promise<ReleasedFund[]> {
    await delay();
    const now = Math.floor(Date.now() / 1000);
    return [
      { milestoneIndex: 0, milestoneName: "Foundation & Land Prep", amount: "25000000000000000000", amountUSD: 15625, releasedAt: now - 45 * 86400, txHash: "0xrelease1abc" },
      { milestoneIndex: 0, milestoneName: "Emergency Supplies", amount: "40000000000000000000", amountUSD: 25000, releasedAt: now - 60 * 86400, txHash: "0xrelease2def" },
    ];
  }

  async getPendingReleases(_charityId: string): Promise<PendingRelease[]> {
    await delay();
    return [
      { milestoneIndex: 1, milestoneName: "Structural Construction", amount: "20000000000000000000", amountUSD: 12500, approvalPercent: 72, votesFor: 156, votesAgainst: 60, reviewDeadline: Math.floor(Date.now() / 1000) + 8 * 86400 },
    ];
  }

  async getStakeStatus(_charityId: string) {
    await delay(200);
    return { stakeAmount: "10000000000000000", eligible: false, reason: "Active campaigns in progress" };
  }

  async submitImpactReport(_charityId: string, _payload: object): Promise<{ id: string }> {
    await delay(600);
    return { id: `report-${Date.now()}` };
  }

  async getImpactReports(_charityId: string) {
    await delay();
    return [];
  }

  async updateCharityProfile(_charityId: string, _payload: object): Promise<{ success: boolean }> {
    await delay();
    return { success: true };
  }

  async getMilestoneProofHistory(_charityId: string, _campaignId: string, _milestoneIndex: number) {
    await delay();
    return [];
  }

  // ── Admin Endpoints ────────────────────────────────────────────────────────

  async getAdminDashboard(): Promise<AdminDashboard> {
    await delay();
    return mockAdminDashboard;
  }

  async getKycQueue(): Promise<KycReviewItem[]> {
    await delay();
    return mockKycQueue;
  }

  async approveKyc(_charityId: string): Promise<{ success: boolean }> {
    await delay(600);
    return { success: true };
  }

  async rejectKyc(_charityId: string, _reason?: string): Promise<{ success: boolean }> {
    await delay(600);
    return { success: true };
  }

  async getAdminCharities(params?: { status?: string; search?: string; page?: number; pageSize?: number }): Promise<PaginatedResponse<Charity>> {
    await delay();
    let items = mockCharities;
    if (params?.status) items = items.filter((c) => c.status === params.status);
    if (params?.search) {
      const q = params.search.toLowerCase();
      items = items.filter((c) => c.name.toLowerCase().includes(q));
    }
    return paginate(items, params?.page, params?.pageSize);
  }

  async suspendCharity(_charityId: string): Promise<{ success: boolean }> {
    await delay(600);
    return { success: true };
  }

  async reactivateCharity(_charityId: string): Promise<{ success: boolean }> {
    await delay(600);
    return { success: true };
  }

  async revokeCharity(_charityId: string): Promise<{ success: boolean }> {
    await delay(600);
    return { success: true };
  }

  async getAdminCampaigns(params?: { page?: number; pageSize?: number }): Promise<PaginatedResponse<Campaign>> {
    await delay();
    return paginate(mockCampaigns, params?.page, params?.pageSize);
  }

  async featureCampaign(_campaignId: string, _featured: boolean): Promise<{ success: boolean }> {
    await delay();
    return { success: true };
  }

  async forceCancelCampaign(_campaignId: string): Promise<{ success: boolean }> {
    await delay(600);
    return { success: true };
  }

  async getFeePools(): Promise<FeePool[]> {
    await delay(200);
    return mockFeePools;
  }

  async executeBuyback(_minSancOut: string): Promise<{ txHash: string }> {
    await delay(800);
    return { txHash: `0xbuyback${Date.now().toString(16)}` };
  }

  async getBuybackHistory(): Promise<BuybackRecord[]> {
    await delay();
    return mockBuybackHistory;
  }

  async getTreasury(): Promise<TreasuryOverview> {
    await delay();
    return mockTreasury;
  }

  async getContractStatus(): Promise<Record<string, boolean>> {
    await delay(200);
    return mockAdminDashboard.contractPauseStates;
  }

  async pauseContract(_name: string): Promise<{ success: boolean }> {
    await delay(600);
    return { success: true };
  }

  async unpauseContract(_name: string): Promise<{ success: boolean }> {
    await delay(600);
    return { success: true };
  }

  async getEventListenerStatus(): Promise<EventListenerStatus> {
    await delay(200);
    return mockEventListenerStatus;
  }

  async backfillEvents(_fromBlock: number): Promise<{ success: boolean }> {
    await delay(800);
    return { success: true };
  }

  async getAdminMetrics() {
    await delay();
    return mockImpactData;
  }

  async getActivityLog(params?: { page?: number; pageSize?: number }): Promise<PaginatedResponse<AdminAction>> {
    await delay();
    return paginate(mockAdminActions, params?.page, params?.pageSize);
  }

  async getAdminUsers(params?: { role?: string; search?: string; page?: number; pageSize?: number }): Promise<PaginatedResponse<UserProfile>> {
    await delay();
    let items = mockUserProfiles;
    if (params?.role) items = items.filter((u) => u.role === params.role);
    if (params?.search) {
      const q = params.search.toLowerCase();
      items = items.filter((u) => u.address.toLowerCase().includes(q) || u.displayName.toLowerCase().includes(q));
    }
    return paginate(items, params?.page, params?.pageSize);
  }

  async getAdminUser(address: string): Promise<UserProfile | null> {
    await delay();
    return mockUserProfiles.find((u) => u.address === address) ?? null;
  }

  async flagUser(_address: string, _flagged: boolean, _reason?: string): Promise<{ success: boolean }> {
    await delay();
    return { success: true };
  }

  // ── Campaign Suggestions ───────────────────────────────────────────────────

  async getCampaignSuggestions(): Promise<CampaignSuggestion[]> {
    await delay();
    return mockCampaignSuggestions;
  }

  async submitCampaignSuggestion(_payload: { title: string; category: string; description: string }): Promise<{ id: string }> {
    await delay(600);
    return { id: `sug-${Date.now()}` };
  }
}

export const mockApiClient = new MockApiClient();
