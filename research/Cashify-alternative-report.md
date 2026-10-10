# Cashify alternative: research and advanced product blueprint

**Prepared for the founder | 10 October 2026 | India-first planning assumptions**

**Confirmed launch scope: Indore, Ujjain and Dewas; website only.** Customer journeys and staff/admin workflows will run through responsive web interfaces. Native customer and staff apps are outside the current scope.

**Decision: yes, we can build a credible Cashify alternative.** The recommended strategy is to win on verified quality, transparent inspections and dependable service across this three-city cluster, then expand after proving contribution margin and inventory turnover. This revision replaces the earlier one-city recommendation.

This report combines public-source research, a bounded public-page extraction, and proposed product and operating designs. It is not an audit of Cashify, a dump of its database, or a claim that every authenticated feature has been tested. Cost and performance figures labelled **planning assumptions** are our models, not Cashify's confidential economics or supplier quotations.

## 1. Executive decision

Build an independently branded business covering **sell, refurbish, buy and support**. Launch with smartphones, a limited catalogue, a proposed shared inspection/refurbishment hub, and a small number of qualified sourcing and logistics partners across Indore, Ujjain and Dewas. Use a mobile-friendly customer website and browser-based staff/admin tools. App development is not part of this launch or its delivery commitments.

The first differentiated promise should be: **“Understand the price you receive and the exact device you buy.”** Deliver this through inspection evidence, customer acceptance of deductions, per-device quality reports, battery disclosures, original photographs, verified erasure records and visible warranty progress.

Do not start with every category, a nationwide franchise rollout, rentals, financing on our own balance sheet, or an unconditional future resale guarantee. Each introduces additional capital, fraud, operational and contractual exposure before the core transaction is proven.

| Question | Assessment |
|---|---|
| Can we build comparable customer software? | Yes, with a staged product programme. |
| Can we build more useful features? | Yes; demonstrable trust and operational consistency matter more than feature count. |
| Can public scraping recreate Cashify? | No. It reveals public offers and journeys, not transaction history, algorithms, vendor contracts or live private inventory. |
| Can we launch locally? | Yes, conditional on supply, refurbishment capability, payment onboarding and working capital. |
| Can we guarantee profitability or national success? | No; a controlled pilot must validate those assumptions. |
| Recommended first milestone | Complete 100–300 end-to-end transactions and follow their returns and warranty outcomes before aggressive expansion. |

## 2. Research method and limits

Reviewed official service pages, product listings, warranty and buyback policies, partner information, the Android app listing, competing services, independent market research, financial reporting and government sources. Links appear beside claims. Source access date is 10 October 2026; a page's publication date or crawler timestamp may be older.

The included collector targets 15 public Cashify URLs and records retrieval outcomes, headings, internal links and displayed price tokens. It checks the site's robots rules and pauses between requests. It does not submit forms, create accounts, book pickups, access customer records, query private endpoints or bypass authentication. The extraction is a **sample**, not an exhaustive catalogue or a verified stock feed. See `data/pages.csv` for actual successes and failures.

Robots rules observed permit general public pages but exclude paths including `/calculator/`, `/track/`, `/user/`, `/api/` and `/blog/`. These exclusions are respected by the collector. Robots permission is not a licence to copy copyrighted content or republish a competing catalogue. Our product should use original descriptions and imagery or licensed manufacturer/supplier assets. [Cashify crawling rules](https://www.cashify.in/robots.txt)

Evidence labels used below:

- **Observed:** visible on an official page or official app description; service delivery was not personally tested.
- **Reported:** published by an independent source; not independently audited here.
- **Inferred:** a likely operational requirement, not a claim about Cashify's internal software.
- **Proposed:** functionality, budgets and policies for our business.
- **Unverified:** requires authenticated testing, commercial access or field research.

## 3. Cashify's visible business scope

The public homepage presents selling devices, buying refurbished gadgets, phone/laptop repairs, stores, accessories, recycling, discovery content, rentals and an upgrade programme. A car-selling link also appears; the link alone does not establish that Cashify operates the underlying automotive service. Category visibility does not prove availability in every city. [Cashify homepage](https://www.cashify.in/)

Its commercial model spans consumer device sourcing, refurbished retail, repairs and partner transactions. The partner page describes lead distribution and a commission arrangement. Its partnership FAQ also describes bulk procurement. The precise current revenue mix, ownership of each transaction and take rates are not public in the material reviewed. [Partner programme](https://www.cashify.in/partner-with-us), [partnership FAQ](https://www.cashify.in/faq/cashify-partnership)

Cashify describes itself through a circular device lifecycle: acquisition, repair, refurbishment and reuse. Its company history records a $90 million Series E in 2022. That is historical funding, not a startup budget benchmark or a current valuation. [About Cashify](https://www.cashify.in/about-us)

## 4. Public feature inventory

This is a broad inventory of the public surface reviewed. It does not assert completeness across every app build, city, SKU or signed-in account.

| Area | Observed public capability | Source | Our priority |
|---|---|---|---|
| Sell phones | Brand/model selection and condition-led valuation | [Sell](https://www.cashify.in/sell-old-mobile-phone) | P0 |
| Collection | Pickup scheduling, advertised free collection and payment at handover | [Sell](https://www.cashify.in/sell-old-mobile-phone) | P0 |
| Sell other devices | Laptops, TVs, tablets, watches, consoles, cameras, earbuds, speakers, desktops and AC categories appear | [Service navigation](https://www.cashify.in/sell-old-mobile-phone) | P2; selective |
| Refurbished phones | Browse and purchase used/refurbished inventory | [Catalogue](https://www.cashify.in/buy-refurbished-mobile-phones) | P0 |
| Variants | Storage, colour and condition selection | [Product example](https://www.cashify.in/buy-refurbished-mobile-phones/renewed-apple-iphone-13/99848) | P0 |
| Grades | Fair, Good, Superb and a Best Value option visible on the sampled product | [Product example](https://www.cashify.in/buy-refurbished-mobile-phones/renewed-apple-iphone-13/99848) | P0; our own rubric |
| Merchandising | Reviews, offer pricing, accessories bundles, delivery PIN-code check, related items | [Product example](https://www.cashify.in/buy-refurbished-mobile-phones/renewed-apple-iphone-13/99848) | P0/P1 |
| Finance | EMI plans and named financing options visible | [Product example](https://www.cashify.in/buy-refurbished-mobile-phones/renewed-apple-iphone-13/99848) | P1 via partners |
| Payment choice | App description advertises UPI, COD, split payment and EMI | [Android listing](https://play.google.com/store/apps/details?hl=en_IN&id=com.reglobe.cashify) | P0 UPI/cards; others P1 |
| Device previews | “Dekho aur Khareedo” video preview advertised | [Android listing](https://play.google.com/store/apps/details?hl=en_IN&id=com.reglobe.cashify) | P1; existing competitor feature |
| Quality control | 32-point testing advertised | [Homepage](https://www.cashify.in/) | P0 documented protocol |
| Warranty | Standard coverage, category exceptions and optional extensions | [Policy](https://www.cashify.in/refurbished-warranty-policy) | P0 |
| Phone repair | Screen, battery, cameras, audio, ports, sensors, cleaning and motherboard inspection | [Repairs](https://www.cashify.in/repair) | P1 after lab readiness |
| Repair delivery | Home/store options, repair-parts warranty and conditional screen protection advertised | [Repairs](https://www.cashify.in/repair) | P1 |
| Offline service | Store discovery and local service pages | [Stores](https://www.cashify.in/offline-stores) | P0 one hub; P2 expansion |
| Membership | Cashify Gold savings on buying, selling and accessories | [Gold explanation](https://www.cashify.in/what-is-cashify-gold-membership-plan-benefits-price-and-more) | P2 |
| Assured resale | Conditional buyback programme | [Buyback policy](https://www.cashify.in/buyback-guarantee-usage-policy) | P2, risk priced |
| Brand upgrade | Pixel financing-linked upgrade programme | [Pixel programme](https://www.cashify.in/pixelupgrade) | P3; contracts required |
| Rentals | PS5 and camera rental proposition | [Cashify Play](https://rent.cashify.in/) | P3 |
| Partner sourcing | Leads, device reports, quoted amounts, acceptance and commission | [Partners](https://www.cashify.in/partner-with-us) | P1 |
| Wholesale | Bulk-device partner model | [Partnership FAQ](https://www.cashify.in/faq/cashify-partnership) | P1 exit channel |
| Discovery/content | Phone finding/comparison, news, reviews, articles and Q&A links | [Navigation](https://www.cashify.in/sell-old-mobile-phone) | P1 targeted content |
| Sustainability | Public recycling route | [Recycling](https://www.cashify.in/recycle-old-mobile-phone) | P0 compliant downstream partner |
| Privacy | Published collection/processing policy | [Privacy](https://www.cashify.in/privacy-policy) | P0 |

P0 means required for our commercial launch; P1 follows operational stability; P2 expands the business; P3 is optional diversification.

## 5. Policies that affect product design

The refurbished policy lists six-month cover for major device categories, with exceptions for some accessories. It specifies a 15-day online return/replacement window for mobiles, laptops, tablets and watches; other products including Best Value have a 48-hour window. Offline purchases follow different provisions, including a store-approved 30-day replacement provision. It also lists a ₹150 pickup/drop charge per warranty movement and selective paid extensions excluding batteries/accessories. **Model eligibility by SKU and sales channel; never apply a homepage promise universally.** [Refurbished policy](https://www.cashify.in/refurbished-warranty-policy)

The buyback page advertises up to 75% resale value within stated 3/6/9-month windows, subject to inspection and conditions covering damage, changes, documents and accessories. This is a conditional future purchase commitment, not a universal 75% guarantee. [Buyback policy](https://www.cashify.in/buyback-guarantee-usage-policy)

The repair page advertises six months on replaced parts and one month of screen breakage protection. Exact claim eligibility must follow the relevant policy. [Repairs](https://www.cashify.in/repair), [repair warranty](https://www.cashify.in/warranty-policy)

The Pixel programme connects eligible devices, financing, an upgrade window and buyback. Public promotional values change. Reproducing this requires commercial agreements and residual-value funding, not just a checkout feature. [Pixel programme](https://www.cashify.in/pixelupgrade)

**Proposed policy engine:** attach an immutable policy version to each order. Store category, channel, grade, coverage start/end, exclusions, return deadline, shipping liability and resolution options. Display a short plain-language summary before payment and preserve acceptance evidence.

## 6. Observed price sample and what it does not mean

Public search/browser extracts showed these amounts on the research date. They are observations, not guaranteed live offers. A search index, direct HTML fetch and checkout can differ because of timing, variant, location or promotions.

| Observation | Displayed amount | Context |
|---|---:|---|
| iPhone 13, 4/128 GB, sell landing card | Up to ₹24,760 | Maximum advertised buyback; condition-specific final quote not obtained |
| iPhone 15, 6/128 GB, sell landing card | Up to ₹42,220 | Same qualification |
| iPhone 14, 6/128 GB, sell landing card | Up to ₹27,780 | Same qualification |
| iPhone 16, 8/128 GB, sell landing card | Up to ₹52,900 | Same qualification |
| iPhone 13, Fair, 4/128 GB, Red, sampled retail listing | ₹29,999 | Displayed listing selection, not a completed order |

Sources: [sell landing](https://www.cashify.in/sell-old-mobile-phone), [sample retail listing](https://www.cashify.in/buy-refurbished-mobile-phones/renewed-apple-iphone-13/99848).

The ₹5,239 difference between the sampled iPhone 13 amounts is **not a measured gross margin**: the acquisition card and retail listing are not the same inspected unit or necessarily comparable conditions. Tax, repair yield, discounts, logistics, returns, capital and support also matter. Do not seed our buy prices by subtracting a fixed percentage from competitor listings.

The automated `price-tokens.csv` deliberately does not map tokens to SKUs. A token may be EMI, discount, MRP, an accessory price or selling price. Treat it as an extraction aid requiring interpretation.

## 7. Market opportunity and competition

Counterpoint reports 13% year-on-year growth in India's refurbished smartphone volumes in H1 2026 and forecasts 16% full-year growth. The latter is a forecast, not a completed-year result. Growing demand supports investigation; it does not establish our obtainable share or profitability. [Counterpoint research](https://counterpointresearch.com/en/insights/india-refurbished-smartphone-volumes-grew-13-percent-yoy-in-h1-2026)

Financial reporting places Cashify's FY25 operating revenue at about ₹1,096 crore and total revenue, including other income, at about ₹1,122 crore, with a roughly ₹10.6 crore net loss. These are media-reported figures, not audited directly for this report. The lesson is that substantial revenue can coexist with narrow economics. [Inc42 FY25 reporting](https://inc42.com/buzz/cashify-trims-loss-by-80-to-inr-11-cr-in-fy25/), [Moneycontrol FY25 reporting](https://www.moneycontrol.com/news/business/startup/cashify-enters-rs-1-000-crore-revenue-club-in-fy25-trims-losses-by-80-13599906.html)

| Competitor/channel | Public proposition or channel role | Implication for us |
|---|---|---|
| Cashify | Broad acquisition, retail, repair and partner ecosystem | Compete locally on measurable execution first |
| InstaCash | Device quotation, doorstep collection and payment | Convenient pickup alone is not distinctive |
| RecycleDevice | Online sale of used electronics | Acquisition pricing and local availability need benchmarking |
| Control Z | Renewed-device retail and quality/warranty positioning | Longer warranty alone is not a unique strategy |
| Local shops | Potential sourcing, retail and repair substitutes | Interview locally; do not assume poor service or low prices |
| OEM/retailer exchange | Alternative route when customers upgrade | Explore partner distribution after proving operations |

Sources: [InstaCash](https://www.getinstacash.in/), [RecycleDevice](https://www.recycledevice.com/), [Control Z](https://controlz.world/). Control Z's visible title and product-tier wording are not uniform on warranty duration; verify the exact SKU policy before a duration comparison. No market-share ranking is established here.

**Bottom-up market sizing, proposed:** target households × relevant device owners × annual replacement rate × proportion willing to sell/buy refurbished × reachable share. Cross-check against actual monthly leads, acquisition cost, supply and lab throughput. A national market estimate cannot substitute for city-level demand evidence.

## 8. Customer problems worth validating

Public app reviews include both positive experiences and complaints about pickup-price revisions. Cashify's response explains that an initial estimate can change following inspection. These reviews are anecdotal and selection-biased; they do not establish complaint prevalence or systematic misconduct. [App listing and reviews](https://play.google.com/store/apps/details?hl=en_IN&id=com.reglobe.cashify)

Validate the following hypotheses through interviews and our pilot:

| Hypothesis | Proposed response | Evidence of success |
|---|---|---|
| Sellers dislike unexplained deductions | Itemised issue evidence and pre-acceptance appeal | Lower disputed-deduction rate |
| Buyers find grades ambiguous | Per-device photographs plus objective grading rubric | Fewer condition-mismatch returns |
| Battery condition is hard to judge | Test method, result, timestamp and minimum threshold | Fewer early battery complaints |
| Replacement parts affect expectations | Record replaced components and known limitations | Lower undisclosed-part disputes |
| Data wiping is hard to trust | Traceable erasure workflow and certificate | Complete evidence on every eligible resale |
| Customers cannot predict claim progress | Named claim owner, milestones and deadline | Lower resolution time and repeat contacts |
| Missed pickups waste time | Capacity-aware slots and proactive rescheduling | Higher on-time completion |

We have not verified that Cashify lacks every proposed control internally. These are differentiation hypotheses whose execution must be benchmarked, not allegations.

## 9. Recommended business model

Use a **controlled hybrid**: own selected fast-moving inventory; use partners and wholesale buyers for overflow and categories we cannot refurbish economically. Every transaction must identify the contracting buyer/seller, invoice issuer, warranty provider and custodian of the device.

| Model | Advantages | Trade-offs |
|---|---|---|
| Lead/partner marketplace | Less inventory capital; wider sourcing | Less control over final quote and service |
| Owned inventory retailer | Stronger control of inspection and quality | Capital tied up; depreciation, returns and shrinkage |
| Hybrid, recommended | Controls high-value experience while preserving exit channels | More complex ownership, accounting and responsibilities |

Potential revenue lines: resale contribution, repair labour/parts margin, disclosed partner commission, accessories, responsibly priced protection plans, corporate refurbishment and later trade-in integration fees. Do not count GMV, customer collections and commissions as interchangeable revenue. The accountant must determine principal-versus-agent treatment.

Start with a curated 30–50 model/variant catalogue, subject to local supply testing. Select models by resale velocity, parts availability, expected repair cost and remaining useful support life. A premium-only catalogue concentrates value and theft risk; very low-priced devices may not cover pickup and warranty cost.

## 10. Full customer and staff journeys

**Seller:** search model → confirm variant → serviceability check → guided condition questions → provisional quote with validity and assumptions → identity/ownership declaration → select slot → agent inspection → evidence-backed final offer → explicit acceptance or free decline under our proposed terms → lock removal and erasure procedure → payout confirmation → receipt and status history.

**Buyer:** browse → filter by actual needs and budget → inspect device-specific report → understand battery/parts/grade and policy → check serviceability → reserve unique inventory unit → pay → quality-release check → insured/appropriate shipment → delivery proof → invoice and warranty → easy return/claim entry.

**Pickup agent:** authenticated job list → minimal necessary customer details → arrival verification → model/IMEI match → checklist and photographs → approved pricing rules → customer decision → documented custody transfer → payout workflow → sealed transport → hub reconciliation. Offline capture must queue safely; payouts still require trusted server authorisation.

**Technician:** intake scan → quarantine/ownership checks → diagnostics → repair estimate → approval → parts allocation → repair → independent re-test → erasure verification → grading → photographs → release or wholesale/recycling route.

**Support:** order lookup → eligibility under purchase-time policy → evidence collection → return authorisation → pickup → inspection → repair/replacement/refund → payout reconciliation → closure and root-cause code.

**Finance:** payout request → limits and approval → provider submission → pending/success/failure/reversal handling → bank reconciliation → daily exception report. A screen saying “paid” must never be based solely on a client callback.

## 11. Proposed launch feature backlog

| Module | Launch requirements | Acceptance condition |
|---|---|---|
| Identity | OTP, consent, rate limits, account recovery | Repeated OTP abuse blocked; no identity leakage |
| Catalogue | Brand/model/variant, images, specs, supported faults | No ambiguous variant in quotation/order |
| Valuation | Versioned rules, validity, deductions, approval thresholds | Quote reproducible from saved input and rule version |
| Scheduling | PIN coverage, staff capacity, slots, rescheduling | No slot beyond available capacity |
| Inspection | Checklist, IMEI access controls, photos, final offer | Payout blocked without required evidence/acceptance |
| Procurement | Ownership declaration, custody receipt, payout state | Duplicate acquisition flagged |
| Inventory | Individual serialised units, owner, cost, location, grade | No unit can be sold twice |
| Refurbishment | Work orders, parts, costs, QC gates | Failed or unwiped units cannot be published |
| Storefront | Filters, product details, unit report, policy summary | Customer can identify what is included |
| Checkout | Reservation, payment, address, fees and tax | Payment retry cannot create duplicate orders |
| Fulfilment | Packing scan, dispatch, carrier status, proof | Shipped serial matches sold serial |
| Returns | RMA, serial check, refund tracking | Returned item cannot go directly back on sale |
| Warranty | Coverage lookup, claim workflow, SLA | Eligibility uses order policy version |
| Support | Case notes, customer history, escalation | Access is role scoped and audited |
| Finance | Collections, payouts, refunds, reconciliation | Every money movement maps to a ledger entry |
| Admin | Roles, approvals, catalogue and price editing | Sensitive edits require reason and audit trail |
| Analytics | Funnel, unit contribution, ageing, returns | Metrics deduplicate retries and cancellations |

Additional pages: serviceability, sell-model pages, inspection preparation, grading guide, battery guide, warranty, returns, privacy, terms, grievance contacts, accessibility, repair booking, order tracking and account deletion request.

## 12. Advanced capabilities and release conditions

| Capability | Customer or operating value | Prerequisite / caution |
|---|---|---|
| Device passport | Unit-level inspections, parts, battery and ownership/custody events | Redact previous-owner data and full public IMEI |
| Explainable deductions | Makes the quote change reviewable | Standard fault taxonomy and calibrated inspectors |
| Remote pre-inspection | Reduces unexpected pickup changes | Photos cannot prove all hardware faults |
| Pricing optimisation | Accounts for demand, stock age and repair yield | Own transaction data and conservative manual override |
| Automated visual grading | Assists scratch/damage classification | Labelled consented images; human appeal; evaluate bias/errors |
| Repair-or-replace adviser | Shows customer choices and net cost | Evidence-based estimates, not conversion manipulation |
| Battery confidence report | Communicates measured condition and limitations | Model-specific supported tests; no fabricated health percentage |
| Customer-visible claim timeline | Reduces uncertainty | Real operational events, named responsibility |
| Route optimisation | Improves pickups per shift | Real duration, geography and capacity data |
| Corporate asset portal | Batch quotes, approvals, erasure and disposition reports | Enterprise contracts and chain-of-custody capability |
| Partner console | Inventory offers, settlements, quality scores | Clear ownership, invoicing and dispute rules |
| Sustainable-disposal records | Verifiable downstream disposition | Registered partners and documentary evidence |
| Multilingual assistance | Helps condition disclosure and support | Human review of commercial/policy translations |
| Future-value protection | Supports repeat upgrades | Reserves, actuarial-style loss modelling, programme limits |

AI should assist assessment and support, with deterministic controls around money, identity and warranty decisions. Do not launch an opaque model as the final authority on deductions. Preview videos already exist in Cashify's advertised offer; our differentiation is traceability and coverage consistency.

## 13. Technical architecture proposal

Begin with a modular application and a transactional relational database. Choose the team's strongest supported web/backend stack after hiring; this report does not prescribe unverified package versions. Add separate services only when scale or organisational boundaries justify them.

```text
Customer website   Agent web     Lab/warehouse web     Support/admin web
       \               |                |                   /
                  Authenticated application layer
  Catalogue | Quotes | Pickup | Inspection | Inventory | Work orders
  Orders | Payments | Ledger | Claims | Policy versions | Audit log
                 |                  |                 |
        Relational database   Private media store   Job queue
                 |                  |                 |
     Reporting and alerts     Evidence access     Notifications
                 |
      Payment / payout / logistics / messaging adapters
```

Integrations to evaluate commercially: Indian payment and payout provider; logistics/reverse-logistics carriers; OTP and consented messaging; maps; accounting/GST tooling; device diagnostics and erasure software; lawful IMEI verification route; customer-support tooling. Vendor access and charges are dependencies, not assumed capabilities.

A browser cannot be assumed to perform all hardware diagnostics. Our agent website will capture manual inspection results and evidence; lab staff can use supported existing diagnostic software or physical test equipment. No custom native app is required in the launch plan. Do not promise automatic browser-based battery health, full IMEI detection or background tracking. Neither browser-only diagnosis nor third-party software should be assumed to bypass activation locks.

Reliability controls: idempotent payment/refund/payout operations, server-verified signed callbacks, deduplicated background events, reservation expiry, database-enforced uniqueness, automatic reconciliation, encrypted evidence, backups and tested restoration, permission-scoped access and immutable audit events.

## 14. Data model and state transitions

Core records: User, Consent, Address, DeviceModel, Variant, Quote, QuoteRuleVersion, ConditionAnswer, Pickup, Agent, Inspection, DefectEvidence, DeviceUnit, OwnershipEvent, CustodyEvent, DiagnosticRun, ErasureRecord, RepairOrder, Part, QCResult, Listing, Reservation, Order, Payment, Payout, Refund, LedgerEntry, Shipment, Claim, PolicyVersion, Partner, Settlement and AuditEvent.

Important distinctions:

- A **catalogue variant** is a type of device; a **DeviceUnit** is one physical unit.
- Quotes are versioned snapshots; catalogue price updates cannot rewrite accepted quotes.
- Ownership and physical custody can differ; record both explicitly.
- Customer-provided claims and technician-verified facts must remain distinguishable.
- An erasure certificate records a performed and verified procedure, not a generic template.
- Do not expose complete IMEI, customer identity or previous-owner information on public listings.

Proposed lifecycle:

```text
Quote -> Pickup scheduled -> Inspection -> Final offer
  -> Declined / Cancelled
  -> Accepted -> Acquisition settlement -> Intake quarantine
  -> Verified -> Erased -> Repair if needed -> Independent QC
  -> Retail ready / Wholesale / Registered recycling partner
  -> Reserved -> Sold -> Shipped -> Delivered
  -> Claim/Return if applicable -> Quarantine -> Re-test -> Resolution
```

Exception branches must include missed pickup, disputed condition, stolen/blocked status, activation lock, payout timeout, transit loss, unexpected damage, non-repairable unit, failed QC, duplicate payment callback, return of wrong unit and chargeback.

## 15. Valuation and pricing design

**Proposed buying ceiling:** expected net resale proceeds minus repair/parts, handling, logistics, payment costs, expected returns/warranty, fraud/shrinkage, price decline, acquisition marketing and target contribution. Include probability of retail-grade recovery and a conservative wholesale exit value.

Quote rules should be model/variant specific and account for functional faults, cosmetics, battery evidence, replaced parts, lock status, warranty/documentation where relevant, local liquidity and existing stock. Avoid double-counting related defects: a screen replacement might already remedy both touch and display faults.

Store base valuation, deductions, bonuses, expiry, version, evidence and acceptance. Show customers whether an amount is provisional, conditional or final. Every manual override needs a reason and permission limit. Supervisor approval should be required for unusual payouts and large deductions.

Initially use analyst-maintained rules and actual dealer exit bids. Later train pricing models on acquired units, repair outcomes, realised net selling prices and time-to-sale. Competitor advertised “up to” amounts are noisy observations, not training labels for realised value.

## 16. Refurbishment and quality operations

Suggested hub zones: received/quarantined, diagnostics, repair, erasure/QC, photography, ready inventory, returns and damaged-battery isolation. Establish safe battery handling and suitable transport with qualified providers.

Inspection protocol should cover model/serial identity, locks, display, touch, battery and charging, wired/wireless connectivity, microphones/speakers, cameras, buttons, biometrics where testable, sensors, signs of liquid damage, physical structure, thermal behaviour and software reset readiness. Use a model-specific checklist; the number of tests alone does not establish quality.

Grade cosmetics separately from function and battery. Proposed public grades can use concrete scratch/dent criteria and photos. A functional defect must never be concealed inside a cosmetic grade. Clearly identify compatible replacements and any lost feature. Avoid claiming original parts without evidence.

Record every repair component, supplier, cost and technician. Re-test after repair and after customer returns. A second person should release high-value units. Before publishing, require verified ownership checks, erasure evidence, QC pass, correct grade and complete listing media.

Track repair yield, rework, technician defect rate, parts failure, inventory ageing and loss. Review failures weekly by model and supplier; remove loss-making models from acquisition quickly.

## 17. Data acquisition plan

| Data | Appropriate acquisition route | Treatment |
|---|---|---|
| Model/specification catalogue | Manufacturer data or licensed supplier feed | Verify regional variants and reuse rights |
| Product images | Own photographs or licensed assets | Per-unit images for condition evidence |
| Resale observations | Permitted public pages or licensed feeds | Store timestamp, variant, grade and offer context |
| Final buyback economics | Our transactions and contracted dealer bids | Main source for valuation calibration |
| Repair costs | Written quotations and actual work orders | Maintain yield and supplier failure history |
| Stock | Own warehouse/partner-authorised feed | Never equate competitor listing with available stock |
| Fault/quality labels | Our consented inspections | Version diagnostic method and evidence |
| Customer insights | Opt-in interviews and support categories | Minimise identifiers and retention |
| Legal/policy requirements | Official sources and professional review | Track effective dates and responsibility |

For broader monitoring, first define the exact questions, access rights and source limits. Use low-rate public requests, cache results, stop on access blocks and honour exclusions. Add a source registry and change detection. Do not build a production business that depends on unrestricted scraping of a single competitor.

Unknown or inaccessible through this research: complete live SKU/stock list, conditional valuation tree, price algorithm, private APIs, customer database, negotiated partner rates, diagnostic implementation, warranty loss cohorts, store-level economics and supplier contracts.

## 18. Security, ownership and fraud controls

Before purchase: verify device identifiers through the lawful available route, ownership declaration and supporting evidence; check locks and obvious tampering; flag duplicate IMEI and anomalous transactions. A clean database response is one check, not proof of legitimate ownership.

DoT's published communication addresses IMEI registration and verification for used-device trading. Confirm the current applicable process, access mechanism and fees before launch; do not assume an unrestricted public bulk API. [DoT communication](https://sancharsaathi.gov.in/SancharSaathiDocuments/ImportantDocuments/Department%20of%20Telecommunications%20Cautions%20Manufacturers%2C%20Importers%20and%20Resellers%20about%20Mandatory%20IMEI%20Registration%20and%20Consequences%20of%20IMEI%20Tampering.pdf), [CEIR](https://ceir.sancharsaathi.gov.in/)

Use restricted evidence access, masked payment identifiers, private file storage, retention limits, staff access logs and dual control for sensitive actions. Agents should not collect account passwords or retain personal device content. Erasure failures require quarantine or an approved destruction/disposal path.

Payment risks include account substitution, duplicate payout, forged callback, chargeback and staff collusion. Inventory risks include unit swapping, part substitution, theft and false returns. Mitigate with scans at each custody transfer, sealed packaging, limited override authority and reconciliation to bank/provider and physical stock.

## 19. India compliance workstream

This is a launch workstream, not a legal opinion. Applicability depends on whether we are a retailer, marketplace, refurbisher, producer, importer or recycler. Obtain an Indian lawyer/CA review of the final operating model and effective rules.

| Area | Required design/verification work | Primary source |
|---|---|---|
| Privacy | Notices, lawful processing, consent where required, rights requests, security and deletion; map phased commencement to launch date | [MeitY DPDP Rules and timeline](https://www.meity.gov.in/documents/act-and-policies/digital-personal-data-protection-rules-2025-gDOxUjMtQWa?pageTitle=Digit) |
| Consumer commerce | Clear seller identity, grievance route, total price, truthful grade/condition, delivery and return terms | [Consumer Affairs rules index](https://consumeraffairs.gov.in/pages/consumer-protection-acts) |
| E-waste | Determine applicable refurbisher registration and downstream recycler requirements | [CPCB FAQ](https://cpcb.nic.in/uploads/Projects/E-Waste/FAQ_ewaste_23012024.pdf) |
| Batteries | Determine registration/handling responsibility for actual battery activities | [CPCB battery portal](https://eprbattery.cpcb.gov.in/) |
| GST | Confirm margin-scheme eligibility, tax rate/classification, repairs, commission and invoicing treatment | [CBIC valuation guidance](https://cbic-gst.gov.in/valuation-rules.html) |
| IMEI | Implement applicable verification and record process | [CEIR](https://ceir.sancharsaathi.gov.in/) |

CBIC's second-hand goods guidance conditions margin treatment on matters including no purchase input credit and processing that does not change the goods' nature. Do not assume every refurbished transaction qualifies, or that tax is simply charged on accounting profit. [CBIC](https://cbic-gst.gov.in/valuation-rules.html)

Also review local establishment/trade permissions, transport and insurance, staff/partner agreements, messaging permissions, payment-provider obligations, brand/content rights and any financing/warranty programme. Use financing partners rather than assuming we can extend regulated credit ourselves. Do not assume collecting Aadhaar is mandatory or appropriate for ordinary phone purchase transactions.

## 20. Illustrative unit economics

**Planning assumptions only. All rows use a simplified tax-exclusive operating basis; actual GST cash flow and margin-scheme treatment require a separate CA-approved model.** These are not Cashify's margins. One sold retail unit is the denominator; marketing includes an allocated share of unsuccessful leads.

| Per sold device | Base assumption |
|---|---:|
| Net selling revenue after discounts, excluding tax | ₹18,000 |
| Device acquisition | ₹13,000 |
| Parts and refurbishment | ₹1,000 |
| Collection + outbound logistics | ₹450 |
| Testing, handling and packaging | ₹350 |
| Payment processing | ₹250 |
| Expected returns + warranty | ₹550 |
| Expected fraud/shrinkage | ₹150 |
| Allocated acquisition marketing | ₹700 |
| **Total variable cost** | **₹16,450** |
| **Contribution before fixed costs** | **₹1,550 / 8.6%** |

Warranty reserve example: 8% claims × ₹3,000 average net cost = ₹240; return reserve 10% × ₹3,100 incremental net cost = ₹310. Their sum is ₹550. These are assumptions, not benchmark rates. Measure overlap and recovered value to avoid double counting.

| Sensitivity versus base | Contribution |
|---|---:|
| Selling price decreases 5% (₹900) | ₹650 |
| Acquisition cost rises ₹500 | ₹1,050 |
| Repair cost rises ₹500 | ₹1,050 |
| Marketing cost rises ₹500 | ₹1,050 |
| First three changes happen together | **–₹350** |

At ₹6 lakh monthly fixed operating costs, simple operating break-even is about **388 sold units/month** at ₹1,550 contribution. At ₹650 contribution it becomes about **924 units/month**. This excludes capital expenditure recovery, financing costs and tax effects. Fixed costs must include actual ongoing engineering, operations, rent, support and founder compensation where applicable; ₹6 lakh may be too low for a larger team.

For a partner-only acquisition transaction, model commission/fee income minus lead cost, support, incentives, payment costs and losses separately. Do not apply the full retail selling price as platform revenue.

## 21. Working capital and budget

**Inventory example:** 500 devices sold/month × 25 inventory days ÷ 30 × ₹13,000 average acquisition cost = approximately **₹54.2 lakh tied up in acquisition inventory**. Adding ₹1,000 refurbishment cost per unit in stock brings this to roughly **₹58.3 lakh** before receivables, tax timing and reserves. At 40 inventory days, acquisition-only capital rises to about **₹86.7 lakh**.

For a smaller 150-unit/month operation at 20 days and ₹13,000 acquisition cost, acquisition inventory is approximately ₹13 lakh. This is why early scope and turnover matter.

All budgets below are **founder planning ranges**, not vendor quotations; geography, staffing and integrations can change them materially.

| Technology stage | Time assumption | One-time/cumulative build budget |
|---|---|---:|
| Concierge proof with basic storefront and manual operations | 4–8 weeks | ₹3–8 lakh |
| Custom website MVP serving Indore, Ujjain and Dewas, with staff web workflows | 4–6 months | ₹25–50 lakh cumulative |
| Further website automation and partner expansion | After pilot evidence | Separately estimated; outside current launch budget |

Illustrative MVP basis: five full-time-equivalent delivery roles × five months × ₹0.8–1.4 lakh fully loaded monthly = ₹20–35 lakh; design/security/integration/contingency allowance brings planning envelope to ₹25–50 lakh. This is a staffing arithmetic model, not a salary survey or minimum required spend. The previous MVP estimate already covered customer web and staff workflows, so removing future apps does not automatically reduce this estimate. A narrower manually operated website can use the concierge-stage budget; confirm actual staffing and features before committing spend.

| Custom-MVP plus pilot cash envelope | Planning amount |
|---|---:|
| MVP technology build | ₹25–50 lakh |
| Initial rotating device/parts capital | ₹15–35 lakh |
| Hub tools, setup and deposits | ₹5–12 lakh |
| Pilot acquisition experiments | ₹3–8 lakh |
| Six months post-build fixed operations reserve | ₹24–48 lakh |
| Additional contingency/liquidity reserve | ₹8–15 lakh |
| **Illustrative total** | **₹80 lakh–₹1.68 crore** |

This envelope is a conservative custom-platform scenario for a limited pilot, not a minimum launch requirement or a plan for 500 monthly owned-inventory sales. Volumes and stock are combined across Indore, Ujjain and Dewas, not multiplied by three. Route costs, staffing and facilities require local quotations. At higher throughput, recalculate capital using the formula above. The operations reserve is after the build period; ongoing technology maintenance must be allocated explicitly. Acquisition marketing in unit economics consumes the marketing budget; avoid treating it as a second unmodelled expense. Supplier credit, consignment and smaller inventory can reduce cash need but do not remove operational cost.

National parity requires a separately costed multi-year programme. A credible national funding number cannot be derived from public pages alone.

## 22. Team and delivery plan

Initial delivery responsibilities: product/operations owner; technical lead/backend; customer web engineer; staff workflow/full-stack engineer; QA; fractional design, infrastructure/security and accounting/legal expertise. Some roles can be combined, but quote controls, inventory integrity and payments still need independent review.

Pilot operations: hub manager, qualified technicians, pickup capacity, customer support and daily financial reconciliation. Outsourcing a function changes its contractual and quality controls; it does not make the responsibility disappear.

| Phase | Window from start | Deliverable and exit gate |
|---|---|---|
| Discovery | Weeks 1–3 | Interviews across the three confirmed cities, local dealer/repair quotes, serviceable PIN codes and route economics |
| Concierge pilot setup | Weeks 4–8 | Basic booking/catalogue, manual controlled inspection, lawful payments and written policies |
| Core platform | Weeks 4–16, overlapping | Quotes, pickup, inventory, retail, payments, support, audit |
| Controlled launch | Weeks 17–24 | Website service in all three cities within validated PIN codes; 100–300 combined transactions, reconciled cash and serialised stock |
| Operational refinement | Months 6–9 | Better grading, claim handling, partner exits, repair/parts analytics |
| Expansion | Months 9–15 | Expand coverage or categories only after mature evidence; native apps remain outside current scope |

A 90-day plan can establish the foundations and a limited pilot; it should not be sold as full national Cashify parity. Warranty performance needs enough elapsed time to observe claims beyond the initial return window.

## 23. Proposed validation targets

Targets below are launch hypotheses, not industry standards. Review after the first 100 transactions and adjust with evidence.

| Metric | Proposed target / definition |
|---|---|
| Acquisition completion | Track paid acquisitions ÷ qualified pickup bookings |
| Quote stability | For correctly disclosed condition, at least 90% within 5% of initial estimate |
| Deduction evidence | 100% of reductions have reason and customer-visible supporting record |
| Payout reliability | At least 95% within promised time; every exception reconciled |
| On-time pickup | At least 90% within agreed slot |
| QC/erasure coverage | 100% of retail units pass release requirements |
| Unit contribution | Positive after marketing and cohort-adjusted claim reserves |
| Inventory days | Target ≤25 days; separate aged/unsellable stock |
| Return rate | Track by cause; investigate above assumed 10% |
| Warranty loss | Measure incurred plus expected outstanding cost by sale cohort |
| Inventory reconciliation | Every unit has owner, location and status; investigate any unexplained variance |
| Acquisition cost | Cohort/channel cost per completed acquisition and per net retained sale |

Expansion requires several consecutive cohorts with positive contribution, stable quality and predictable service. Early positive cash collections are not proof of profit while return/warranty obligations remain outstanding.

## 24. Go-to-market proposal

The launch cities are confirmed: **Indore, Ujjain and Dewas**. Use one website, a shared catalogue and separate serviceability/slot configuration for each city. An Indore hub with scheduled routes to Ujjain and Dewas is a proposed operating arrangement, not a confirmed facility or claim about local logistics costs. Validate it against the founder's existing resources and written partner quotations. Accept bookings only for supported PIN codes and available slots; launch coverage in all three cities does not mean every address is serviceable.

Start with local intent search pages, opted-in referrals, local retail partnerships and housing/office community pilots. Publish original condition guides and real inventory. Reward referrals after settled transactions and applicable cancellation windows; avoid incentives for fabricated reviews.

Test messages around predictable final value, documented device quality and claim support. Measure cost per completed, retained transaction rather than lead volume. Publish serviceable PIN codes honestly. Earn corporate supply relationships after demonstrating custody and erasure evidence.

Avoid permanent highest-buy-price/lowest-sell-price promises. Price leadership on both sides can destroy contribution. A trustworthy, fairly priced transaction can be a stronger proposition.

## 25. Risk register and stop conditions

| Risk | Control | Expansion stop condition |
|---|---|---|
| Wrong valuation | Quote versioning, evidence, dealer exit prices | Repeated negative model-level contribution |
| Hidden defects | Independent QC and cohort reserves | Unexplained return/warranty spike |
| Stolen/locked device | Ownership checks, identifiers, quarantine | Unresolved legal/ownership exceptions |
| Duplicate payout | Idempotency and reconciliation | Unreconciled financial balances |
| Inventory ageing | Weekly markdown/wholesale decisions | Capital trapped beyond approved ageing limit |
| Poor partner behaviour | Contracts, auditing, scoped access | Persistent SLA or deduction disputes |
| Data exposure | Erasure verification, access restrictions | Missing erasure evidence or security incident |
| Parts inconsistency | Supplier tracing and failure metrics | Unacceptable repeat failures |
| Over-expansion | City/category contribution gates | Service decline or liquidity shortfall |
| Fragile external data | Own history and licensed feeds | Pricing depends on unavailable competitor source |

## 26. Validation before committing expansion capital

The following requires real-world evidence; research cannot honestly mark it complete:

1. Obtain written buy/sell bids for at least 30 representative model/condition combinations.
2. Inspect real units with two technicians and measure grading agreement.
3. Collect parts, diagnostics, erasure, logistics, payments and insurance quotations.
4. Interview at least 10 recent sellers and 10 refurbished buyers; record opt-in findings without unnecessary identifiers.
5. Test payout failure, webhook duplication, wrong-unit return and activation-lock exception paths.
6. Validate pickup productivity, refurbishment yield, time-to-sale and actual refund costs.
7. Finalise legal model, tax treatment, policies and vendor contracts.
8. Recalculate cash runway under slower sales, higher claims and adverse price movement.

## 27. Final recommendation

Proceed with a **website-only, smartphone-first alternative in Indore, Ujjain and Dewas**, using an original brand and controlled operations. Build the full trust chain: explainable quote, verified acquisition, documented refurbishment, unit-level sale and accountable support. Add website automation where pilot data demonstrates value; no native app build is planned.

**Software feasibility is high. Commercial viability remains conditional on sourcing, quality, contribution margin and working capital.** Matching Cashify's visible features is achievable in stages; outperforming it requires consistent results on the transactions that matter most to customers.

## 28. Deliverables and reading order

- `Cashify-alternative-report.md`: full research and implementation blueprint.
- `Cashify-alternative-report.html`: standalone reading/printing edition with linked contents and a save-to-PDF print button.
- `data/`: bounded public extraction with URLs, actual timestamps and retrieval outcomes.
- `collect-public-data.ps1`: inspectable collection script, fixed 15-page scope.
- `research-notes.md`: collection interpretation and limitations.
- `unit-economics.csv`: base and sensitivity scenarios for spreadsheet use.
- `three-city-website-launch.md`: confirmed geographic/channel scope and practical website launch requirements.

Start with sections 1, 9, 20–22 and 27 for the investment/product decision; use sections 10–19 to turn the decision into implementation requirements.
