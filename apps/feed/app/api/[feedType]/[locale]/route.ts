import { NextResponse } from "next/server";
import { getProductsVariants } from "@workspace/shopify/client";
import { getFeedMapper } from "@/lib/mappers/feeds";

export const maxDuration = 30;

type Params = {
  feedType: string;
  locale: string;
};

export async function GET(
  request: Request,
  context: { params: Promise<Params> }
) {
  try {
    const { feedType, locale } = await context.params;

    let localeFormatted = "";
    if (locale === "en-gb") localeFormatted = "";
    else localeFormatted = locale + "/";

    const localeParts = locale.split("-");
    const country = (localeParts[1]?.toUpperCase() || "GB");
    const language = localeParts[0] || "en";
    const baseUrl = `https://www.corneliajames.com/${localeFormatted}products`;

    const products = await getProductsVariants({
      country,
      language,
    });

    const feedMapper = getFeedMapper(feedType);

    if (!feedMapper) {
      return new NextResponse(`Feed type '${feedType}' not supported`, {
        status: 400,
      });
    }

    // Generate the XML using the feed-specific mapper
    const xml = feedMapper({
      productsResponse: products,
      baseUrl,
      country,
      language,
    });

    return new NextResponse(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=300",
      },
    });
  } catch (e) {
    console.error("Error generating XML:", e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

