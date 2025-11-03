"use client";
import { useEffect } from "react";
import { sdk } from "@farcaster/miniapp-sdk";
import {
  FaRocket,
  FaLink,
  FaBook,
  FaCode,
  FaGithub,
  FaComments,
  FaTools,
  FaQuestionCircle,
  FaExternalLinkAlt,
  FaCodeBranch,
} from "react-icons/fa";
import BuyComponents from "./components/BuyComponents";
import AddMiniAppPrompt from "./components/AddMiniAppPrompt";

export default function Home() {
  // Helper function to open URLs using Farcaster SDK with fallback
  const handleOpenUrl = async (url: string) => {
    try {
      const context = await sdk.context;
      // Adapt behavior based on client capabilities
      if (context?.client?.clientFid) {
        await sdk.actions.openUrl(url);
      } else {
        // Fallback for other clients (browser, etc.)
        window.open(url, "_blank");
      }
    } catch {
      // Fallback to window.open if SDK fails
      window.open(url, "_blank");
    }
  };

  useEffect(() => {
    // Once app is ready to be displayed
    const setReady = async () => {
      try {
        await sdk.actions.ready();
      } catch (error) {
        // Handle error silently - app might not be in mini app context
        console.error("Error setting frame ready:", error);
      }
    };

    setReady();
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-sans text-foreground bg-background py-5">
      <div className="w-full mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            3‑in‑1 dApp / Farcaster & Base Mini App
            <span className="text-[#0b55e9] block">Built by Justin Taylor</span>
          </h1>
          <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
            A complete starter template for building Base mini apps with
            Farcaster integration. Connect your wallet and explore the
            features, then customize for your own project.
          </p>

          {/* Add Mini App Prompt */}
          <AddMiniAppPrompt />

          {/* One-click Fork Button */}
          <div className="mb-10 flex items-center justify-center">
            <button
              onClick={() =>
                handleOpenUrl(
                  process.env.NEXT_PUBLIC_REPO_FORK_URL ||
                    "https://github.com/Mr-Web3/mini-forge-template",
                )
              }
              className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-[#0b55e9] text-white font-semibold shadow-lg hover:bg-[#0b55e9]/90 transition-opacity border border-[#0b55e9]"
            >
              <FaCodeBranch className="text-white" />
              <span>Start building today — Fork this repo</span>
            </button>
          </div>

          {/* Buy DBRO */}
          <div className="max-w-xl mx-auto mb-10">
            <div className="bg-none border border-gray-700 dark:border-gray-600 rounded-lg p-6 md:flex md:flex-col md:items-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <FaRocket className="text-[#0b55e9] text-lg" />
                <h3 className="text-lg font-bold text-foreground">Buy $DBRO</h3>
              </div>
              {/* Center Buy widget on desktop while keeping mobile layout unchanged */}
              <div className="flex flex-col items-center justify-center">
                <p className="text-[#0b55e9] text-sm mb-3 text-center">
                  Network Fees Paid By $DBRO Team Sponsored by Coinbase
                </p>
                <p className="text-foreground/70 text-sm mb-3 text-center">
                  Buy $DBRO directly with fiat or swap in-app.
                </p>
                <div className="w-full md:w-[520px] md:mx-auto">
                  <div className="w-full">
                    <BuyComponents />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Template Features */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-none border border-gray-700 dark:border-gray-600 rounded-lg p-6">
              <h3 className="text-xl text-center font-semibold text-[#0b55e9] mb-3 flex items-center justify-center gap-2">
                <FaRocket className="text-[#0b55e9]" />
                Ready to Use
              </h3>
              <p className="text-foreground/70">
                Complete Next.js setup with TypeScript, Tailwind CSS, and all
                necessary dependencies for building mini apps.
              </p>
            </div>

            <div className="bg-none border border-gray-700 dark:border-gray-600 rounded-lg p-6">
              <h3 className="text-xl text-center font-semibold text-[#0b55e9] mb-3 flex items-center justify-center gap-2">
                <FaLink className="text-[#0b55e9]" />
                Farcaster Integration
              </h3>
              <p className="text-foreground/70">
                Built-in Farcaster integration with notifications, user
                profiles, and frame support using Mini Kit.
              </p>
            </div>
          </div>

          {/* Getting Started */}
          <div className="bg-none border border-gray-700 dark:border-gray-600 rounded-lg p-8 max-w-3xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Getting Started
            </h2>
            <div className="text-left space-y-4 text-foreground/70">
              <div className="flex items-start gap-3">
                <span className="text-[#0b55e9] font-bold">1.</span>
                <p>Connect your wallet using the button in the header</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#0b55e9] font-bold">2.</span>
                <p>
                  Your profile information will appear above when connected
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#0b55e9] font-bold">3.</span>
                <p>
                  Navigate to the Morpho page to see DeFi integration examples
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#0b55e9] font-bold">4.</span>
                <p>Customize this content and add your own features</p>
              </div>
            </div>
          </div>

          {/* Documentation Links */}
          <div className="bg-none border border-gray-700 dark:border-gray-600 rounded-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              Developer Resources
            </h2>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#0b55e9] mb-3">
                Farcaster & Base Mini Kit Docs
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <button
                    onClick={() =>
                      handleOpenUrl(
                        "https://docs.base.org/mini-apps/quickstart/create-new-miniapp",
                      )
                    }
                    className="w-full text-left p-3 bg-gray-800/50 dark:bg-gray-700/50 hover:bg-gray-700/70 dark:hover:bg-gray-600/70 border border-gray-600 dark:border-gray-500 rounded-lg transition-colors flex items-start gap-3"
                  >
                    <FaBook className="text-[#0b55e9] mt-1 shrink-0" />
                    <div>
                      <div className="font-medium text-foreground">
                        Mini Kit Documentation
                      </div>
                      <div className="text-sm text-foreground/70">
                        Complete guide to building mini apps
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleOpenUrl("https://docs.base.org")}
                    className="w-full text-left p-3 bg-gray-800/50 dark:bg-gray-700/50 hover:bg-gray-700/70 dark:hover:bg-gray-600/70 border border-gray-600 dark:border-gray-500 rounded-lg transition-colors flex items-start gap-3"
                  >
                    <FaBook className="text-[#0b55e9] mt-1 shrink-0" />
                    <div>
                      <div className="font-medium text-foreground">
                        Base Documentation
                      </div>
                      <div className="text-sm text-foreground/70">
                        Base blockchain and developer resources
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() =>
                      handleOpenUrl("https://portal.cdp.coinbase.com/")
                    }
                    className="w-full text-left p-3 bg-gray-800/50 dark:bg-gray-700/50 hover:bg-gray-700/70 dark:hover:bg-gray-600/70 border border-gray-600 dark:border-gray-500 rounded-lg transition-colors flex items-start gap-3"
                  >
                    <FaTools className="text-[#0b55e9] mt-1 shrink-0" />
                    <div>
                      <div className="font-medium text-foreground">
                        Coinbase Developer Platform
                      </div>
                      <div className="text-sm text-foreground/70">
                        Get API keys and manage your app
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() =>
                      handleOpenUrl(
                        "https://docs.base.org/base-chain/tools/network-faucets",
                      )
                    }
                    className="w-full text-left p-3 bg-gray-800/50 dark:bg-gray-700/50 hover:bg-gray-700/70 dark:hover:bg-gray-600/70 border border-gray-600 dark:border-gray-500 rounded-lg transition-colors flex items-start gap-3"
                  >
                    <FaCode className="text-[#0b55e9] mt-1 shrink-0" />
                    <div>
                      <div className="font-medium text-foreground">
                        Base Network Faucets
                      </div>
                      <div className="text-sm text-foreground/70">
                        Get test Sepolia ETH for development
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() =>
                      handleOpenUrl(
                        "https://docs.base.org/base-account/improve-ux/sub-accounts",
                      )
                    }
                    className="w-full text-left p-3 bg-gray-800/50 dark:bg-gray-700/50 hover:bg-gray-700/70 dark:hover:bg-gray-600/70 border border-gray-600 dark:border-gray-500 rounded-lg transition-colors flex items-start gap-3"
                  >
                    <FaLink className="text-[#0b55e9] mt-1 shrink-0" />
                    <div>
                      <div className="font-medium text-foreground">
                        Sub Accounts
                      </div>
                      <div className="text-sm text-foreground/70">
                        Improve UX with Base account abstraction
                      </div>
                    </div>
                  </button>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={() =>
                      handleOpenUrl("https://docs.base.org/onchainkit/buy/buy")
                    }
                    className="w-full text-left p-3 bg-gray-800/50 dark:bg-gray-700/50 hover:bg-gray-700/70 dark:hover:bg-gray-600/70 border border-gray-600 dark:border-gray-500 rounded-lg transition-colors flex items-start gap-3"
                  >
                    <FaRocket className="text-[#0b55e9] mt-1 shrink-0" />
                    <div>
                      <div className="font-medium text-foreground">
                        Sponsored Gas Transactions
                      </div>
                      <div className="text-sm text-foreground/70">
                        Implement gasless transactions with OnchainKit
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleOpenUrl("https://docs.farcaster.xyz/")}
                    className="w-full text-left p-3 bg-gray-800/50 dark:bg-gray-700/50 hover:bg-gray-700/70 dark:hover:bg-gray-600/70 border border-gray-600 dark:border-gray-500 rounded-lg transition-colors cursor-pointer flex items-start gap-3"
                  >
                    <FaBook className="text-[#0b55e9] mt-1 shrink-0" />
                    <div>
                      <div className="font-medium text-foreground">
                        Farcaster Documentation
                      </div>
                      <div className="text-sm text-foreground/70">
                        Build on the Farcaster protocol
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() =>
                      handleOpenUrl("https://warpcast.com/~/channel/base")
                    }
                    className="w-full text-left p-3 bg-gray-800/50 dark:bg-gray-700/50 hover:bg-gray-700/70 dark:hover:bg-gray-600/70 border border-gray-600 dark:border-gray-500 rounded-lg transition-colors cursor-pointer flex items-start gap-3"
                  >
                    <FaComments className="text-[#0b55e9] mt-1 shrink-0" />
                    <div>
                      <div className="font-medium text-foreground">
                        Base Channel
                      </div>
                      <div className="text-sm text-foreground/70">
                        Join the Base community on Farcaster
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleOpenUrl("https://github.com/base")}
                    className="w-full text-left p-3 bg-gray-800/50 dark:bg-gray-700/50 hover:bg-gray-700/70 dark:hover:bg-gray-600/70 border border-gray-600 dark:border-gray-500 rounded-lg transition-colors cursor-pointer flex items-start gap-3"
                  >
                    <FaGithub className="text-[#0b55e9] mt-1 shrink-0" />
                    <div>
                      <div className="font-medium text-foreground">
                        Base GitHub
                      </div>
                      <div className="text-sm text-foreground/70">
                        Open source tools and examples
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Additional Resources */}
              <div className="mt-6 pt-6 border-t border-gray-600 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-[#0b55e9] mb-3">
                  Additional Resources
                </h3>
                <div className="grid md:grid-cols-4 gap-3">
                  <button
                    onClick={() => handleOpenUrl("https://www.dbro.dev")}
                    className="p-3 bg-gray-800/50 dark:bg-gray-700/50 hover:bg-gray-700/70 dark:hover:bg-gray-600/70 border border-gray-600 dark:border-gray-500 rounded-lg transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <FaExternalLinkAlt className="text-[#0b55e9] shrink-0" />
                    <div className="font-medium text-foreground text-sm">
                      DBRO Production App
                    </div>
                  </button>
                  <button
                    onClick={() => handleOpenUrl("https://github.com/base/demos")}
                    className="p-3 bg-gray-800/50 dark:bg-gray-700/50 hover:bg-gray-700/70 dark:hover:bg-gray-600/70 border border-gray-600 dark:border-gray-500 rounded-lg transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <FaCode className="text-[#0b55e9] shrink-0" />
                    <div className="font-medium text-foreground text-sm">
                      Mini Kit Examples
                    </div>
                  </button>
                  <button
                    onClick={() =>
                      handleOpenUrl(
                        "https://docs.base.org/base-chain/tools/onchain-registry-api",
                      )
                    }
                    className="p-3 bg-gray-800/50 dark:bg-gray-700/50 hover:bg-gray-700/70 dark:hover:bg-gray-600/70 border border-gray-600 dark:border-gray-500 rounded-lg transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <FaBook className="text-[#0b55e9] shrink-0" />
                    <div className="font-medium text-foreground text-sm">
                      API Reference
                    </div>
                  </button>
                  <button
                    onClick={() =>
                      handleOpenUrl(
                        "https://docs.base.org/mini-apps/troubleshooting/common-issues",
                      )
                    }
                    className="p-3 bg-gray-800/50 dark:bg-gray-700/50 hover:bg-gray-700/70 dark:hover:bg-gray-600/70 border border-gray-600 dark:border-gray-500 rounded-lg transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <FaQuestionCircle className="text-[#0b55e9] shrink-0" />
                    <div className="font-medium text-foreground text-sm">
                      Troubleshooting
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
