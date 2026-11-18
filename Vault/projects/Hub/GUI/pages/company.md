# Company pages

## Routes and entry points

- `/company` — search.
- `/company/check` — duplicate check before creation.
- Company add/edit — create or update.
- Company view — summary and related records.

The company menu exposes Search and Create. Company records are also opened
from contact, property, activity, requirement, ownership, and tenancy flows.

## Search page

### Filters

- company name and general search;
- category;
- client-care status;
- company type;
- funds versus companies;
- company hierarchy.

### Results

The result table can display client, holding, KF-verified, child, and fund
markers. Empty results show a no-items state and search refinement actions.

## Add/edit page

### Sections

- alternative company information;
- basic information;
- holding company;
- relationship manager;
- negotiators;
- CDD validity where applicable;
- additional information;
- sticky Cancel and Save footer.

Create and edit use the same domain structure, with title and mode-specific
controls. Duplicate checking precedes creation.

## View page

### Summary and profile

- company summary;
- owning/holding company;
- funds and children;
- negotiators and CDD validity;
- basic and additional information;
- invoice addresses;
- portal information;
- notes and activity/history.

### Related lists

- contacts;
- activities;
- requirements;
- instructions;
- pitches;
- ownerships and tenancies;
- interests;
- property-management suppliers.

Related lists expose filters, clear-all actions, item counts, empty states, and
domain-specific tables. Company activities include title, type, status,
price/rent, negotiator, date, and company columns. Company contacts include
name, company, branch, job title, phone, email, negotiator, portal, and
address information.

## Validation and navigation

- Company add/edit routes use dirty-navigation protection.
- Company search and view routes use query/parameter-sensitive route reuse.
- Company relationship changes can open confirmation or validation panels.

## Source evidence

`src/app/company/`, especially `search/`, `company-add/`,
`company-edit/`, `company-view/`, and the related list components.
