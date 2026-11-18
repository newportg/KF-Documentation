# Layout and sizing specification

This document records measurable layout rules found in the current source.
Screen-specific dimensions remain in the page documents once each template and
stylesheet has been reviewed.

## Application shell

| Element | Current behavior |
|---|---|
| Main menu expanded width | `240px` minimum, maximum, and width |
| Main menu minimized width | `68px` minimum, maximum, and width |
| Main menu height | `100vh`, with matching minimum and maximum height |
| Main menu position | Sticky at the top of the viewport, above content |
| Main menu transition | `0.3s ease-in-out` width/appearance transition |
| Main menu item transition | `0.2s ease` color transition |
| Main menu footer | `0.5rem 22px` padding and a top border |
| Main menu item scroll area | Vertical scrolling; WebKit scrollbar width `5px` |
| Main content | Flex column, full available width, flexes to remaining space |
| Top toolbar stacking | Toolbar z-index `1000`; menu z-index `200` |
| Top-bar notification count | `12px` font, `24px 10px` padding |
| Top-bar notification/help controls | `10px 15px 15px` padding |
| Non-Chrome browser message | `12px` font, centered, top margin `40px` |
| Material table | Minimum width `100%`; intrinsic width can expand to content |

## Page layout conventions

The source repeatedly uses these layout classes and patterns:

- `p-absolute inset-0 overflow-y-auto` for full-height scrollable forms;
- `p-4` page and section padding;
- Bootstrap-style `row`, `col-md-*`, and `col-lg-*` responsive columns;
- `page-section` for bordered or grouped sections;
- `page-section-group` for sections containing subsections;
- `page-subsection` for divided content within a group;
- `page-section-title` and `page-subsection-title` for hierarchy;
- `page-footer page-footer-sticky` for persistent save/cancel actions;
- `stage stage-no-tabs` for page headers without a tab strip;
- entity color classes such as `contact-color`, `property-color`, and
  `requirement-color`.

## Form control sizing vocabulary

The source uses reusable sizing classes rather than one fixed field width:

| Class family | Meaning |
|---|---|
| `form-control-s` | Small control, commonly currency or compact enum |
| `form-control-m` | Medium control |
| `form-control-md-s` | Medium layout with small width |
| `form-control-md-m` | Medium layout with medium width |
| `form-control-group` | Inline group of related controls |
| `page-column` / `page-column-xs` | Page-specific responsive column sizing |

The exact pixel width for each class is defined by the shared stylesheet and
must be copied into a replacement design-token sheet during the CSS review.

## Responsive behavior

The source explicitly changes the main menu at small and extra-small
breakpoints. Page templates also use responsive Bootstrap-style columns, but
screen-by-screen behavior depends on the rendered CSS and content. A full
replacement must verify:

- column collapse order;
- minimum field widths;
- horizontal table overflow;
- sticky footer behavior;
- modal and side-panel width;
- map and gallery behavior;
- keyboard and touch targets.

## Source evidence

Primary evidence is in:

- `src/app/layout/layout.component.scss`;
- `src/app/layout/components/main-menu/main-menu.component.scss`;
- `src/styles.scss`;
- `src/styles/modules/`;
- each feature's `.html` and `.scss` files.
