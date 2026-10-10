# Research dataset notes

Research date: 10 October 2026 (Asia/Kolkata). Retrieval timestamps in the CSV files use UTC with an explicit offset.

## What was collected

- A fixed sample of 15 public Cashify page URLs was attempted.
- 13 returned HTTP 200; 2 returned HTTP 404 in direct collection.
- 341 unique source/level/heading records were extracted.
- 2,422 source-to-target internal link records point to 343 unique target URLs. Discovering a link does not mean the target was fetched or its feature tested.
- 179 source/price-token records were extracted; they are not 179 products or verified quotations.
- The robots rules used by the collector are preserved in `data/robots.txt`.

The root homepage and `/recycle` failed direct retrieval. Public browser/search access supplied homepage evidence independently. Extracted links reveal the recycling route as `/recycle-old-mobile-phone`, which was subsequently checked through browser research. The original failure rows are intentionally preserved.

## Files

| File | Meaning |
|---|---|
| `data/pages.csv` / `pages.json` | Attempted URL, timestamp, status, title and response character count |
| `data/headings.csv` | H1–H3 strings; navigation and marketing language can be present |
| `data/links.csv` | Same-host links with query strings/fragments removed; not a complete sitemap |
| `data/price-tokens.csv` | Currency-looking strings without reliable product association |
| `data/price-observations.csv` | Small manually interpreted browser/search sample, separate from direct extraction |
| `unit-economics.csv` | Proposed economics, not scraped Cashify finances |

The historical column name `bytes` actually measures .NET string characters, not network payload bytes. HTML and script payloads were processed in memory; full source pages, images, customer data and executable website code were not republished in this dataset.

## Confidence and verification

Official pages establish advertised features and policies, not service quality or universal availability. Public app descriptions may describe functions absent from particular website journeys. No account, physical transaction, diagnostic app or store visit was tested.

Browser-indexed price observations can differ from direct extraction because of timing, rendering, variants, geography and promotions. No signed-in quotation or checkout was completed. Do not use this dataset as a production inventory feed.

Cashify's warranty details vary by category and online/offline channel. Membership offers, financing terms and promotions also vary. Preserve transaction-time policy versions in our proposed product.

The independent financial article's category breakdown has apparent internal inconsistencies, so the report uses headline revenue/loss only and does not reconstruct segment shares. Counterpoint's full-year growth number was visible in its search extract; the opened page exposes limited body content. Treat the figure as a cited forecast, not independently audited market data.

No independently verified current store count, full SKU count, national market share, private pricing formula, partner take rate or actual unit economics is claimed. User reviews are qualitative research signals, not representative statistics.

## Refreshing research

The included PowerShell collector is intentionally limited to a fixed URL list. Recheck crawling rules and applicable access conditions before expanding it. It does not provide a general-purpose, fully standards-compliant robots parser for arbitrary sites. It follows public redirects supported by the HTTP client; review destinations and rules before adapting it to other hosts.

For a refreshed pricing benchmark, record source URL, observed time, model, regional variant, RAM/storage, grade, colour, warranty, location, availability, taxes, delivery charges, coupon eligibility and whether the amount is a maximum, a range or an executable offer. Compare like-for-like conditions and avoid inferring profit from advertised spreads.
