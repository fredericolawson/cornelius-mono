import { mapVariants } from "../map-variants";
import { buildLystXml } from "../../xml-builders/lyst";

type ProductsResponse = {
  products: {
    edges: Array<{
      node: any;
    }>;
  };
};

type MapLystFeedParams = {
  productsResponse: ProductsResponse;
  baseUrl: string;
  language: string;
};

export function mapLystFeed({
  productsResponse,
  baseUrl,
  language,
}: MapLystFeedParams): string {
  const variants = productsResponse.products.edges
    .map(({ node: productNode }) => {
      return productNode.variants.edges.map(({ node: variantNode }: any) => {
        const baseFields = mapVariants({
          productNode,
          variantNode,
          baseUrl,
          language,
        });
        const color = baseFields.color?.toLowerCase().replace(/\s+/g, "-");

        // Lyst-specific mappings
        return {
          ID: baseFields.sku,
          ITEM_GROUP_ID: `${baseFields.productId}-${color}`,
          TITLE: `${productNode.title} - ${baseFields.color}`,
          DESCRIPTION: baseFields.description,
          LINK: baseFields.link,
          IMAGE_LINK: baseFields.image_link,
          BRAND: baseFields.brand,
          GENDER: baseFields.gender,
          PRICE: baseFields.price,
          AVAILABILITY: baseFields.availability,
          SIZE: baseFields.size,
        };
      });
    })
    .flat();

  return buildLystXml(variants);
}

