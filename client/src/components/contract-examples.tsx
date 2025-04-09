import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ContractExamplesProps {
  apiKey: string;
  apiUrl: string;
}

export function ContractExamples({ apiKey, apiUrl }: ContractExamplesProps) {
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [copiedFetch, setCopiedFetch] = useState(false);

  const fullUrl = `https://${apiUrl}`;

  // Smart contract call data example
  const contractCallData = {
    to: "0x1234567890123456789012345678901234567890",
    data: "0xa9059cbb000000000000000000000000e8e5d6a6e0d1f5c5b2e4e5d4c3b2a1b0c9d8e7f000000000000000000000000000000000000000000000000000000000000000a",
    value: "0",
    gasLimit: "100000",
    gasPrice: "20000000000",
  };

  const curlExample = `curl -X POST ${fullUrl} \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
  "to": "${contractCallData.to}",
  "data": "${contractCallData.data}",
  "value": "${contractCallData.value}",
  "gasLimit": "${contractCallData.gasLimit}",
  "gasPrice": "${contractCallData.gasPrice}"
}'`;

  const fetchExample = `const response = await fetch("${fullUrl}", {
  method: "POST",
  headers: {
    "Authorization": "Bearer ${apiKey}",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    to: "${contractCallData.to}",
    data: "${contractCallData.data}", // ERC20 transfer function call
    value: "${contractCallData.value}",
    gasLimit: "${contractCallData.gasLimit}",
    gasPrice: "${contractCallData.gasPrice}"
  })
});

const result = await response.json();
console.log(result.transactionHash); // Blockchain transaction hash`;

  const copyToClipboard = async (text: string, type: "curl" | "fetch") => {
    await navigator.clipboard.writeText(text);
    if (type === "curl") {
      setCopiedCurl(true);
      setTimeout(() => setCopiedCurl(false), 2000);
    } else {
      setCopiedFetch(true);
      setTimeout(() => setCopiedFetch(false), 2000);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Smart Contract Interaction</CardTitle>
        <CardDescription>
          How to send blockchain transactions via Sigil
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="curl">
          <TabsList className="mb-4">
            <TabsTrigger value="curl">cURL</TabsTrigger>
            <TabsTrigger value="fetch">JavaScript</TabsTrigger>
          </TabsList>
          <TabsContent value="curl" className="relative">
            <pre className="p-4 overflow-x-auto font-mono text-sm rounded-md bg-muted">
              {curlExample}
            </pre>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => copyToClipboard(curlExample, "curl")}
            >
              {copiedCurl ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              <span className="sr-only">Copy cURL example</span>
            </Button>
          </TabsContent>
          <TabsContent value="fetch" className="relative">
            <pre className="p-4 overflow-x-auto font-mono text-sm rounded-md bg-muted">
              {fetchExample}
            </pre>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => copyToClipboard(fetchExample, "fetch")}
            >
              {copiedFetch ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              <span className="sr-only">Copy fetch example</span>
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
