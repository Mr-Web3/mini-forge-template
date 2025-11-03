"use client";
import { useAccount } from "wagmi";
import { Buy } from "@coinbase/onchainkit/buy";
import type { Token } from "@coinbase/onchainkit/token";
import WalletButton from "../components/WalletButton";

// Define DBRO token for Base network
const DBROToken: Token = {
  name: "Decentral Bros",
  address: "0x6a4e0F83D7882BcACFF89aaF6f60D24E13191E9F",
  symbol: "$DBRO",
  decimals: 8,
  image: "/newLogoTwo.png", // Files in public folder are referenced with / prefix
  chainId: 8453,
};

export default function BuyPage() {
  const { address } = useAccount();

  // If wallet is not connected, show connect wallet UI
  if (!address) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-2xl font-bold mb-6">Buy Tokens</h1>
          <p className="text-foreground/70 mb-8 text-center">
            Connect your wallet to start buying tokens on Base
          </p>
          <WalletButton />
        </div>
      </div>
    );
  }

  // If wallet is connected, show buy interface
  return (
    <div className="container mx-auto max-w-2xl px-4 py-4 sm:py-8">
      <h1 className="text-2xl font-bold mb-6">Buy DBRO Tokens</h1>

      {/* Instructions for users */}
      <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-sm text-foreground/80">
          Enter DBRO token amount (e.g., <strong className="text-foreground">1000</strong>, <strong className="text-foreground">2000</strong>, <strong className="text-foreground">5000</strong>, <strong className="text-foreground">10000</strong>)
        </p>
      </div>
      
      <div 
        className="w-full"
        style={{
          minHeight: '400px',
          maxHeight: 'calc(100vh - 350px)', // Account for header, padding, title, and instructions
          overflow: 'auto',
        }}
      >
        {/* 
          Buy component provides the input interface and handles transactions internally
          With isSponsored=true, it should handle USDC gas payment via paymaster
        */}
        <Buy 
          toToken={DBROToken} 
          isSponsored 
        />
      </div>
    </div>
  );
}