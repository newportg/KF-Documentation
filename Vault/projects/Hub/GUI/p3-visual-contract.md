# P3 visual and layout contract

P3 defines the visual contract for a framework-neutral replacement. It
captures layout, sizing, styling, responsive behavior, and feedback states. It
does not claim pixel-for-pixel equality with a replacement that does not yet
exist; that comparison is P4.

## Shell contract

| Region | Contract |
|---|---|
| Navigation | Dark left rail; expanded width `240px`; collapsed width `68px`; full viewport height; vertical scrolling |
| Navigation transition | `0.3s ease-in-out` width/appearance transition; menu-item color transition `0.2s ease` |
| Toolbar | Above page content; z-index `1000`; contains mark, environment, title, browser notice, notifications, help, user/database context, and profile |
| Menu stacking | Navigation z-index `200` |
| Content | Flex column using the remaining viewport width; page body owns its scroll region |
| Page padding | `p-4` convention for page and section content |
| Forms | Bordered rounded cards, pale backgrounds, compact persistent labels, grouped sections |
| Actions | Sticky page footer where save/cancel must remain available |
| Tables | Full available width; intrinsic width may exceed the viewport; horizontal overflow is preserved |
| Toasts | Top-centred, dismissible, de-duplicated, readable long enough to act |

## Visual tokens

| Token | Contract |
|---|---|
| Primary action | Dark pink/red accent used for search, actions, links, and selected states |
| Navigation | Dark neutral background with light text/icons |
| Dashboard widget headers | Domain-specific blue, lime, teal, purple, orange, olive, and black accents |
| Entity accents | Entity colour classes, including contact, property, and requirement |
| Typography | Compact application density; labels remain visible above/within filled controls |
| Panels | Rounded bordered cards with section and subsection hierarchy |
| Tables | Compact rows, inline contact markers, row actions, sorting/grouping affordances, and bottom-right pagination |
| Selection | Clear selected-row, selected-tab, active-filter, and checked-control states |
| Status | Inactive, locked, warning, error, and permission states must not rely on colour alone |

## Page-family layouts

| Page family | Wide desktop layout | Responsive rule |
|---|---|---|
| Dashboard | Multi-column widget work surface with calendar, tasks, notifications, and marketing panels | Collapse widget columns in source order; preserve widget headers and internal scrolling |
| Search/list | Search criteria and scope controls above a wide table or cards; active-filter chips remain visible | Preserve all columns through horizontal scrolling; stack filter controls before results |
| Saved searches | Search/saved-search controls with a list of saved definitions | Stack controls and retain row actions |
| Reports | Left report-type list and right report selector with internal list scrolling | Left list becomes a preceding selector; report content remains independently scrollable |
| Create/edit form | One-to-three responsive columns, grouped cards, relationship panels, map/address controls, sticky footer | Collapse columns in DOM order; keep primary actions reachable |
| Detail/view | Record header, previous/next navigation, tabs, permission banner where applicable, card sections, related data, and map | Tabs may scroll horizontally; cards stack; map retains a usable minimum height |
| Property/assets | Search/list/map choices with image-bearing result rows and status badges | Map/list controls remain available; cards stack before map |
| Activity/requirement/tenancy | Dense workflow forms with state panels, related parties, fees, dates, and status commands | Preserve state-command order and make dense sections independently scrollable |

## Feedback-state contract

Every asynchronous page or panel distinguishes these states:

1. not started;
2. loading/busy;
3. successful with no results;
4. successful with results;
5. warning or partial result;
6. failed request;
7. permission denied;
8. stale/unsaved state where navigation requires confirmation.

The visual treatment is:

- loading: busy container, spinner/progress indicator, and disabled conflicting
  commands;
- empty: explicit empty copy and a next action, not a blank table;
- warning: shared warning toast/banner while retaining successful data;
- error: shared error feedback or route outcome, with the failed command
  remaining identifiable;
- no access/not found: dedicated route screens;
- unsaved changes: confirmation modal plus browser unload protection on guarded
  routes;
- success: shared toast/notification and refresh of the affected record or
  projection.

## Responsive contract

The shell switches the navigation into mobile mode at the existing small and
extra-small breakpoints. Page templates use Bootstrap-style `row`,
`col-md-*`, and `col-lg-*` behavior. A replacement must therefore:

- collapse columns in document order;
- preserve minimum usable widths for controls;
- allow table and report-list horizontal scrolling;
- retain sticky save/cancel actions;
- keep modal, side-panel, map, gallery, and upload surfaces usable;
- preserve focus and keyboard order when columns collapse.

The exact breakpoint values remain implementation tokens to be copied from the
source stylesheet; they are not product decisions to be invented.

## Evidence coverage

The supplied wide-desktop captures establish the following P3 evidence:

| Surface | Evidence |
|---|---|
| Dashboard | Dashboard capture |
| Contact | Search, create, and reports captures |
| Company | Search and create captures |
| Property | Search capture |
| Activity | Search, saved-search, view, and reports captures |
| Requirement | Search, create, saved-search, and reports captures |
| Tenancy | Search, saved-search, and reports captures |
| Instruction | Search and create captures |
| Pitch | Search and create captures |
| Marketing list | Search and create captures |
| Connexions | Search and create captures |
| Shared report selector | Reports captures across domains |
| Shared shell/table/form conventions | All supplied captures plus source styles |

## P3 boundary

P3 is complete as a framework-neutral visual specification. The following are
P4 activities, not missing P3 contract data:

- rendered comparison against a replacement implementation;
- pixel-diff tuning at the canonical viewport;
- browser/device screenshots for responsive breakpoints;
- hover/focus/validation/modal/loading/empty captures;
- role-specific screenshots and populated report output;
- accessibility and touch-target testing.

## Source evidence

The contract is derived from the supplied captures, `layout-and-sizing.md`,
`shared-ui-and-feedback.md`, shared and feature `.html`/`.scss` files, and the
page contracts in `pages/`.
