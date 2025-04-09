import { useState } from "react";
import { Check, Copy, EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface ApiKeyDisplayProps {
  apiKey: string;
  apiUrl: string;
}

export function ApiKeyDisplay({ apiKey, apiUrl }: ApiKeyDisplayProps) {
  const [showApiKey, setShowApiKey] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const toggleApiKeyVisibility = () => {
    setShowApiKey(!showApiKey);
  };

  const copyToClipboard = async (text: string, type: "key" | "url") => {
    await navigator.clipboard.writeText(text);
    if (type === "key") {
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    } else {
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  const maskedApiKey =
    apiKey.substring(0, 8) + "..." + apiKey.substring(apiKey.length - 4);
  const fullUrl = `https://${apiUrl}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Credentials</CardTitle>
        <CardDescription>Your Sigil API key and endpoint URL</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="api-key" className="text-sm font-medium">
              API Key
            </label>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleApiKeyVisibility}
              className="h-8 px-2"
            >
              {showApiKey ? (
                <EyeOffIcon className="w-4 h-4" />
              ) : (
                <EyeIcon className="w-4 h-4" />
              )}
              <span className="sr-only">
                {showApiKey ? "Hide API key" : "Show API key"}
              </span>
            </Button>
          </div>
          <div className="flex">
            <Input
              id="api-key"
              readOnly
              value={showApiKey ? apiKey : maskedApiKey}
              className="font-mono text-sm"
            />
            <Button
              variant="outline"
              size="icon"
              className="ml-2"
              onClick={() => copyToClipboard(apiKey, "key")}
            >
              {copiedKey ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              <span className="sr-only">Copy API key</span>
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="api-url" className="text-sm font-medium">
            Your Unique Endpoint
          </label>
          <div className="flex">
            <Input
              id="api-url"
              readOnly
              value={fullUrl}
              className="font-mono text-sm"
            />
            <Button
              variant="outline"
              size="icon"
              className="ml-2"
              onClick={() => copyToClipboard(fullUrl, "url")}
            >
              {copiedUrl ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              <span className="sr-only">Copy API URL</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
