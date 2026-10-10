# ecommercewale.in

For product pricing, stock, inspection disclosures and request management, see [ADMIN-GUIDE.md](ADMIN-GUIDE.md). Existing databases must apply `database/inventory-upgrade.sql` before deploying the inventory upgrade.

Original responsive website for Indore, Ujjain and Dewas. Portable static frontend, Node serverless API and optional Supabase/PostgreSQL persistence. No framework dependencies or build step are needed.

## Included

- Original SVG logo and device illustrations (no copied Cashify design or product photographs).
- Home, catalogue, search, brand/budget/condition filters, sorting and saved phones.
- Product detail, enquiry bag and purchase enquiry form; no paid checkout.
- Four-step sell flow with explainable example valuation and preferred pickup request.
- Three-city PIN coverage, support request and request history/lookup.
- Admin overview, product create/edit/hide, request status updates, CSV/JSON export and coverage editor.
- Separate searchable reference catalogue with 172 public observations, source links and JSON export; these are not owned stock.
- Server-validated input, signed HTTP-only admin session, same-origin mutation checks, server-only database access and distributed database rate limits.
- Vercel deployment configuration and database migration.
- A limited public catalogue research collector whose output is separated from owned inventory.

## Preview now

Open `public/index.html` directly for the browser-local demo. Open `public/admin.html` and choose **Explore demo workspace**. Forms use sample details and save on that browser only. Local preview data is deletable from the Privacy page.

For an HTTP preview, use Node 24:

On this Windows workspace, double-click `preview.cmd`, then open http://localhost:3000. It uses the downloaded portable runtime where available.

```powershell
# From C:\cashify\ecommercewale (portable runtime already downloaded in this workspace)
& C:\cashify\.tools\node-v24.21.0-win-x64\node.exe server.mjs
```

Then visit http://localhost:3000. Run tests with `node --test tests/*.test.mjs` or the same portable executable. No package installation is necessary.

## Deploy to your Vercel account

1. Put this project in your source repository; choose `ecommercewale` as Vercel's Root Directory if the repository also includes research.
2. Framework preset: **Other**. The included `vercel.json` declares `public` as output and routes `/api/*` to the Node function. No build/install command is needed.
3. Deploy a preview with no database variables: the storefront and demo workspace work locally in the visitor's browser.
4. For durable storage, run `database/schema.sql` in Supabase's SQL editor and configure the environment variables below in Vercel. Redeploy after changes.
5. In the connected admin workspace, add inventory and active supported PIN codes. Keep example rows marked **Demo**. Real catalogue queries exclude demo rows.
6. Complete real business/policy information and device details, then set `ACCEPT_ENQUIRIES=true` when ready to accept real requests. Payments, emails and SMS stay disabled.
7. Add `ecommercewale.in` to the Vercel project's Domains settings and apply Vercel's returned DNS values at your domain provider. The domain has not been connected by this build.

| Server-only variable | Purpose |
|---|---|
| `SUPABASE_URL` | Your project HTTPS URL |
| `SUPABASE_SECRET_KEY` | Backend secret key (`sb_secret_*`) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supported legacy alternative, not needed when using secret key |
| `ADMIN_PASSWORD` | At least 12 characters; do not put it in frontend source |
| `SESSION_SECRET` | At least 32 random characters for signing sessions |
| `ACCEPT_ENQUIRIES` | `false` during setup, `true` when actual requests may be accepted |

No credentials are committed. There is no default production password. Database tables have RLS enabled and public grants removed; API functions validate permission before server-side data operations. Enquiry lookup returns limited status data after reference + phone match. It is not an OTP-authenticated customer account.

The database adapter currently targets Supabase's REST API. If your existing database is another provider/type, adapt `api/index.js`; Vercel itself does not identify the database you own. This build has not connected a remote database or deployed to your Vercel account.

## Scope and important limits

This version supports requests and catalogue management, not inventory reservations, a payment ledger, payout execution, physical serial/custody tracking or confirmed appointment capacity. Preferred pickup slots need manual review. A buy enquiry does not reserve stock or collect payment. The server derives sell estimates from saved rules rather than trusting submitted amounts.

Demo values and draft PIN coverage are not supplier prices or approved operational coverage. Static illustrations are not unit photographs. Replace these with actual verified inventory before selling. Policy pages currently identify their draft status; complete them before commercial launch.

SMS, email and gateway adapters are not implemented and should be added with their verified delivery/payment states later. CSV export is admin-controlled and escapes spreadsheet formula characters. The single-owner admin session has an eight-hour expiry; logout clears the browser cookie, and rotating the signing secret invalidates all sessions. Multi-staff permissions, session revocation lists, comprehensive audit logging, spam challenges, capacity-managed scheduling and product photo uploads are later enhancements.

## Catalogue research

```text
node scripts/collect-catalogue.mjs --max-pages=80
```

The script fetches current robots rules, discovers permitted product links from prior public research and selected sitemap/category sources, and records factual public structured data or page titles. It skips private/API/calculator/user routes and redirects requiring separate access review. It makes one request at a time with a pause, records failures and remaining URLs, and does not claim an exhaustive Cashify export.

Output: `data/cashify-reference/`. Data includes source/time/confidence and `is_our_stock: false`. No product photos or copied descriptions are imported. The collector must not be treated as a live quote/stock feed or an automatic inventory importer. Website copyright, access conditions and data licensing remain relevant. Replace research observations with our own pricing and descriptions.

## Verification

Tests cover valuation, coverage boundaries, contact/consent checks, anonymous admin denial, cross-site mutation protection, disabled live submissions and signed session handling. Browser checks and remaining limits are documented in `VERIFICATION.md` after local QA.

References: [Vercel configuration](https://vercel.com/docs/project-configuration/vercel-json), [Supabase REST API](https://supabase.com/docs/guides/api), [Supabase backend keys](https://supabase.com/docs/guides/database/secure-data).
