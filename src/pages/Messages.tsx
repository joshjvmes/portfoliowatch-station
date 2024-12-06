import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/DashboardLayout";

const mockMessages = [
  {
    id: 1,
    sender: "System",
    subject: "Welcome to $ROK Trading",
    preview: "Welcome to our platform! Here's how to get started...",
    date: "2024-03-15",
    unread: true,
  },
  {
    id: 2,
    sender: "Support",
    subject: "Transaction Confirmed",
    preview: "Your recent transaction has been confirmed...",
    date: "2024-03-14",
    unread: false,
  },
  {
    id: 3,
    sender: "System",
    subject: "Security Update",
    preview: "We've updated our security protocols...",
    date: "2024-03-13",
    unread: false,
  },
];

const Messages = () => {
  return (
    <DashboardLayout>
      <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-xl text-white">Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockMessages.map((message) => (
              <div
                key={message.id}
                className={`p-4 rounded-lg border ${
                  message.unread
                    ? "bg-[#1A2333]/80 border-[#2563EB]"
                    : "bg-[#1A2333]/20 border-[#1A2333]"
                } hover:bg-[#1A2333] transition-colors duration-200 cursor-pointer`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-white">
                      {message.sender}
                    </span>
                    {message.unread && (
                      <span className="px-2 py-1 rounded text-xs bg-[#2563EB]/20 text-[#2563EB]">
                        New
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-400">{message.date}</span>
                </div>
                <h3 className="text-sm font-medium text-white mb-1">
                  {message.subject}
                </h3>
                <p className="text-sm text-gray-400">{message.preview}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Messages;