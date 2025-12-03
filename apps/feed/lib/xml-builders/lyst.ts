type LystProduct = Record<string, string | number | undefined | null>;

/**
 * Builds XML structure for Lyst product feed
 * @param products - Array of mapped product data
 * @returns Complete XML document as string
 */
export function buildLystXml(products: LystProduct[]): string {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<products>\n';

  products.forEach((product) => {
    xml += "  <product>\n";

    // Add each field to the XML
    Object.entries(product).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        xml += `    <${key}>${escapeXml(value)}</${key}>\n`;
      }
    });

    xml += "  </product>\n";
  });

  xml += "</products>";
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

