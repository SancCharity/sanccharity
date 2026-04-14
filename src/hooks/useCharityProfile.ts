"use client";

import { useQuery } from "@tanstack/react-query";
import { charityApi } from "@/services/charityApi";

export function useCharityProfile(charityId: string) {
  const profileQuery = useQuery({
    queryKey: ["charity-profile", charityId],
    queryFn: () => charityApi.getCharityProfile(charityId),
    enabled: !!charityId,
    staleTime: 5 * 60 * 1000,
  });

  const campaignsQuery = useQuery({
    queryKey: ["charity-campaigns", charityId],
    queryFn: () => charityApi.getCharityCampaigns(charityId),
    enabled: !!charityId,
    staleTime: 2 * 60 * 1000,
  });

  const milestonesQuery = useQuery({
    queryKey: ["charity-milestones", charityId],
    queryFn: () => charityApi.getCharityMilestones(charityId),
    enabled: !!charityId,
    staleTime: 5 * 60 * 1000,
  });

  const trustScoreQuery = useQuery({
    queryKey: ["trust-score", charityId],
    queryFn: () => charityApi.getCharityTrustScore(charityId),
    enabled: !!charityId,
    staleTime: 60 * 60 * 1000, // 1h per PRD TTL
  });

  const impactReportsQuery = useQuery({
    queryKey: ["charity-impact-reports", charityId],
    queryFn: () => charityApi.getCharityImpactReports(charityId),
    enabled: !!charityId,
    staleTime: 10 * 60 * 1000,
  });

  return {
    profile: profileQuery.data,
    campaigns: campaignsQuery.data ?? [],
    milestones: milestonesQuery.data ?? [],
    trustScore: trustScoreQuery.data,
    impactReports: impactReportsQuery.data ?? [],
    isLoading: profileQuery.isLoading,
    isError: profileQuery.isError,
    error: profileQuery.error,
  };
}
