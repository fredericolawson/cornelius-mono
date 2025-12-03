# Product Feed App

Generates XML product feeds for various marketing channels (Google Shopping, Lyst, Meta).

## API Routes

- `/api/[feedType]/[locale]` - Generate product feed for specific feed type and locale
  - Feed types: `google`, `lyst`, `meta`
  - Locale format: `en-gb`, `en-us`, etc.

## Example

```
GET /api/google/en-gb
GET /api/meta/en-us
GET /api/lyst/fr-fr
```

