import { mapVariants } from "../map-variants";
import { buildMetaXml } from "../../xml-builders/meta";
import type { GetProductsVariantsQuery } from "@workspace/shopify/types";

type MapMetaFeedParams = {
  productsResponse: GetProductsVariantsQuery;
  baseUrl: string;
  language: string;
};

export function mapMetaFeed({
  productsResponse,
  baseUrl,
  language,
}: MapMetaFeedParams): string {
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

        return {
          // Required fields for Meta
          id: baseFields.variantId,
          title: baseFields.productTitle,
          description: baseFields.description,
          rich_text_description: baseFields.description,
          link: baseFields.link,
          image_link: baseFields.image_link,
          availability: baseFields.availability,
          condition: "new",
          price: `${baseFields.price} ${baseFields.currency}`,
          brand: baseFields.brand,

          // Optional fields that enhance the listing
          item_group_id: productId,
          color: baseFields.color,
          size: baseFields.size,
          gender: baseFields.gender,
          age_group: baseFields.ageGroup,
          material: baseFields.material,
          product_type: baseFields.productType,
          custom_label_0: baseFields.imageType,

          // Meta-specific fields using g: namespace where appropriate
          "g:google_product_category": mapGoogleProductCategory(
            baseFields.productType
          ),
          "g:gtin": baseFields.sku, // Using SKU as GTIN equivalent
          "g:mpn": baseFields.sku,

          // Additional optional fields
          internal_label: baseFields.category?.[0],
        };
      });
    })
    .flat();

  return buildMetaXml(variants);
}

function mapGoogleProductCategory(productType: string): string {
  // Using Google product category IDs that Meta also supports
  return productType.includes("Gloves") ? "170" : "177";
}

