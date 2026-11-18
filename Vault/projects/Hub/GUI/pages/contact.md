# Contact pages

Visual evidence: [contacts search](Screenshots/Screenshot_Contacts_Search.jpeg),
[duplicate-check/create](Screenshots/Screenshot_Contacts_Create.jpeg), and
[contacts reports](Screenshots/Screenshot_Contacts_Reports.jpeg).

## Routes and entry points

- `/contact` — search.
- `/contact/check` — duplicate check before creation.
- Contact add — create flow after the check.
- Contact edit — edit an existing contact.
- Contact view — profile and related records.

The contact menu exposes Search, Create, and Contact Reports. Contact results
can also be opened from related records and shared selectors.

## Search page

### Regions

- Search criteria and filter controls.
- Search results table.
- Empty-result guidance and option to widen the search.
- Create-new-contact action.
- Preview/detail navigation.

### Behaviors

- Run a paged contact query.
- Clear all criteria.
- Use contact, company, user, negotiator, department, marketing, and status
  filters where configured.
- Open a result or create a new contact.
- Display a no-items state with a widen-search option.

## Duplicate check

The create path checks for likely duplicate contacts before allowing the full
create form. The outcome can continue to an existing contact or create a new
record.

## Edit page

The complete first-pass field and section contract is in
[core form specifications](./core-form-specifications.md#contact-edit).

The page is a three-column responsive form with:

- identity and warning header;
- contact properties and negotiators;
- phones/emails;
- important information, profile, relationships, salutations, and social
  media;
- sticky Cancel and Save footer.

## View page

The contact view assembles profile data and related panels for properties,
activities, requirements, referrals, companies, notes, communications,
consent, and negotiators. Related records open in preview panels or external
navigation according to the panel configuration.

## Validation and navigation

- Phone/email validation runs before save.
- CDD, portal, consent, relationship, and property operations can add
  warnings or validation.
- Contact add/edit routes use dirty-navigation protection.
- Search and view routes use route-reuse reset behavior when query or route
  parameters change.

## Source evidence

`src/app/contact/search/`, `src/app/contact/contact-add/`,
`src/app/contact/edit/`, `src/app/contact/contact-view/`, and shared contact
components under `src/app/common/`.
