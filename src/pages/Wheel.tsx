import DashboardLayout from "@/components/DashboardLayout";
import { WheelDashboard } from "@/components/wheel/WheelDashboard";

const Wheel = () => {
  return (
    <DashboardLayout>
      <div className="min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-8 text-white">Interactive Dashboard</h1>
        <WheelDashboard />
      </div>
    </DashboardLayout>
  );
};

export default Wheel;