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

## Errors and notifications

Shared HTTP behavior handles XSS-related processing, API errors, date
conversion, and proxy-user context. API errors are surfaced through common
feedback rather than silently converted into successful results.

Toasts are positioned at the top center, prevent duplicates, include a close
button, and remain available long enough for the user to read them. The
top-bar bell distinguishes unread and read notification states and displays an
unread count.

## Responsive and browser behavior

The main menu observes small and extra-small breakpoints and switches to mobile
mode. The shell also displays a browser compatibility message when the current
browser is not Chrome. Detailed responsive breakpoints, field ordering, and
screen-specific layout behavior still require visual review of the templates
and styles.

## Localization and configuration

Labels and messages are translation-key based. Runtime configuration supplies
the API root and other application settings. A replacement should separate
display text, runtime configuration, and business data so that translations
and environment-specific settings remain changeable.

## Evidence

The shared behavior is evidenced by `src/app/app.module.ts`,
`src/app/layout/`, `src/app/common/`, shared component templates and styles,
and the existing [Angular GUI analysis](../Architecture%20%26%20Infrastructure/angular-gui-analysis.md).
