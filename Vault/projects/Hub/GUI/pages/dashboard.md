# Dashboard page

Visual evidence: [supplied dashboard screenshot](Screenshots/Screenshot_Dashboard.jpeg)
and the [screenshot evidence index](../screenshot-evidence.md). page

## Route and entry points

- Route: `/dashboard`
- Root route redirects here.
- Main menu opens it directly.
- Authenticated shell startup data is loaded before entry.

## Page regions and navigation

The dashboard is a widget-based work surface rather than a single form. It
contains configurable tiles, counters, lists, calendar content, and drill-down
views. Widgets can navigate to the corresponding domain search or detail page.

## Widget families evidenced in source

- activities;
- administrative activity and tenancy views;
- business generation and business support;
- callbacks and client callbacks;
- CDD;
- commercial agency availability, business generation, capital-market
  activities, deals, market overview, and requirements;
- end of tenancy;
- fire safety;
- instructions;
- leasing deals;
- marketing;
- market overview;
- notifications;
- property management and property visits;
- requirements;
- tenancies and tenancy renewals;
- web enquiries.

## Interactions

- Select a widget counter to open its drill-down.
- Select a drill-down row to navigate to a domain record or list.
- Open calendar entries and saved searches.
- Update task-list items from task widgets.
- Open notifications from the top-bar bell.
- Receive notification-state updates through the notification integration.

## Loading and refresh

Widget data is loaded independently. A replacement must support individual
busy, empty, error, and refresh states rather than blocking the whole dashboard
on one widget.

## Source evidence

`src/app/dashboard/view/dashboard-view.component.*`,
`src/app/dashboard/widgets/`, `src/app/dashboard/drill-downs/`, and
`src/app/dashboard/widgets/widgets-helper.service.ts`.
