# Screenshot evidence

The supplied screenshots are suitable for P3 layout and visual-token
extraction. They are all `3651x1822` JPEG captures and appear to use the same
wide desktop viewport.

## Evidence index

| Screenshot | State captured | Useful evidence |
|---|---|---|
| [Dashboard](pages/Screenshots/Screenshot_Dashboard.jpeg) | My dashboard with task lists, widgets, notifications, calendar, and marketing | Four-column work surface, widget colors, header, menu, calendar grid, density |
| [Contacts search](pages/Screenshots/Screenshot_Contacts_Search.jpeg) | Populated contacts search | Search bar, team/my/dept/all switcher, filters, result columns, row actions, paging |
| [Contacts create](pages/Screenshots/Screenshot_Contacts_Create.jpeg) | Contact duplicate-check/create form | Two-card layout, field widths, required marker, add-location action, negotiator selector, search button |
| [Contacts reports](pages/Screenshots/Screenshot_Contacts_Reports.jpeg) | Reports selector with Contact type selected | Report type dropdown, scrollable option list, report search field, shell/menu dimensions |
| [Activities search](pages/Screenshots/Screenshot_Activities_Search.jpeg) | Activity search with filters and populated grid | Multi-filter search, bulk selection, columns/grouping/actions, list/map switch, large result counts |
| [Activities saved search](pages/Screenshots/Screenshot_Activities_Saved_Search.jpeg) | Activity saved-search management | Saved-search list and search-state controls |
| [Activities view](pages/Screenshots/Screenshot_Activities_View.jpeg) | Property/activity detail view | Header summary, tabs, permission banner, section cards, map, related information |
| [Activities reports](pages/Screenshots/Screenshot_Activities_Reports.jpeg) | Activity report selector | Shared report-selection layout across domains |
| [Companies search](pages/Screenshots/Screenshot_Companies_Search.jpeg) | Company hierarchy search | Hierarchy checkbox, client/child markers, logos, relationship columns, pagination |
| [Companies create](pages/Screenshots/Screenshot_Companies_Create.jpeg) | Company duplicate-check/create | Duplicate result, create-new action, company identifier field |
| [Properties search](pages/Screenshots/Screenshot_Properties_Search.jpeg) | Property search with list/map choice | Advanced search, asset-type filters, result cards, map/list tabs, widen/create actions |
| [Requirements create](pages/Screenshots/Screenshot_Requirements_Create.jpeg) | Create requirement form | Three-column form, configured checkboxes, applicant/negotiator cards, address controls, sticky footer |
| [Requirements search](pages/Screenshots/Screenshot_Requirements_Search.jpeg) | Requirement search grid | Search scope, filters, wide results, bulk selection, columns/grouping/actions |
| [Requirements saved search](pages/Screenshots/Screenshot_Requirements_Saved_Search.jpeg) | Requirement saved-search management | Saved-search layout and controls |
| [Requirements reports](pages/Screenshots/Screenshot_Requirements_Reports.jpeg) | Requirement report selector | Shared report-selection layout |
| [Tenancies search](pages/Screenshots/Screenshot_Tenancies_Search.jpeg) | Tenancy search grid | Lease dates, rent, landlord/tenant, negotiator, department, progress and paging |
| [Tenancies saved search](pages/Screenshots/Screenshot_Tenancies_Saved_Search.jpeg) | Tenancy saved-search management | Saved-search layout and controls |
| [Tenancies reports](pages/Screenshots/Screenshot_Tenancies_Reports.jpeg) | Tenancy report selector | Shared report-selection layout |
| [Instructions search](pages/Screenshots/Screenshot_Instructions_Search.jpeg) | Instruction search | Instruction filters, result layout, actions and paging |
| [Instructions create](pages/Screenshots/Screenshot_Instructions_Create.jpeg) | Instruction create form | Instruction sections, configured controls and save/cancel footer |
| [Pitches search](pages/Screenshots/Screenshot_Pitches_Search.jpeg) | Pitch search | Search criteria, result grid and actions |
| [Pitches create](pages/Screenshots/Screenshot_Pitches_Create.jpeg) | Pitch create form | Compact pitch form and save actions |
| [Marketing lists search](pages/Screenshots/Screenshot_Marketing_Lists_Search.jpeg) | Marketing-list search | Search and list result behavior |
| [Marketing lists create](pages/Screenshots/Screenshot_Marketing_Lists_Create.jpeg) | Marketing-list create form | List setup fields and save/cancel behavior |
| [Connexions search](pages/Screenshots/Screenshot_Connexions_Search.jpeg) | Connexions search | Cross-domain list/search layout |
| [Connexions create](pages/Screenshots/Screenshot_Connexions_Create.jpeg) | Connexions create form | Cross-domain creation controls |

## Confirmed visual observations

- The desktop shell uses a dark left navigation rail with a compact icon-only
  state in the supplied captures.
- The top bar contains the Hub mark, environment label, page title, browser
  compatibility notice, notification count, help link, user/database context,
  and profile menu.
- The primary accent is a dark pink/red used for search, actions, links, and
  selected-state emphasis.
- Dashboard widgets use domain-specific header colors: blue, lime, teal,
  purple, orange, olive, and black.
- Search results use wide horizontal tables with compact rows, small inline
  phone/email markers, row-level preview/edit actions, and a bottom-right
  paginator.
- Large result grids support bulk selection, configurable columns, sorting,
  grouping, actions, list/map switching, and result counts that can exceed the
  visible page.
- Asset result rows can include photographs, property-type/status badges,
  inactive markers, locked fields, and separate preview/edit actions.
- Detail pages use a record header with previous/next navigation, tabs, a
  permission banner where applicable, and three-column card sections.
- Create forms can use a three-column layout with independent scroll regions,
  configured checkboxes, nested relationship cards, map/address controls, and
  a sticky bottom Cancel/Save footer.
- Search screens commonly expose a `My`/`Dept`/`All` scope switcher and retain
  active-filter chips above the result grid.
- Forms use bordered rounded cards with a pale background, compact labels, and
  a prominent rounded action button.
- The report selector uses a large left type list and a wide right report
  selector, with a visible internal scrollbar in the type list.

## Limitations

These captures establish one wide desktop state only. They do not yet establish:

- exact CSS pixel dimensions independent of image scaling;
- mobile or narrow-screen behavior;
- hover, focus, validation-error, loading, modal, or empty-result states;
- role-specific menu differences;
- populated report results or create-save outcomes;
- whether the displayed data is representative of all service lines.

## Capture metadata still needed

For each future capture, record:

- route;
- browser and version;
- viewport dimensions and device scale factor;
- user role and proxy-user context;
- selected filters and data state;
- whether the screenshot is before, during, or after an action.
