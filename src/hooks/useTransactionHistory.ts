"use client";

import { useAccount } from "wagmi";
import { useState, useEffect } from "react";

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: string;
  status: "success" | "pending" | "failed";
  type: "send" | "receive" | "swap" | "approve";
  tokenSymbol?: string;
  gasFee?: string;
}

// Mock transaction history - replace with Etherscan/Alchemy API in production
const MOCK_TRANSACTIONS: Transaction[] = [
  {
    hash: "0x1234...5678",
    from: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    to: "0x8ba1f109551bD432803012645Hac136c82C3e8C",
    value: "1.5",
    timestamp: "2024-12-28T10:30:00Z",
    status: "success",
    type: "send",
    tokenSymbol: "ETH",
    gasFee: "0.0021",
  },
  {
    hash: "0xabcd...ef01",
    from: "0x8ba1f109551bD432803012645Hac136c82C3e8C",
    to: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    value: "500",
    timestamp: "2024-12-27T15:45:00Z",
    status: "success",
    type: "receive",
    tokenSymbol: "USDC",
    gasFee: "0.0015",
  },
  {
    hash: "0x2468...1357",
    from: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    to: "0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD",
    value: "0.25",
    timestamp: "2024-12-26T09:15:00Z",
    status: "success",
    type: "swap",
    tokenSymbol: "ETH",
    gasFee: "0.0032",
  },
  {
    hash: "0x9999...0000",
    from: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    to: "0xA0b86a33E6441e0A421e56E4773C3C1C3E14E5e8",
    value: "1000",
    timestamp: "2024-12-25T18:20:00Z",
    status: "pending",
    type: "send",
    tokenSymbol: "USDT",
  },
  {
    hash: "0x7777...8888",
    from: "0x1111...2222",
    to: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    value: "2.0",
    timestamp: "2024-12-24T12:00:00Z",
    status: "success",
    type: "receive",
    tokenSymbol: "ETH",
    gasFee: "0.0018",
  },
];

export function useTransactionHistory() {
  const { address } = useAccount();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In production, fetch from Etherscan API or Alchemy
    // const API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
    // fetch(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&apikey=${API_KEY}`)
    
    setTimeout(() => {
      setTransactions(MOCK_TRANSACTIONS);
      setIsLoading(false);
    }, 1000);
  }, [address]);

  const refresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setTransactions(MOCK_TRANSACTIONS);
      setIsLoading(false);
    }, 1000);
  };

  return {
    transactions,
    isLoading,
    refresh,
  };
}
