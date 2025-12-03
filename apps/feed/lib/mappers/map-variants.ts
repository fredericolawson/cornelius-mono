import { titleCase } from "@workspace/ui/lib/utils";
import type { GetProductsVariantsQuery } from "@workspace/shopify/types";

// Extract types from the generated GraphQL query
type ProductNode =
  GetProductsVariantsQuery["products"]["edges"][number]["node"];
type VariantNode = ProductNode["variants"]["edges"][number]["node"];

type MapVariantsParams = {
  productNode: ProductNode;
  variantNode: VariantNode;
  baseUrl: string;
  language: string;
};

type MapVariantsReturn = {
  sku: string | null | undefined;
  productName: string;
  productTitle: string | null | undefined;
  description: string | null | undefined;
  color: string | null | undefined;
  productType: string;
  material: string | null | undefined;
  category: string[] | undefined;
  group: string | null | undefined;
  sizeGroup: string | null | undefined;
  length: string | null | undefined;
  link: string;
  image_link: string | null | undefined;
  imageType: string;
  price: string | null | undefined;
  currency: string | null | undefined;
  availability: string;
  size: string | null | undefined;
  productId: string;
  variantId: string;
  handle: string;
  brand: string;
  gender: string;
  ageGroup: string;
};

export function mapVariants({
  productNode,
  variantNode,
  baseUrl,
  language,
}: MapVariantsParams): MapVariantsReturn {
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
      : variantNode.translations.find(
          (translation) => translation.key === "option1"
        )?.value;

  const productType =
    language === "en"
      ? productNode.productType
      : productNode.translations.find(
          (translation) => translation.key === "product_type"
        )?.value;

  let productName = productNode.title || "";
  if (productName.includes(" | ")) {
    productName = productName.split(" | ")[0]?.trim() || productName;
  }

  return {
    sku: variantNode.sku,
    productName,
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
    material: productNode.material?.reference?.title?.value,
    category: productNode.category?.references?.edges
      ?.map((edge) => edge.node?.displayName)
      .filter((name): name is string => name !== null && name !== undefined),
    group: productNode.material?.reference?.group?.value,
    sizeGroup: productNode.sizing?.reference?.size_group?.value,
    length: productNode.sizing?.reference?.glove_length?.value,
    link: `${baseUrl}/${productNode.handle}?variant=${variantId}`,
    image_link: variantNode?.image?.url,
    imageType: variantNode.image?.altText?.toLowerCase().includes("lifestyle")
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
