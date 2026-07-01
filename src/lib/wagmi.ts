import { createConfig, http } from "wagmi";
import { mainnet, polygon, arbitrum, base } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet, polygon, arbitrum, base],
  connectors: [
    injected({ target: "metaMask" }),
    walletConnect({
      projectId: "YOUR_WALLETCONNECT_PROJECT_ID", // Get from cloud.walletconnect.com
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
  },
});
