"use client";
import { useMiniAppContext } from "../../hooks/useMiniAppContext";
import Header from "./Header";
import MobileHeader from "./MobileHeader";
import BottomNav from "./BottomNav";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isWeb, isMobile, loading } = useMiniAppContext();

  // Show loading state or nothing while detecting platform
  if (loading) {
    return <>{children}</>;
  }

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* Show full header on web/desktop */}
      {isWeb && <Header />}
      
      {/* Show mobile header on mobile/mini app (just logo and wallet) */}
      {isMobile && <MobileHeader />}
      
      {/* Main content */}
      <main className={isMobile ? "pb-16" : ""}>
        {children}
      </main>

      {/* Show bottom navigation only on mobile/mini app */}
      {isMobile && <BottomNav />}
    </div>
  );
}

