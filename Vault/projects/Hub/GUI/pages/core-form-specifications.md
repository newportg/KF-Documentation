# Core form specifications

This is the first source-derived field and section pass. The current GUI uses
metadata-driven shared controls, so labels, required flags, and options are
often supplied through runtime configuration rather than hard-coded directly
in the page template. Those controls are documented as field contracts with
their source configuration names.

## Contact edit

### Header and identity

| Field/control | Behavior |
|---|---|
| Title | Typeahead control; loads title options and updates contact title |
| First name | Text control |
| Last name | Text control |
| Direct marketing consent | Conditional contact-consent control |
| CDD warning flag | Checkbox with warning icon |
| Sensitive | Checkbox |
| Locked to negotiators | Checkbox |
| Alternative version | Opens alternate-name modal; displays count |
| Deceased | Toggle; changes deceased status |

### Sections

- Contact properties and company addresses, with add, edit, delete, history,
  retirement, ownership option, and property preview actions.
- Management relationship and negotiator assignment.
- CDD validity, visible to CDD team members.
- Phones and emails, including the rule that at least one may be required.
- Important information text area.
- Profile accordion, including professions, age bands, countries, and
  property-type interests.
- Contact relationships.
- Salutations with a salutation guide popup.
- Social media links for Twitter, LinkedIn, and website.

### Commands and validation

- Submit runs shared form validation and phone/email validation.
- Save is disabled while saving or when the component reports the form cannot
  be saved.
- Cancel invokes edit cancellation and participates in dirty-navigation
  protection.
- CDD and portal-related checks can add warnings or validation before save.

### Source evidence

`src/app/contact/edit/contact-edit.component.html` and
`src/app/contact/edit/contact-edit.component.ts`.

## Property add/edit

### Header

| Field/control | Behavior |
|---|---|
| Agency type | Enum control; changes agency-dependent behavior |
| Property type | Property-type control; permitted types and change confirmation are configuration-driven |
| Division | Conditional buttons allow switching division |
| Reference code | Read-only generated/display value |

### Sections

- Location and address, including alternative address and address verification.
- Map with edit/view mode and manual location change.
- Property management.
- Commercial area/floor breakdown.
- Building breakdown on update.
- Development, building, and estate relationship cards.
- Dynamic property attributes.
- Material information accordion when configured.
- Commercial accreditation and ESG accordion when applicable.
- Estate property list when configured.
- Developer company/contact selection.
- Development manager selection.
- Agents and related company-contact selection.

### Commands and validation

- Submit runs shared form validation and `preSave`.
- Address can be read-only in some contexts.
- Property type changes may require confirmation.
- Country changes trigger validation.
- Required sections are marked from runtime configuration.
- Save and cancel are sticky footer actions.

### Source evidence

`src/app/property/property-add-edit/property-add-edit.component.html` and
`src/app/property/property-add-edit/property-add-edit.component.ts`.

## Requirement add/edit

### Header

| Field/control | Behavior |
|---|---|
| Agency type | Enum control |
| Requirement type | Requirement-type control |
| Tenure | Conditional enum control |
| Requirement status | Status control with server-backed transition validation |
| CDD status | Update mode only |
| Next CDD action | Update mode only |
| Currency | Enum control |
| Visibility/confidentiality | Enum control |
| CDD documents visibility | Conditional checkbox |
| Do not match | Conditional checkbox |
| Auto match | Conditional checkbox |
| Represented | Conditional checkbox |
| Confidential | Conditional checkbox |
| NDA | Checkbox; reveals NDA expiry date |
| NDA expiry date | Conditional date control |

### Sections

- Applicants.
- Representatives and project.
- Agents and sub-agents.
- Salutations.
- Negotiators and departments.
- Client-services referrals.
- Responsible for administration.
- CDD team member.
- Responsible for deal.
- Financials, fee, fee comment, fee splits, and introducers.
- Basic information, additional information, requirements, rent, budget,
  price, location, property details, and related detail sections.

### Commands and validation

- Submit runs form validation, fee-split validation, location validation, and
  budget validation before save.
- CDD warning and new-entity informational messages can appear above the form.
- Required sections are marked from configuration and current collection
  contents.
- Status changes invoke the server-backed validation flow and can open note,
  completion, lost-to, or negotiator panels.
- NDA expiry appears only when NDA is selected.

### Source evidence

`src/app/requirement/requirement-add-edit/requirement-add-edit.component.html`
and the associated component, resolver, control schema, and status-control
files.

## Tenancy edit

### Sections

- Sub-agent.
- Basic information.
- Tenancy progression.
- Fall-through.
- Licensing.
- Terms and lease details.
- Portal/rent warnings.
- Responsible for bills.
- Charges and bank charges.
- Financial progression and fee splits.
- Rent, initial rent, and area breakdown.
- Breaks.
- Reviews.
- Parking space.
- Alarm.
- Additional clauses.
- Keys.
- Progression charges.

### Commands and validation

- The form has dirty-state handling for nested controls such as deposit amount.
- Lease dates and terms use shared lease-date controls and validation.
- Financial sections use fee-split and amount controls.
- Save and cancel are sticky footer actions.

### Source evidence

`src/app/tenancy/tenancy-edit/tenancy-edit.component.html`,
`tenancy-edit.component.ts`, and the tenancy progression/renewal controls.

## Activity add/edit

The activity form is a family of context-sensitive forms rather than one
fixed field list. The header and sections vary by service line, activity type,
agency, property context, and status.

Documented field/section families include:

- agency, activity type, service line, status, currency, and visibility;
- property/contact/company/requirement parties;
- terms, rent, price, area, lease details, and fee splits;
- negotiators, departments, referrals, and CDD;
- publication, images, brochures, marketing portals, and material information;
- matches, offers, viewings, appointments, and notes;
- state-specific completion, exchange, lost-to, and ownership controls.

State validation and status-specific fields are authoritative from the API.
The source-specific activity schemas and child controls must be extracted per
service line before claiming P2 completeness.

### Source evidence

`src/app/activity/activity-add-edit-common/`,
`src/app/activity/activity-add-edit/`,
`src/app/activity/activity-view/`, and the activity status-control components.
