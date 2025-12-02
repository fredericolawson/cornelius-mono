/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as AdminTypes from './admin.types';

export type ReturnCancelMutationVariables = AdminTypes.Exact<{
  id: AdminTypes.Scalars['ID']['input'];
}>;


export type ReturnCancelMutation = { returnCancel?: AdminTypes.Maybe<{ return?: AdminTypes.Maybe<Pick<AdminTypes.Return, 'id'>>, userErrors: Array<Pick<AdminTypes.ReturnUserError, 'field' | 'message'>> }> };

export type ReverseDeliveryCreateWithShippingMutationVariables = AdminTypes.Exact<{
  labelInput?: AdminTypes.InputMaybe<AdminTypes.ReverseDeliveryLabelInput>;
  notifyCustomer?: AdminTypes.InputMaybe<AdminTypes.Scalars['Boolean']['input']>;
  reverseDeliveryLineItems: Array<AdminTypes.ReverseDeliveryLineItemInput> | AdminTypes.ReverseDeliveryLineItemInput;
  reverseFulfillmentOrderId: AdminTypes.Scalars['ID']['input'];
  trackingInput?: AdminTypes.InputMaybe<AdminTypes.ReverseDeliveryTrackingInput>;
}>;


export type ReverseDeliveryCreateWithShippingMutation = { reverseDeliveryCreateWithShipping?: AdminTypes.Maybe<{ reverseDelivery?: AdminTypes.Maybe<Pick<AdminTypes.ReverseDelivery, 'id'>>, userErrors: Array<Pick<AdminTypes.ReturnUserError, 'field' | 'message'>> }> };

export type CreateReturnMutationVariables = AdminTypes.Exact<{
  returnInput: AdminTypes.ReturnInput;
}>;


export type CreateReturnMutation = { returnCreate?: AdminTypes.Maybe<{ return?: AdminTypes.Maybe<Pick<AdminTypes.Return, 'id' | 'name'>>, userErrors: Array<Pick<AdminTypes.ReturnUserError, 'field' | 'message'>> }> };

export type StoreCreditAccountCreditMutationVariables = AdminTypes.Exact<{
  id: AdminTypes.Scalars['ID']['input'];
  creditInput: AdminTypes.StoreCreditAccountCreditInput;
}>;


export type StoreCreditAccountCreditMutation = { storeCreditAccountCredit?: AdminTypes.Maybe<{ storeCreditAccountTransaction?: AdminTypes.Maybe<{ amount: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'>, account: (
        Pick<AdminTypes.StoreCreditAccount, 'id'>
        & { balance: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> }
      ) }>, userErrors: Array<Pick<AdminTypes.StoreCreditAccountCreditUserError, 'message' | 'field'>> }> };

export type GetOrderQueryVariables = AdminTypes.Exact<{
  id: AdminTypes.Scalars['ID']['input'];
}>;


export type GetOrderQuery = { order?: AdminTypes.Maybe<(
    Pick<AdminTypes.Order, 'id' | 'name' | 'statusPageUrl' | 'createdAt' | 'email' | 'tags' | 'currencyCode'>
    & { taxLines: Array<Pick<AdminTypes.TaxLine, 'rate'>>, returns: { nodes: Array<Pick<AdminTypes.Return, 'id'>> }, subtotalPriceSet?: AdminTypes.Maybe<{ presentmentMoney: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'>, shopMoney: Pick<AdminTypes.MoneyV2, 'amount'> }>, totalDiscountsSet?: AdminTypes.Maybe<{ presentmentMoney: Pick<AdminTypes.MoneyV2, 'amount'> }>, shippingAddress?: AdminTypes.Maybe<Pick<AdminTypes.MailingAddress, 'name' | 'firstName' | 'lastName' | 'company' | 'address1' | 'address2' | 'city' | 'province' | 'provinceCode' | 'zip' | 'country' | 'countryCodeV2' | 'phone'>>, customer?: AdminTypes.Maybe<Pick<AdminTypes.Customer, 'displayName' | 'id' | 'email' | 'phone'>>, fulfillments: Array<(
      Pick<AdminTypes.Fulfillment, 'createdAt' | 'status'>
      & { trackingInfo: Array<Pick<AdminTypes.FulfillmentTrackingInfo, 'company' | 'number'>>, fulfillmentLineItems: { nodes: Array<(
          Pick<AdminTypes.FulfillmentLineItem, 'quantity' | 'id'>
          & { lineItem: (
            Pick<AdminTypes.LineItem, 'name' | 'requiresShipping' | 'sku' | 'currentQuantity' | 'quantity'>
            & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>>, customAttributes: Array<Pick<AdminTypes.Attribute, 'key' | 'value'>>, discountedUnitPriceAfterAllDiscountsSet: { presentmentMoney: Pick<AdminTypes.MoneyV2, 'amount'> }, taxLines: Array<(
              Pick<AdminTypes.TaxLine, 'rate'>
              & { priceSet: { presentmentMoney: Pick<AdminTypes.MoneyV2, 'amount'> } }
            )>, variant?: AdminTypes.Maybe<{ inventoryItem: Pick<AdminTypes.InventoryItem, 'harmonizedSystemCode'> }>, product?: AdminTypes.Maybe<Pick<AdminTypes.Product, 'productType'>>, originalTotalSet: { presentmentMoney: Pick<AdminTypes.MoneyV2, 'amount'>, shopMoney: Pick<AdminTypes.MoneyV2, 'amount'> }, discountAllocations: Array<{ allocatedAmountSet: { presentmentMoney: Pick<AdminTypes.MoneyV2, 'amount'>, shopMoney: Pick<AdminTypes.MoneyV2, 'amount'> } }> }
          ), originalTotalSet: { presentmentMoney: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'>, shopMoney: Pick<AdminTypes.MoneyV2, 'amount'> }, discountedTotalSet: { presentmentMoney: Pick<AdminTypes.MoneyV2, 'amount'>, shopMoney: Pick<AdminTypes.MoneyV2, 'amount'> } }
        )> } }
    )> }
  )> };

export type GetReturnQueryVariables = AdminTypes.Exact<{
  id: AdminTypes.Scalars['ID']['input'];
}>;


export type GetReturnQuery = { return?: AdminTypes.Maybe<(
    Pick<AdminTypes.Return, 'name' | 'status' | 'totalQuantity' | 'id'>
    & { order: (
      Pick<AdminTypes.Order, 'id' | 'currencyCode'>
      & { shippingAddress?: AdminTypes.Maybe<Pick<AdminTypes.MailingAddress, 'countryCodeV2'>> }
    ), returnShippingFees: Array<{ amountSet: { presentmentMoney: Pick<AdminTypes.MoneyV2, 'currencyCode' | 'amount'> } }>, returnLineItems: { nodes: Array<(
        Pick<AdminTypes.ReturnLineItem, 'id' | 'quantity' | 'returnReasonNote' | 'returnReason'>
        & { restockingFee?: AdminTypes.Maybe<Pick<AdminTypes.RestockingFee, 'percentage'>>, totalWeight?: AdminTypes.Maybe<Pick<AdminTypes.Weight, 'unit' | 'value'>>, fulfillmentLineItem: { lineItem: (
            Pick<AdminTypes.LineItem, 'name' | 'sku' | 'requiresShipping'>
            & { image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url'>>, product?: AdminTypes.Maybe<Pick<AdminTypes.Product, 'productType'>>, originalTotalSet: { presentmentMoney: Pick<AdminTypes.MoneyV2, 'amount'>, shopMoney: Pick<AdminTypes.MoneyV2, 'amount'> }, discountAllocations: Array<{ allocatedAmountSet: { presentmentMoney: Pick<AdminTypes.MoneyV2, 'amount'>, shopMoney: Pick<AdminTypes.MoneyV2, 'amount'> } }>, variant?: AdminTypes.Maybe<{ inventoryItem: Pick<AdminTypes.InventoryItem, 'harmonizedSystemCode'> }> }
          ) } }
      ) | Pick<AdminTypes.UnverifiedReturnLineItem, 'id' | 'quantity' | 'returnReasonNote' | 'returnReason'>> }, refunds: { nodes: Array<{ totalRefundedSet: { presentmentMoney: Pick<AdminTypes.MoneyV2, 'amount'> } }> }, reverseFulfillmentOrders: { nodes: Array<(
        Pick<AdminTypes.ReverseFulfillmentOrder, 'id'>
        & { lineItems: { nodes: Array<Pick<AdminTypes.ReverseFulfillmentOrderLineItem, 'totalQuantity' | 'id'>> }, reverseDeliveries: { nodes: Array<{ deliverable?: AdminTypes.Maybe<{ label?: AdminTypes.Maybe<Pick<AdminTypes.ReverseDeliveryLabelV2, 'publicFileUrl'>>, tracking?: AdminTypes.Maybe<Pick<AdminTypes.ReverseDeliveryTrackingV2, 'number' | 'carrierName' | 'url'>> }> }> } }
      )> } }
  )> };

export type ValidateOrderQueryVariables = AdminTypes.Exact<{
  search: AdminTypes.Scalars['String']['input'];
}>;


export type ValidateOrderQuery = { orders: { nodes: Array<Pick<AdminTypes.Order, 'id' | 'name'>> } };

interface GeneratedQueryTypes {
  "#graphql\nquery GetOrder($id: ID!) {\n  order(id: $id) {\n    id\n    name\n    statusPageUrl\n    createdAt\n    email\n    tags\n    currencyCode\n    taxLines {\n      rate\n    }\n    returns(first: 95, query: \"NOT status:CANCELED\") {\n      nodes {\n        id\n      }\n    }\n    subtotalPriceSet {\n      presentmentMoney {\n        amount\n        currencyCode\n      }\n      shopMoney {\n        amount\n      }\n    }\n    totalDiscountsSet {\n      presentmentMoney {\n        amount\n      }\n    }\n    shippingAddress {\n      name\n      firstName\n      lastName\n      company\n      address1\n      address2\n      city\n      province\n      provinceCode\n      zip\n      country\n      countryCodeV2\n      phone\n    }\n    customer {\n      displayName\n      id\n      email\n      phone\n    }\n    fulfillments(first: 10) {\n      createdAt\n      status\n      trackingInfo {\n        company\n        number\n      }\n      fulfillmentLineItems(first: 30) {\n        nodes {\n          lineItem {\n            name\n            requiresShipping\n            image {\n              url\n            }\n            sku\n            currentQuantity\n            quantity\n            customAttributes {\n              key\n              value\n            }\n            discountedUnitPriceAfterAllDiscountsSet {\n              presentmentMoney {\n                amount\n              }\n            }\n            taxLines {\n              rate\n              priceSet {\n                presentmentMoney {\n                  amount\n                }\n              }\n            }\n            variant {\n              inventoryItem {\n                harmonizedSystemCode\n              }\n            }\n            product {\n              productType\n            }\n            originalTotalSet {\n              presentmentMoney {\n                amount\n              }\n              shopMoney {\n                amount\n              }\n            }\n            discountAllocations {\n              allocatedAmountSet {\n                presentmentMoney {\n                  amount\n                }\n                shopMoney {\n                  amount\n                }\n              }\n            }\n          }\n          quantity\n          id\n          originalTotalSet {\n            presentmentMoney {\n              amount\n              currencyCode\n            }\n            shopMoney {\n              amount\n            }\n          }\n          discountedTotalSet {\n            presentmentMoney {\n              amount\n            }\n            shopMoney {\n              amount\n            }\n          }\n        }\n      }\n    }\n  }\n}\n": {return: GetOrderQuery, variables: GetOrderQueryVariables},
  "#graphql\nquery GetReturn($id: ID!) {\n  return(id: $id) {\n    name\n    status\n    totalQuantity\n    id\n    order {\n      id\n      currencyCode\n      shippingAddress {\n        countryCodeV2\n      }\n    }\n    returnShippingFees {\n      amountSet {\n        presentmentMoney {\n          currencyCode\n          amount\n        }\n      }\n    }\n    returnLineItems(first: 10) {\n      nodes {\n        id\n        quantity\n        returnReasonNote\n        returnReason\n        ... on ReturnLineItem {\n          restockingFee {\n            percentage\n          }\n          totalWeight {\n            unit\n            value\n          }\n          fulfillmentLineItem {\n            lineItem {\n              name\n              sku\n              requiresShipping\n              image {\n                url\n              }\n              product {\n                productType\n              }\n              originalTotalSet {\n                presentmentMoney {\n                  amount\n                }\n                shopMoney {\n                  amount\n                }\n              }\n              discountAllocations {\n                allocatedAmountSet {\n                  presentmentMoney {\n                    amount\n                  }\n                  shopMoney {\n                    amount\n                  }\n                }\n              }\n              variant {\n                inventoryItem {\n                  harmonizedSystemCode\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n    refunds(first: 10) {\n      nodes {\n        totalRefundedSet {\n          presentmentMoney {\n            amount\n          }\n        }\n      }\n    }\n    reverseFulfillmentOrders(first: 10) {\n      nodes {\n        id\n        lineItems(first: 100) {\n          nodes {\n            totalQuantity\n            id\n          }\n        }\n        reverseDeliveries(first: 10) {\n          nodes {\n            deliverable {\n              ... on ReverseDeliveryShippingDeliverable {\n                label {\n                  publicFileUrl\n                }\n                tracking {\n                  number\n                  carrierName\n                  url\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n": {return: GetReturnQuery, variables: GetReturnQueryVariables},
  "#graphql\nquery ValidateOrder($search: String!) {\n  orders(first: 1, query: $search) {\n    nodes {\n      id\n      name\n    }\n  }\n}\n": {return: ValidateOrderQuery, variables: ValidateOrderQueryVariables},
}

interface GeneratedMutationTypes {
  "#graphql\nmutation ReturnCancel($id: ID!) {\n  returnCancel(id: $id) {\n    return {\n      id\n    }\n    userErrors {\n      field\n      message\n    }\n  }\n}\n": {return: ReturnCancelMutation, variables: ReturnCancelMutationVariables},
  "#graphql\nmutation ReverseDeliveryCreateWithShipping(\n  $labelInput: ReverseDeliveryLabelInput, \n  $notifyCustomer: Boolean, \n  $reverseDeliveryLineItems: [ReverseDeliveryLineItemInput!]!, \n  $reverseFulfillmentOrderId: ID!, \n  $trackingInput: ReverseDeliveryTrackingInput\n) {\n  reverseDeliveryCreateWithShipping(\n    labelInput: $labelInput, \n    trackingInput: $trackingInput,\n    notifyCustomer: $notifyCustomer, \n    reverseFulfillmentOrderId: $reverseFulfillmentOrderId, \n    reverseDeliveryLineItems: $reverseDeliveryLineItems\n  ) {\n    reverseDelivery {\n      id\n    }\n    userErrors {\n      field\n      message\n    }\n  }\n}\n": {return: ReverseDeliveryCreateWithShippingMutation, variables: ReverseDeliveryCreateWithShippingMutationVariables},
  "#graphql\nmutation CreateReturn($returnInput: ReturnInput!) {\n  returnCreate(returnInput: $returnInput) {\n    return {\n      id\n      name\n    }\n    userErrors {\n      field\n      message\n    }\n  }\n}\n": {return: CreateReturnMutation, variables: CreateReturnMutationVariables},
  "#graphql\nmutation storeCreditAccountCredit($id: ID!, $creditInput: StoreCreditAccountCreditInput!) {\n  storeCreditAccountCredit(id: $id, creditInput: $creditInput) {\n    storeCreditAccountTransaction {\n      amount {\n        amount\n        currencyCode\n      }\n      account {\n        id\n        balance {\n          amount\n          currencyCode\n        }\n      }\n    }\n    userErrors {\n      message\n      field\n    }\n  }\n}\n": {return: StoreCreditAccountCreditMutation, variables: StoreCreditAccountCreditMutationVariables},
}
declare module '@shopify/admin-api-client' {
  type InputMaybe<T> = AdminTypes.InputMaybe<T>;
  interface AdminQueries extends GeneratedQueryTypes {}
  interface AdminMutations extends GeneratedMutationTypes {}
}
