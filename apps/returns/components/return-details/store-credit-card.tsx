import type { Order } from "@/types"
import type { ReturnRequestStatus } from "@workspace/database/types"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Alert, AlertDescription, AlertTitle } from "@workspace/ui/components/alert"
import { Button } from "@workspace/ui/components/button"

export function StoreCreditCard({
  returnId,
  order,
  amount,
  requestStatus,
}: {
  returnId: string
  order: Order
  amount: number
  requestStatus: ReturnRequestStatus
}) {
  if (requestStatus !== "CAPTURED") {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Store Credit</CardTitle>
      </CardHeader>
      <CardContent>
        <Alert>
          <AlertTitle>Store Credit Issued</AlertTitle>
          <AlertDescription>
            <p className="mb-2">
              Your store credit of {order.currencyCode} {amount.toFixed(2)} has been added to your account at{" "}
              {order.email}.
            </p>
            <p className="mb-3">You can now use this credit on your next purchase!</p>
          </AlertDescription>
        </Alert>
        <div className="mt-4 flex gap-2">
          <Button asChild>
            <a href={order.statusPageUrl} target="_blank" rel="noopener noreferrer">
              View Account
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="mailto:support@corneliajames.com">Contact Support</a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

