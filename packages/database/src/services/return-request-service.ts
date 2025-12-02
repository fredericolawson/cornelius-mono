import { createSupabaseServerClient } from "../server"
import type { ReturnRequest, ReturnRequestInsert, ReturnRequestUpdate, ReturnRequestStatus } from "../types"

function mapReturnRequest(data: any): ReturnRequest | null {
  if (!data) return null

  return {
    id: data.id,
    customerEmail: data.customer_email,
    customerFirstName: data.customer_first_name,
    customerId: data.customer_id,
    orderId: data.order_id,
    returnId: data.return_id,
    amount: data.amount,
    currency: data.currency,
    paymentIntentId: data.payment_intent_id,
    status: data.status,
    expiration: data.expiration,
    captureDate: data.capture_date,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  }
}

export class ReturnRequestService {
  async createReturnRequest(params: {
    orderId: string
    customerId: string
    customerEmail: string
    customerFirstName: string
    amount: number
    currency: string
    returnId: string
    status?: ReturnRequestStatus
  }): Promise<ReturnRequest> {
    const supabase = createSupabaseServerClient()

    const insertData: ReturnRequestInsert = {
      order_id: params.orderId,
      customer_id: params.customerId,
      customer_email: params.customerEmail,
      customer_first_name: params.customerFirstName,
      amount: params.amount,
      currency: params.currency,
      return_id: params.returnId,
      status: params.status || "PENDING",
    }

    const { data, error } = await supabase
      .from("return_requests")
      .insert([insertData])
      .select()
      .single()

    if (error) throw error

    return mapReturnRequest(data)!
  }

  async findByPaymentIntentId(paymentIntentId: string): Promise<ReturnRequest | null> {
    const supabase = createSupabaseServerClient()

    const { data, error } = await supabase
      .from("return_requests")
      .select("*")
      .eq("payment_intent_id", paymentIntentId)
      .single()

    if (error && error.code !== "PGRST116") throw error

    return mapReturnRequest(data)
  }

  async findByReturnId(returnId: string): Promise<ReturnRequest | null> {
    const supabase = createSupabaseServerClient()

    const { data, error } = await supabase
      .from("return_requests")
      .select("*")
      .eq("return_id", returnId)
      .single()

    if (error && error.code !== "PGRST116") throw error

    return mapReturnRequest(data)
  }

  async associatePaymentIntentId(params: {
    returnRequestId: string
    paymentIntentId: string
    expiration: Date
  }): Promise<void> {
    const supabase = createSupabaseServerClient()

    const twelveHours = 12 * 60 * 60 * 1000
    const captureDate = new Date(params.expiration.getTime() - twelveHours)

    const { error } = await supabase
      .from("return_requests")
      .update({
        payment_intent_id: params.paymentIntentId,
        expiration: params.expiration.toISOString(),
        capture_date: captureDate.toISOString(),
        status: "CONFIRMED",
      })
      .eq("id", params.returnRequestId)

    if (error) throw error
  }

  async getRequestsToCapture(): Promise<ReturnRequest[]> {
    const supabase = createSupabaseServerClient()

    const { data, error } = await supabase
      .from("return_requests")
      .select("*")
      .eq("status", "CONFIRMED")
      .lte("capture_date", new Date().toISOString())

    if (error) throw error

    return (data || []).map(mapReturnRequest).filter((r): r is ReturnRequest => r !== null)
  }

  async updateStatus(returnRequestId: string, status: ReturnRequestStatus): Promise<void> {
    const supabase = createSupabaseServerClient()

    const { error } = await supabase
      .from("return_requests")
      .update({ status })
      .eq("id", returnRequestId)

    if (error) throw error
  }

  async updateStatusByReturnId(returnId: string, status: ReturnRequestStatus): Promise<void> {
    const supabase = createSupabaseServerClient()

    const { error } = await supabase
      .from("return_requests")
      .update({ status })
      .eq("return_id", returnId)

    if (error) throw error
  }
}

export const returnRequestService = new ReturnRequestService()

