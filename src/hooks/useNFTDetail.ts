"use client";

import { useQuery } from "@tanstack/react-query";
import { charityApi } from "@/services/charityApi";

export function useNFTDetail(tokenId: number) {
  const nftQuery = useQuery({
    queryKey: ["nft", tokenId],
    queryFn: () => charityApi.getNFT(tokenId),
    enabled: !!tokenId,
    staleTime: 10 * 60 * 1000,
  });

  const verificationQuery = useQuery({
    queryKey: ["nft-verification", tokenId],
    queryFn: () => charityApi.getNFTVerification(tokenId),
    enabled: !!tokenId,
    staleTime: 10 * 60 * 1000,
  });

  return {
    nft: nftQuery.data ?? null,
    verification: verificationQuery.data ?? null,
    isLoading: nftQuery.isLoading,
    isError: nftQuery.isError,
    error: nftQuery.error,
  };
}
