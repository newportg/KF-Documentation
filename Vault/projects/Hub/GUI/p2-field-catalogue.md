# P2 field catalogue

This is the source-derived field catalogue for the replacement. Angular
schema objects are treated as field metadata, not as implementation details.
Where a value is supplied by runtime configuration or the API, the catalogue
records that dependency rather than inventing a static value.

## Field metadata contract

Each field is represented by:

```text
id
form
field
control
translation
value type
lookup/enum source
default
visible when
enabled when
required when
client validation
server validation
role/context dependency
```

## Complete source schema families

### Activity

The shared activity schema contains the following field families:

- source, disposal type, status, status panel, selling reason;
- source description, key number, extranet, pitching threats, access
  arrangements, comments, letting comments, transaction explanation;
- valuation, agreed price, quoted price, capital value, rates, rent,
  service-charge, ground-rent, parking, purchase-cost, discount, yield, and
  fee fields;
- heads-of-terms, surrender, anticipated exchange/completion, instructed,
  marketed, income, last refurbishment, lease commencement/expiry,
  regear, advice, break, and completion dates;
- agency, grade, lease, build, furnishing, condition, service-line, sale
  type, occupational profile, purpose, asset type, and activity type;
- agents, sub-agents, vendors, tenants, purchasers, purchaser agents,
  landlords, developer, development manager, referrals, introducers,
  departments, and responsible users;
- property type, area, land area, floor/area breakdown, search areas,
  shared facilities, key holder, alarms, HMO, serviced property, and
  property details;
- visibility, confidentiality, NDA/expiry, matching, resale, pipeline,
  auto-match, publication, marketing, and portal controls;
- commercial space, unit mix, gearing, WAULT, lease terms, disregards,
  rent-free periods, equivalent yields, and head-lease fields.

Canonical source: `src/app/activity/activity-add-edit-common/`
`activity-add-edit-common.schema.ts`, plus service-line schemas and activity
view/marketing schemas.

### Requirement

The requirement schema explicitly includes:

- requirement type, referral, description, responsible for deal, selling
  property;
- rent, price, budget, yield, timing, lease length, tenure, furnishing,
  property type, characteristics, sector, nationality, and tenant type;
- source, source description, buying reason, current situation, move reason,
  move description, best property seen, current position/location, and project;
- hotness, potential client, selling/buying position/status, selling agent,
  financial-services status, new build, deal structures, single-let,
  Sharia, mortgage, and matching flags;
- agent, sub-agent, applicants, representatives, relocation agent,
  postcodes, cities, countries, map shapes, search areas, and addresses;
- currency, visibility, confidentiality, NDA/expiry, fee, fee comment,
  introducers, responsible administration, CDD team/status/action;
- requirement status and status-validation panel.

Canonical source: `src/app/requirement/requirement-add-edit/`
`requirement-add-edit.schema.ts`, the component, helpers, and status modal.

### Tenancy

The tenancy schema explicitly includes:

- agency, currency, deposit, holding deposit, confidentiality, inactive,
  fallen-through, lease-advisory, NDA, represented, visibility;
- sign-off manager, progressor, financial negotiator, safety consultant,
  property manager, and EOT coordinator;
- agents, sub-agents, tenants, landlords, introducers, and head lease;
- repairing obligation, alienation provision, inside-act, agreement type,
  management type, churn risk, information quality, and renewal options;
- comments, fall-through, key-holder, inventory/check-in, safety,
  agreement, progression, special-rent, special-terms, source, and
  important-information notes;
- search areas, agreed rent, rent period/frequency, lease dates, duration,
  completion, area breakdown, property-size range, parking, keys, and
  authorisation;
- fee splits, management/renewal fees, landlord/tenant fees, credit
  reference, TDS administration, right-to-rent, inventory, ad-hoc and bank
  charges;
- furnishing, pets, referencing, right-to-rent, payments, check-in
  inventory, future-plan fields, and CDD document visibility.

Canonical source: `src/app/tenancy/tenancy-edit/tenancy-edit.schema.ts` and
the tenancy progression, renewal, termination, review, and paperwork schemas.

### Contact, company, property, offer, instruction, pitch, referral,
marketing-list, administration, configuration

These domains use the same shared schema families and page-specific
configuration:

- text/textarea;
- date/date range;
- number/percentage;
- price/fee/period/range;
- enum/radio/combo;
- typeahead/resource selector;
- address/area/map;
- users/departments/negotiators;
- contact/company/property/requirement/activity relationships;
- status/state-change;
- attachment/document/portal visibility;
- notes, communications, appointments, and attendees.

The page contracts identify the fields and sections, while the shared control
schemas define their type, lookup, validation, and event contract.

## Conditional rules

The source-derived conditions include:

- NDA expiry only when NDA is selected;
- CDD fields only in applicable update/role/configuration contexts;
- commercial/residential requirement fields change by requirement type;
- tenancy labels and relationship behavior change by commercial,
  agreement-type, lease-advisory, managed, and activity context;
- activity controls change by service line, activity type, agency, asset type,
  and status;
- property controls change by agency type, division, property type, and
  configured feature sections;
- relationship add buttons can be hidden when an existing activity or
  workflow state makes the relationship immutable;
- status panels and required fields are determined by server state validation.

## Validation catalogue

- Text controls enforce schema maximum lengths and preserve character counts.
- Numeric/price controls enforce configured precision, units, and lower/
  upper bounds.
- Date controls enforce parsing and configured range/order rules.
- Relationship lists enforce duplicate and list-empty rules.
- Fee splits use shared validation helpers and calculators.
- Address changes can trigger country and contact/address validation.
- Important state changes call server validation before confirmation/submission.
- Save failures preserve user input and dirty state.

## P2 completion boundary

P2 is complete from the available source evidence when the replacement uses
this catalogue plus runtime schema/configuration and API edit-data responses.
Runtime values are not omitted; they are explicitly modelled as dependencies.
P2 does not require the replacement to hard-code values that the current
application intentionally obtains at runtime.

## Source evidence

Primary sources are the page schema/config files under `src/app/`, shared
control schemas under `src/app/common/attributes/` and
`src/app/common/components/`, validation helpers under
`src/app/common/helpers/`, and generated API services under
`src/app/autogenerated/api/`.
