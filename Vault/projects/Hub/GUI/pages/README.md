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

## Page specification status

| Area | P0 route | P1 structure | P2 field/validation | P3 sizing/visual | P4 rendered comparison |
|---|---:|---:|---:|---:|---:|
| Dashboard | Yes | Partial | Partial | Pending | Pending |
| Contact | Yes | Yes | In progress | Pending | Pending |
| Company | Yes | Partial | Pending | Pending | Pending |
| Property/assets | Yes | Yes | In progress | Pending | Pending |
| Activity | Yes | Yes | In progress | Pending | Pending |
| Requirement | Yes | Yes | In progress | Pending | Pending |
| Tenancy | Yes | Yes | In progress | Pending | Pending |
| Offer | Yes | Partial | Pending | Pending | Pending |
| Instruction/pitch/referral | Yes | Partial | Pending | Pending | Pending |
| Marketing lists | Yes | Partial | Pending | Pending | Pending |
| Reports | Yes | Partial | Pending | Pending | Pending |
| Administration/configuration | Yes | Partial | Pending | Pending | Pending |

`Pending` means the source has not yet been converted into a stable vault
contract. It does not mean that the source feature is absent.

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
