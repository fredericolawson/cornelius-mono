"use client";

import { useState, useEffect } from "react";
import type { Data } from "@/lib/types";
import { CustomerData } from "@/app/missive/components/customer";
import { Spinner } from "@workspace/ui/components/spinner";
import { CheckCircle2Icon, AlertCircleIcon } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert";
import { getCustomerData } from "@/lib/actions/glops-customer";

export default function CustomerPage() {
  const { email, missiveError, loading: missiveLoading } = useEmail();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    console.log("[CustomerPage] useEffect triggered with email:", email);
    async function fetchData() {
      if (!email) return;
      setLoading(true);
      setError(null);
      try {
        const data = await getCustomerData(email);
        setData(data as Data);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    }
    fetchData();
  }, [email]);

  if (missiveError) {
    return (
      <Message
        title="Missive Error"
        description={missiveError}
        variant="error"
      />
    );
  }

  if (missiveLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (!email) {
    return (
      <Message
        title="No conversation selected"
        description="Please select a conversation to view customer data"
      />
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <Message title="Error" description={error} variant="error" />;
  }

  if (!data || !data.customer) {
    return (
      <Message
        title="No customer"
        description={`No customer data found for email ${email}`}
      />
    );
  }

  return <CustomerData data={data} />;
}

function Message({
  title,
  description,
  variant = "default",
}: {
  title: string;
  description: string;
  variant?: "default" | "error";
}) {
  return (
    <Alert variant={variant === "error" ? "destructive" : "default"}>
      {variant === "error" ? (
        <AlertCircleIcon className="h-4 w-4" />
      ) : (
        <CheckCircle2Icon className="h-4 w-4" />
      )}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}

/*
=================================================
	useEmail hook
=================================================
*/
function useEmail() {
  const [email, setEmail] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  const [missiveError, setMissiveError] = useState<string | null>(null);

  useEffect(() => {
    console.log("[useEmail] useEffect initializing");
    let mounted = true;

    const fetchAndDisplaySenderEmail = (ids?: string[]) => {
      console.log(
        "[useEmail] fetchAndDisplaySenderEmail called with ids:",
        ids
      );

      if (!ids || ids.length !== 1) {
        console.log(
          "[useEmail] Skipping - no single conversation selected:",
          ids?.length || 0
        );
        setEmail(undefined);
        return;
      }

      if (!window.Missive) {
        console.error("[useEmail] Missive not available");
        return;
      }

      window.Missive.fetchConversations(ids)
        .then((conversations) => {
          if (!mounted) return;

          const senderEmail =
            conversations[0]?.latest_message?.from_field?.address;

          if (senderEmail) {
            console.log("[useEmail] Setting email to:", senderEmail);
            setEmail(senderEmail);
          } else {
            console.log("[useEmail] No senderEmail found in conversation");
            setEmail(undefined);
          }

          console.log("senderEmail", senderEmail);
        })
        .catch((err: unknown) => {
          if (!mounted) return;
          console.error("Error fetching conversation data:", err);
          setMissiveError(
            "Failed to fetch conversation data. Please try again."
          );
        });
    };

    const initMissive = () => {
      if (!mounted) return;

      if (typeof window !== "undefined" && window.Missive) {
        console.log("[useEmail] Missive library loaded");
        setLoading(false);

        // Set up event listener with retroactive to get current state
        const handleConversationChange = (ids?: string[]) => {
          console.log(
            "[useEmail] handleConversationChange fired - change:conversations event, ids:",
            ids
          );
          fetchAndDisplaySenderEmail(ids);
        };

        // Register with retroactive: true to get current state immediately
        window.Missive.on("change:conversations", handleConversationChange, {
          retroactive: true,
        });

        // Cleanup function
        return () => {
          if (window.Missive) {
            window.Missive.off(
              "change:conversations",
              handleConversationChange
            );
            console.log("[useEmail] Cleaned up event listeners");
          }
        };
      }
    };

    // Wait for Missive library to load
    const checkMissiveInterval = setInterval(() => {
      if (window.Missive) {
        clearInterval(checkMissiveInterval);
        initMissive();
      }
    }, 100);

    // Timeout after 10 seconds
    const timeout = setTimeout(() => {
      if (!window.Missive) {
        clearInterval(checkMissiveInterval);
        console.error("[useEmail] Missive library failed to load");
        setMissiveError(
          "Failed to load Missive integration. Please refresh the page."
        );
        setLoading(false);
      }
    }, 10000);

    return () => {
      mounted = false;
      clearInterval(checkMissiveInterval);
      clearTimeout(timeout);
    };
  }, []);

  return { email, loading, missiveError };
}
