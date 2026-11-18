# User interactions and workflows

## Search to detail

1. The user opens a domain search screen.
2. Lookup data and configuration are loaded.
3. The user enters criteria and runs the search.
4. The UI displays paged results, with optional map, column, sort, and filter
   controls.
5. The user opens a preview panel or navigates to the full record.
6. The detail view loads related panels and allows further commands.

Search screens commonly support saved searches, export, subscriptions, bulk
actions, recent records, and navigation between result records.

## Create and edit

1. The user chooses a create action or enters an edit route.
2. The UI loads edit data, lookups, configuration, enums, and related
   context.
3. The form is populated, including defaults derived from the selected
   context.
4. Field-level and cross-field validation runs while the user edits.
5. The user confirms the command where the action is consequential.
6. The UI submits create or update data.
7. Success is shown with a toast or navigation; the parent and related panels
   are refreshed.
8. API errors remain visible through shared error handling.

## Status changes

Status changes are not treated as a simple dropdown update:

1. The user selects a candidate status.
2. The UI calls server-side validation, such as
   `POST /api/activities/{id}/stateValidate` or
   `POST /api/requirements/{id}/stateValidate`.
3. The response determines required information and panels, such as notes,
   completion dates, exchanged dates, lost-to information, negotiator
   restrictions, CDD, rent data, or marketing requirements.
4. The user completes the required information and confirms the action.
5. The UI submits the state/update command.
6. The record, activity feed, related panels, and relevant projections are
   refreshed.

The API is authoritative for business transition validity. A replacement must
not rely on client validation alone.

## Activity and offer behavior

The GUI contains behavior that must be preserved independently of its
framework:

- instructed and marketed dates can be defaulted for configured activity
  statuses;
- status controls change visible fields based on the selected status;
- referral and publication controls depend on activity status;
- completion ownership choices depend on completion/letting status, agency,
  service line, accepted offers, applicant/requirement presence, and ownership
  type;
- offer status choices vary by offer type;
- reservation offers are restricted to reserved and withdrawn outcomes;
- accepted offers can default agreed price from offer price;
- area-based and annual amounts are converted for display and submission;
- lease dates are calculated from week/month periods and rejected when invalid,
  expired, inverted, or beyond the remaining lease duration.

These behaviors are implementation evidence and should be confirmed by an SME
before being treated as new product policy.

## Related records and panels

Parent screens load child records by parent ID. Common actions include:

- add or edit an activity from a property, contact, company, or requirement;
- add requirements and activities to a contact or company;
- connect offers and matches to activities;
- manage ownership and parties;
- create viewing tours from matched activities;
- add notes, appointments, emails, text messages, and referrals;
- navigate to a related record without losing the parent context.

The replacement should preserve the user's ability to move between related
records and return to the originating context.

## Documents and attachments

Document interactions follow this pattern:

1. Open the attachment list from an entity.
2. View attachment metadata or preview the file.
3. Upload one or more files, or generate a document from a template.
4. Set type, visibility, parties, version, or verification state.
5. Optionally edit through WOPI, watermark, or signing operations.
6. Refresh the attachment list and related status.

The GUI also contains document-template administration and portal document
visibility controls.

## Tenancy and compliance

Tenancy screens expose progression and renewal tasks, termination, deposit
protection, paperwork, email uploads, appointments, and related parties.
Compliance-related panels include CDD validity, right-to-rent and
questionnaire-style controls where the relevant workflow requires them.

## Dashboard and notifications

Dashboard widgets expose counts and drill-downs rather than only static
summary text. The user can open the underlying list, update task-list items,
open calendar items, and use saved searches. The top-bar notification bell
shows unread state and count; opening it displays notification details.

## Feedback and refresh expectations

After a successful command, the UI generally:

- shows a toast or success outcome;
- refreshes the edited record;
- refreshes related panels and counts;
- updates the current list or navigates to the next screen;
- publishes or reacts to relevant notification/publication events.

After an error, the UI keeps the user in context and surfaces the API error
through shared error handling rather than treating the command as successful.
