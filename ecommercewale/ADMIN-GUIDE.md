# Managing your website

Open `/admin.html`. In the local preview use **Explore demo workspace**. This saves edits in this browser only. For changes shared with all customers, run `database/schema.sql` in Supabase and configure the server variables described in README.md. If a database already exists, run `database/inventory-upgrade.sql` before deploying this update.

## Products and prices

In Products choose Add product or Edit. You control the selling price, reference price, base buyback estimate, storage, colour, grade, description and visibility. The buyback value is the base for the existing condition deductions, not a guaranteed final purchase offer.

Set Available units to the number you can supply. Zero blocks additions to the enquiry bag and the server rejects purchase enquiries for sold-out devices. Existing live listings default to zero until you enter stock. This is an enquiry flow: submitting an enquiry does not reserve or deduct stock. Update stock yourself after confirming a sale.

Enter your inventory SKU, battery findings, warranty disclosure, included accessories and inspection report. Describe scratches, replaced parts, functional checks and known faults honestly. These disclosures appear in the customer product details. No inspection certification is generated automatically.

Keep Demo listing checked for examples. For real inventory uncheck it, enable visibility and supply the correct price and stock. Images remain illustrations; actual device photography and image uploads are not included in this upgrade.

## Requests and coverage

Requests lets you search by customer/reference, filter by city, update status and export CSV. Customers can use the existing reference and mobile-number lookup to track live requests. Preferred pickup times need manual confirmation.

Coverage controls enabled PIN codes for Indore, Ujjain and Dewas. Only enable locations your team can serve.

SMS, mail and payments remain deferred. Live database credentials and approved business policies are required before launch. Do not enter secret keys into the browser or commit them to GitHub.
