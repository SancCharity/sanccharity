"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useCallback } from "react";
import { charityApi } from "@/services/charityApi";
import { CharityService, ComingSoonError } from "@/services/charityService";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";

export function useDonorDashboard(address?: string) {
  const { address: connectedAddress } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const walletAddress = address ?? connectedAddress ?? "";

  const [showComingSoon, setShowComingSoon] = useState(false);
  const [comingSoonMessage, setComingSoonMessage] = useState("");
  const [donationFilter, setDonationFilter] = useState<{ status?: string; token?: string; page: number }>({ page: 1 });
  const [activeTab, setActiveTab] = useState<"donations" | "nfts" | "impact" | "tax" | "refunds" | "governance">("donations");

  const profileQuery = useQuery({
    queryKey: ["donor-profile", walletAddress],
    queryFn: () => charityApi.getDonorProfile(walletAddress),
    enabled: !!walletAddress,
  });

  const donationsQuery = useQuery({
    queryKey: ["donor-donations", walletAddress, donationFilter],
    queryFn: () => charityApi.getDonorDonations(walletAddress, donationFilter),
    enabled: !!walletAddress,
  });

  const nftsQuery = useQuery({
    queryKey: ["donor-nfts", walletAddress],
    queryFn: () => charityApi.getDonorNFTs(walletAddress),
    enabled: !!walletAddress,
  });

  const impactQuery = useQuery({
    queryKey: ["donor-impact", walletAddress],
    queryFn: () => charityApi.getDonorImpact(walletAddress),
    enabled: !!walletAddress,
  });

  const taxQuery = useQuery({
    queryKey: ["donor-tax", walletAddress],
    queryFn: () => charityApi.getDonorTaxSummary(walletAddress),
    enabled: !!walletAddress,
  });

  const refundsQuery = useQuery({
    queryKey: ["donor-refunds", walletAddress],
    queryFn: () => charityApi.getDonorRefunds(walletAddress),
    enabled: !!walletAddress,
  });

  const handleClaimRefund = useCallback(async (campaignId: string) => {
    setComingSoonMessage("Refund claiming is coming soon — SancCharity launches on BSC shortly.");
    setShowComingSoon(true);
  }, []);

  const handleDownloadTax = useCallback(async () => {
    setComingSoonMessage("Tax report download is coming soon.");
    setShowComingSoon(true);
  }, []);

  const handleUpdateDisplayName = useCallback(async (displayName: string) => {
    setComingSoonMessage("Profile editing is coming soon.");
    setShowComingSoon(true);
  }, []);

  return {
    profile: profileQuery.data,
    donations: donationsQuery.data?.data ?? [],
    totalDonations: donationsQuery.data?.total ?? 0,
    totalDonationPages: donationsQuery.data?.totalPages ?? 1,
    nfts: nftsQuery.data ?? [],
    impact: impactQuery.data ?? [],
    taxSummary: taxQuery.data,
    refunds: refundsQuery.data ?? [],
    isLoading: profileQuery.isLoading,
    activeTab,
    setActiveTab,
    donationFilter,
    setDonationFilter,
    handleClaimRefund,
    handleDownloadTax,
    handleUpdateDisplayName,
    showComingSoon,
    setShowComingSoon,
    comingSoonMessage,
  };
}
