# Navigation and access

## Application shell

Authenticated screens use a shared shell:

1. A left main menu provides domain navigation.
2. The top bar shows the environment name and current page title.
3. The top bar exposes unread notifications, help/what's-new links, and proxy
   user login.
4. The content area displays the active screen.
5. Unknown routes are redirected; unauthorised routes are sent to the
   not-found outcome.

At startup the shell loads general configuration, latest views, country data,
locales, markets and sectors, and telephone formatting data before entering
the child screen.

The menu starts minimized. A domain menu item can expand to show sub-items.
Selecting another item collapses the previous item. Small and extra-small
breakpoints switch the menu into mobile mode. Domain menus can also show a
recent-items drawer.

## Main navigation

| Menu | Available actions |
|---|---|
| Dashboard | Open dashboard |
| Quick create | Open cross-domain creation shortcuts |
| Contacts | Search, create, contact reports, recent contacts |
| Companies | Search, create, recent companies |
| Properties | Search, create, recent properties |
| Activities | Search, saved searches, activity reports, recent activities |
| Requirements | Search, saved searches, create, requirement reports, recent requirements |
| Tenancies | Search, saved searches, tenancy reports, recent tenancies |
| Referrals | Search, create, recent referrals |
| Pitches | Search, create, recent pitches |
| Instructions | Search, create, recent instructions |
| Reports | View reports, recent reports |
| Marketing lists | Search, create, merge lists, recent marketing lists |
| Administration | Role-specific administration areas |

Some menu entries navigate to a shared report screen with a preselected
`groupCode`, for example Contact, Activity, Requirement, or Tenancy reports.

## Route map

| Route | Product area | Main responsibility |
|---|---|---|
| `/dashboard` | Dashboard | Widgets, counters, drill-downs, calendar, saved searches, and work queues |
| `/contact` | Contact | Search, profile, addresses, activities, requirements, referrals, and subscriptions |
| `/company` | Company | Search, profile, contacts, activities, requirements, instructions, ownership, tenancies, and interests |
| `/property` | Property | Search, profile, ownership, activities, attachments, publication, and related assets |
| `/activity` | Activity | Search, create/edit, preview, publication, marketing, parties, matches, terms, viewings, and validation |
| `/development` | Development | Overview, buildings, units, activities, and property relationships |
| `/building` | Building | View/edit, units, ownership, activities, attachments, and property breakdown |
| `/estate` | Estate | View/edit and related property/activity management |
| `/tenancy` | Tenancy | Progression, renewal, termination, paperwork, email uploads, and related parties |
| `/phase` | Phase | Overview and phase-level activities |
| `/pitch` | Pitch | Pitch records and associated commercial activity |
| `/instruction` | Instruction | Search, view, edit, documents, and process data |
| `/offer` | Offer | Search, view/edit, acceptance, rejection, and activity linkage |
| `/requirement` | Requirement | Search, matching, applicants, viewings, and progression |
| `/portfolio` | Portfolio | Portfolio-level property and tenancy coordination |
| `/referral` | Referral | Referral records, tasks, and related contacts/activities |
| `/marketingList` | Marketing lists | List creation/editing, contact upload, merge, and export |
| `/report` | Reports | Report selection, criteria, generation, and download |
| `/administration` | Administration | Users, departments, subscriptions, topics, Dotmailer, portal visibility, and showovers |
| `/config` | Configuration | System configuration and translations |
| `/quick-create` | Quick create | Cross-domain creation shortcuts |
| `/preferences` | Preferences | User preferences, areas, saved settings, and display options |

The root route redirects to `/dashboard`. `notFound` and `noAccess` are
separate outcomes for invalid and unauthorised navigation.

## Access rules

The application shell requires an authenticated user. Administration and
configuration are additionally protected at route level:

| Area | Allowed roles |
|---|---|
| Administration | System Administrator, Department Administrator, Central Marketing |
| Configuration | System Administrator |
| Marketing-list merge | Marketeer |
| Administration users, departments, Dotmailer, configurations, templates, and portal document visibility | System Administrator |
| Administration showovers | Department Administrator |
| Marketing communication topics, subscriptions, and LIA rules | Central Marketing |

The menu also filters items and sub-items by role. This is a visibility aid,
not a security boundary; the replacement must enforce authorization on the
server as well.

## Evidence

The route and access behavior is evidenced by `src/app/app-routing.module.ts`,
`src/app/layout/components/main-menu/main-menu.schema.ts`,
`src/app/layout/services/main-menu.service.ts`, and
`src/app/common/guards/role-authorize.guard.ts`.
