import { mapLystFeed } from "./map-lyst";
import { mapGoogleShoppingFeed } from "./map-google";
import { mapMetaFeed } from "./map-meta";

type FeedMapper = (params: any) => string;

export function getFeedMapper(feedType: string): FeedMapper | null {
  const mappers: Record<string, FeedMapper> = {
    google: mapGoogleShoppingFeed,
    lyst: mapLystFeed,
    meta: mapMetaFeed,
  };

  return mappers[feedType] || null;
}

