import {
  GET_COLLECTIONS,
  GET_CATEGORY_METAOBJECTS,
} from "@/lib/graphql/queries";
import { shopifyClient } from "@workspace/shopify/client";
import { CollectionsTable } from "@/app/collections/components/collections-table";
import { Collection, CollectionProduct } from "@/types";

export const dynamic = "force-dynamic";

export default async function CollectionsPage() {
  const [collectionsResponse, categoriesResponse]: any[] = await Promise.all([
    shopifyClient.request(GET_COLLECTIONS),
    shopifyClient.request(GET_CATEGORY_METAOBJECTS),
  ]);
  console.log(JSON.stringify(categoriesResponse.metaobjects.nodes, null, 2));
  const categoryMap = createCategoryMap(categoriesResponse.metaobjects.nodes);
  const collections = processCollections(
    collectionsResponse.collections.edges,
    categoryMap
  );

  return <CollectionsTable collections={collections} />;
}

function createCategoryMap(rawMetaobjects: any[]): Map<string, string> {
  const categoryMap = new Map<string, string>();

  rawMetaobjects.forEach((metaobject: any) => {
    const nameField = metaobject.fields.find(
      (field: any) => field.key === "name"
    );
    if (nameField) {
      categoryMap.set(metaobject.id, nameField.value);
    }
  });

  return categoryMap;
}

function processCollections(
  rawCollections: any[],
  categoryMap: Map<string, string>
): Collection[] {
  return rawCollections.map((rawCollection: any) => ({
    id: rawCollection.node.id.split("/").pop(),
    title: rawCollection.node.title,
    description: rawCollection.node.description,
    image: rawCollection.node.image?.url || null,
    products: processProducts(rawCollection.node.products, categoryMap),
    updatedAt: rawCollection.node.updatedAt,
  }));
}

function processProducts(
  rawProducts: any,
  categoryMap: Map<string, string>
): CollectionProduct[] {
  const activeProducts = rawProducts.nodes.filter(
    (rawProduct: any) => rawProduct.status === "ACTIVE"
  );
  return activeProducts.map((rawProduct: any) => {
    let category: string | null = null;

    if (rawProduct.metafield?.value) {
      const categoryId = JSON.parse(rawProduct.metafield.value)[0];

      category = categoryMap.get(categoryId) || null;
    }

    return {
      id: rawProduct.id.split("/").pop(),
      title: rawProduct.title,
      category,
    };
  });
}
