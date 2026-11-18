# Hub GUI parity specification

## Objective

This specification defines the **as-is** Hub GUI that a replacement
application must reproduce. It is not a redesign brief. Angular is only the
source implementation; the target specification is the observable page,
layout, field, validation, interaction, and feedback behavior.

## Fidelity levels

| Level | Meaning |
|---|---|
| P0 | Route/page exists and has the same user responsibility |
| P1 | Tabs, panels, dialogs, commands, and navigation match |
| P2 | Fields, labels, control types, defaults, visibility, and validation match |
| P3 | Layout dimensions, spacing, responsive behavior, styling, and feedback match |
| P4 | Rendered output is verified against the existing GUI at representative viewport/data states |

The current vault is at P0-P1 for most areas and P2 for selected core
workflows. The new page specifications are intended to move the project toward
P2-P3 before any replacement implementation is generated.

## Canonical page specification

Each page document should describe:

1. route and entry points;
2. page title and environment context;
3. page regions, columns, tabs, accordions, and panels;
4. fields and controls;
5. initial data and lookup requests;
6. defaults and conditional visibility;
7. client-side validation;
8. server-side validation and commands;
9. loading, empty, warning, error, and success states;
10. dirty-form and navigation behavior;
11. refresh and route-reuse behavior;
12. role restrictions;
13. responsive and sizing rules;
14. source evidence.

## Source-of-truth hierarchy

When evidence conflicts, use this order:

1. rendered behavior verified in the existing application;
2. page template and style source;
3. page component and resolver logic;
4. shared control implementation;
5. generated API client and API/domain documentation;
6. existing vault summaries.

The vault should record the result and retain the source path for traceability.

## What can be generated from the parity specification

A replacement framework can be generated once the page documents contain:

- route and page metadata;
- a field/control schema;
- a validation schema;
- a layout schema;
- an interaction/state schema;
- API operation mappings;
- visual tokens and screenshot references where pixel parity is required.

The replacement should not reproduce Angular module boundaries, generated
client class names, or RxJS implementation details unless they are needed for
compatibility.
