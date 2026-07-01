import { createConfig, http } from "wagmi";
import { mainnet, polygon, arbitrum, base } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet, polygon, arbitrum, base],
  connectors: [
    injected({ target: "metaMask" }),
    walletConnect({
      projectId: "18f0130201dc053e1300fdc8587cd1f1", // Get from cloud.walletconnect.com
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
  },
});
