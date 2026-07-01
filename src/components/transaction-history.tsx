"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownLeft, RefreshCw, Clock, CheckCircle, XCircle, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTransactionHistory, type Transaction } from "@/hooks/useTransactionHistory";

const TYPE_ICONS = {
  send: ArrowUpRight,
  receive: ArrowDownLeft,
  swap: RefreshCw,
  approve: CheckCircle,
};

const TYPE_COLORS = {
  send: "text-red-400 bg-red-500/10",
  receive: "text-emerald-400 bg-emerald-500/10",
  swap: "text-blue-400 bg-blue-500/10",
  approve: "text-gold-400 bg-gold-500/10",
};

const STATUS_ICONS = {
  success: <CheckCircle className="h-4 w-4 text-emerald-400" />,
  pending: <Clock className="h-4 w-4 text-gold-400 animate-pulse" />,
  failed: <XCircle className="h-4 w-4 text-red-400" />,
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function TransactionHistory() {
  const { transactions, isLoading, refresh } = useTransactionHistory();

  if (isLoading) {
    return (
      <Card className="border-gold-900/30 bg-card/50">
        <CardHeader>
          <CardTitle className="text-white">Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="h-6 w-6 text-gold-400 animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-gold-900/30 bg-card/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white">Transaction History</CardTitle>
        <button
          onClick={refresh}
          className="p-2 rounded-lg hover:bg-gold-500/10 text-muted-foreground hover:text-gold-400 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.map((tx, index) => {
            const TypeIcon = TYPE_ICONS[tx.type];

            return (
              <motion.div
                key={tx.hash}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-4 p-3 rounded-xl bg-background/40 border border-gold-900/20 hover:border-gold-500/20 transition-colors"
              >
                {/* Type Icon */}
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${TYPE_COLORS[tx.type]}`}>
                  <TypeIcon className="h-5 w-5" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white capitalize">{tx.type}</span>
                    {STATUS_ICONS[tx.status]}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {formatDate(tx.timestamp)} • {tx.tokenSymbol}
                  </div>
                </div>

                {/* Amount */}
                <div className="text-right">
                  <div className={`text-sm font-medium ${
                    tx.type === "receive" ? "text-emerald-400" : 
                    tx.type === "send" ? "text-red-400" : "text-white"
                  }`}>
                    {tx.type === "receive" ? "+" : tx.type === "send" ? "-" : ""}
                    {tx.value} {tx.tokenSymbol}
                  </div>
                  {tx.gasFee && (
                    <div className="text-xs text-muted-foreground">
                      Fee: {tx.gasFee} ETH
                    </div>
                  )}
                </div>

                {/* Link */}
                <a
                  href={`https://etherscan.io/tx/${tx.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-gold-500/10 text-muted-foreground hover:text-gold-400 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
