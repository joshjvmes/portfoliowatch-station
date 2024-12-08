import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  Bell,
  Shield,
  Smartphone,
  Mail,
  Moon,
  Globe,
  Languages,
} from "lucide-react";

const Settings = () => {
  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="bg-[#0B1221]/50 border-white/10">
          <CardHeader>
            <CardTitle className="text-2xl text-[#00E5BE]">Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Security Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#00E5BE]" />
                Security
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-400">Add an extra layer of security</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Biometric Login</p>
                    <p className="text-sm text-gray-400">Use fingerprint or face ID</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white flex items-center gap-2">
                <Bell className="h-5 w-5 text-[#00E5BE]" />
                Notifications
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Push Notifications</p>
                    <p className="text-sm text-gray-400">Receive push notifications</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Email Notifications</p>
                    <p className="text-sm text-gray-400">Receive email updates</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white flex items-center gap-2">
                <Globe className="h-5 w-5 text-[#00E5BE]" />
                Preferences
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Dark Mode</p>
                    <p className="text-sm text-gray-400">Toggle dark mode</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Language</p>
                    <p className="text-sm text-gray-400">Choose your preferred language</p>
                  </div>
                  <select className="bg-[#1A2333] border-white/10 rounded-md text-white">
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </div>
              </div>
            </div>

            <Button
              onClick={handleSave}
              className="w-full bg-[#00E5BE] hover:bg-[#00E5BE]/90 text-black"
            >
              Save Changes
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Settings;