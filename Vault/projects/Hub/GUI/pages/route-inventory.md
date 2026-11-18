# Route inventory

This is the current top-level and nested page inventory extracted from the
route modules. Paths are product-facing routes; component names are source
evidence only.

## Top-level routes

| Route | Feature | Page family | Access |
|---|---|---|---|
| `/dashboard` | Dashboard | Work surface/widgets | Authenticated |
| `/contact` | Contact | Search, create, duplicate check, edit, view | Authenticated |
| `/company` | Company | Search, create, edit, view | Authenticated |
| `/property` | Property | Check, search, add/edit, view | Authenticated |
| `/activity` | Activity | Search, add/edit, view | Authenticated |
| `/development` | Development | Add/edit, view, related building/activity | Authenticated |
| `/building` | Building | Add/edit, view, related activity | Authenticated |
| `/estate` | Estate | Edit, view | Authenticated |
| `/tenancy` | Tenancy | Search, edit, view, progression | Authenticated |
| `/phase` | Phase | Overview and related activity | Authenticated |
| `/pitch` | Pitch | Search, add, edit, view | Authenticated |
| `/instruction` | Instruction | Search, add, edit, view | Authenticated |
| `/offer` | Offer | Add/edit, view | Authenticated |
| `/requirement` | Requirement | Search, add/edit, view | Authenticated |
| `/portfolio` | Portfolio | Add/edit, view, related records | Authenticated |
| `/referral` | Referral | Search, add, edit, template edit, view | Authenticated |
| `/marketingList` | Marketing lists | Search, add, edit, view, merge | Authenticated |
| `/report` | Reports | Report selection/view | Authenticated |
| `/administration` | Administration | Users, departments, showovers, templates, portal visibility | Role protected |
| `/config` | Configuration | Configuration and translation administration | System Administrator |
| `/quick-create` | Quick create | Cross-domain creation | Authenticated |
| `/preferences` | Preferences | User preferences | Authenticated |
| `/notFound` | Error outcome | Not-found page | Public route outcome |
| `/noAccess` | Error outcome | Access-denied page | Public route outcome |

The root path redirects to `/dashboard`. Unknown child routes are handled by
the redirect component.

## Nested screen families

### Contact

- `/contact` search;
- `/contact/check` duplicate-check/create decision;
- contact add;
- contact edit;
- contact view;
- related activities, requirements, referrals, properties, phones/emails,
  consent, relationships, negotiators, and preview panels.

### Company

- `/company` search;
- `/company/check` duplicate-check/create decision;
- company add/edit;
- company view;
- related contacts, activities, requirements, instructions, pitches,
  ownerships, tenancies, and interests.

### Property and assets

- `/property/check` property pre-create checks;
- `/property/search` property search;
- property add/edit and view;
- development, building, estate, phase, and portfolio views;
- related activities, ownership, hierarchy, floor/area breakdown,
  attachments, marketing, publication, and property lists.

### Activity and requirement

- activity search, saved searches, add/edit, view, preview, publication,
  marketing, terms, parties, matches, offers, and viewings;
- requirement search, saved searches, add/edit, view, applicants,
  representatives, agents, matching, viewing tours, and progression.

### Tenancy

- tenancy search and saved searches;
- tenancy add/edit and view;
- progression, renewal, termination, deposit protection, paperwork, email
  uploads, appointments, and related parties.

### Administration

- user administration;
- department administration;
- showover availability;
- document templates;
- portal document visibility;
- Dotmailer, configuration, topic, subscription, and LIA-rule tabs.

## Source evidence

Primary route evidence is in `src/app/app-routing.module.ts` and the feature
`*-routing.module.ts` files under `src/app/`.
