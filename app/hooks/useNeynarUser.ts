"use client";
import { useEffect, useState } from "react";

export type NeynarUser = {
  fid: number;
  username?: string;
  display_name?: string;
  pfp_url?: string;
  bio?: string;
  follower_count?: number;
  following_count?: number;
};

export function useNeynarUser(fid: number | null | undefined) {
  const [user, setUser] = useState<NeynarUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!fid || !process.env.NEXT_PUBLIC_NEYNAR_API_KEY) {
      return;
    }

    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.neynar.com/v2/farcaster/user/bulk?fids=${fid}`,
          {
            headers: {
              "accept": "application/json",
              "x-api-key": process.env.NEXT_PUBLIC_NEYNAR_API_KEY!,
            },
          }
        );

        if (!response.ok) {
          let errorMessage = response.statusText || 'Unknown error';
          try {
            const errorData = await response.json();
            errorMessage = errorData.error || errorData.message || JSON.stringify(errorData);
          } catch {
            // Response is not JSON, use statusText
          }
          console.error("Neynar API error:", response.status, errorMessage);
          // Don't throw - just log and continue, allowing mini app context data to show
          return;
        }

        const data = await response.json();
        // Neynar API v2 returns user data in a specific format
        // The response is: { result: { users: [{ fid, username, display_name, pfp_url, bio, follower_count, following_count }] } }
        if (data.result?.users && Array.isArray(data.result.users) && data.result.users.length > 0) {
          setUser(data.result.users[0]);
        } else if (data.users && Array.isArray(data.users) && data.users.length > 0) {
          setUser(data.users[0]);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch user from Neynar"));
        console.error("Error fetching user from Neynar:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [fid]);

  return { user, loading, error };
}

