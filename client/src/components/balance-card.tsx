import { useState } from "react";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface BalanceCardProps {
  balance: number;
  currency: string;
}

export function BalanceCard({ balance, currency }: BalanceCardProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const handleConnectWallet = () => {
    setIsConnecting(true);
    // Simulate wallet connection
    setTimeout(() => {
      setIsConnecting(false);
      setWalletConnected(true);
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Balance</CardTitle>
        <CardDescription>
          Your Sigil credit balance for transaction fees
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Current Balance
            </span>
            <span className="text-2xl font-bold">
              {formatCurrency(balance)}
            </span>
          </div>
          <Progress value={65} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Monthly usage: 65%</span>
            <span>Renews in 12 days</span>
          </div>
        </div>

        {walletConnected && (
          <Alert>
            <AlertDescription className="flex items-center">
              <Wallet className="w-4 h-4 mr-2" />
              Ethereum wallet connected successfully
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleConnectWallet}
          disabled={isConnecting || walletConnected}
        >
          {isConnecting
            ? "Connecting..."
            : walletConnected
            ? "Wallet Connected"
            : "Connect Wallet to Top Up"}
        </Button>
      </CardFooter>
    </Card>
  );
}
