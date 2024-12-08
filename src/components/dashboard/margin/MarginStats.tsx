import { useBalanceVisibility } from "@/contexts/BalanceVisibilityContext";
import { useIsMobile } from "@/hooks/use-mobile";

interface MarginStatProps {
  label: string;
  value: string;
  approximateValue: string;
}

const MarginStat = ({ label, value, approximateValue }: MarginStatProps) => {
  const { showBalances } = useBalanceVisibility();
  const hiddenValue = "*****";

  return (
    <div>
      <div className="text-gray-400 mb-2 text-sm">{label}</div>
      <div className="text-xl font-semibold text-white">{showBalances ? value : hiddenValue}</div>
      <div className="text-gray-400">≈ {showBalances ? approximateValue : hiddenValue}</div>
    </div>
  );
};

const MarginStats = () => {
  const isMobile = useIsMobile();

  const stats = [
    {
      label: "Adjusted Equity (USD)",
      value: "59,853.3433",
      approximateValue: "$59,853.34"
    },
    {
      label: "Available Balance (USD)",
      value: "59,853.3433",
      approximateValue: "$59,853.34"
    },
    {
      label: "Initial Margin (USD)",
      value: "0.0000",
      approximateValue: "$0.00"
    },
    {
      label: "Maintenance Margin (USD)",
      value: "0.0000",
      approximateValue: "$0.00"
    },
    {
      label: "Total Debt (USD)",
      value: "0.0000",
      approximateValue: "$0.00"
    },
    {
      label: "Unrealized PNL (USD)",
      value: "0.0000",
      approximateValue: "$0.00"
    }
  ];

  // For mobile, only show first and last stats
  const displayStats = isMobile ? [stats[0], stats[5]] : stats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
      {displayStats.map((stat, index) => (
        <MarginStat key={index} {...stat} />
      ))}
    </div>
  );
};

export default MarginStats;