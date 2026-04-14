"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { charityApi } from "@/services/charityApi";
import type { CampaignCategory, CampaignStatus } from "@/types/charity";

export interface CampaignFilters {
  category?: CampaignCategory | "";
  status?: CampaignStatus | "";
  search?: string;
  featured?: boolean;
  page?: number;
  pageSize?: number;
}

export function useCharity(filters: CampaignFilters = {}) {
  const { category, status, search, featured, page = 1, pageSize = 9 } = filters;

  const campaignsQuery = useQuery({
    queryKey: ["campaigns", category, status, search, featured, page, pageSize],
    queryFn: () =>
      charityApi.listCampaigns({
        category: category || undefined,
        status: status || undefined,
        search: search || undefined,
        featured,
        page,
        pageSize,
      }),
    staleTime: 2 * 60 * 1000, // 2 min per PRD cache spec
  });

  const charitiesQuery = useQuery({
    queryKey: ["charities"],
    queryFn: () => charityApi.listCharities({ status: "verified" }),
    staleTime: 5 * 60 * 1000,
  });

  const recentDonationsQuery = useQuery({
    queryKey: ["recent-donations"],
    queryFn: () => charityApi.getRecentDonations(),
    staleTime: 30 * 1000,
    refetchInterval: 30 * 1000, // live-ish feel
  });

  const platformStatsQuery = useQuery({
    queryKey: ["platform-stats"],
    queryFn: () => charityApi.getDonationStats(),
    staleTime: 5 * 60 * 1000,
  });

  return {
    campaigns: campaignsQuery.data?.data ?? [],
    totalCampaigns: campaignsQuery.data?.total ?? 0,
    totalPages: campaignsQuery.data?.totalPages ?? 1,
    currentPage: page,
    charities: charitiesQuery.data?.data ?? [],
    recentDonations: recentDonationsQuery.data ?? [],
    platformStats: platformStatsQuery.data,
    isLoading: campaignsQuery.isLoading,
    isError: campaignsQuery.isError,
    error: campaignsQuery.error,
  };
}
