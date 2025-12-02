"use server"

import { cancelReturn as cancelShopifyReturn } from "@workspace/shopify/mutations/cancel-return"
import { returnRequestService } from "@workspace/database/services/return-request-service"
import { revalidatePath } from "next/cache"

export async function cancelReturn(returnId: string) {
  try {
    // Cancel return in Shopify
    await cancelShopifyReturn(returnId)

    // Update return request status in Supabase if exists
    try {
      await returnRequestService.updateStatusByReturnId(returnId, "CANCELED")
    } catch (error) {
      // Return request might not exist (for refund returns), which is fine
    }

    // Revalidate paths
    revalidatePath(`/returns/${returnId}`)

    return { success: true }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to cancel return"
    return { error: errorMessage }
  }
}

