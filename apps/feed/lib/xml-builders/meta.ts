type MetaProduct = Record<string, string | number | undefined | null>;

/**
 * Builds XML structure for Meta product catalog feed
 * @param products - Array of mapped product data
 * @returns Complete XML document as string
 */
export function buildMetaXml(products: MetaProduct[]): string {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0" xmlns:atom="http://www.w3.org/2005/Atom">\n';
  xml += "<channel>\n";
  xml += "<title>Cornelia James - Meta Catalog</title>\n";
  xml += "<description>Product Feed for Facebook</description>\n";
  xml += "<link>https://www.corneliajames.com</link>\n";
  xml +=
    '<atom:link href="https://apps.corneliajames.com/products/meta/en-gb" rel="self" type="application/rss+xml" />\n';

  products.forEach((product) => {
    xml += "<item>\n";

    // Add each field to the XML
    Object.entries(product).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        xml += `<${key}>${escapeXml(value)}</${key}>\n`;
      }
    });

    xml += "</item>\n";
  });

  xml += "</channel>\n";
  xml += "</rss>";
  return xml;
}

/**
 * Escapes special characters for XML content
 * @param str - Value to escape
 * @returns XML-safe string
 */
function escapeXml(str: string | number): string {
  if (typeof str !== "string") {
    str = String(str);
  }

  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

