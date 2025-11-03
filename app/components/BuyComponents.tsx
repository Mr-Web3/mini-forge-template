"use client";
import { Buy } from "@coinbase/onchainkit/buy";
import type { Token } from "@coinbase/onchainkit/token";

// Define DBRO token for Base network
const DBROToken: Token = {
  name: "Decentral Bros",
  address: "0x6a4e0F83D7882BcACFF89aaF6f60D24E13191E9F",
  symbol: "$DBRO",
  decimals: 8,
  image: "/newLogoTwo.png",
  chainId: 8453,
};

export default function BuyComponents() {
  return (
    <div className="w-full">
      <Buy 
        toToken={DBROToken} 
        isSponsored 
      />
    </div>
  );
}

