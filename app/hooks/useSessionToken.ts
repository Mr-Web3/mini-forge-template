"use client";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export function useSessionToken() {
  const { address, isConnected } = useAccount();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Only fetch token if wallet is connected
    if (!isConnected || !address) {
      setToken(null);
      return;
    }

    const fetchSessionToken = async () => {
      try {
        setLoading(true);
        setError(null);

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
        setToken(data.token);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch session token"));
        console.error("Error fetching session token:", err);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    // Fetch token when address changes
    fetchSessionToken();
  }, [address, isConnected]);

  return { token, loading, error };
}

