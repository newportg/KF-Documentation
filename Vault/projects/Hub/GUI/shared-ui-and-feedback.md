# Shared UI and feedback

## Layout vocabulary

The GUI uses a consistent vocabulary of reusable interaction surfaces:

- page-level search and edit screens;
- cards and information boxes for summaries;
- tabs and collapsible sections for dense records;
- side panels and preview panels for related or lightweight views;
- modal dialogs for focused commands and confirmation;
- grids and paginators for result sets;
- context menus and action buttons for record commands;
- toast notifications for command outcomes;
- busy containers and progress indicators during loading;
- attachment pickers and file-drop upload areas;
- map and address controls for location data.

The replacement should preserve the information hierarchy and task sequence,
not necessarily the current component names.

## Reusable controls

Source feature areas show reusable controls for:

- addresses, maps, phone numbers, emails, dates, date ranges, numbers, prices,
  rich text, checkboxes, radio buttons, toggles, and enum selections;
- typeahead and searchable resource selectors;
- users, departments, companies, contacts, properties, requirements, and
  activities;
- notes, alerts, consent, CDD validity, ownership, fee splits, invoices, and
  lease details;
- attachments, document previews, WOPI, generated documents, watermarks, and
  portal visibility;
- appointments, attendees, viewing tours, emails, text messages, and
  notifications;
- search results tables, maps, pagination, columns, sorting, and export.

## Form conventions

The implemented forms use the following observable conventions:

- fields use a filled appearance with labels that remain visible;
- required markers are hidden in favor of validation behavior;
- form-field supporting text sizes dynamically;
- pagination hides the page-size selector by default;
- select controls use delayed typeahead filtering;
- tabs are not stretched to fill the whole width;
- destructive or irreversible commands generally require confirmation;
- field validation includes required fields, maximum lengths, non-negative
  amounts, positive minimum rents, and date-range rules where relevant.

## Loading and empty states

Screens load configuration and related data before rendering when the data is
required to form the page. During asynchronous work the UI uses busy
containers, progress indicators, or disabled command states. Search and
relationship panels must distinguish:

- not yet searched;
- loading;
- successful search with zero results;
- successful search with results;
- failed request.

This distinction is important for a replacement because an empty result is not
the same as an unavailable service.

## Unsaved changes and navigation

Unsaved-change protection is implemented, but it is not a global rule for
every form:

- selected edit and administration routes use a navigation-block guard;
- a blocked route opens a confirmation modal before navigation;
- browser-level navigation also registers a `beforeunload` handler;
- confirming the discard unblocks navigation and clears the browser handler;
- the quick-create, activity add/edit/view, instruction, and selected
  administration flows are among the routes using this behavior;
- other forms must be checked individually rather than assumed to have the
  same protection.

The replacement should make the scope of draft protection explicit and should
not silently lose edits when a user changes route, closes a panel, or leaves
the browser.

## Errors and notifications

Shared HTTP behavior handles XSS-related processing, API errors, date
conversion, and proxy-user context. API errors are surfaced through common
feedback rather than silently converted into successful results.

The current global HTTP outcomes are:

| Response | Current GUI outcome |
|---|---|
| `400` | GET responses may show formatted API errors; some legacy branches remain migration TODOs |
| `401` | The interceptor contains a migration TODO; a definitive current redirect is not evidenced here |
| `403` | Navigate to the no-access screen |
| `404` | Navigate to the not-found screen |
| `405` | The interceptor contains a migration TODO |
| `408` | Show the shared HTTP response error |
| `503` | Reload the application to display the offline state |
| `500-599` | Show the shared HTTP response error |

Successful responses can also carry `X-ErrorMessages` and
`X-WarningMessages` headers, which are queued for shared display. This means
the replacement API contract must support both HTTP failures and successful
responses containing user-visible warnings.

Toasts are positioned at the top center, prevent duplicates, include a close
button, and remain available long enough for the user to read them. The
top-bar bell distinguishes unread and read notification states and displays an
unread count.

## Responsive and browser behavior

The main menu observes small and extra-small breakpoints and switches to mobile
mode. The shell also displays a browser compatibility message when the current
browser is not Chrome. The pre-production site is reported to work in Edge
while exhibiting issues in Chrome, so the source preference and deployed
behavior require reconciliation before choosing the replacement's browser
support target. Detailed responsive breakpoints, field ordering, and
screen-specific layout behavior still require visual review of the templates
and styles.

The complete framework-neutral responsive contract is recorded in
[`p3-visual-contract.md`](./p3-visual-contract.md). Rendered breakpoint
captures and pixel tuning remain P4 verification work.

## Route reuse and refresh behavior

The current GUI does not always recreate a screen when navigation changes. A
custom route-reuse policy can preserve the current component or reset it based
on:

- the route's reset mode;
- empty query parameters;
- any route-parameter change.

Replacement screens should define when filters, selected tabs, scroll
position, and unsaved form state are retained versus reloaded.

## Accessibility evidence and limits

The source includes accessible behavior in places, including hidden decorative
icons, material labels, close-button labels, and keyboard-oriented controls
such as autocomplete. However, the source review does not establish complete
keyboard traversal, focus order, screen-reader announcements, contrast,
touch-target, or error-announcement compliance for the whole application.
Accessibility remains a validation activity, not a resolved behavior.

## Localization and configuration

Labels and messages are translation-key based. Runtime configuration supplies
the API root and other application settings. A replacement should separate
display text, runtime configuration, and business data so that translations
and environment-specific settings remain changeable.

## Evidence

The shared behavior is evidenced by `src/app/app.module.ts`,
`src/app/layout/`, `src/app/common/`, shared component templates and styles,
and the existing [Angular GUI analysis](../Architecture%20%26%20Infrastructure/angular-gui-analysis.md).
