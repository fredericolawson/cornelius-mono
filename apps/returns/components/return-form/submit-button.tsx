"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Order, OrderItem, ReturnType } from "@/types";
import { Button } from "@workspace/ui/components/button";
import { createReturn } from "@/lib/actions/create-return";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert";

export function SubmitButton({
  order,
  selectedItems,
  returnType,
  includeShipping,
  shippingFee,
  storeCreditAmount,
  canSubmit,
}: {
  order: Order;
  selectedItems: OrderItem[];
  returnType: ReturnType | null;
  includeShipping: boolean;
  shippingFee: number;
  storeCreditAmount: number;
  canSubmit: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useTransition();
  const router = useRouter();

  const handleSubmit = async () => {
    if (!returnType || !canSubmit) return;

    startTransition(async () => {
      try {
        const lineItems = selectedItems.map((item) => ({
          fulfillmentLineItemId: item.id,
          quantity: item.quantity,
          returnReason: "OTHER",
          returnReasonNote: item.returnReasonNote || "",
        }));

        const result = await createReturn({
          orderId: order.id,
          shippingFee,
          lineItems,
          currency: order.currencyCode,
          returnType,
          order,
          storeCreditAmount,
        });

        if (result.error) {
          setError(() => {
            throw new Error(result.error);
          });
        } else {
          router.push(`/returns/${result.returnId}`);
        }
      } catch (err) {
        setError(() => {
          throw err as Error;
        });
      }
    });
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={handleSubmit}
        disabled={!canSubmit || isPending}
        className="w-full"
        size="lg"
      >
        {isPending ? "Creating Return..." : `Submit ${returnType || ""} Return`}
      </Button>
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to create return. Please try again.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
