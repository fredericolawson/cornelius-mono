"use server"

import { getReturn as getShopifyReturn } from "@workspace/shopify/queries/get-return"
import { getOrder as getShopifyOrder } from "@workspace/shopify/queries/get-order"
import { createDelivery } from "@workspace/shopify/mutations/create-delivery"
import { mapReturn } from "@/lib/services/return-mapper"
import { mapOrder } from "@/lib/services/order-mapper"
import { generateProCarrierLabel } from "@/lib/services/pro-carrier"
import { revalidatePath } from "next/cache"

export async function generateLabel(returnId: string) {
  try {
    // Fetch return and order data
    const shopifyReturn = await getShopifyReturn(returnId)
    const returnData = mapReturn(shopifyReturn)

    const shopifyOrder = await getShopifyOrder(returnData.orderId)
    const order = mapOrder(shopifyOrder)

    // Generate label from ProCarrier
    const { trackingNumber, labelUrl } = await generateProCarrierLabel(returnData, order)

    // Create delivery in Shopify
    await createDelivery({
      labelInput: {
        fileUrl: labelUrl,
      },
      notifyCustomer: true,
      reverseDeliveryLineItems: returnData.reverseFulfillmentOrderLineItems.map((item) => ({
        quantity: item.totalQuantity,
        reverseFulfillmentOrderLineItemId: item.id,
      })),
      reverseFulfillmentOrderId: returnData.reverseFulfillmentOrderId,
      trackingInput: {
        number: trackingNumber,
        url: `https://corneliajames.pcreturns.com/tracking/${trackingNumber}`,
      },
    })

    // Revalidate path
    revalidatePath(`/returns/${returnId}`)

    return { success: true, trackingNumber }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to generate label"
    return { error: errorMessage }
  }
}

