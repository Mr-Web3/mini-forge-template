"use client";
import { useState, useEffect } from "react";
import { sdk } from "@farcaster/miniapp-sdk";
import { useMiniAppContext } from "../hooks/useMiniAppContext";
import { FaRocket, FaTimes } from "react-icons/fa";

export default function AddMiniAppPrompt() {
  const { isInMiniApp, loading } = useMiniAppContext();
  const [isDismissed, setIsDismissed] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Check if user has dismissed the prompt before
  useEffect(() => {
    if (typeof window !== "undefined") {
      const dismissed = localStorage.getItem("miniapp-prompt-dismissed");
      if (dismissed === "true") {
        setIsDismissed(true);
      }
    }
  }, []);

  // Don't show if already in mini app, still loading, or dismissed
  if (isInMiniApp || loading || isDismissed) {
    return null;
  }

  const handleAddMiniApp = async () => {
    try {
      setIsAdding(true);
      await sdk.actions.addMiniApp();
      // If successful, the user will be in the mini app context
    } catch (error) {
      console.error("Error adding mini app:", error);
      // Show error message to user
      alert("Failed to add mini app. Please make sure you're using a Farcaster-compatible client.");
    } finally {
      setIsAdding(false);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("miniapp-prompt-dismissed", "true");
    }
  };

  return (
    <div className="mx-auto max-w-2xl mb-8">
      <div className="bg-linear-to-r from-[#0b55e9]/10 to-[#0b55e9]/5 border border-[#0b55e9]/30 dark:border-[#0b55e9]/20 rounded-lg p-6 relative">
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-foreground/50 hover:text-foreground transition-colors"
          aria-label="Dismiss"
        >
          <FaTimes className="h-5 w-5" />
        </button>

        <div className="flex items-start gap-4">
          <div className="shrink-0">
            <div className="h-12 w-12 rounded-full bg-[#0b55e9]/20 flex items-center justify-center">
              <FaRocket className="h-6 w-6 text-[#0b55e9]" />
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Add to Farcaster Mini App
            </h3>
            <p className="text-sm text-foreground/70 mb-4">
              Get the full experience! Add this app to your Farcaster client for
              notifications, profile integration, and a seamless mini app experience.
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleAddMiniApp}
                disabled={isAdding}
                className="px-4 py-2 bg-[#0b55e9] text-white rounded-lg font-medium hover:bg-[#0b55e9]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isAdding ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    <span>Adding...</span>
                  </>
                ) : (
                  <>
                    <FaRocket className="h-4 w-4" />
                    <span>Add Mini App</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDismiss}
                className="px-4 py-2 border border-foreground/20 text-foreground/70 rounded-lg font-medium hover:bg-foreground/5 transition-colors"
              >
                Not Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

