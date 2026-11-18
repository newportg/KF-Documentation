# Page parity specifications

This directory is the page-by-page specification for reproducing the current
Hub GUI. The page contracts are organized by user-facing domain rather than
Angular module.

## Current documents

| Document | Coverage |
|---|---|
| [Route inventory](./route-inventory.md) | Application routes, page families, and source entry points |
| [Core form specifications](./core-form-specifications.md) | First source-derived field and section pass for Contact, Property, Activity, Requirement, and Tenancy forms |
| [Dashboard](./dashboard.md) | Dashboard widgets, drill-downs, calendar, tasks, and notifications |
| [Contact](./contact.md) | Contact search, duplicate check, edit, view, and relationships |
| [Property](./property.md) | Property search, add/edit, hierarchy, attributes, and view |
| [Activity](./activity.md) | Activity search, context-sensitive forms, state changes, and view |
| [Requirement](./requirement.md) | Requirement search, form, matching, and progression |
| [Tenancy](./tenancy.md) | Tenancy search, form, progression, renewal, and view |
| [Company](./company.md) | Company search, create/edit, view, and related lists |
| [Offer](./offer.md) | Offer add/edit, view, preview, and status behavior |
| [Instruction, pitch, and referral](./instruction-pitch-referral.md) | Search, edit/view, and action-card workflows |
| [Marketing lists, reports, and administration](./marketing-reports-administration.md) | Marketing-list, report, administration, and configuration screens |
| [Property asset pages](./property-assets.md) | Development, building, estate, phase, and portfolio screens |
| [Quick create, preferences, and outcomes](./quick-create-preferences-outcomes.md) | Cross-domain creation, user preferences, and route outcomes |
| [Control catalogue](../control-catalogue.md) | Framework-neutral reusable control contracts |
| [Interaction and validation matrix](../interaction-validation-matrix.md) | Cross-domain lifecycle, validation, state, and feedback behavior |
| [P1 page-contract coverage](../p1-page-contract-coverage.md) | Coverage matrix for routed page responsibilities and interaction surfaces |
| [P2 field catalogue](../p2-field-catalogue.md) | Source-derived field families, conditions, and validation rules |

## Page specification status

| Area | P0 route | P1 structure | P2 field/validation | P3 sizing/visual | P4 rendered comparison |
|---|---:|---:|---:|---:|---:|
| Dashboard | Yes | Yes | Partial | In progress | Pending |
| Contact | Yes | Yes | Yes* | Pending | Pending |
| Company | Yes | Yes | Yes* | Pending | Pending |
| Property/assets | Yes | Yes | Yes* | Pending | Pending |
| Activity | Yes | Yes | Yes* | Pending | Pending |
| Requirement | Yes | Yes | Yes* | Pending | Pending |
| Tenancy | Yes | Yes | Yes* | Pending | Pending |
| Offer | Yes | Yes | Yes* | Pending | Pending |
| Instruction/pitch/referral | Yes | Yes | Yes* | Pending | Pending |
| Marketing lists | Yes | Yes | Yes* | Pending | Pending |
| Reports | Yes | Yes | Yes* | Pending | Pending |
| Administration/configuration | Yes | Yes | Yes* | Pending | Pending |
| Development/building/estate/phase/portfolio | Yes | Yes | Yes* | Pending | Pending |
| Quick create/preferences/outcomes | Yes | Yes | Yes* | Pending | Pending |

`Pending` means the source has not yet been converted into a stable vault
contract. It does not mean that the source feature is absent.

`Yes*` means the source-derived P2 contract is complete and runtime-provided
values are explicitly represented as configuration/API dependencies. It does
not claim that those runtime values are hard-coded into the vault.

## Required page document format

Every page document should use the following sections:

```text
# Page name
## Route and entry points
## Page regions and navigation
## Tabs, panels, dialogs, and child screens
## Fields and controls
## Defaults and conditional visibility
## Validation and error messages
## Commands and API operations
## Loading, empty, and refresh states
## Dirty navigation behavior
## Layout and responsive rules
## Source evidence
```

## Extraction rule

Field names and labels must be captured from the page template, component,
shared control configuration, translation key, and resolver/configuration
source. A field should not be documented as required merely because it appears
on screen; the requirement must be evidenced by configuration, validation code,
or server validation.
