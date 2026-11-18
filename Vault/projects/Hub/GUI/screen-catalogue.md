# Screen catalogue

This catalogue describes the visible responsibilities of the GUI. A screen
may be composed of a route, tabs, panels, dialogs, grids, and related-record
components rather than a single page.

## Common screen families

| Family | User experience |
|---|---|
| Search/list | Enter criteria, run a paged query, inspect a grid/table, open a preview or detail view |
| Add/create | Select a creation context, enter a form, validate, save, and continue to the new record |
| Edit | Load existing data and lookups, change fields, validate, save, and refresh the record |
| View/profile | Show summary and detail information, then navigate related tabs and panels |
| Relationship panel | Query children using the parent identifier and create or update associations |
| Preview panel | Show a lightweight record view without leaving the current list or parent page |
| Modal/dialog | Complete a focused command such as confirmation, upload, selection, merge, or validation |
| Publication/marketing | Manage publication state, images, brochures, visibility, and marketing actions |
| Administration | Work with role-protected configuration lists and edit dialogs |

## Domain areas

### Dashboard

The dashboard is a configurable work surface. It contains widgets for
activities, requirements, tenancies, callbacks, CDD, marketing, instructions,
web enquiries, property visits, notifications, business generation, market
overview, and other operational areas. Widgets provide counters, lists,
calendar views, and drill-down actions. SignalR-backed notifications can update
the notification state.

### Contacts

Contact screens support search, create, edit, and profile views. A contact
profile brings together personal details, addresses, phones and emails,
activities, requirements, referrals, interests, negotiators, consent, notes,
communications, and related companies.

### Companies

Company screens support search, create, edit, and profile views. Company
profiles expose contacts, activities, requirements, instructions, ownership,
tenancies, interests, addresses, notes, and related property information.

### Properties and property hierarchy

Property screens cover search, create/edit, property checks, profile views,
ownership, activities, attachments, publication, marketing, and related
assets. Development, building, estate, phase, and portfolio areas provide
hierarchical or grouped property views:

- developments contain buildings and units;
- buildings expose units, ownership, activities, attachments, and property
  breakdown;
- estates and phases expose related property and activity management;
- portfolios coordinate properties and tenancies at portfolio level.

### Activities

Activity screens cover search, create/edit, preview, parties, terms and
conditions, publication, marketing assets, offers, requirements, matches,
viewings, appointments, referrals, and state changes. The edit experience
varies by service line and creation context, including activity creation from
properties, buildings, developments, estates, phases, portfolios, and other
records.

### Requirements and matching

Requirement screens support search, saved searches, create/edit, applicant
management, matching, viewing tours, progression, and instruction linkage.
Matching screens connect requirements to activities and allow users to
progress or arrange viewings.

### Offers

Offer screens support search, create/edit, preview, acceptance, rejection,
withdrawal, reservation-specific status handling, and linkage to an activity.
Offer forms calculate and validate price, area-based amounts, annual amounts,
and lease dates where applicable.

### Tenancies

Tenancy screens support search, view/edit, progression, renewal, termination,
deposit protection, paperwork upload, email upload, appointments, compliance,
and related parties. Tenancy workflows can be initiated from properties,
estates, activities, and other contexts.

### Instructions, pitches, and referrals

These areas provide search, create/edit, view, related activity, task,
document, and progression behavior. Referral and instruction creation can be
entered from related requirements, activities, or referrals.

### Marketing lists

Marketing-list screens support search, create/edit, contact upload, contact
editing, merge, export, and related marketing communication behavior. Merge
is restricted to the Marketeer role.

### Reports

The report area lets the user select a report, provide criteria, generate the
result, and download or view the output. Domain menus can open this area with a
preselected report group.

### Administration and configuration

Administration provides tabs and dialogs for users, departments, Dotmailer,
configurations, templates, showovers, marketing communication topics,
subscriptions, LIA rules, and portal document visibility. Configuration
provides system configuration and translations and is limited to system
administrators.

## Shared content available across domains

Most major records can expose:

- activities and current activities;
- notes and journal/history;
- attachments and document previews;
- addresses, contacts, ownership, and parties;
- appointments, viewings, emails, text messages, and notifications;
- maps and location information;
- status, alerts, consent, CDD, and compliance information;
- related-record search and navigation.

## Evidence

The catalogue is based on the feature folders under
`src/app/`, the route modules, component templates, and the existing
[Angular GUI analysis](../Architecture%20%26%20Infrastructure/angular-gui-analysis.md).
