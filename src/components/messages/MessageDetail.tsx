import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, AlertCircle, Bell, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface MessageDetailProps {
  message: {
    id: number;
    sender: string;
    subject: string;
    preview: string;
    date: string;
    unread: boolean;
    type: "system" | "transaction" | "alert";
  };
}

const MessageDetail = ({ message }: MessageDetailProps) => {
  const navigate = useNavigate();

  return (
    <Card className="bg-[#0B1221]/50 border-white/10 backdrop-blur-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/messages")}
            className="hover:bg-white/5"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="space-y-1">
            <CardTitle className="text-xl text-white">Message Details</CardTitle>
            <p className="text-sm text-muted-foreground">
              View full message content
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-lg ${
              message.type === 'system' 
                ? 'bg-indigo-500/20 text-indigo-400'
                : message.type === 'alert'
                ? 'bg-yellow-500/20 text-yellow-400'
                : 'bg-green-500/20 text-green-400'
            }`}>
              {message.type === 'system' ? (
                <Bell className="h-6 w-6" />
              ) : message.type === 'alert' ? (
                <AlertCircle className="h-6 w-6" />
              ) : (
                <MessageCircle className="h-6 w-6" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-medium text-white">
                    {message.sender}
                  </span>
                  {message.unread && (
                    <span className="px-2 py-0.5 rounded-full text-xs bg-[#2563EB]/20 text-[#2563EB]">
                      New
                    </span>
                  )}
                </div>
                <span className="text-sm text-muted-foreground">
                  {message.date}
                </span>
              </div>
              <h2 className="text-lg font-medium text-white mb-4">
                {message.subject}
              </h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-400 leading-relaxed">
                  {message.preview}
                  {/* Add more detailed content here */}
                  <br /><br />
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  <br /><br />
                  Best regards,<br />
                  {message.sender}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MessageDetail;