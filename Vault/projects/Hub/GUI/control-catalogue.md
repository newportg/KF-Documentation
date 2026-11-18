# Framework-neutral control catalogue

This catalogue describes the reusable controls that a replacement GUI must
provide. The names are product concepts, not Angular component names.

## Control contract

Every control specification should define:

- value type and display format;
- editable, read-only, hidden, and disabled states;
- label, hint, validation, and error presentation;
- loading and unavailable states;
- change/commit events;
- keyboard and focus behavior;
- responsive width and wrapping rules;
- source evidence and runtime configuration dependencies.

## Input controls

| Control | Required behavior |
|---|---|
| Text | Single-line value, maximum length, trim/empty handling, disabled/read-only state, validation message |
| Rich text/notes | Multi-line content, formatting limits, dirty state, save/cancel, read-only rendering |
| Number | Numeric parsing, decimal precision, negative-value rule, currency/period display |
| Date | Locale display, parsing, min/max, invalid-date message, clear action |
| Date range | Start/end ordering, optional endpoints, range validation, clear action |
| Checkbox/toggle | Boolean value, disabled state, dependent visibility, immediate or deferred save |
| Radio | Mutually exclusive options, default, dependent visibility |
| Enum/select | Configured options, delayed filtering where applicable, empty value, loading state |
| Typeahead/resource selector | Debounced search, selected-record identity, no-results state, clear/reselect, request failure |

## Structured controls

### Address

The address control supports entity type, country selection, address fields,
external address lookup, verification state, optional overwrite behavior, and
read-only rendering. Country changes can trigger validation and address-change
events. Some property variants include map/geolocation and preview behavior.

### Attributes

Property and requirement attributes are schema-driven. The control must
support configured labels, types, option lists, visibility, edit/view modes,
and per-attribute validation. Attribute values must not be hard-coded into the
replacement page.

### Relationship selector

Used for contacts, companies, users, departments, properties, requirements,
activities, agents, and parties. It must preserve selected IDs separately from
display labels, support search and clear, and expose relationship-specific
empty and unauthorized states.

### Fee and financial value

Supports amount, currency, period, percentage, and non-negative/positive
validation rules. Display formatting must not change the stored numeric value.

### Appointment and attendees

Supports suggested attendees, selected attendees, other attendees, add/remove,
reset, and attendee-list change events. It must support context such as entity,
address, timezone, service line, and appointment mode.

## Layout and collection controls

### Accordion

Sections have a translated heading, open/closed state, optional icon, and
optional ignore/change behavior. The replacement must preserve whether a
section is expanded by default and whether collapsed content is loaded lazily.

### Card/list

Cards support header, details, photo, checkbox, context menu, footer, add
action, filter, and no-items variants. List contracts must define selection,
sorting, pagination, count, and refresh behavior.

### Search results

Search controls must distinguish:

1. initial/not-yet-searched;
2. loading;
3. successful zero results;
4. successful results;
5. failed request.

Columns, filters, sorting, paging, selected rows, export, preview, and
navigation are part of the screen contract.

### Tabs and panels

Tabs are content-width rather than stretched full-width. Side panels and
preview panels preserve the parent context and must define close, cancel,
refresh, and unsaved-change behavior.

## Documents and feedback

### Attachment/upload

Supports browse/drop selection, saved/template/entity files, upload progress,
row-level errors, success-with-errors, retry/removal, metadata, and document
visibility. Upload success must not hide partial failures.

### Warning/notification

Warnings, sensitive/ NDA/security notices, validation errors, and success
messages are distinct visual states. Toasts are top-centred, dismissible, and
deduplicated; global response headers can add error or warning messages even
when the HTTP response is successful.

### Map

Supports address/location display, optional geolocation, loading/error state,
and property/asset context. Map failure must not make the underlying address
appear invalid.

## Configuration and localization

Labels, required flags, options, visibility, and some schemas are runtime or
translation driven. The replacement control catalogue must therefore accept
configuration as data and keep translation keys separate from rendered text.

## Source evidence

The control families are evidenced by
`src/app/common/components/`, including address-form, address-map, attribute,
accordion, card, appointment, attachment, warning, selector, and related
components. Representative address inputs/events are in
`common/components/address-form/address-form-edit/`; attendee behavior is in
`common/components/attendees/`; attachment models are in
`common/components/attachment/picker/`.
