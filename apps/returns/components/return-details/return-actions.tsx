"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import type { Return } from "@/types";
import type { ReturnRequestStatus } from "@workspace/database/types";
import { Button } from "@workspace/ui/components/button";
import { cancelReturn } from "@/lib/actions/cancel-return";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@workspace/ui/components/alert-dialog";

export function ReturnActions({
  returnData,
  requestStatus,
}: {
  returnData: Return;
  requestStatus: ReturnRequestStatus | null;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const canCancel =
    returnData.status !== "Complete" &&
    returnData.status !== "Cancelled" &&
    requestStatus !== "CAPTURED";

  const handleCancel = () => {
    startTransition(async () => {
      await cancelReturn(returnData.id);
      router.push(`/orders/${returnData.orderId}`);
    });
  };

  return (
    <div className="flex gap-3">
      <Button
        variant="outline"
        onClick={() => router.push(`/orders/${returnData.orderId}`)}
      >
        Back to Order
      </Button>

      {canCancel && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" disabled={isPending}>
              Cancel Return
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Cancel Return?</AlertDialogTitle>
              <AlertDialogDescription>
                This will cancel your return request. This action cannot be
                undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>No, Keep Return</AlertDialogCancel>
              <AlertDialogAction onClick={handleCancel} disabled={isPending}>
                {isPending ? "Cancelling..." : "Yes, Cancel Return"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
