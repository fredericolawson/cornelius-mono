import { shopifyApiProject, ApiType } from "@shopify/api-codegen-preset";

export default {
  schema: "https://shopify.dev/admin-graphql-direct-proxy/2025-10",
  documents: ["./src/**/*.ts"],
  projects: {
    default: shopifyApiProject({
      apiType: ApiType.Admin,
      apiVersion: "2025-10",
      documents: ["./src/**/*.ts"],
      outputDir: "./src/types/generated",
    }),
  },
};

