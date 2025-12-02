"use client"

import type { Order } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Checkbox } from "@workspace/ui/components/checkbox"
import { Label } from "@workspace/ui/components/label"

export function ShippingSelector({
  order,
  includeShipping,
  setIncludeShipping,
}: {
  order: Order
  includeShipping: boolean
  setIncludeShipping: (include: boolean) => void
}) {
  const shippingFee = order.shippingService.fee

  return (
    <Card>
      <CardHeader>
        <CardTitle>Return Shipping (Optional)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-start gap-3">
          <Checkbox id="include-shipping" checked={includeShipping} onCheckedChange={(checked) => setIncludeShipping(!!checked)} />
          <div className="flex-1">
            <Label htmlFor="include-shipping" className="cursor-pointer">
              Include return shipping label ({order.currencyCode} {shippingFee.toFixed(2)})
            </Label>
            <p className="text-sm text-gray-600 mt-1">{order.shippingService.explainer}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

