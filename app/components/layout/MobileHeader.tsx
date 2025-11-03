"use client";
import Image from "next/image";
import WalletButton from "../WalletButton";

export default function MobileHeader() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur supports-backdrop-filter:bg-background/60" style={{ zIndex: 50 }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between" style={{ position: 'relative', zIndex: 50 }}>
          {/* Logo - Left */}
          <div className="flex items-center">
            <Image
              src="/mainLogo.jpg"
              alt="Main Logo"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
              priority
            />
          </div>

          {/* Wallet/Profile - Right */}
          <div className="flex items-center">
            <WalletButton />
          </div>
        </div>
      </div>
    </header>
  );
}

