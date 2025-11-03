"use client";
import { usePathname, useRouter } from "next/navigation";
import { sdk } from "@farcaster/miniapp-sdk";
import { 
  FiHome, 
  FiTrendingUp, 
  FiRepeat 
} from "react-icons/fi";
import { FaVault } from 'react-icons/fa6';

const tabs = [
  { name: "Home", href: "/", icon: FiHome },
  { name: "Buy", href: "/buy", icon: FiTrendingUp },
  { name: "Morpho", href: "/morpho", icon: FaVault },
  { name: "Swap", href: "/swap", icon: FiRepeat },
];

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = async (href: string) => {
    try {
      // Check if we're in a mini app context
      const isInMiniApp = await sdk.isInMiniApp();
      
      if (isInMiniApp) {
        // Use SDK action for navigation in mini app
        // For internal navigation, we still use Next.js router
        // but external links should use sdk.actions.openUrl()
        router.push(href);
      } else {
        // Fallback for web - use Next.js router
        router.push(href);
      }
    } catch (error) {
      console.error("Navigation error:", error);
      // Fallback to Next.js router if SDK fails
      router.push(href);
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-none backdrop-blur supports-backdrop-filter:bg-background/60 safe-area-inset-bottom" style={{ zIndex: 50 }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-around">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            const Icon = tab.icon;
            
            return (
              <button
                key={tab.name}
                onClick={() => handleNavigation(tab.href)}
                className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors min-w-[60px] flex-1 ${
                  isActive
                    ? "text-[#0b55e9] bg-none border-b border-[#0b55e9]"
                    : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                }`}
                aria-label={tab.name}
              >
                <Icon 
                  className={`w-5 h-5 ${
                    isActive ? "text-foreground" : "text-foreground/70"
                  }`} 
                />
                <span className="text-xs leading-tight">{tab.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

