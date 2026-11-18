# Marketing lists, reports, and administration

## Marketing lists

### Routes

- `/marketingList/search`
- `/marketingList/add`
- `/marketingList/edit`
- `/marketingList/view`
- `/marketingList/merge`

### Search

Search filters include negotiator and department. Results show created date,
owner, department, and list name. The page supports clear-all, count, saved
search behavior, and result navigation.

### Add/edit

The form captures the list header and marketing subscription/topic context.
Save and Cancel are sticky actions.

### View

The view supports:

- lock and unlock;
- delete;
- find/add contacts;
- upload contact lists;
- export to Dotmailer;
- export to XLS;
- contact filters;
- contact table with title, address, residential/business, exclusions,
  send method/type, export status, salutation, email, and requested-by data;
- editor list.

Upload results distinguish success, failure, success-with-errors, and row
details.

### Merge

Merge is a role-restricted selection flow. It searches lists, shows result and
selected counts, requires confirmation, and then merges.

## Reports

The report page provides report selection, criteria, generation, preview, and
download. Domain menu entries can open the same page with a report group
already selected.

## Administration

### Access

Administration is visible to System Administrator, Department Administrator,
and Central Marketing roles. Individual tabs are further role restricted.

### Areas

- Users: departments, instruction/client-services access, roaming
  instructions, roles, marketer businesses/departments, audit/compliance
  departments, and property-management teams.
- Departments: division, administrators, department details, and departmental
  teams.
- Showovers: role and copied availability.
- Templates: document-template administration.
- Dotmailer: integration configuration.
- Topics and subscriptions: marketing communication configuration.
- Legitimate-interest rules: business area, entity type, customer journey,
  topic, and subscription mapping.
- Portal document visibility: filters and visible-document table with portal
  role, document category/type/state, operation, service line, and DocuSign
  flag.

Administration edit screens use focused dialogs or pages with Cancel and Save,
and selected routes use dirty-navigation protection.

## Configuration

Configuration is System Administrator only. Translation administration supports
export and import:

- export language/translation data;
- select an import file;
- validate file presence and extension;
- display import errors;
- browse/select the file;
- run the import.

## Source evidence

`src/app/marketing-list/`, `src/app/report/`,
`src/app/administration/`, and `src/app/config/`.
