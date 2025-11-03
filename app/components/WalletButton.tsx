"use client";
import { useState } from "react";
import { useAccount } from "wagmi";
import Image from "next/image";
import {
  Wallet,
  ConnectWallet,
  WalletDropdown,
  WalletDropdownDisconnect,
  WalletDropdownLink,
  WalletDropdownBasename,
} from "@coinbase/onchainkit/wallet";
import { Avatar, Name, Address, Identity } from "@coinbase/onchainkit/identity";
import { useMiniAppContext } from "../hooks/useMiniAppContext";
import { useNeynarUser } from "../hooks/useNeynarUser";
import FundCardModal from "./FundCard";

export default function WalletButton() {
  const { isConnected } = useAccount();
  const { isInMiniApp, isMobile, user: miniAppUser } = useMiniAppContext();
  const { user: neynarUser } = useNeynarUser(
    isInMiniApp && miniAppUser ? miniAppUser.fid : null
  );
  const [showFundCard, setShowFundCard] = useState(false);

  // Use Neynar user data if available (has followers/following), otherwise use mini app context
  const displayUser = neynarUser
    ? {
        fid: neynarUser.fid,
        username: neynarUser.username,
        displayName: neynarUser.display_name,
        pfpUrl: neynarUser.pfp_url,
        bio: neynarUser.bio,
        followers: neynarUser.follower_count,
        following: neynarUser.following_count,
      }
    : miniAppUser;

  // Show mini app profile only when in mini app and connected
  const showMiniAppProfile = isInMiniApp && displayUser && isConnected;
  
  // On mobile/mini app, only show profile image (hide name in button)
  const hideNameInButton = isMobile && isConnected;

  return (
    <Wallet>
      <ConnectWallet
        className="text-white border border-[#0b55e9] rounded-lg px-3 py-1 md:px-4 md:py-1.5 text-sm"
        disconnectedLabel="Connect"
      >
        {showMiniAppProfile && displayUser.pfpUrl ? (
          <Image
            src={displayUser.pfpUrl}
            alt={displayUser.displayName || displayUser.username || "Profile"}
            width={isMobile ? 40 : 32}
            height={isMobile ? 40 : 32}
            className={`${isMobile ? 'h-10 w-10' : 'h-8 w-8'} rounded-md object-cover`}
          />
        ) : (
          <Avatar className={isMobile ? "h-8 w-8" : "h-6 w-6"} />
        )}
        {/* Hide name on mobile/mini app when connected - it shows in dropdown */}
        {!hideNameInButton && <Name />}
      </ConnectWallet>
      <WalletDropdown className="bg-black text-white rounded-md p-2">
        {showMiniAppProfile ? (
          <div className="px-6 pt-3 pb-2">
            <div className="flex items-center gap-3 mb-3">
              {displayUser.pfpUrl && (
                <Image
                  src={displayUser.pfpUrl}
                  alt={displayUser.displayName || displayUser.username || "Profile"}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-md object-cover"
                />
              )}
              <div className="flex-1 min-w-0">
                {displayUser.displayName && (
                  <div className="font-semibold text-white truncate">
                    {displayUser.displayName}
                  </div>
                )}
                {displayUser.username && (
                  <div className="text-sm text-gray-400 truncate">
                    @{displayUser.username}
                  </div>
                )}
              </div>
            </div>
            {(displayUser.followers !== undefined ||
              displayUser.following !== undefined) && (
              <div className="flex gap-4 text-sm text-gray-400 mt-2">
                {displayUser.followers !== undefined && (
                  <span>
                    <span className="text-white font-medium">
                      {displayUser.followers.toLocaleString()}
                    </span>{" "}
                    followers
                  </span>
                )}
                {displayUser.following !== undefined && (
                  <span>
                    <span className="text-white font-medium">
                      {displayUser.following.toLocaleString()}
                    </span>{" "}
                    following
                  </span>
                )}
              </div>
            )}
          </div>
        ) : (
          <Identity className="px-6 pt-3 pb-2" hasCopyAddressOnClick>
            <Avatar />
            <Name />
            <Address />
          </Identity>
        )}
        <WalletDropdownBasename />
        <WalletDropdownLink icon="wallet" href="https://keys.coinbase.com">
          Wallet
        </WalletDropdownLink>
        {/* Custom Fund Button that opens FundCard modal */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowFundCard(true);
          }}
          className="w-full px-4 py-2 text-left text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-foreground/5 rounded-md transition-colors"
        >
          Fund
        </button>
        <WalletDropdownDisconnect />
      </WalletDropdown>
      
      {/* FundCard Modal */}
      <FundCardModal open={showFundCard} onOpenChange={setShowFundCard} />
    </Wallet>
  );
}

