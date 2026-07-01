"use client";

import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-sm font-medium text-gold-400 mb-6">
              <Shield className="h-4 w-4" />
              Enterprise-Grade Security
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              The Future of{" "}
              <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
                Community Finance
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-xl">
              Secure, transparent treasury management for DAOs, investment clubs,
              and digital communities. Track assets, manage portfolios, and grow
              together.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-gold-600 to-gold-400 text-black font-bold hover:from-gold-500 hover:to-gold-300 group"
                >
                  Launch Dashboard
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/treasury" className="text-sm font-semibold leading-6 text-gold-400 hover:text-gold-300">
                View Treasury <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-gold-900/30 pt-8">
              <div>
                <div className="text-2xl font-bold text-gold-400">$125M+</div>
                <div className="text-xs text-muted-foreground mt-1">Assets Tracked</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gold-400">10K+</div>
                <div className="text-xs text-muted-foreground mt-1">Community Members</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gold-400">99.99%</div>
                <div className="text-xs text-muted-foreground mt-1">Uptime</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl border border-gold-500/20 bg-card/50 p-2 backdrop-blur-sm">
              <div className="rounded-xl bg-gradient-to-b from-gold-900/20 to-background p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-sm text-muted-foreground">Total Treasury Value</div>
                    <div className="text-3xl font-bold text-white">$2,847,392.50</div>
                    <div className="flex items-center gap-1 text-sm text-emerald-400 mt-1">
                      <TrendingUp className="h-3 w-3" />
                      +12.5% this month
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-gold-500/20 flex items-center justify-center">
                    <Users className="h-6 w-6 text-gold-400" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  {[
                    { name: "Bitcoin", symbol: "BTC", balance: "2.518", value: "$168,420", change: "+5.2%" },
                    { name: "Ethereum", symbol: "ETH", balance: "12.628", value: "$47,250", change: "+8.1%" },
                    { name: "Solana", symbol: "SOL", balance: "1,250", value: "$187,500", change: "+15.3%" },
                    { name: "USDC", symbol: "USDC", balance: "152,000", value: "$152,000", change: "0.0%" },
                  ].map((asset) => (
                    <div
                      key={asset.symbol}
                      className="flex items-center justify-between rounded-lg bg-background/60 px-4 py-3 border border-gold-900/20"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-gold-500/20 flex items-center justify-center text-xs font-bold text-gold-400">
                          {asset.symbol[0]}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{asset.name}</div>
                          <div className="text-xs text-muted-foreground">{asset.balance} {asset.symbol}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-white">${asset.value.replace("$", "")}</div>
                        <div className="text-xs text-emerald-400">{asset.change}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Decorative glow */}
            <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-gold-600/10 blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
