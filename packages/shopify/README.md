# @workspace/shopify

Shared Shopify Admin API client for the Cornelius monorepo.

## Features

- Type-safe GraphQL queries and mutations
- Singleton client pattern
- Returns functionality (orders, returns, store credit)
- Modern TypeScript implementation

## Usage

```typescript
import { getOrder } from "@workspace/shopify/queries/get-order"
import { createReturn } from "@workspace/shopify/mutations/create-return"

// Get an order
const order = await getOrder("12345")

// Create a return
const returnData = await createReturn({
  orderId: "gid://shopify/Order/12345",
  returnLineItems: [...],
  returnShippingFee: {...},
  notifyCustomer: true
})
```

## Environment Variables

Required:
- `SHOPIFY_STORE_NAME` - Your Shopify store domain
- `SHOPIFY_ACCESS_TOKEN` - Admin API access token

