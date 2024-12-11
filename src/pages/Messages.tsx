import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/DashboardLayout";
import { MessageCircle, AlertCircle, Bell } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import MessageDetail from "@/components/messages/MessageDetail";

const mockMessages = [
  {
    id: 1,
    sender: "System",
    subject: "Welcome to $ROK Trading",
    preview: "Welcome to our platform! Here's how to get started...",
    date: "2024-03-15",
    unread: true,
    type: "system" as const,
  },
  {
    id: 2,
    sender: "Support",
    subject: "Transaction Confirmed",
    preview: "Your recent transaction has been confirmed...",
    date: "2024-03-14",
    unread: false,
    type: "transaction" as const,
  },
  {
    id: 3,
    sender: "System",
    subject: "Security Update",
    preview: "We've updated our security protocols...",
    date: "2024-03-13",
    unread: false,
    type: "alert" as const,
  },
];

const Messages = () => {
  const navigate = useNavigate();
  const { messageId } = useParams();
  
  const selectedMessage = messageId 
    ? mockMessages.find(m => m.id === parseInt(messageId))
    : null;

  if (selectedMessage) {
    return (
      <DashboardLayout>
        <MessageDetail message={selectedMessage} />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
        <CardHeader className="space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <CardTitle className="text-xl text-white">Messages</CardTitle>
              <p className="text-sm text-muted-foreground">
                Your recent notifications and updates
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 rounded-full bg-indigo-600/30 text-indigo-400 text-sm whitespace-nowrap">
                All Messages
              </button>
              <button className="px-3 py-1 rounded-full text-white/60 text-sm hover:bg-white/10 transition-colors whitespace-nowrap">
                Unread
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockMessages.map((message) => (
              <div
                key={message.id}
                onClick={() => navigate(`/messages/${message.id}`)}
                className={`p-4 rounded-lg border transition-all duration-200 hover:bg-white/5 cursor-pointer
                  ${message.unread 
                    ? "bg-[#1A2333]/80 border-[#2563EB] shadow-lg shadow-blue-500/10" 
                    : "bg-[#1A2333]/20 border-white/5"
                  }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg shrink-0 ${
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
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
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
                      <span className="text-xs text-muted-foreground">
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