# Property and asset pages

## Routes and entry points

- `/property/check` — pre-create checks.
- `/property/search` — property search.
- Property add/edit — create or update.
- Property view — profile and related records.
- Related hierarchy pages cover development, building, estate, phase, and
  portfolio records.

## Search page

The property search provides criteria, paged results, result navigation,
optional map/location behavior, and property preview/detail entry. The menu
also exposes recent properties.

## Add/edit page

The complete first-pass form contract is in
[core form specifications](./core-form-specifications.md#property-addedit).

### Header

- Page title changes between Add Property and Edit Property.
- Reference code is displayed.
- Agency type and property type are inline controls.
- Property type changes may require confirmation.
- Division-switch buttons appear when enabled.
- Address-readonly alert appears when the context prevents address editing.

### Main regions

- Location/address and alternative-address controls.
- Address verification and map.
- Property management.
- Commercial area/floor breakdown.
- Building breakdown on update.
- Development, building, and estate relationship cards.
- Dynamic property attributes.
- Material information accordion.
- Commercial accreditation and ESG accordion.
- Estate property list.
- Developer and manager selectors.
- Agent/company-contact selectors.
- Sticky Cancel and Save footer.

### Conditional behavior

- Configuration controls which sections exist.
- Commercial mode enables area, accreditation, and ESG behavior.
- Property type controls which attributes and child relationships are valid.
- Address country changes trigger validation and map behavior.
- Required sections are marked from runtime configuration.

## View page

The property view combines summary, address/map, hierarchy, ownership,
activities, attachments, marketing/publication, units, tenancies, and related
records. Child pages preserve the selected property context.

## Validation and navigation

- Property add/edit is protected by dirty-navigation handling.
- Shared form validation runs before `preSave`.
- Address, property-type, country, hierarchy, and attribute validation can
  prevent save.
- Property view resets when its route parameter changes.

## Source evidence

`src/app/property/`, `src/app/development/`, `src/app/building/`,
`src/app/estate/`, `src/app/phase/`, `src/app/portfolio/`, and shared asset
controls.
