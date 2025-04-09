"use client";

import { useState, useEffect } from "react";
import { ApiKeyDisplay } from "@/components/api-key-display";
import { BalanceCard } from "@/components/balance-card";
import { ContractExamples } from "@/components/contract-examples";
import { fetchApiCredentials } from "@/lib/mock-api";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [credentials, setCredentials] = useState<{
    apiKey: string;
    apiUrl: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCredentials = async () => {
      try {
        const data = await fetchApiCredentials();
        setCredentials(data);
      } catch (error) {
        console.error("Failed to fetch API credentials:", error);
      } finally {
        setLoading(false);
      }
    };

    getCredentials();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-10 mx-auto space-y-8">
        <h1 className="text-3xl font-bold tracking-tight">Welcome to Sigil</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            {credentials && (
              <>
                <ApiKeyDisplay
                  apiKey={credentials.apiKey}
                  apiUrl={credentials.apiUrl}
                />
                <ContractExamples
                  apiKey={credentials.apiKey}
                  apiUrl={credentials.apiUrl}
                />
              </>
            )}
          </div>
          <div>
            <BalanceCard balance={125.5} currency="USD" />
          </div>
        </div>
      </div>
    </div>
  );
}
