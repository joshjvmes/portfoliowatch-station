import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { handleProgramError } from "@/utils/jupiterErrors";

interface ErrorCardProps {
  error: any;
  onRetry: () => void;
}

export const ErrorCard = ({ error, onRetry }: ErrorCardProps) => {
  return (
    <Card className="bg-[#0B1221]/50 border-white/10">
      <CardContent className="p-4">
        <div className="text-center space-y-4">
          <p className="text-red-500">{handleProgramError(error)}</p>
          <Button onClick={onRetry} variant="outline">
            Try Again
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};