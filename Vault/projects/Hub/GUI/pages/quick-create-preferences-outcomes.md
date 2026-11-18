# Quick create, preferences, and route outcomes

## Quick create

The Quick Create route is the cross-domain creation entry point. It presents
the available record types and opens the corresponding create workflow while
preserving the originating page context where supplied.

Supported creation targets are configuration-driven and can include contact,
company, property, activity, requirement, instruction, referral, and related
records. The target form retains its normal validation and dirty-navigation
behavior; Quick Create does not bypass domain rules.

## Preferences

Preferences is the authenticated user settings page. It contains user-level
display and working preferences and saves through the shared settings flow.
The page provides loading, save, and error states and returns to the previous
work context after a successful update.

## Error outcomes

### Not found

`/notFound` is the standard outcome for an unknown route or missing resource.
It provides a return/navigation action rather than an editable form.

### No access

`/noAccess` is the standard outcome for an authorization failure. The global
HTTP interceptor routes `403` responses here.

### Other global outcomes

- `404` routes to not found;
- `408` displays the shared request-timeout error;
- `500-599` displays the shared HTTP error;
- `503` reloads the application;
- successful responses may display `X-ErrorMessages` and
  `X-WarningMessages`.

## Source evidence

`src/app/quick-create/`, `src/app/preferences/`, the not-found/no-access
components, and `src/app/common/interceptors/kf-error.interceptor.ts`.
