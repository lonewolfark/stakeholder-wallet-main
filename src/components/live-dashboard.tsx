"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  getTopCoins,
  getGlobalData,
  getCoinHistory,
  type CoinPrice,
  formatCurrency,
  formatPrice,
} from "@/lib/api";

const TRACKED_COINS = ["bitcoin", "ethereum", "solana", "tether", "usd-coin"];

const COLORS = ["#d4af37", "#f0d96b", "#b8962e", "#967624", "#70561b"];

export default function LiveDashboard() {
  const [coins, setCoins] = useState<CoinPrice[]>([]);
  const [globalData, setGlobalData] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  async function fetchAllData() {
    try {
      const [coinsData, global, btcHistory] = await Promise.all([
        getCoinsByIds(TRACKED_COINS),
        getGlobalData(),
        getCoinHistory("bitcoin", 30),
      ]);

      setCoins(coinsData);
      setGlobalData(global.data);

      // Transform history data for chart
      const history = btcHistory.prices.map(([timestamp, price]: [number, number]) => ({
        date: new Date(timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        price,
      }));
      setChartData(history);

      setLastUpdated(new Date());
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAllData();
    const interval = setInterval(fetchAllData, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  const totalBalance = coins.reduce((sum, coin) => {
    // Mock balances for demo — replace with real wallet data
    const balances: Record<string, number> = {
      bitcoin: 2.518,
      ethereum: 12.628,
      solana: 1250,
      tether: 483000,
      "usd-coin": 152000,
    };
    return sum + coin.current_price * (balances[coin.id] || 0);
  }, 0);

  const allocationData = coins.map((coin) => ({
    name: coin.symbol.toUpperCase(),
    value: coin.market_cap,
    color: COLORS[coins.indexOf(coin) % COLORS.length],
  }));

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="h-8 w-8 text-gold-400 animate-spin" />
          <span className="text-muted-foreground">Loading live market data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Live Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Real-time market data • Updated {lastUpdated.toLocaleTimeString()}
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400 border border-emerald-500/20">
              <Activity className="h-4 w-4 animate-pulse" />
              Live
            </div>
          </div>

          {/* Global Stats */}
          {globalData && (
            <div className="grid gap-4 md:grid-cols-4 mb-8">
              <Card className="border-gold-900/30 bg-card/50">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Balance</CardTitle>
                  <Wallet className="h-4 w-4 text-gold-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{formatCurrency(totalBalance)}</div>
                  <div className="flex items-center text-xs text-emerald-400 mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    Live Portfolio
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gold-900/30 bg-card/50">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Global Market Cap</CardTitle>
                  <TrendingUp className="h-4 w-4 text-gold-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {formatCurrency(globalData.total_market_cap.usd)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">All cryptocurrencies</div>
                </CardContent>
              </Card>

              <Card className="border-gold-900/30 bg-card/50">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">24h Volume</CardTitle>
                  <Activity className="h-4 w-4 text-gold-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {formatCurrency(globalData.total_volume.usd)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Global trading volume</div>
                </CardContent>
              </Card>

              <Card className="border-gold-900/30 bg-card/50">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Coins</CardTitle>
                  <TrendingDown className="h-4 w-4 text-gold-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {globalData.active_cryptocurrencies.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Tracked by CoinGecko</div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Charts */}
          <div className="grid gap-4 lg:grid-cols-3 mb-8">
            <Card className="lg:col-span-2 border-gold-900/30 bg-card/50">
              <CardHeader>
                <CardTitle className="text-white">Bitcoin Price (30 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="btcGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#d4af37" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(45, 50%, 15%)" />
                      <XAxis dataKey="date" stroke="hsl(0, 0%, 60%)" fontSize={12} />
                      <YAxis
                        stroke="hsl(0, 0%, 60%)"
                        fontSize={12}
                        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(0, 0%, 6%)",
                          border: "1px solid hsl(45, 50%, 20%)",
                          borderRadius: "8px",
                        }}
                        formatter={(value: number) => [formatPrice(value), "Price"]}
                      />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke="#d4af37"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#btcGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gold-900/30 bg-card/50">
              <CardHeader>
                <CardTitle className="text-white">Market Cap Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={allocationData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {allocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(0, 0%, 6%)",
                          border: "1px solid hsl(45, 50%, 20%)",
                          borderRadius: "8px",
                        }}
                        formatter={(value: number) => formatCurrency(value)}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  {allocationData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-muted-foreground">{item.name}</span>
                      </div>
                      <span className="text-white font-medium">{formatCurrency(item.value)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Holdings Table */}
          <Card className="border-gold-900/30 bg-card/50">
            <CardHeader>
              <CardTitle className="text-white">Your Holdings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gold-900/30">
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Asset</th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground">Price</th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground">24h Change</th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground">Balance</th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coins.map((coin) => {
                      const balances: Record<string, number> = {
                        bitcoin: 2.518,
                        ethereum: 12.628,
                        solana: 1250,
                        tether: 483000,
                        "usd-coin": 152000,
                      };
                      const balance = balances[coin.id] || 0;
                      const value = coin.current_price * balance;

                      return (
                        <tr
                          key={coin.id}
                          className="border-b border-gold-900/20 hover:bg-gold-500/5 transition-colors"
                        >
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={coin.image}
                                alt={coin.name}
                                className="h-8 w-8 rounded-full"
                              />
                              <div>
                                <div className="text-sm font-medium text-white">{coin.name}</div>
                                <div className="text-xs text-muted-foreground">
                                  {coin.symbol.toUpperCase()}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-right text-sm text-white">
                            {formatPrice(coin.current_price)}
                          </td>
                          <td className="py-4 px-4 text-right">
                            <span
                              className={`text-sm flex items-center justify-end gap-1 ${
                                (coin.price_change_percentage_24h || 0) >= 0
                                  ? "text-emerald-400"
                                  : "text-red-400"
                              }`}
                            >
                              {(coin.price_change_percentage_24h || 0) >= 0 ? (
                                <ArrowUpRight className="h-3 w-3" />
                              ) : (
                                <ArrowDownRight className="h-3 w-3" />
                              )}
                              {Math.abs(coin.price_change_percentage_24h || 0).toFixed(2)}%
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right text-sm text-white">
                            {balance.toLocaleString()} {coin.symbol.toUpperCase()}
                          </td>
                          <td className="py-4 px-4 text-right text-sm font-medium text-white">
                            {formatCurrency(value)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

// Helper to fetch coins by IDs
async function getCoinsByIds(ids: string[]): Promise<CoinPrice[]> {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids.join(
      ","
    )}&sparkline=true&price_change_percentage=24h`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error("Failed to fetch coin data");
  return res.json();
}
