"use client";
import Image from "next/image";
import Link from "next/link";
import WalletButton from "../WalletButton";
import { usePathname } from "next/navigation";
import ThemeToggle from "../ThemeToggle";

export default function Header() {
  const pathname = usePathname();

  const tabs = [
    { name: "Buy", href: "/buy" },
    { name: "Morpho", href: "/morpho" },
    { name: "Swap", href: "/swap" },
  ];

  return (
    <header 
      className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60"
      style={{ 
        position: 'sticky',
        top: 0,
        zIndex: 50,
        width: '100%',
        background: 'color-mix(in srgb, var(--color-background) 95%, transparent)',
        backdropFilter: 'blur(8px)'
      }}
    >
      <div 
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '80rem',
          paddingLeft: '1rem',
          paddingRight: '1rem'
        }}
      >
        <div 
          className="relative flex h-16 items-center justify-between"
          style={{
            position: 'relative',
            display: 'flex',
            height: '4rem',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {/* Logo - Left */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/mainLogo.jpg"
                alt="Main Logo"
                width={40}
                height={40}
                className="h-12 w-12 object-contain"
                priority
              />
            </Link>
          </div>

          {/* Tabs - Center (absolutely centered) */}
          <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center space-x-1">
            {tabs.map((tab) => {
              const isActive = pathname === tab.href;
              return (
                <Link
                  key={tab.name}
                  href={tab.href}
                  className={`px-4 py-2 rounded-lg text-md font-medium transition-colors ${
                    isActive
                      ? "bg-none text-[#0b55e9] border-b border-[#0b55e9]"
                      : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                  }`}
                >
                  {tab.name}
                </Link>
              );
            })}
          </nav>

          {/* Wallet + Theme - Right */}
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <WalletButton />
          </div>
        </div>
      </div>
    </header>
  );
}