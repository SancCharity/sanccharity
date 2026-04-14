"use client";

import { useQuery } from "@tanstack/react-query";
import { useState, useCallback } from "react";
import { useAccount } from "wagmi";
import { charityApi } from "@/services/charityApi";

// In preview mode, mock charity ID "1" is linked to the connected wallet.
// In production this is derived from on-chain charityIdByOwner lookup.
const MOCK_CHARITY_ID = "1";

export function useCharityManage() {
  const { address, isConnected } = useAccount();

  const [showComingSoon, setShowComingSoon] = useState(false);
  const [comingSoonMessage, setComingSoonMessage] = useState("");

  const charityId = MOCK_CHARITY_ID; // real: look up charityIdByOwner(address)

  const dashboardQuery = useQuery({
    queryKey: ["charity-dashboard", charityId],
    queryFn: () => charityApi.getCharityDashboard(charityId),
    enabled: isConnected && !!charityId,
  });

  const campaignsQuery = useQuery({
    queryKey: ["manage-campaigns", charityId],
    queryFn: () => charityApi.getManageCampaigns(charityId),
    enabled: isConnected && !!charityId,
  });

  const releasedFundsQuery = useQuery({
    queryKey: ["released-funds", charityId],
    queryFn: () => charityApi.getReleasedFunds(charityId),
    enabled: isConnected && !!charityId,
  });

  const pendingReleasesQuery = useQuery({
    queryKey: ["pending-releases", charityId],
    queryFn: () => charityApi.getPendingReleases(charityId),
    enabled: isConnected && !!charityId,
  });

  const stakeStatusQuery = useQuery({
    queryKey: ["stake-status", charityId],
    queryFn: () => charityApi.getStakeStatus(charityId),
    enabled: isConnected && !!charityId,
  });

  const triggerComingSoon = (label: string) => {
    setComingSoonMessage(`${label} is coming soon — SancCharity launches on BSC shortly.`);
    setShowComingSoon(true);
  };

  const handleSubmitProof = useCallback(async (campaignId: string, milestoneIndex: number, proofIPFS: string, description: string) => {
    triggerComingSoon("Milestone proof submission");
  }, []);

  const handleCancelCampaign = useCallback(async (campaignId: string) => {
    triggerComingSoon("Campaign cancellation");
  }, []);

  const handlePauseCampaign = useCallback(async (campaignId: string) => {
    triggerComingSoon("Campaign pause");
  }, []);

  const handleResumeCampaign = useCallback(async (campaignId: string) => {
    triggerComingSoon("Campaign resume");
  }, []);

  const handleWithdrawStake = useCallback(async () => {
    triggerComingSoon("Stake withdrawal");
  }, []);

  const handleSubmitImpactReport = useCallback(async (payload: object) => {
    triggerComingSoon("Impact report submission");
  }, []);

  const handleUpdateProfile = useCallback(async (payload: object) => {
    triggerComingSoon("Profile update");
  }, []);

  return {
    charityId,
    dashboard: dashboardQuery.data,
    campaigns: campaignsQuery.data ?? [],
    releasedFunds: releasedFundsQuery.data ?? [],
    pendingReleases: pendingReleasesQuery.data ?? [],
    stakeStatus: stakeStatusQuery.data,
    isLoading: dashboardQuery.isLoading,
    handleSubmitProof,
    handleCancelCampaign,
    handlePauseCampaign,
    handleResumeCampaign,
    handleWithdrawStake,
    handleSubmitImpactReport,
    handleUpdateProfile,
    showComingSoon,
    setShowComingSoon,
    comingSoonMessage,
  };
}
