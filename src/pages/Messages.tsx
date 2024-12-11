import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/DashboardLayout";
import { MessageCircle, AlertCircle, Bell } from "lucide-react";

const mockMessages = [
  {
    id: 1,
    sender: "System",
    subject: "Welcome to $ROK Trading",
    preview: "Welcome to our platform! Here's how to get started...",
    date: "2024-03-15",
    unread: true,
    type: "system",
  },
  {
    id: 2,
    sender: "Support",
    subject: "Transaction Confirmed",
    preview: "Your recent transaction has been confirmed...",
    date: "2024-03-14",
    unread: false,
    type: "transaction",
  },
  {
    id: 3,
    sender: "System",
    subject: "Security Update",
    preview: "We've updated our security protocols...",
    date: "2024-03-13",
    unread: false,
    type: "alert",
  },
];

const Messages = () => {
  return (
    <DashboardLayout>
      <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl text-white">Messages</CardTitle>
            <p className="text-sm text-muted-foreground">
              Your recent notifications and updates
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded-full bg-indigo-600/30 text-indigo-400 text-sm">
              All Messages
            </button>
            <button className="px-3 py-1 rounded-full text-white/60 text-sm hover:bg-white/10 transition-colors">
              Unread
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockMessages.map((message) => (
              <div
                key={message.id}
                className={`p-4 rounded-lg border transition-all duration-200 hover:bg-white/5 cursor-pointer
                  ${message.unread 
                    ? "bg-[#1A2333]/80 border-[#2563EB] shadow-lg shadow-blue-500/10" 
                    : "bg-[#1A2333]/20 border-white/5"
                  }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${
                    message.type === 'system' 
                      ? 'bg-indigo-500/20 text-indigo-400'
                      : message.type === 'alert'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-green-500/20 text-green-400'
                  }`}>
                    {message.type === 'system' ? (
                      <Bell className="h-5 w-5" />
                    ) : message.type === 'alert' ? (
                      <AlertCircle className="h-5 w-5" />
                    ) : (
                      <MessageCircle className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-white">
                          {message.sender}
                        </span>
                        {message.unread && (
                          <span className="px-2 py-0.5 rounded-full text-xs bg-[#2563EB]/20 text-[#2563EB] animate-pulse">
                            New
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0">
                        {message.date}
                      </span>
                    </div>
                    <h3 className="text-sm font-medium text-white truncate mb-1">
                      {message.subject}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {message.preview}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Messages;