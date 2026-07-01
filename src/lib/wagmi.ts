import { createConfig, http } from "wagmi";
import { mainnet, polygon, arbitrum, base, optimism } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet, polygon, arbitrum, base, optimism],
  connectors: [
    injected({ target: "metaMask" }),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
      metadata: {
        name: "Stakeholder Wallet",
        description: "Premium Community Treasury & Investment Platform",
        url: "https://stakeholderwallet.com",
        icons: ["https://stakeholderwallet.com/logo.png"],
      },
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
    [optimism.id]: http(),
  },
});

// ERC20 Token ABI (minimal for balanceOf)
export const ERC20_ABI = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
    type: "function",
  },
] as const;

// Token contracts by chain
export const TOKEN_CONTRACTS: Record<number, Record<string, `0x${string}`>> = {
  [mainnet.id]: {
    USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    USDC: "0xA0b86a33E6441e0A421e56E4773C3C1C3E14E5e8",
    DAI: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    WBTC: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    LINK: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
  },
  [polygon.id]: {
    USDT: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    USDC: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    DAI: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    WBTC: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
  },
  [arbitrum.id]: {
    USDT: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
    USDC: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    DAI: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
  },
  [base.id]: {
    USDC: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  },
  [optimism.id]: {
    USDT: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
    USDC: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
    DAI: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
  },
};
