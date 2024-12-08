import TopNavigation from "@/components/dashboard/TopNavigation";
import SideNavigation from "@/components/dashboard/SideNavigation";
import { BalanceVisibilityProvider } from "@/contexts/BalanceVisibilityContext";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayoutContent = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#0B1221]">
      <TopNavigation />
      <div className="flex h-[calc(100vh-48px)]">
        <SideNavigation />
        <div className="flex-1 overflow-auto">
          <main className="p-6">{children}</main>
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