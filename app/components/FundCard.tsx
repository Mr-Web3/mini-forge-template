"use client";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { FundCard } from "@coinbase/onchainkit/fund";
import * as Dialog from "@radix-ui/react-dialog";

interface FundCardModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FundCardModal({ open, onOpenChange }: FundCardModalProps) {
  const { address, isConnected } = useAccount();
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Generate a NEW session token each time the modal opens
  // Session tokens can only be used once, so we need a fresh one each time
  useEffect(() => {
    // Only fetch token when modal is open and wallet is connected
    if (!open || !isConnected || !address) {
      setSessionToken(null);
      setLoading(false);
      setError(null);
      return;
    }

    const fetchSessionToken = async () => {
      try {
        setLoading(true);
        setError(null);
        setSessionToken(null); // Clear any previous token

        // Prepare addresses for the session token request
        const addresses = [
          {
            address: address,
            blockchains: ["base", "ethereum"], // Support both Base and Ethereum
          },
        ];

        const response = await fetch("/api/session-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            addresses,
            assets: ["ETH", "USDC"], // Supported assets
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.error || errorData.message || "Failed to generate session token"
          );
        }

        const data = await response.json();
        setSessionToken(data.token);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch session token"));
        console.error("Error fetching session token:", err);
        setSessionToken(null);
      } finally {
        setLoading(false);
      }
    };

    // Fetch a fresh token when modal opens
    fetchSessionToken();
  }, [open, address, isConnected]); // Dependencies: fetch new token when modal opens

  // Default values - you can customize these
  const assetSymbol = "ETH"; // Base network default
  const country = "US"; // Default country
  const currency = "USD"; // Default currency

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-10000 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-10001 max-h-[90vh] w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform overflow-y-auto rounded-lg border border-[#0b55e9] bg-background p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-lg font-semibold text-foreground">
              Fund Your Wallet
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                className="flex h-8 w-8 items-center justify-center rounded-md text-foreground/70 hover:bg-foreground/10 hover:text-foreground"
                aria-label="Close"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </Dialog.Close>
          </div>
          
          {loading ? (
            <div className="py-8 text-center">
              <p className="text-foreground/70">Generating session token...</p>
            </div>
          ) : error ? (
            <div className="py-8 text-center">
              <p className="text-red-500">
                Failed to generate session token. Please try again.
              </p>
              {error.message && (
                <p className="text-sm text-foreground/70 mt-2">{error.message}</p>
              )}
            </div>
          ) : sessionToken ? (
            <FundCard
              sessionToken={sessionToken}
              assetSymbol={assetSymbol}
              country={country}
              currency={currency}
              headerText="Fund Your Wallet"
              buttonText="Purchase"
            />
          ) : (
            <div className="py-8 text-center">
              <p className="text-foreground/70">
                Please connect your wallet to fund it.
              </p>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

