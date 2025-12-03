import { titleCase } from "@workspace/ui/lib/utils";

type ProductNode = {
  id: string;
  title: string;
  handle: string;
  descriptionHtml: string;
  productType: string;
  translations: Array<{ key: string; value: string }>;
  contextualPricing?: {
    maxVariantPricing?: {
      price?: {
        amount: string;
        currencyCode: string;
      };
    };
  };
  material?: {
    reference?: {
      displayName: string;
    };
  };
  category?: {
    references?: {
      edges: Array<{
        node: {
          displayName: string;
        };
      }>;
    };
  };
  sizing?: {
    reference?: {
      glove_length?: {
        value: string;
      };
    };
  };
};

type VariantNode = {
  id: string;
  sku: string;
  availableForSale: boolean;
  selectedOptions: Array<{ name: string; value: string }>;
  image?: {
    url: string;
    altText?: string;
  };
  translations: Array<{ key: string; value: string }>;
};

type MapVariantsParams = {
  productNode: ProductNode;
  variantNode: VariantNode;
  baseUrl: string;
  language: string;
};

export function mapVariants({
  productNode,
  variantNode,
  baseUrl,
  language,
}: MapVariantsParams) {
  const productId = productNode?.id?.replace("gid://shopify/Product/", "");
  const variantId = variantNode?.id?.replace(
    "gid://shopify/ProductVariant/",
    ""
  );
  const size = variantNode.selectedOptions.find(
    (option) => option.name === "Size"
  )?.value;
  const color =
    language === "en"
      ? variantNode.selectedOptions.find((option) => option.name === "Colour")
          ?.value
      : variantNode.translations.find((translation) => translation.key === "option1")
          ?.value;

  const productType =
    language === "en"
      ? productNode.productType
      : productNode.translations.find(
          (translation) => translation.key === "product_type"
        )?.value;

  return {
    sku: variantNode.sku,
    productTitle:
      language === "en"
        ? productNode.title
        : productNode.translations.find(
            (translation) => translation.key === "title"
          )?.value,
    description:
      language === "en"
        ? productNode.descriptionHtml
        : productNode.translations.find(
            (translation) => translation.key === "body_html"
          )?.value,
    color,
    productType: titleCase(productType || ""),
    material: productNode.material?.reference?.displayName,
    category: productNode.category?.references?.edges?.map(
      (edge) => edge.node.displayName
    ),
    length: productNode.sizing?.reference?.glove_length?.value,
    link: `${baseUrl}/${productNode.handle}?variant=${variantId}`,
    image_link: variantNode?.image?.url,
    imageType: variantNode.image?.altText
      ?.toLowerCase()
      .includes("lifestyle")
      ? "Lifestyle"
      : "Flatlay",
    price: productNode.contextualPricing?.maxVariantPricing?.price?.amount,
    currency:
      productNode.contextualPricing?.maxVariantPricing?.price?.currencyCode,
    availability: variantNode.availableForSale ? "in stock" : "out of stock",
    size,
    productId,
    variantId,
    handle: productNode.handle,
    brand: "Cornelia James",
    gender: "Female",
    ageGroup: "Adult",
  };
}

