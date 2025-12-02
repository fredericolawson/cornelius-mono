import { adminRequest } from "../client"
import type { StoreCreditInput } from "../types"

const CREATE_STORE_CREDIT_MUTATION = `#graphql
mutation storeCreditAccountCredit($id: ID!, $creditInput: StoreCreditAccountCreditInput!) {
  storeCreditAccountCredit(id: $id, creditInput: $creditInput) {
    storeCreditAccountTransaction {
      amount {
        amount
        currencyCode
      }
      account {
        id
        balance {
          amount
          currencyCode
        }
      }
    }
    userErrors {
      message
      field
    }
  }
}
`

export async function createStoreCredit({ id, creditInput }: StoreCreditInput) {
  const data = await adminRequest(CREATE_STORE_CREDIT_MUTATION, { id, creditInput })

  if (data.storeCreditAccountCredit.userErrors && data.storeCreditAccountCredit.userErrors.length > 0) {
    throw new Error(data.storeCreditAccountCredit.userErrors[0].message)
  }

  return data.storeCreditAccountCredit.storeCreditAccountTransaction
}

