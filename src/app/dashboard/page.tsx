"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";
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

const portfolioData = [
  { name: "Jan", value: 2100000 },
  { name: "Feb", value: 2350000 },
  { name: "Mar", value: 2280000 },
  { name: "Apr", value: 2640000 },
  { name: "May", value: 2510000 },
  { name: "Jun", value: 2847392 },
];

const allocationData = [
  { name: "BTC", value: 59.1, color: "#d4af37" },
  { name: "ETH", value: 16.6, color: "#f0d96b" },
  { name: "SOL", value: 6.6, color: "#b8962e" },
  { name: "USDC", value: 5.3, color: "#967624" },
  { name: "USDT", value: 12.4, color: "#70561b" },
];

const assets = [
  { name: "Bitcoin", symbol: "BTC", price: "$66,890", change: "+5.2%", balance: "2.518 BTC", value: "$168,420", positive: true },
  { name: "Ethereum", symbol: "ETH", price: "$3,742", change: "+8.1%", balance: "12.628 ETH", value: "$47,250", positive: true },
  { name: "Solana", symbol: "SOL", price: "$150.00", change: "+15.3%", balance: "1,250 SOL", value: "$187,500", positive: true },
  { name: "Tether", symbol: "USDT", price: "$1.00", change: "0.0%", balance: "483,000 USDT", value: "$483,000", positive: true },
  { name: "USDC", symbol: "USDC", price: "$1.00", change: "0.0%", balance: "152,000 USDC", value: "$152,000", positive: true },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-gold-500/30 bg-background/95 p-3 shadow-xl backdrop-blur">
        <p className="text-sm font-medium text-gold-400">{payload[0].payload.name}</p>
        <p className="text-lg font-bold text-white">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
              <p className="text-muted-foreground mt-1">Overview of your community treasury</p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400 border border-emerald-500/20">
              <Activity className="h-4 w-4" />
              Live Data
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card className="border-gold-900/30 bg-card/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Balance</CardTitle>
                <Wallet className="h-4 w-4 text-gold-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">$2,847,392.50</div>
                <div className="flex items-center text-xs text-emerald-400 mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +12.5% from last month
                </div>
              </CardContent>
            </Card>

            <Card className="border-gold-900/30 bg-card/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">24h Volume</CardTitle>
                <Activity className="h-4 w-4 text-gold-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">$142,830</div>
                <div className="flex items-center text-xs text-emerald-400 mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +8.2% from yesterday
                </div>
              </CardContent>
            </Card>

            <Card className="border-gold-900/30 bg-card/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Proposals</CardTitle>
                <TrendingUp className="h-4 w-4 text-gold-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">3</div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  2 pending vote
                </div>
              </CardContent>
            </Card>

            <Card className="border-gold-900/30 bg-card/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Members</CardTitle>
                <TrendingDown className="h-4 w-4 text-gold-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">1,247</div>
                <div className="flex items-center text-xs text-emerald-400 mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +24 new this week
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 lg:grid-cols-3 mb-8">
            <Card className="lg:col-span-2 border-gold-900/30 bg-card/50">
              <CardHeader>
                <CardTitle className="text-white">Portfolio Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={portfolioData}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#d4af37" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(45, 50%, 15%)" />
                      <XAxis dataKey="name" stroke="hsl(0, 0%, 60%)" fontSize={12} />
                      <YAxis
                        stroke="hsl(0, 0%, 60%)"
                        fontSize={12}
                        tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#d4af37"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorValue)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gold-900/30 bg-card/50">
              <CardHeader>
                <CardTitle className="text-white">Asset Allocation</CardTitle>
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
                      <span className="text-white font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-gold-900/30 bg-card/50">
            <CardHeader>
              <CardTitle className="text-white">Holdings</CardTitle>
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
                    {assets.map((asset) => (
                      <tr key={asset.symbol} className="border-b border-gold-900/20 hover:bg-gold-500/5 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-gold-500/20 flex items-center justify-center text-xs font-bold text-gold-400">
                              {asset.symbol[0]}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-white">{asset.name}</div>
                              <div className="text-xs text-muted-foreground">{asset.symbol}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right text-sm text-white">{asset.price}</td>
                        <td className="py-4 px-4 text-right">
                          <span className={`text-sm ${asset.positive ? "text-emerald-400" : "text-red-400"}`}>
                            {asset.change}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right text-sm text-white">{asset.balance}</td>
                        <td className="py-4 px-4 text-right text-sm font-medium text-white">{asset.value}</td>
                      </tr>
                    ))}
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
