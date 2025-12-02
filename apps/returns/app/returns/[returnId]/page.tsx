import { getReturn as getShopifyReturn } from "@workspace/shopify/queries/get-return"
import { getOrder as getShopifyOrder } from "@workspace/shopify/queries/get-order"
import { returnRequestService } from "@workspace/database/services/return-request-service"
import { mapReturn } from "@/lib/services/return-mapper"
import { mapOrder } from "@/lib/services/order-mapper"
import { ReturnInfoCard } from "@/components/return-details/return-info-card"
import { ShippingCard } from "@/components/return-details/shipping-card"
import { StoreCreditCard } from "@/components/return-details/store-credit-card"
import { ReturnActions } from "@/components/return-details/return-actions"

export default async function ReturnPage({ params }: { params: Promise<{ returnId: string }> }) {
  const { returnId } = await params
  
  const shopifyReturn = await getShopifyReturn(returnId)
  const returnData = mapReturn(shopifyReturn)

  const shopifyOrder = await getShopifyOrder(returnData.orderId)
  const order = mapOrder(shopifyOrder)

  const returnRequest = await returnRequestService.findByReturnId(returnId)
  
  // Determine return type based on whether we have a return request with CAPTURED status
  const returnType = returnRequest?.status === "CAPTURED" ? "Credit" : "Refund"
  const includeShipping = returnData.totalFee > 0

  return (
    <div className="flex flex-col gap-6">
      <ReturnInfoCard returnData={returnData} order={order} returnType={returnType} />
      <ShippingCard returnData={returnData} order={order} includeShipping={includeShipping} />
      {returnType === "Credit" && returnRequest && (
        <StoreCreditCard
          returnId={returnId}
          order={order}
          amount={returnRequest.amount}
          requestStatus={returnRequest.status}
        />
      )}
      <ReturnActions returnData={returnData} requestStatus={returnRequest?.status || null} />
    </div>
  )
}

