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
