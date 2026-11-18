# Interaction and validation matrix

This matrix defines behavior that must remain stable when the Angular client
is replaced. It is intentionally expressed as outcomes and state transitions,
not framework events.

## Record lifecycle

| Interaction | Client behavior | Server authority | Required outcome |
|---|---|---|---|
| Open search | Render filters and initial state | Authorization/configuration | Search is not implied to have run |
| Run search | Validate criteria, show busy state, submit paging/sort | Query validity and result set | Show results, empty state, or explicit error |
| Open preview | Preserve parent context, show busy panel | Record existence/access | Preview or not-found/no-access |
| Open detail | Load record and related configuration | Record/version/access | Detail view with refreshable related data |
| Start create | Load edit schema/lookups | Allowed entity creation | Empty/default form or explicit setup error |
| Save create | Validate visible fields and submit | Business rules and persistence | New identifier, success message, refreshed context |
| Save edit | Validate changed fields and submit version | Concurrency and business rules | Updated record and refreshed projections |
| Delete | Ask for confirmation | Permission and delete rules | Removed record or surfaced failure |

## Form validation

- Required, maximum-length, date-range, amount, and option validation occurs
  before submission where the rule is known to the client.
- Server validation remains authoritative for cross-record and state-dependent
  rules.
- A field that becomes visible because of another value must participate in
  validation only when the current configuration says it is applicable.
- Invalid submission keeps user input, focuses or identifies the invalid
  region, and exposes the server message; it must not look successful.
- Successful save clears the dirty state. Failed save retains the dirty state.

## State transitions

Activity, requirement, referral, instruction, offer, tenancy, and related
workflows can change status.

1. User selects a candidate transition.
2. UI calls `stateValidate`.
3. Response determines required panels/fields and warnings.
4. UI displays the required confirmation or completion form.
5. User confirms and submits.
6. Server persists the transition.
7. UI refreshes the record and affected related lists.

The client must not infer that a transition succeeded from the button click.

## Search and collection behavior

| Situation | Required state |
|---|---|
| Filter changed before search | Results remain identifiable as stale or are cleared according to page contract |
| Request in progress | Busy indicator and duplicate-submit protection |
| Zero results | Explicit no-items state with refinement/reset action |
| Request failure | Error state with retry; never an empty-success fallback |
| Paging/sorting | Preserve criteria and selected columns |
| Export | Preserve current criteria; show progress and failure |
| Related-list mutation | Refresh count/list or mark it stale explicitly |

## Files and documents

- Validate file selection before upload.
- Show upload progress and prevent duplicate commands.
- Report row-level failures in mixed-result uploads.
- Preserve successful rows when some rows fail.
- Refresh document lists and visibility metadata after completion.
- Document access and portal visibility remain server-authoritative.

## Navigation and draft protection

- Guarded edit routes prompt before route changes with unsaved changes.
- Browser unload uses equivalent protection where currently implemented.
- Cancel/discard clears the dirty state before navigation.
- Closing a side panel or preview must follow the same rule as route
  navigation when it contains an editable draft.
- Route reuse must define whether filters, tabs, scroll position, and draft
  state are retained or reset.

## Authorization

- Main menu visibility is role filtered.
- Route guards remain authoritative for direct URL access.
- Button/action visibility is not a substitute for server authorization.
- A `403` navigates to no-access; a missing resource uses not-found.

## Global feedback

- `408` and `500-599` show shared HTTP errors.
- `503` reloads the application/offline state.
- Successful responses may still enqueue error/warning headers.
- Toasts are dismissible and deduplicated.
- Loading, error, empty, and success states must be visually distinguishable.

## Source evidence

State validation is evidenced by activity and requirement transition services;
draft protection by `common/services/navigation-block.service.ts`; route reuse
by `common/services/kf-route-reuse-strategy/`; and global feedback by
`common/interceptors/kf-error.interceptor.ts`.
