import { adminRequest } from "../client"
import type { DeliveryInput } from "../types"

const CREATE_DELIVERY_MUTATION = `#graphql
mutation ReverseDeliveryCreateWithShipping(
  $labelInput: ReverseDeliveryLabelInput, 
  $notifyCustomer: Boolean, 
  $reverseDeliveryLineItems: [ReverseDeliveryLineItemInput!]!, 
  $reverseFulfillmentOrderId: ID!, 
  $trackingInput: ReverseDeliveryTrackingInput
) {
  reverseDeliveryCreateWithShipping(
    labelInput: $labelInput, 
    trackingInput: $trackingInput,
    notifyCustomer: $notifyCustomer, 
    reverseFulfillmentOrderId: $reverseFulfillmentOrderId, 
    reverseDeliveryLineItems: $reverseDeliveryLineItems
  ) {
    reverseDelivery {
      id
    }
    userErrors {
      field
      message
    }
  }
}
`

export async function createDelivery(deliveryInput: DeliveryInput) {
  const data = await adminRequest(CREATE_DELIVERY_MUTATION, deliveryInput)

  if (data.reverseDeliveryCreateWithShipping.userErrors && data.reverseDeliveryCreateWithShipping.userErrors.length > 0) {
    throw new Error(data.reverseDeliveryCreateWithShipping.userErrors[0].message)
  }

  return data.reverseDeliveryCreateWithShipping.reverseDelivery
}

