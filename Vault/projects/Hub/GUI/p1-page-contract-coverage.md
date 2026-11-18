# P1 page-contract coverage

P1 is complete when each routed product area has a stable description of its
screen responsibilities, regions, navigation, child screens, commands,
panels, and access behavior. It does not require every field validator; those
are P2.

## Coverage matrix

| Area | Contract source | P1 coverage |
|---|---|---|
| Dashboard | [Dashboard](pages/dashboard.md), [Navigation and access](navigation-and-access.md) | Widgets, drill-downs, calendar, task lists, notifications, refresh |
| Contact | [Contact](pages/contact.md) | Search, duplicate check, edit, view, related records |
| Company | [Company](pages/company.md) | Search, hierarchy, create/edit, view, related lists |
| Property/assets | [Property](pages/property.md), [Property assets](pages/property-assets.md) | Search, create/edit, view, hierarchy, maps, related assets |
| Activity | [Activity](pages/activity.md) | Search, edit/view, state changes, matches, offers, viewings |
| Requirement | [Requirement](pages/requirement.md) | Search, saved searches, edit/view, matching, applicants, progression |
| Tenancy | [Tenancy](pages/tenancy.md) | Search, edit/view, progression, renewal, termination, compliance |
| Offer | [Offer](pages/offer.md) | Add/edit, view, preview, offer/reservation status behavior |
| Instruction | [Instruction, pitch, and referral](pages/instruction-pitch-referral.md) | Search, add/edit/view, related processes |
| Pitch | [Instruction, pitch, and referral](pages/instruction-pitch-referral.md) | Search, add/edit/view, instruction linkage |
| Referral | [Instruction, pitch, and referral](pages/instruction-pitch-referral.md) | Search, add/edit/view, action cards, template edit |
| Marketing lists | [Marketing, reports, and administration](pages/marketing-reports-administration.md) | Search, add/edit/view, upload, export, merge |
| Reports | [Marketing, reports, and administration](pages/marketing-reports-administration.md) | Type selection, report selection, generation/download responsibility |
| Administration | [Marketing, reports, and administration](pages/marketing-reports-administration.md), [Navigation and access](navigation-and-access.md) | Role-specific tabs, users, departments, showovers, templates, portal visibility |
| Configuration | [Marketing, reports, and administration](pages/marketing-reports-administration.md) | Translation/configuration administration |
| Quick create | [Quick create, preferences, and outcomes](pages/quick-create-preferences-outcomes.md) | Cross-domain creation entry and context return |
| Preferences | [Quick create, preferences, and outcomes](pages/quick-create-preferences-outcomes.md) | Authenticated user settings responsibility |
| Error outcomes | [Quick create, preferences, and outcomes](pages/quick-create-preferences-outcomes.md), [Shared UI and feedback](shared-ui-and-feedback.md) | Not-found, no-access, HTTP feedback outcomes |

## Shared P1 rules

- The authenticated shell, menu, recent-item drawers, title/environment bar,
  notifications, help, proxy-user context, and role filtering are shared.
- Search screens have criteria, result state, result navigation, and
  preview/detail entry.
- Edit screens have a page header, grouped content regions, related panels
  where applicable, and explicit save/cancel responsibility.
- Detail screens expose summary information, tabs/sections, related records,
  and record commands where the source provides them.
- Destructive or irreversible commands use confirmation where evidenced.
- State-changing workflows use a confirmation/validation panel before
  submission where evidenced.
- Related-list updates define whether the list refreshes immediately or after
  the parent record refresh.
- Route reuse, reset, dirty navigation, loading, empty, error, and
  authorization behavior are governed by the shared contracts.

## P1 boundary

P1 does not claim:

- exact field metadata or validators;
- every runtime-configured option;
- pixel dimensions or responsive breakpoints;
- complete accessibility behavior;
- rendered screenshot equivalence.

Those remain P2/P3/P4 concerns.

## Evidence

Routes and child screen composition are evidenced by the Angular routing
modules, page templates, feature components, shared UI documentation, and the
supplied screenshot index.
