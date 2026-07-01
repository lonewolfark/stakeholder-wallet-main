"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";
import { getTopCoins, type CoinPrice, formatPrice } from "@/lib/api";

export function PriceTicker() {
  const [coins, setCoins] = useState<CoinPrice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrices() {
      try {
        const data = await getTopCoins(10);
        setCoins(data);
      } catch (err) {
        console.error("Failed to fetch prices:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPrices();
    const interval = setInterval(fetchPrices, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="border-b border-gold-900/30 bg-background/50 backdrop-blur-sm py-3">
        <div className="mx-auto max-w-7xl px-4 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-gold-400 animate-pulse" />
          <span className="text-sm text-muted-foreground">Loading market data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-gold-900/30 bg-background/50 backdrop-blur-sm overflow-hidden">
      <div className="flex animate-scroll hover:[animation-play-state:paused]">
        {[...coins, ...coins].map((coin, i) => (
          <div
            key={`${coin.id}-${i}`}
            className="flex items-center gap-3 px-6 py-3 border-r border-gold-900/20 whitespace-nowrap"
          >
            <img src={coin.image} alt={coin.name} className="h-5 w-5 rounded-full" />
            <span className="text-sm font-medium text-white">{coin.symbol.toUpperCase()}</span>
            <span className="text-sm text-muted-foreground">{formatPrice(coin.current_price)}</span>
            <span
              className={`text-xs font-medium flex items-center gap-0.5 ${
                coin.price_change_percentage_24h >= 0 ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {coin.price_change_percentage_24h >= 0 ? (
                <ArrowUpRight className="h-3 w-3" />
              ) : (
                <ArrowDownRight className="h-3 w-3" />
              )}
              {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
