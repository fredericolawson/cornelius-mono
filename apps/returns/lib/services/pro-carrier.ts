import type { Return, Order } from "@/types"
import { serviceCodes } from "../constants/procarrier-service-codes"

type ProCarrierProduct = {
  Sku: string
  Description: string
  Quantity: number
  Price: number
  Weight: number
  WeightUom: string
  CountryCode: string
  HsCode: string | null
  ExportAwb: string | null
  ExportCarrierName: string | null
  FinalDisposition: string
  Reason: {
    Action: string
    Reason: string
    Wish: string
  }
}

type ProCarrierRequest = {
  ApiKey: string
  Request: {
    Return: {
      Country: string
      State: string | null
      Zip: string
      City: string
      AddressLine1: string
      AddressLine2: string | null
      Name: string
      Company: string | null
      Phone: string | null
      Email: string
      OrderReference: string
      FinalDisposition: string
      ServiceId: number
      Products: ProCarrierProduct[]
      LabelFormat: string
      Destination: {
        Address: {
          Country: string
          Zip: string
          City: string
          AddressLine1: string
          AddressLine2: string
        }
        Contact: {
          Name: string
          Company: string
          Phone: string
          Email: string
        }
      }
    }
  }
}

type ProCarrierResponse = {
  Success?: {
    TrackingNumber: string
    LabelImage: string
  }
  Error?: {
    Message: string[]
  }
}

export async function generateProCarrierLabel(returnData: Return, order: Order): Promise<{
  trackingNumber: string
  labelUrl: string
}> {
  const shippingAddress = order.address

  const payload: ProCarrierRequest = {
    ApiKey: process.env.PROCARRIER_API_KEY!,
    Request: {
      Return: {
        Country: shippingAddress.countryCodeV2,
        State: shippingAddress.province || null,
        Zip: shippingAddress.zip,
        City: shippingAddress.city,
        AddressLine1: shippingAddress.address1,
        AddressLine2: shippingAddress.address2 || null,
        Name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
        Company: null,
        Phone: shippingAddress.phone || null,
        Email: order.email,
        OrderReference: order.name,
        FinalDisposition: "return",
        ServiceId: serviceCodes[shippingAddress.countryCodeV2] || 319,
        Products: returnData.items
          .filter((item) => item.requiresShipping)
          .map((item) => ({
            Sku: item.sku,
            Description: item.productType,
            Quantity: item.quantity,
            Price: item.discountedTotalShopMoney,
            Weight: 0.3,
            WeightUom: "kg",
            CountryCode: "GB",
            HsCode: item.hsCode,
            ExportAwb: order.outboundTrackingNumber,
            ExportCarrierName: order.outboundTrackingCompany,
            FinalDisposition: "return",
            Reason: {
              Action: "Refund",
              Reason: "Not needed",
              Wish: "",
            },
          })),
        LabelFormat: "pdf-6x4",
        Destination: {
          Address: {
            Country: "GB",
            Zip: "BN8 6AY",
            City: "Ripe",
            AddressLine1: "Hall Court Farm",
            AddressLine2: "Firle Lane",
          },
          Contact: {
            Name: "Andrew Lawson",
            Company: "Cornelia James",
            Phone: "+441273920761",
            Email: "operations@corneliajames.com",
          },
        },
      },
    },
  }

  const response = await fetch("https://returns.dgapi.app/api/returns/create/json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  const data: ProCarrierResponse = await response.json()

  if (data.Error) {
    throw new Error(data.Error.Message.join(", ") || "Failed to generate label")
  }

  if (!data.Success) {
    throw new Error("No success response from ProCarrier")
  }

  return {
    trackingNumber: data.Success.TrackingNumber,
    labelUrl: data.Success.LabelImage,
  }
}

