# Development, building, estate, phase, and portfolio pages

These pages are the property-asset hierarchy screens. They are entered from
property search/view and from related-record links; they are not independent
work surfaces in the main menu.

## Development

### Routes

- development add/edit;
- development view;
- related buildings and activities.

### Regions

- development identity and address;
- hierarchy/property relationships;
- activity list;
- building list;
- attachments and notes where available.

## Building

### Routes

- building add/edit;
- building view;
- related activities.

### Regions

- building identity and address;
- parent development/estate;
- floors or areas;
- activities, attachments, and notes.

## Estate

### Routes

- estate edit;
- estate view.

### Regions

- estate identity and address;
- parent/child property relationships;
- related activity and ownership information.

## Phase

### Routes

- phase overview;
- related activity.

### Regions

- phase identity and status;
- parent development/building relationship;
- related activities and property records.

## Portfolio

### Routes

- portfolio add/edit;
- portfolio view;
- related records.

### Regions

- portfolio identity and manager;
- included properties/assets;
- ownership and activity relationships;
- attachments and notes.

## Shared behavior

- Asset pages preserve the current parent context when opened from a property
  view.
- Add/edit pages use shared address, relationship, attachment, and notes
  controls.
- Save refreshes the asset and its parent/related lists.
- Invalid or missing parent identifiers show the standard not-found outcome.
- Dirty-navigation protection applies to asset edit flows where the route
  includes the shared navigation-block guard.

## Source evidence

`src/app/development/`, `src/app/building/`, `src/app/estate/`,
`src/app/phase/`, and `src/app/portfolio/`, plus their feature routing and
view/edit components.
