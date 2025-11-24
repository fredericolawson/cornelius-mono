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
import { useMissiveEmail } from "@/app/missive/hooks/use-missive-email";

export default function CustomerPage() {
  const { email, missiveError, loading: missiveLoading } = useMissiveEmail();
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
