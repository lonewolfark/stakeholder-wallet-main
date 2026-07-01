"use client";

import { useAccount, useReadContracts } from "wagmi";
import { formatUnits } from "viem";
import { ERC20_ABI, TOKEN_CONTRACTS } from "@/lib/wagmi";

export interface TokenBalance {
  symbol: string;
  balance: string;
  rawBalance: bigint;
  decimals: number;
  contractAddress: `0x${string}`;
  value: number;
}

export function useTokenBalances() {
  const { address, chainId } = useAccount();

  const tokens = chainId ? TOKEN_CONTRACTS[chainId] || {} : {};

  const contracts = Object.entries(tokens).flatMap(([symbol, contractAddress]) => [
    {
      address: contractAddress,
      abi: ERC20_ABI,
      functionName: "balanceOf",
      args: address ? [address] : undefined,
    } as const,
    {
      address: contractAddress,
      abi: ERC20_ABI,
      functionName: "decimals",
    } as const,
  ]);

  const { data, isLoading, error } = useReadContracts({
    contracts: address ? contracts : [],
    query: {
      enabled: !!address && !!chainId,
      refetchInterval: 30000, // Refresh every 30 seconds
    },
  });

  const balances: TokenBalance[] = [];

  if (data && address) {
    const tokenEntries = Object.entries(tokens);
    for (let i = 0; i < tokenEntries.length; i++) {
      const [symbol, contractAddress] = tokenEntries[i];
      const balanceResult = data[i * 2];
      const decimalsResult = data[i * 2 + 1];

      if (balanceResult?.result && decimalsResult?.result) {
        const rawBalance = balanceResult.result as bigint;
        const decimals = decimalsResult.result as number;
        const formatted = formatUnits(rawBalance, decimals);
        
        balances.push({
          symbol,
          balance: formatted,
          rawBalance,
          decimals,
          contractAddress,
          value: parseFloat(formatted),
        });
      }
    }
  }

  return {
    balances,
    isLoading,
    error,
    tokens,
  };
}
