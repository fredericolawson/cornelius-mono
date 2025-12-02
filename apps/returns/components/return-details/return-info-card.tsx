import Image from "next/image"
import type { Return, Order, ReturnType } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"

export function ReturnInfoCard({
  returnData,
  order,
  returnType,
}: {
  returnData: Return
  order: Order
  returnType: ReturnType
}) {
  const statusColor = {
    Open: "bg-blue-500",
    "In Progress": "bg-yellow-500",
    Complete: "bg-green-500",
    Cancelled: "bg-gray-500",
  }[returnData.status]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Return {returnData.name}</CardTitle>
          <Badge className={statusColor}>{returnData.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm">
            <span className="font-semibold">Return Type:</span> {returnType}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Total Items:</span> {returnData.totalQuantity}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Order:</span> {order.name}
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Items Being Returned</h3>
          <div className="space-y-3">
            {returnData.items.map((item) => (
              <div key={item.id} className="flex gap-3 border-b pb-3">
                {item.image && (
                  <Image src={item.image} alt={item.name} width={60} height={60} className="rounded object-cover" />
                )}
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">SKU: {item.sku}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  {item.returnReasonNote && (
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-semibold">Reason:</span> {item.returnReasonNote}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    {order.currencyCode} {item.discountedTotal.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-3 space-y-1">
          <div className="flex justify-between text-sm">
            <span>Subtotal:</span>
            <span>
              {order.currencyCode} {returnData.discountedTotal.toFixed(2)}
            </span>
          </div>
          {returnData.totalFee > 0 && (
            <div className="flex justify-between text-sm text-red-600">
              <span>Shipping Fee:</span>
              <span>
                -{order.currencyCode} {returnData.totalFee.toFixed(2)}
              </span>
            </div>
          )}
          <div className="flex justify-between font-semibold text-lg pt-2 border-t">
            <span>{returnType === "Credit" ? "Store Credit:" : "Refund Amount:"}</span>
            <span>
              {order.currencyCode}{" "}
              {returnType === "Credit"
                ? (returnData.discountedTotal * 1.1).toFixed(2)
                : (returnData.discountedTotal - returnData.totalFee).toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

