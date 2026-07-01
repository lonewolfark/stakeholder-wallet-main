"use client";

import { useState } from "react";
import { useAccount, useConnect, useDisconnect, useChainId, useSwitchChain } from "wagmi";
import { Button } from "@/components/ui/button";
import { Wallet, LogOut, ChevronDown, ExternalLink, Copy, Check } from "lucide-react";

const CHAIN_NAMES: Record<number, string> = {
  1: "Ethereum",
  137: "Polygon",
  42161: "Arbitrum",
  8453: "Base",
  10: "Optimism",
};

const CHAIN_COLORS: Record<number, string> = {
  1: "bg-blue-500/20 text-blue-400",
  137: "bg-purple-500/20 text-purple-400",
  42161: "bg-indigo-500/20 text-indigo-400",
  8453: "bg-blue-600/20 text-blue-500",
  10: "bg-red-500/20 text-red-400",
};

export function ConnectWallet() {
  const { address, isConnected, chainId } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  if (isConnected && address) {
    return (
      <div className="relative">
        <div className="flex items-center gap-2">
          {chainId && (
            <button
              onClick={() => setShowModal(!showModal)}
              className={`rounded-full px-3 py-1 text-xs font-medium border border-gold-500/20 ${
                CHAIN_COLORS[chainId] || "bg-gold-500/10 text-gold-400"
              }`}
            >
              {CHAIN_NAMES[chainId] || "Unknown"}
              <ChevronDown className="inline h-3 w-3 ml-1" />
            </button>
          )}
          <button
            onClick={() => setShowModal(!showModal)}
            className="flex items-center gap-2 rounded-full bg-gold-500/10 px-4 py-2 text-sm font-medium text-gold-400 border border-gold-500/20 hover:bg-gold-500/20 transition-colors"
          >
            <Wallet className="h-4 w-4" />
            {formatAddress(address)}
          </button>
        </div>

        {showModal && (
          <div className="absolute right-0 top-full mt-2 w-72 rounded-xl border border-gold-900/30 bg-card shadow-xl backdrop-blur-sm z-50">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-white">Connected Wallet</span>
                <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-white">
                  ✕
                </button>
              </div>

              <div className="rounded-lg bg-background/60 p-3 mb-4">
                <div className="text-xs text-muted-foreground mb-1">Address</div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white font-mono">{formatAddress(address)}</span>
                  <button onClick={copyAddress} className="text-gold-400 hover:text-gold-300">
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="text-xs text-muted-foreground mb-2">Switch Network</div>
                {Object.entries(CHAIN_NAMES).map(([id, name]) => (
                  <button
                    key={id}
                    onClick={() => {
                      switchChain({ chainId: Number(id) });
                      setShowModal(false);
                    }}
                    className={`w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                      chainId === Number(id)
                        ? "bg-gold-500/20 text-gold-400 border border-gold-500/30"
                        : "bg-background/40 text-muted-foreground hover:text-white hover:bg-background/60"
                    }`}
                  >
                    {name}
                    {chainId === Number(id) && <span className="text-xs">Active</span>}
                  </button>
                ))}
              </div>

              <a
                href={`https://etherscan.io/address/${address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full rounded-lg border border-gold-500/30 py-2 text-sm text-gold-400 hover:bg-gold-500/10 transition-colors mb-2"
              >
                <ExternalLink className="h-4 w-4" />
                View on Etherscan
              </a>

              <Button
                onClick={() => {
                  disconnect();
                  setShowModal(false);
                }}
                variant="outline"
                className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Disconnect
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <Button
        onClick={() => setShowModal(!showModal)}
        disabled={isPending}
        className="bg-gradient-to-r from-gold-600 to-gold-400 text-black font-semibold hover:from-gold-500 hover:to-gold-300"
      >
        <Wallet className="mr-2 h-4 w-4" />
        {isPending ? "Connecting..." : "Connect Wallet"}
      </Button>

      {showModal && (
        <div className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-gold-900/30 bg-card shadow-xl backdrop-blur-sm z-50">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-white">Connect Wallet</span>
              <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-white">
                ✕
              </button>
            </div>

            <div className="space-y-2">
              {connectors.map((connector) => (
                <button
                  key={connector.id}
                  onClick={() => {
                    connect({ connector });
                    setShowModal(false);
                  }}
                  disabled={!connector.ready}
                  className="w-full flex items-center gap-3 rounded-lg border border-gold-900/30 bg-background/40 px-4 py-3 text-sm text-white hover:bg-gold-500/10 hover:border-gold-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {connector.id === "metaMask" && (
                    <div className="h-8 w-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                      <svg className="h-5 w-5 text-orange-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                    </div>
                  )}
                  {connector.id === "walletConnect" && (
                    <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <svg className="h-5 w-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                      </svg>
                    </div>
                  )}
                  <div className="text-left">
                    <div className="font-medium">{connector.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {connector.id === "metaMask" ? "Browser extension" : "Scan QR code"}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <p className="mt-4 text-xs text-muted-foreground text-center">
              By connecting, you agree to our Terms of Service
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
