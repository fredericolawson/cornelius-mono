"use client"

import type { Order, ReturnType } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"

export function ReturnOptions({
  order,
  returnType,
  setReturnType,
  discountedSubtotal,
  storeCreditAmount,
  refundAmount,
  taxDeduction,
  restockingFee,
  restockingExplainer,
}: {
  order: Order
  returnType: ReturnType | null
  setReturnType: (type: ReturnType) => void
  discountedSubtotal: number
  storeCreditAmount: number
  refundAmount: number
  taxDeduction: number
  restockingFee: number
  restockingExplainer: string
}) {
  const showRefund = !order.exclusions.alteration

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Store Credit Option */}
      <Card
        className={`cursor-pointer transition-all ${returnType === "Credit" ? "ring-2 ring-blue-500" : ""}`}
        onClick={() => setReturnType("Credit")}
      >
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Store Credit
            <Badge className="bg-green-600">Recommended</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-2xl font-bold text-green-600">
            {order.currencyCode} {storeCreditAmount.toFixed(2)}
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>110% of item value (10% bonus)</span>
            </li>
            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>Complimentary return shipping</span>
            </li>
            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>Instant credit upon submission</span>
            </li>
            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>Shop immediately, ship items later</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Refund Option */}
      {showRefund && (
        <Card
          className={`cursor-pointer transition-all ${returnType === "Refund" ? "ring-2 ring-blue-500" : ""}`}
          onClick={() => setReturnType("Refund")}
        >
          <CardHeader>
            <CardTitle>Refund to Original Payment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-2xl font-bold">
              {order.currencyCode} {refundAmount.toFixed(2)}
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Item value:</span>
                <span>
                  {order.currencyCode} {discountedSubtotal.toFixed(2)}
                </span>
              </div>
              {taxDeduction > 0 && (
                <div className="flex justify-between text-red-600">
                  <span>Tax deduction:</span>
                  <span>
                    -{order.currencyCode} {taxDeduction.toFixed(2)}
                  </span>
                </div>
              )}
              {restockingFee > 0 && (
                <div className="flex justify-between text-red-600">
                  <span>{restockingExplainer}:</span>
                  <span>
                    -{order.currencyCode} {restockingFee.toFixed(2)}
                  </span>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-600">Refund issued after items received and inspected</p>
          </CardContent>
        </Card>
      )}

      {!showRefund && (
        <Card className="border-gray-300 bg-gray-50">
          <CardHeader>
            <CardTitle className="text-gray-500">Refund Not Available</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Due to alterations on this order, only store credit returns are available.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

