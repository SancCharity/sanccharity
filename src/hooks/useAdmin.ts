"use client";

import { useQuery } from "@tanstack/react-query";
import { useState, useCallback } from "react";
import { charityApi } from "@/services/charityApi";

export function useAdmin() {
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [comingSoonMessage, setComingSoonMessage] = useState("");
  const [userFilters, setUserFilters] = useState<{ role?: string; search?: string; page: number }>({ page: 1 });
  const [charityFilters, setCharityFilters] = useState<{ status?: string; search?: string; page: number }>({ page: 1 });

  const dashboardQuery = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: () => charityApi.getAdminDashboard(),
    staleTime: 60 * 1000,
  });

  const kycQueueQuery = useQuery({
    queryKey: ["kyc-queue"],
    queryFn: () => charityApi.getKycQueue(),
    staleTime: 30 * 1000,
  });

  const charitiesQuery = useQuery({
    queryKey: ["admin-charities", charityFilters],
    queryFn: () => charityApi.getAdminCharities(charityFilters),
    staleTime: 60 * 1000,
  });

  const campaignsQuery = useQuery({
    queryKey: ["admin-campaigns"],
    queryFn: () => charityApi.getAdminCampaigns({ pageSize: 20 }),
    staleTime: 60 * 1000,
  });

  const feePoolsQuery = useQuery({
    queryKey: ["fee-pools"],
    queryFn: () => charityApi.getFeePools(),
    staleTime: 2 * 60 * 1000,
  });

  const buybackHistoryQuery = useQuery({
    queryKey: ["buyback-history"],
    queryFn: () => charityApi.getBuybackHistory(),
    staleTime: 5 * 60 * 1000,
  });

  const treasuryQuery = useQuery({
    queryKey: ["treasury"],
    queryFn: () => charityApi.getTreasury(),
    staleTime: 2 * 60 * 1000,
  });

  const contractStatusQuery = useQuery({
    queryKey: ["contract-status"],
    queryFn: () => charityApi.getContractStatus(),
    staleTime: 30 * 1000,
  });

  const eventListenerQuery = useQuery({
    queryKey: ["event-listener"],
    queryFn: () => charityApi.getEventListenerStatus(),
    staleTime: 30 * 1000,
    refetchInterval: 30 * 1000,
  });

  const activityLogQuery = useQuery({
    queryKey: ["activity-log"],
    queryFn: () => charityApi.getActivityLog({ pageSize: 20 }),
    staleTime: 60 * 1000,
  });

  const usersQuery = useQuery({
    queryKey: ["admin-users", userFilters],
    queryFn: () => charityApi.getAdminUsers(userFilters),
    staleTime: 60 * 1000,
  });

  const triggerComingSoon = useCallback((label: string) => {
    setComingSoonMessage(`${label} is coming soon — SancCharity launches on BSC shortly.`);
    setShowComingSoon(true);
  }, []);

  const handleApproveKyc = useCallback((charityId: string) => triggerComingSoon("KYC approval"), [triggerComingSoon]);
  const handleRejectKyc = useCallback((charityId: string) => triggerComingSoon("KYC rejection"), [triggerComingSoon]);
  const handleVerifyCharity = useCallback((charityId: string) => triggerComingSoon("Charity verification"), [triggerComingSoon]);
  const handleSuspendCharity = useCallback((charityId: string) => triggerComingSoon("Charity suspension"), [triggerComingSoon]);
  const handleReactivateCharity = useCallback((charityId: string) => triggerComingSoon("Charity reactivation"), [triggerComingSoon]);
  const handleRevokeCharity = useCallback((charityId: string) => triggerComingSoon("Charity revocation"), [triggerComingSoon]);
  const handleFeatureCampaign = useCallback((campaignId: string, featured: boolean) => triggerComingSoon("Campaign featuring"), [triggerComingSoon]);
  const handleForceCancelCampaign = useCallback((campaignId: string) => triggerComingSoon("Force campaign cancel"), [triggerComingSoon]);
  const handleExecuteBuyback = useCallback((minSancOut: string) => triggerComingSoon("Buyback & burn"), [triggerComingSoon]);
  const handlePauseContract = useCallback((name: string) => triggerComingSoon(`Pausing ${name}`), [triggerComingSoon]);
  const handleUnpauseContract = useCallback((name: string) => triggerComingSoon(`Unpausing ${name}`), [triggerComingSoon]);
  const handleBackfillEvents = useCallback((fromBlock: number) => triggerComingSoon("Event backfill"), [triggerComingSoon]);
  const handleFlagUser = useCallback((address: string, flagged: boolean) => triggerComingSoon("User flag"), [triggerComingSoon]);

  return {
    dashboard: dashboardQuery.data,
    kycQueue: kycQueueQuery.data ?? [],
    charities: charitiesQuery.data?.data ?? [],
    totalCharities: charitiesQuery.data?.total ?? 0,
    campaigns: campaignsQuery.data?.data ?? [],
    totalCampaigns: campaignsQuery.data?.total ?? 0,
    feePools: feePoolsQuery.data ?? [],
    buybackHistory: buybackHistoryQuery.data ?? [],
    treasury: treasuryQuery.data,
    contractStatus: contractStatusQuery.data ?? {},
    eventListener: eventListenerQuery.data,
    activityLog: activityLogQuery.data?.data ?? [],
    users: usersQuery.data?.data ?? [],
    totalUsers: usersQuery.data?.total ?? 0,
    totalUserPages: usersQuery.data?.totalPages ?? 1,
    isLoading: dashboardQuery.isLoading,
    charityFilters,
    setCharityFilters,
    userFilters,
    setUserFilters,
    handleApproveKyc,
    handleRejectKyc,
    handleVerifyCharity,
    handleSuspendCharity,
    handleReactivateCharity,
    handleRevokeCharity,
    handleFeatureCampaign,
    handleForceCancelCampaign,
    handleExecuteBuyback,
    handlePauseContract,
    handleUnpauseContract,
    handleBackfillEvents,
    handleFlagUser,
    showComingSoon,
    setShowComingSoon,
    comingSoonMessage,
  };
}
