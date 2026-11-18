# Activity pages

## Routes and entry points

- `/activity/search` — activity search.
- `/activity/savedSearches` — saved activity searches.
- Activity add/edit — context-sensitive create/update.
- Activity view — full record.
- Activity preview panels — lightweight related-record view.

Activities can be created from properties, buildings, developments, estates,
phases, portfolios, requirements, contacts, and companies.

## Search page

### Regions

- Search criteria and filters.
- Paged results table/grid.
- Refinement modal.
- Saved-search and report actions.
- Result preview and detail navigation.

### Behaviors

- Search by activity/domain criteria.
- Refine filters without leaving the result context.
- Open related activity, property, contact, company, requirement, offer, and
  viewing information.
- Use marketing/publication actions where permitted.

## Add/edit page

Activity add/edit is a family of forms selected by service line, activity type,
agency, property context, and market. The shared field families are:

- agency, activity type, service line, status, currency, and visibility;
- parties, contacts, companies, properties, and requirements;
- terms, price, rent, area, lease, and fee split;
- negotiators, departments, referrals, and CDD;
- publication, portals, images, brochures, and marketing;
- matches, offers, viewings, appointments, and notes.

### State behavior

1. Select a candidate status.
2. Call server-backed state validation.
3. Display required panels or fields.
4. Complete and confirm the transition.
5. Submit the update.
6. Refresh the activity and related projections.

### Other interactions

- Activity state validation modal.
- Activity-status-changed correspondence modal.
- Image verification and marketing gallery panels.
- External snapshot and publication validation.
- Terms-and-conditions and offer workflows.
- Viewing and viewing-tour creation.

## View page

The activity view assembles summary, status, parties, property information,
terms, offers, requirements, matches, viewings, publication, marketing assets,
documents, notes, communications, alarms, and business events.

## Validation and navigation

- Activity add/edit and view routes use dirty-navigation protection.
- Activity search and view routes use query/parameter-sensitive route reuse.
- Client rules calculate defaults and field visibility; API validation remains
  authoritative.
- Completion, exchange, lost-to, ownership, CDD, lease, rent, image, and
  brochure requirements vary by status and service line.

## Source evidence

`src/app/activity/`, especially
`activity-add-edit-common/`, `activity-add-edit/`, `activity-view/`,
`search/`, `activity-preview-panel/`, and shared status/marketing/viewing
components.
