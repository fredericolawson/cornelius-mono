# @workspace/database

Shared Supabase database client and services for the Cornelius monorepo.

## Features

- Server and browser Supabase clients
- Return request service with CRUD operations
- Type-safe database operations
- Simple error handling (throws errors)

## Usage

```typescript
import { returnRequestService } from "@workspace/database/services/return-request-service"

// Create a return request
const returnRequest = await returnRequestService.createReturnRequest({
  orderId: "12345",
  customerId: "cust_123",
  customerEmail: "customer@example.com",
  customerFirstName: "John",
  amount: 100.00,
  currency: "GBP",
  returnId: "ret_123",
  status: "CAPTURED"
})

// Find by return ID
const request = await returnRequestService.findByReturnId("ret_123")

// Update status
await returnRequestService.updateStatus(request.id, "CAPTURED")
```

## Environment Variables

Required:
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key (server-side)
- `NEXT_PUBLIC_SUPABASE_URL` - Public Supabase URL (client-side)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Anon key (client-side)

