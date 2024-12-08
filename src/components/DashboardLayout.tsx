import TopNavigation from "@/components/dashboard/TopNavigation";
import SideNavigation from "@/components/dashboard/SideNavigation";
import { BalanceVisibilityProvider } from "@/contexts/BalanceVisibilityContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useLocation } from "react-router-dom";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayoutContent = ({ children }: DashboardLayoutProps) => {
  const isMobile = useIsMobile();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const location = useLocation();

  // Handle page transitions
  useEffect(() => {
    if (isMobile) {
      setIsPageTransitioning(true);
      const timer = setTimeout(() => {
        setIsPageTransitioning(false);
      }, 300); // Match this with the CSS animation duration
      return () => clearTimeout(timer);
    }
  }, [location.pathname, isMobile]);

  return (
    <div className="min-h-screen bg-[#0B1221]">
      <TopNavigation />
      <div className="flex h-[calc(100vh-48px)]">
        {isMobile ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="fixed bottom-4 right-4 z-50 bg-primary text-white rounded-full shadow-lg w-12 h-12 p-0 overflow-hidden"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute left-0 top-2 block h-0.5 w-6 bg-current transform transition-all duration-200 ${
                    showMobileMenu
                      ? "rotate-45 translate-y-0"
                      : "translate-y-[-4px]"
                  }`}
                />
                <span
                  className={`absolute left-0 bottom-2 block h-0.5 w-6 bg-current transform transition-all duration-200 ${
                    showMobileMenu
                      ? "-rotate-45 translate-y-0"
                      : "translate-y-[4px]"
                  }`}
                />
              </div>
            </Button>
            
            {/* Mobile Navigation Overlay */}
            {showMobileMenu && (
              <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm animate-fade-in">
                <div className="fixed inset-y-0 right-0 w-64 bg-[#0B1221] border-l border-white/10 animate-slide-in-right">
                  <div className="p-4">
                    <SideNavigation />
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <SideNavigation />
        )}
        <div className="flex-1 overflow-auto">
          <main 
            className={`p-4 md:p-6 ${
              isMobile 
                ? isPageTransitioning 
                  ? 'animate-fade-out' 
                  : 'animate-fade-in'
                : ''
            }`}
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <BalanceVisibilityProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </BalanceVisibilityProvider>
  );
};

export default DashboardLayout;