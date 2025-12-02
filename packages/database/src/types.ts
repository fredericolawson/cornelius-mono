export type ReturnRequestStatus = "PENDING" | "CONFIRMED" | "CAPTURED" | "REJECTED" | "CLOSED" | "CANCELED"

export type ReturnRequest = {
  id: string
  returnId: string
  orderId: string
  customerId: string
  customerEmail: string
  customerFirstName: string
  amount: number
  currency: string
  status: ReturnRequestStatus
  paymentIntentId: string | null
  expiration: string | null
  captureDate: string | null
  createdAt: string
  updatedAt: string
}

export type ReturnRequestInsert = {
  order_id: string
  customer_id: string
  customer_email: string
  customer_first_name: string
  amount: number
  currency: string
  return_id: string
  status: ReturnRequestStatus
  payment_intent_id?: string
  expiration?: string
  capture_date?: string
}

export type ReturnRequestUpdate = {
  status?: ReturnRequestStatus
  payment_intent_id?: string
  expiration?: string
  capture_date?: string
}

