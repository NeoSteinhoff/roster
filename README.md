# Roster

Roster is a dark, local-first friend CRM for keeping relationships intentional.

It includes:
- tiered relationship tracking
- custom groups and tags
- memory timeline and readable JSON export/import
- CSV import from contacts and other CRMs
- archive instead of delete
- compact and full views
- full profile view with contact card, socials, related people, and avatar support
- keyboard shortcuts and motion-focused desktop UI

## Run locally

```bash
cd /Users/neosteinhoff/Documents/roster
npm install
npm start
```

For the static web version already being served locally:

```bash
cd /Users/neosteinhoff/Documents/roster
python3 -m http.server 4173
```

Then open [http://127.0.0.1:4173/](http://127.0.0.1:4173/).

## Package the Mac app

```bash
cd /Users/neosteinhoff/Documents/roster
npm run package:mac
```

The packaged app lands in:

`/Users/neosteinhoff/Documents/roster/dist/Roster-darwin-arm64/Roster.app`

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

`v0.6.0`
