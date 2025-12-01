export const GET_PRODUCTS_HANDLES_QUERY = `
query GetProductsHandles {
  products(
    first: 200, 
    sortKey: TITLE, 
    reverse: false, 
    query: "status:ACTIVE"
  ) {
    edges {
      node {
        handle
      }
    }
  }
}
`

