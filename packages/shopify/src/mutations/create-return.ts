import { adminRequest } from "../client"
import type { ReturnInput } from "../types"

const CREATE_RETURN_MUTATION = `#graphql
mutation CreateReturn($returnInput: ReturnInput!) {
  returnCreate(returnInput: $returnInput) {
    return {
      id
      name
    }
    userErrors {
      field
      message
    }
  }
}
`

export async function createReturn(returnInput: ReturnInput) {
  const data = await adminRequest(CREATE_RETURN_MUTATION, { returnInput })

  if (data.returnCreate.userErrors && data.returnCreate.userErrors.length > 0) {
    throw new Error(data.returnCreate.userErrors[0].message)
  }

  if (!data.returnCreate.return) {
    throw new Error("Failed to create return")
  }

  return data.returnCreate.return
}

