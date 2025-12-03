import { mapVariants } from "../map-variants";
import { buildGoogleShoppingXml } from "../../xml-builders/google";
import type { GetProductsVariantsQuery } from "@workspace/shopify/types";

type MapGoogleFeedParams = {
  productsResponse: GetProductsVariantsQuery;
  baseUrl: string;
  country: string;
  language: string;
};

export function mapGoogleShoppingFeed({
  productsResponse,
  baseUrl,
  country,
  language,
}: MapGoogleFeedParams): string {
  const variants = productsResponse.products.edges
    .map(({ node: productNode }) => {
      return productNode.variants.edges.map(({ node: variantNode }) => {
        const baseFields = mapVariants({
          productNode,
          variantNode,
          baseUrl,
          language,
        });
        const productId = baseFields.productId;
        // -
        return {
          "g:id": `shopify_${country}_${productId}_${baseFields.variantId}`,
          "g:title": `${baseFields.productName} ${baseFields.material} ${baseFields.group} - ${baseFields.color} ${baseFields.sizeGroup} ${baseFields.group} - ${baseFields.productType} by Cornelia James`,
          "g:description": baseFields.description,
          "g:link": baseFields.link,
          "g:image_link": baseFields.image_link,
          "g:price": `${baseFields.price} ${baseFields.currency}`,
          "g:availability": baseFields.availability,
          "g:brand": baseFields.brand,
          "g:gender": baseFields.gender,
          "g:item_group_id": productId,
          "g:mpn": baseFields.sku,
          "g:condition": "new",
          "g:age_group": "Adult",
          "g:color": baseFields.color,
          "g:product_type": baseFields.productType,
          "g:material": baseFields.material,
          "g:length": baseFields.length + " in",
          "g:custom_label_0": baseFields.category?.join(", "),
          "g:custom_label_1": baseFields.imageType,
          "g:quantity": "999",
          "g:google_product_category": mapGoogleProductCategory(
            baseFields.productType
          ),
        };
      });
    })
    .flat();

  return buildGoogleShoppingXml(variants);
}

function mapGoogleProductCategory(productType: string): string {
  return productType.includes("Gloves") ? "170" : "177";
}
