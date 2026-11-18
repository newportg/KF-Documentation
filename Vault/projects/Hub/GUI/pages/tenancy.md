# Tenancy pages

## Routes and entry points

- `/tenancy/search` — tenancy search.
- `/tenancy/savedSearches` — saved searches.
- Tenancy add/edit — create or update.
- Tenancy view — detail and progression.

The tenancy menu exposes Search, Saved Searches, and Reports.

## Search page

The tenancy search provides criteria, paging, result navigation, saved
searches, and entry to progression/detail workflows. Recent tenancies are
available from the tenancy navigation drawer.

## Add/edit page

The first-pass form structure is in
[core form specifications](./core-form-specifications.md#tenancy-edit).

### Sections and controls

- Sub-agent and basic information.
- Tenancy progression and fall-through.
- Licensing.
- Terms and lease details.
- Portal/rent warnings.
- Responsible-for-bills.
- Charges and bank charges.
- Financial progression, fee splits, and negotiator.
- Rent, initial rent, and area breakdown.
- Breaks and reviews.
- Parking, alarm, additional clauses, keys, and progression charges.

## View and progression

The tenancy view supports related parties, property/activity context,
progression, renewal, termination, compliance, appointments, paperwork,
attachments, emails, and integration operations.

## Validation and navigation

- Tenancy edit is protected by dirty-navigation handling.
- Lease dates and terms use shared lease-date controls.
- Financial and fee-split controls validate amounts and allocations.
- Progression and renewal actions can open focused panels or dialogs.
- Tenancy view resets when the route parameter changes.

## Source evidence

`src/app/tenancy/`, especially `search/`, `tenancy-edit/`,
`tenancy-view/`, `tenancy-progression/`, `tenancy-renewal-tds/`, and shared
appointment, attachment, paperwork, and lease controls.
