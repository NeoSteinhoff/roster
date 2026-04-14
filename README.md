# Roster

Roster is a dark, local-first friend CRM for keeping relationships intentional.

It includes:
- tiered relationship tracking
- custom groups and tags
- meeting briefs and quick capture
- local reminder digests with birthdays and this-week queue
- memory timeline and readable JSON export/import
- CSV import from contacts and other CRMs with field mapping review
- activity import review for calendar and communication exports
- archive instead of delete
- compact and full views
- full profile view with contact card, socials, related people, and avatar support
- keyboard shortcuts and motion-focused desktop UI
- public marketing site and pricing page
- Stripe-ready hosted billing links for Pro plans

## Run locally

```bash
cd /Users/neosteinhoff/Documents/roster
npm install
npm start
```

For the public website + pricing pages:

```bash
cd /Users/neosteinhoff/Documents/roster
python3 -m http.server 4173
```

Then open:
- [http://127.0.0.1:4173/](http://127.0.0.1:4173/) for the marketing site
- [http://127.0.0.1:4173/pricing.html](http://127.0.0.1:4173/pricing.html) for pricing
- [http://127.0.0.1:4173/app.html](http://127.0.0.1:4173/app.html) for the product app

## Package the Mac app

```bash
cd /Users/neosteinhoff/Documents/roster
npm run package:mac
```

The packaged app lands in:

`/Users/neosteinhoff/Documents/roster/artifacts/dist/Roster-darwin-arm64/Roster.app`

## Stripe billing setup

The pricing page uses Stripe-hosted checkout links from:

`/Users/neosteinhoff/Documents/roster/billing-config.js`

Update:
- `proMonthly.href`
- `proYearly.href`
- `portalUrl`

Recommended setup:
- create a monthly Stripe subscription payment link
- create a yearly Stripe subscription payment link
- optionally create a Stripe customer portal link

The site will automatically route pricing buttons to those hosted Stripe links.
If they are still blank, the pricing page falls back to your contact email so interested users are not dropped into a dead checkout.

## Data model

Roster stores:
- tiers
- groups
- tags
- bond health
- connection cadence
- notes and memories
- socials and contact details
- related people links
- profile photos

The JSON memory file is designed to stay readable and editable by humans.

## Current version

`v0.9.3`
