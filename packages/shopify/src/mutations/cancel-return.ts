import { adminRequest } from "../client"

const CANCEL_RETURN_MUTATION = `#graphql
mutation ReturnCancel($id: ID!) {
  returnCancel(id: $id) {
    return {
      id
    }
    userErrors {
      field
      message
    }
  }
}
`

export async function cancelReturn(id: string) {
  const data = await adminRequest(CANCEL_RETURN_MUTATION, {
    id: `gid://shopify/Return/${id}`,
  })

  if (data.returnCancel.userErrors && data.returnCancel.userErrors.length > 0) {
    throw new Error(data.returnCancel.userErrors[0].message)
  }

  return data.returnCancel.return
}

