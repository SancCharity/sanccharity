"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useCallback } from "react";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { charityApi } from "@/services/charityApi";
import { CharityService, ComingSoonError } from "@/services/charityService";

export function useGovernance() {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const queryClient = useQueryClient();

  const [showComingSoon, setShowComingSoon] = useState(false);
  const [comingSoonMessage, setComingSoonMessage] = useState("");

  const voterInfoQuery = useQuery({
    queryKey: ["voter-info", address],
    queryFn: () => charityApi.getVoterInfo(address ?? ""),
    enabled: !!address,
    staleTime: 60 * 1000, // 1 min per PRD
  });

  const activeVotesQuery = useQuery({
    queryKey: ["active-votes"],
    queryFn: () => charityApi.getActiveVotes(),
    staleTime: 30 * 1000,
    refetchInterval: 30 * 1000,
  });

  const voteHistoryQuery = useQuery({
    queryKey: ["vote-history", address],
    queryFn: () => charityApi.getVoteHistory(address ?? ""),
    enabled: !!address,
    staleTime: 5 * 60 * 1000,
  });

  const suggestionsQuery = useQuery({
    queryKey: ["campaign-suggestions"],
    queryFn: () => charityApi.getCampaignSuggestions(),
    staleTime: 5 * 60 * 1000,
  });

  const triggerComingSoon = (label: string) => {
    setComingSoonMessage(`${label} is coming soon — SancCharity launches on BSC shortly.`);
    setShowComingSoon(true);
  };

  const handleStake = useCallback(async (amount: string) => {
    triggerComingSoon("Governance staking");
  }, []);

  const handleUnstake = useCallback(async (amount: string) => {
    triggerComingSoon("Unstaking");
  }, []);

  const handleVote = useCallback(async (campaignId: string, milestoneIndex: number, choice: "approve" | "reject" | "abstain") => {
    triggerComingSoon("Vote casting");
  }, []);

  const handleSuggest = useCallback(async (payload: { title: string; category: string; description: string }) => {
    triggerComingSoon("Campaign suggestion");
  }, []);

  return {
    voterInfo: voterInfoQuery.data,
    activeVotes: activeVotesQuery.data ?? [],
    voteHistory: voteHistoryQuery.data ?? [],
    suggestions: suggestionsQuery.data ?? [],
    isLoadingVoter: voterInfoQuery.isLoading,
    isLoadingVotes: activeVotesQuery.isLoading,
    handleStake,
    handleUnstake,
    handleVote,
    handleSuggest,
    showComingSoon,
    setShowComingSoon,
    comingSoonMessage,
  };
}
