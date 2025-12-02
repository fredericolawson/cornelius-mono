"use client";

import { useActionState } from "react";
import { validateOrder } from "@/lib/actions/validate-order";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Button } from "@workspace/ui/components/button";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert";

export function FindOrderForm() {
  const [state, formAction, isPending] = useActionState(validateOrder, null);

  return (
    <form
      action={formAction}
      className="w-full max-w-md flex flex-col space-y-4 p-4"
    >
      <div>
        <Label htmlFor="orderNumber">Order Number</Label>
        <span className="text-sm text-gray-500 block mb-2">
          This should be a 5-digit number that begins with #
        </span>
        <Input
          type="number"
          id="orderNumber"
          name="orderNumber"
          required
          pattern="\d{5}"
          disabled={isPending}
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <span className="text-sm text-gray-500 block mb-2">
          The email address used to place the order
        </span>
        <Input
          type="email"
          id="email"
          name="email"
          required
          disabled={isPending}
        />
      </div>
      <Button type="submit" className="w-full mt-10" disabled={isPending}>
        {isPending ? "Searching..." : "Start Return / Exchange"}
      </Button>
      {state?.error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}
    </form>
  );
}
