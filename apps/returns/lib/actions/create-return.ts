"use server"

import { createReturn as createShopifyReturn } from "@workspace/shopify/mutations/create-return"
import { createStoreCredit as createShopifyStoreCredit } from "@workspace/shopify/mutations/create-store-credit"
import { returnRequestService } from "@workspace/database/services/return-request-service"
import { revalidatePath } from "next/cache"
import type { CreateReturnParams } from "@/types"

export async function createReturn(params: CreateReturnParams) {
  try {
    // Build return input for Shopify
    const returnInput = {
      orderId: `gid://shopify/Order/${params.orderId}`,
      returnShippingFee: {
        amount: {
          amount: params.shippingFee,
          currencyCode: params.currency,
        },
      },
      returnLineItems: params.lineItems,
      notifyCustomer: true,
    }

    // Create return in Shopify
    const shopifyReturn = await createShopifyReturn(returnInput)
    const returnId = shopifyReturn.id.split("/").pop()!

    // If store credit return, create store credit immediately
    if (params.returnType === "Credit") {
      // Create store credit in Shopify
      await createShopifyStoreCredit({
        id: `gid://shopify/Customer/${params.order.customerId}`,
        creditInput: {
          creditAmount: {
            amount: params.storeCreditAmount,
            currencyCode: params.currency,
          },
        },
      })

      // Create return request in Supabase with CAPTURED status
      await returnRequestService.createReturnRequest({
        orderId: params.orderId,
        customerId: params.order.customerId,
        customerEmail: params.order.email,
        customerFirstName: params.order.firstName,
        amount: params.storeCreditAmount,
        currency: params.currency,
        returnId,
        status: "CAPTURED",
      })
    }

    // Revalidate paths
    revalidatePath(`/orders/${params.orderId}`)
    revalidatePath(`/returns/${returnId}`)

    return { success: true, returnId }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to create return"
    return { error: errorMessage }
  }
}

