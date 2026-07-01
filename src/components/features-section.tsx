"use client";

import { motion } from "framer-motion";
import { Wallet, BarChart3, Shield, Users, FileText, Globe } from "lucide-react";

const features = [
  {
    name: "Multi-Chain Wallet",
    description: "Support for Bitcoin, Ethereum, Solana, and all major EVM chains. One interface, infinite possibilities.",
    icon: Wallet,
  },
  {
    name: "Treasury Analytics",
    description: "Real-time portfolio tracking with advanced charts, performance metrics, and allocation insights.",
    icon: BarChart3,
  },
  {
    name: "Enterprise Security",
    description: "Multi-sig support, role-based access control, and hardware wallet integration for maximum safety.",
    icon: Shield,
  },
  {
    name: "Community Governance",
    description: "Built-in proposal and voting tools. Let your community decide on treasury allocations together.",
    icon: Users,
  },
  {
    name: "Financial Reporting",
    description: "Generate compliant financial reports, tax documents, and audit trails with one click.",
    icon: FileText,
  },
  {
    name: "Global Access",
    description: "Non-custodial architecture means you control your keys. Access from anywhere, anytime.",
    icon: Globe,
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-base font-semibold leading-7 text-gold-400">Everything You Need</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Built for Modern Communities
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            From DAO treasuries to investment clubs, Stakeholder Wallet provides the tools
            you need to manage digital assets with confidence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative rounded-2xl border border-gold-900/30 bg-card/50 p-8 backdrop-blur-sm hover:border-gold-500/30 transition-colors"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold-500/5 to-transparent opacity-0 transition-opacity hover:opacity-100" />
              <div className="relative">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/10 text-gold-400 ring-1 ring-gold-500/20">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{feature.name}</h3>
                <p className="text-sm leading-6 text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
