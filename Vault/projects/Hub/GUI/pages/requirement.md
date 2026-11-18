# Requirement pages

## Routes and entry points

- `/requirement/search` — requirement search.
- `/requirement/savedSearches` — saved searches.
- `/requirement/add` — quick create/add.
- Requirement add/edit — full form.
- Requirement view — detail, matching, applicants, and progression.

The requirement menu exposes Search, Saved Searches, Create, and Reports.

## Search page

The search experience provides criteria, paging, result tables, saved searches,
matching/progression entry points, and detail navigation. It supports
residential and commercial requirement contexts.

## Add/edit page

The first-pass field and section contract is in
[core form specifications](./core-form-specifications.md#requirement-addedit).

### Header controls

- Agency type.
- Requirement type.
- Conditional tenure.
- Requirement status.
- CDD status and next CDD action in update mode.
- Currency and visibility/confidentiality.
- CDD-document visibility, do-not-match, auto-match, represented,
  confidential, and NDA flags.
- Conditional NDA expiry date.

### Main sections

- Applicants.
- Representatives and project.
- Agents and sub-agents.
- Negotiators and departments.
- Client-services referrals.
- Responsible-for-administration and responsible-for-deal.
- CDD team member.
- Financials, fees, comments, fee splits, and introducers.
- Basic/additional information.
- Rent, budget, price, location, and property details.

## Matching and progression

- Search and select matching activities.
- Use automatic or manual matching.
- Manage applicants and representatives.
- Create and schedule viewing tours.
- Link or create instructions.
- Progress requirement status after server validation.

## Validation and navigation

- Save validates the form, fee splits, location, and budget.
- Required applicant, agent, sub-agent, and other sections are configuration
  driven.
- CDD warnings appear in the page header.
- Requirement status validation can require notes or other status panels.
- Requirement add/edit routes use dirty-navigation protection.
- Requirement search/view routes use route-reuse rules.

## Source evidence

`src/app/requirement/`, shared matching/viewing-tour components, and
`src/app/common/modals/requirement-state-validation-modal/`.
