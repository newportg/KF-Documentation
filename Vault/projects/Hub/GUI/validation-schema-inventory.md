# Validation schema inventory

This document records the source mechanisms used to derive P2 field and
validation behavior. It is the bridge between Angular schema/configuration
code and a framework-neutral replacement schema.

## Schema shape

The GUI commonly defines a control schema with:

- control ID;
- form name;
- field name;
- translation key;
- control type;
- enum/resource provider;
- option list or lookup source;
- maximum length;
- minimum/maximum or greater-than rule;
- visibility/disabled conditions;
- list-empty and list-not-empty messages;
- mode-specific overrides.

The replacement should preserve these as data rather than copying Angular
component classes.

## Verified schema families

| Family | Source evidence | P2 behavior represented |
|---|---|---|
| Text and textarea | `ITextAreaEditControlSchema`, single-line/multi-line input templates | Field name, translation, maximum length, character count |
| Date and date range | `IDateEditControlSchema`, `IDateControlCustomSchema`, date-range controls | Parsing, display, range endpoints, date validation |
| Number and percentage | `INumberEditControlSchema`, `IPercentNumberEditControlSchema` | Numeric precision, percentage and range rules |
| Price and fee | `IPriceEditControlSchema`, `IPriceRangeControlSchema`, `IFeeEditControlSchema` | Currency, period, min/max, non-negative and fee rules |
| Enum/radio/combo | `IEnumItemEditControlSchema`, radio, combo schemas | Enum provider, configured options, empty-value behavior |
| Typeahead/resource | `ITypeaheadEditControlSchema`, resource selectors | Lookup source, search, selected identity, clear behavior |
| Relationships | company/contact lists, users, negotiators, parties | List-empty rules, add/remove, role-specific labels |
| Address/area | address schemas and `ISearchAreasSchema` | Country, address, hierarchy, map and location behavior |
| State change | `IStatusChangePanelControlSchema` and state validation services | Candidate state, required panel, confirmation, server validation |
| Attachments/documents | attachment upload/filter schemas and document panels | File type, upload state, row errors, visibility |

## Domain schema coverage

## Concrete source-derived constraints

The following rules are confirmed directly in the source schema/configuration
layer and can be copied into a replacement contract without relying on a
screenshot:

| Domain/control family | Confirmed rule |
|---|---|
| Activity text controls | Multiple source-description, comment, marketing, and terms fields use `maxLength: 4000`; short identifiers and references include `maxLength: 128` and `maxLength: 8` variants |
| Activity prices/rents | Price and range controls use configured currency/period units; agreed rent per unit includes `greaterOrEqualThan: 0.1` |
| Activity defaults | Agency type and available date can be initialized from configuration `defaultValue` values |
| Activity marketing | Marketing schemas include explicit limits such as 200, 400, 4000, and 25000 characters depending on the field |
| Requirement descriptions | Source and requirement description areas are schema/configuration driven and use character counters; applicability changes by requirement mode |
| Tenancy comments | Lease comments and fall-through reason are explicitly capped at 4000 characters |
| Tenancy rent | Agreed-rent-per-unit uses configured measurement units and a positive lower bound |
| Relationship lists | Empty/list-not-empty messages and add-button visibility are part of the schema; for example, tenancy landlord add behavior changes when an activity exists |
| Requirement applicants | Applicant selection prevents duplicate contact/company/address combinations and changes behavior for residential requirements |
| Conditional flags | NDA selection reveals NDA expiry; CDD, portal visibility, confidentiality, auto-match, and related flags are context-dependent |

### Activity

`IActivityAddEditCommonSchema` is a large shared schema covering activity
source/status/type, prices and rents, dates, fees, departments, agents,
vendors, tenants, landlords, property type, marketing, visibility, NDA,
condition, area, lease, and status-change controls. This schema is reused
across activity subtypes and is further specialized by service line and
activity type.

### Requirement

`RequirementAddEditComponent` uses a generated requirement schema plus:

- contact/company/company-contact applicant selectors;
- duplicate-address prevention;
- residential versus non-residential page-column modes;
- CDD and portal-visibility rules;
- fee-split validation and calculators;
- instruction synchronization;
- server-backed state validation.

Textarea limits and field applicability are schema/configuration driven rather
than safely inferable from the presence of a template element alone.

### Tenancy

`ITenancyEditSchema` covers parties, lease dates, agreed rent, fees, deposits,
management, progression, reviews, right-to-rent, licensing/HMO, renewal,
paperwork, keys, notes, and visibility. `getTenancyEditSchema` changes labels,
empty-list messages, and behavior using commercial, activity, agreement-type,
lease-advisory, and managed flags.

The source explicitly demonstrates conditional schema generation, so a
replacement must evaluate the same context before rendering or validating a
field.

### Shared controls

The common source contains dedicated schemas/configuration for:

- search status and status dates;
- price/rent ranges;
- periods and period ranges;
- area breakdowns;
- fee splits;
- departments and users;
- typeahead and tags;
- contacts, companies, properties, requirements, and matches;
- appointments, attendees, email, text, notes, and attachments.

## Validation authority

| Rule type | Primary authority |
|---|---|
| Field shape and obvious client constraints | Angular control/schema |
| Configuration-driven visibility/options | Runtime metadata/configuration |
| Cross-field and relationship rules | Angular helper/service plus server |
| State-transition prerequisites | Server `stateValidate` response |
| Authorization and record/version rules | Server |
| Integration/document outcomes | Server/integration response |

## Extraction completion criteria

P2 is complete only when each page contract has a field table containing:

1. field/control ID;
2. user-facing translation key/label;
3. value type and display format;
4. default;
5. visibility condition;
6. enabled/read-only condition;
7. required condition;
8. client validators and messages;
9. server/API validation;
10. role/service-line/context dependencies.

## Source evidence

Representative sources include:

- `src/app/activity/activity-add-edit-common/activity-add-edit-common.schema.ts`;
- `src/app/requirement/requirement-add-edit/requirement-add-edit.component.ts`;
- `src/app/tenancy/tenancy-edit/tenancy-edit.schema.ts`;
- `src/app/common/attributes/`;
- `src/app/common/components/questionnaire/input-templates/`;
- `src/app/common/helpers/`;
- generated services under `src/app/autogenerated/api/`.
