"use client";

import { useReadContract } from "wagmi";
import { formatUnits } from "viem";

// ABI fragment — only the fields we need
const REGISTRY_ABI = [
  {
    name: "registrationStakeUSD",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "registrationStakeAmount",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
] as const;

const REGISTRY_ADDRESS = (process.env.NEXT_PUBLIC_REGISTRY_ADDRESS ?? "") as `0x${string}`;
const SANC_DECIMALS = 9;

// Fallback values shown in preview/mock mode
const MOCK_STAKE_USD = 500;
const MOCK_STAKE_AMOUNT = 10_000_000; // SANC tokens (not raw units)

export function useRegistrationStake() {
  const isLive = !!REGISTRY_ADDRESS;

  const { data: rawUsd } = useReadContract({
    address: REGISTRY_ADDRESS,
    abi: REGISTRY_ABI,
    functionName: "registrationStakeUSD",
    query: { enabled: isLive },
  });

  const { data: rawAmount } = useReadContract({
    address: REGISTRY_ADDRESS,
    abi: REGISTRY_ABI,
    functionName: "registrationStakeAmount",
    query: { enabled: isLive },
  });

  const stakeUsd = isLive && rawUsd != null
    ? Number(rawUsd)
    : MOCK_STAKE_USD;

  const stakeTokens = isLive && rawAmount != null
    ? Number(formatUnits(rawAmount as bigint, SANC_DECIMALS))
    : MOCK_STAKE_AMOUNT;

  const stakeRaw = isLive && rawAmount != null
    ? (typeof rawAmount === "bigint" ? rawAmount : BigInt(String(rawAmount)))
    : BigInt(MOCK_STAKE_AMOUNT) * 10n ** BigInt(SANC_DECIMALS);

  return {
    stakeUsd,       // e.g. 500  (USD target)
    stakeTokens,    // e.g. 10_000_000  (human-readable SANC)
    stakeRaw,       // BigInt raw units for contract calls
    isLive,
  };
}
