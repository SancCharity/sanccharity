"use client";

import { useQuery } from "@tanstack/react-query";
import { charityApi } from "@/services/charityApi";

export function useCampaignDetails(campaignId: string) {
  const campaignQuery = useQuery({
    queryKey: ["campaign", campaignId],
    queryFn: () => charityApi.getCampaign(campaignId),
    enabled: !!campaignId,
    staleTime: 30 * 1000, // 30s per PRD cache spec
  });

  const donationsQuery = useQuery({
    queryKey: ["campaign-donations", campaignId],
    queryFn: () => charityApi.getCampaignDonations(campaignId, { pageSize: 10 }),
    enabled: !!campaignId,
    staleTime: 30 * 1000,
  });

  const impactQuery = useQuery({
    queryKey: ["campaign-impact", campaignId],
    queryFn: () => charityApi.getCampaignImpact(campaignId),
    enabled: !!campaignId,
    staleTime: 10 * 60 * 1000,
  });

  return {
    campaign: campaignQuery.data ?? null,
    milestones: campaignQuery.data?.milestones ?? [],
    donations: donationsQuery.data?.data ?? [],
    totalDonations: donationsQuery.data?.total ?? 0,
    impact: impactQuery.data,
    isLoading: campaignQuery.isLoading,
    isError: campaignQuery.isError,
    error: campaignQuery.error,
  };
}

export function usePrivateCampaign(campaignId: string, accessToken: string) {
  return useQuery({
    queryKey: ["campaign-private", campaignId, accessToken],
    queryFn: () => charityApi.getCampaignByAccessToken(campaignId, accessToken),
    enabled: !!campaignId && !!accessToken,
    staleTime: 30 * 1000,
  });
}
