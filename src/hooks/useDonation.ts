"use client";

import { useState, useCallback } from "react";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { charityApi } from "@/services/charityApi";
import { CharityService, ComingSoonError } from "@/services/charityService";
import { ACCEPTED_TOKENS, LARGE_DONATION_THRESHOLD_BNB } from "@/lib/constants";
import type { DonationFormState } from "@/types/charity";

const DEFAULT_STATE: DonationFormState = {
  campaignId: "",
  token: "0x0000000000000000000000000000000000000000",
  tokenSymbol: "BNB",
  amount: "",
  isLoading: false,
  error: null,
  txHash: null,
  nftTokenId: null,
};

export function useDonation(initialCampaignId?: string, isPrivateCampaign?: boolean) {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const [form, setForm] = useState<DonationFormState>({
    ...DEFAULT_STATE,
    campaignId: initialCampaignId ?? "",
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [comingSoonMessage, setComingSoonMessage] = useState("");

  const selectedToken = ACCEPTED_TOKENS.find((t) => t.address === form.token) ?? ACCEPTED_TOKENS[0];
  const isBNB = selectedToken.symbol === "BNB";
  const isSANC = selectedToken.symbol === "SANC";

  // Fee: 0% for private campaigns; 0% for SANC, 1.5% for BNB/USDT/BUSD on public campaigns
  const feePercent = isPrivateCampaign ? 0 : (isSANC ? 0 : 1.5);
  const amountNum = parseFloat(form.amount) || 0;
  const feeAmount = amountNum * (feePercent / 100);
  const netAmount = amountNum - feeAmount;

  // Large donation guard (>10 BNB or equivalent)
  const isLargeDonation = isBNB && amountNum > LARGE_DONATION_THRESHOLD_BNB;

  const setField = useCallback(<K extends keyof DonationFormState>(key: K, value: DonationFormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const selectToken = useCallback((tokenAddress: string) => {
    const token = ACCEPTED_TOKENS.find((t) => t.address === tokenAddress);
    if (token) {
      setForm((prev) => ({ ...prev, token: tokenAddress, tokenSymbol: token.symbol }));
    }
  }, []);

  const setAmountPercent = useCallback((pct: 25 | 50 | 75 | 100, balance: string) => {
    const bal = parseFloat(balance) || 0;
    setField("amount", ((bal * pct) / 100).toFixed(4));
  }, [setField]);

  const openConfirm = useCallback(() => {
    if (!form.campaignId || !form.amount || amountNum <= 0) return;
    setShowConfirmModal(true);
  }, [form.campaignId, form.amount, amountNum]);

  const executeDonate = useCallback(async () => {
    if (!address || !publicClient) return;
    setForm((prev) => ({ ...prev, isLoading: true, error: null }));
    setShowConfirmModal(false);

    try {
      const service = new CharityService(publicClient, walletClient ?? null);
      const amountRaw = BigInt(Math.floor(amountNum * 10 ** selectedToken.decimals));
      const txHash = await service.donate({ campaignId: form.campaignId, tokenAddress: form.token, amount: amountRaw, isBNB });
      setForm((prev) => ({ ...prev, isLoading: false, txHash, nftTokenId: Math.floor(Math.random() * 1000) + 5000 }));
      setShowSuccessModal(true);
    } catch (err) {
      if (err instanceof ComingSoonError) {
        setComingSoonMessage(err.message);
        setShowComingSoon(true);
        setForm((prev) => ({ ...prev, isLoading: false }));
      } else {
        setForm((prev) => ({ ...prev, isLoading: false, error: err instanceof Error ? err.message : "Transaction failed" }));
      }
    }
  }, [address, publicClient, walletClient, amountNum, selectedToken, form.campaignId, form.token, isBNB]);

  const reset = useCallback(() => {
    setForm({ ...DEFAULT_STATE, campaignId: initialCampaignId ?? "" });
    setShowSuccessModal(false);
    setShowComingSoon(false);
  }, [initialCampaignId]);

  return {
    form,
    setField,
    selectToken,
    setAmountPercent,
    openConfirm,
    executeDonate,
    reset,
    selectedToken,
    feePercent,
    feeAmount,
    netAmount,
    isLargeDonation,
    showConfirmModal,
    setShowConfirmModal,
    showSuccessModal,
    setShowSuccessModal,
    showComingSoon,
    setShowComingSoon,
    comingSoonMessage,
    acceptedTokens: ACCEPTED_TOKENS,
  };
}
