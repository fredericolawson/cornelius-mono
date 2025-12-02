"use client";

import type { Return, Order } from "@/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert";
import { generateLabel } from "@/lib/actions/generate-label";
import { useTransition } from "react";

export function ShippingCard({
  returnData,
  order,
  includeShipping,
}: {
  returnData: Return;
  order: Order;
  includeShipping: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  const handleGenerateLabel = () => {
    startTransition(async () => {
      await generateLabel(returnData.id);
    });
  };

  // If no shipping included, show mailing address
  if (!includeShipping) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Return Shipping</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertTitle>Ship at Your Own Cost</AlertTitle>
            <AlertDescription>
              <p className="mb-2">Please ship your items to:</p>
              <address className="not-italic">
                <strong>Cornelia James</strong>
                <br />
                Returns Department
                <br />
                [Full Address Here]
              </address>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  // If label already exists, show it
  if (returnData.returnDocs?.label) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Return Shipping Label</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Alert>
            <AlertTitle>Your return label is ready</AlertTitle>
            <AlertDescription>
              {returnData.returnDocs.number && (
                <p className="mb-2">
                  <span className="font-semibold">Tracking:</span>{" "}
                  {returnData.returnDocs.number}
                </p>
              )}
              {returnData.returnDocs.carrier && (
                <p className="mb-2">
                  <span className="font-semibold">Carrier:</span>{" "}
                  {returnData.returnDocs.carrier}
                </p>
              )}
            </AlertDescription>
          </Alert>
          <div className="flex gap-2">
            {returnData.returnDocs.label && (
              <Button asChild>
                <a
                  href={returnData.returnDocs.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Label (PDF)
                </a>
              </Button>
            )}
            {returnData.returnDocs.tracking && (
              <Button variant="outline" asChild>
                <a
                  href={returnData.returnDocs.tracking}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Track Package
                </a>
              </Button>
            )}
          </div>
          {order.countryCode !== "GB" && (
            <p className="text-sm text-gray-600">
              Please attach the label to your package and include a copy of the
              packing slip. For international shipments, ensure all customs
              forms are properly completed.
            </p>
          )}
        </CardContent>
      </Card>
    );
  }

  // Show generate label button
  return (
    <Card>
      <CardHeader>
        <CardTitle>Return Shipping Label</CardTitle>
      </CardHeader>
      <CardContent>
        <Alert className="mb-4">
          <AlertTitle>Generate Your Label</AlertTitle>
          <AlertDescription>{order.shippingService.explainer}</AlertDescription>
        </Alert>
        <Button onClick={handleGenerateLabel} disabled={isPending}>
          {isPending ? "Generating..." : "Generate Return Label"}
        </Button>
      </CardContent>
    </Card>
  );
}
