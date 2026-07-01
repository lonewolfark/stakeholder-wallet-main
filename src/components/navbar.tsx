"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ConnectWallet } from "@/components/connect-wallet";
import Image from "next/image";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gold-900/30 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-10 w-10">
            <Image
              src="/logo.png"
              alt="Stakeholder Wallet"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-xl font-bold tracking-tight text-gold-400">
            STAKEHOLDER
            <span className="block text-xs font-medium tracking-[0.3em] text-gold-600">
              WALLET
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-gold-400">
            Home
          </Link>
          <Link href="/dashboard" className="text-sm font-medium text-muted-foreground transition-colors hover:text-gold-400">
            Dashboard
          </Link>
          <Link href="/treasury" className="text-sm font-medium text-muted-foreground transition-colors hover:text-gold-400">
            Treasury
          </Link>
          <Link href="/investments" className="text-sm font-medium text-muted-foreground transition-colors hover:text-gold-400">
            Investments
          </Link>
        </div>

        <div className="hidden md:flex">
          <ConnectWallet />
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gold-400"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t border-gold-900/30 bg-background px-4 py-4">
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-sm font-medium text-muted-foreground" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link href="/dashboard" className="text-sm font-medium text-muted-foreground" onClick={() => setIsOpen(false)}>
              Dashboard
            </Link>
            <Link href="/treasury" className="text-sm font-medium text-muted-foreground" onClick={() => setIsOpen(false)}>
              Treasury
            </Link>
            <Link href="/investments" className="text-sm font-medium text-muted-foreground" onClick={() => setIsOpen(false)}>
              Investments
            </Link>
            <div className="pt-2">
              <ConnectWallet />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
