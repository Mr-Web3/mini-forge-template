"use client";
import { ReactNode } from "react";
import { base } from "wagmi/chains";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import "@coinbase/onchainkit/styles.css";
import { minikitConfig } from "../minikit.config";

export function RootProvider({ children }: { children: ReactNode }) {
  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      projectId={process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_ID}
      chain={base}
      analytics={false}
      config={{
        paymaster: process.env.NEXT_PUBLIC_PAYMASTER_AND_BUNDLER_ENDPOINT,
        appearance: {
          mode: "auto",
          theme: "default",
          name: minikitConfig.miniapp.name,
          logo: minikitConfig.miniapp.iconUrl,
        },
        wallet: {
          display: "modal",
          preference: "all",
          termsUrl: "https://www.decentralbros.io/terms",
          privacyUrl: "https://www.decentralbros.io/privacy",
          supportedWallets: {
            rabby: false,
            trust: true,
            frame: false,
          },
        },
      }}
    >
      {children}
    </OnchainKitProvider>
  );
}
