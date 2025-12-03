type GoogleProduct = Record<string, string | number | undefined | null>;

/**
 * Builds XML structure for Google Shopping product feed
 * @param products - Array of mapped product data
 * @returns Complete XML document as string
 */
export function buildGoogleShoppingXml(products: GoogleProduct[]): string {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">\n';
  xml += "<channel>\n";
  xml += "<title>Cornelia James - main</title>\n";
  xml += "<link>https://www.corneliajames.com</link>\n";
  xml += "<description/>\n";

  products.forEach((product) => {
    xml += "<item>\n";

    // Add each field to the XML
    Object.entries(product).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
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

