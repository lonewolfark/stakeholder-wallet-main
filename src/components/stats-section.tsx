"use client";

import { motion } from "framer-motion";
import { Shield, Globe, Zap, Lock } from "lucide-react";

const stats = [
  { label: "Assets Tracked", value: "$125M+", icon: Shield },
  { label: "Registered Members", value: "10K+", icon: Globe },
  { label: "Platform Uptime", value: "99.99%", icon: Zap },
  { label: "Community Support", value: "24/7", icon: Lock },
];

export function StatsSection() {
  return (
    <section className="py-24 border-t border-gold-900/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Trusted by Communities Worldwide
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Stakeholder Wallet provides a secure and transparent platform for managing
            community treasuries, tracking crypto portfolios, and delivering
            enterprise-grade financial reporting.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-400 ring-1 ring-gold-500/20">
                <stat.icon className="h-7 w-7" />
              </div>
              <div className="text-3xl font-bold text-gold-400">{stat.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
