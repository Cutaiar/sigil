"use client";

import { useState, useEffect } from "react";
import { ApiKeyDisplay } from "@/components/api-key-display";
import { BalanceCard } from "@/components/balance-card";
import { ContractExamples } from "@/components/contract-examples";
import { fetchApiCredentials } from "@/lib/mock-api";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Stagger the animations of children
      delayChildren: 0.3, // Delay before starting children animations
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 100,
    },
  },
};

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
        <motion.h1
          className="text-3xl font-bold tracking-tight"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to Sigil
        </motion.h1>

        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {credentials && (
              <>
                <motion.div variants={itemVariants}>
                  <ApiKeyDisplay
                    apiKey={credentials.apiKey}
                    apiUrl={credentials.apiUrl}
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <ContractExamples
                    apiKey={credentials.apiKey}
                    apiUrl={credentials.apiUrl}
                  />
                </motion.div>
              </>
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.7, // Delay this column to appear after the first column
              type: "spring",
              damping: 15,
              stiffness: 100,
            }}
          >
            <BalanceCard balance={125.5} currency="USD" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
