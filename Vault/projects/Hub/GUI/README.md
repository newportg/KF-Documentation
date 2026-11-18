# Hub GUI documentation

## Purpose

This directory documents the existing Hub user interface as a product and
interaction specification. It intentionally describes screens, navigation,
user actions, validation, feedback, and API-facing behavior without making
Angular a requirement for a replacement implementation.

The documentation is based on the source at:

```text
C:\Source\Devops\KnightFrank.hub\src\KnightFrank.Antares.Angular
```

It records implemented behavior, not necessarily approved future business
behavior. The product and subject-matter review items in
[traceability and open questions](./traceability-and-open-questions.md) remain
important.

## Document set

| Document | Contents |
|---|---|
| [Parity specification](./PARITY-SPECIFICATION.md) | Rules for producing a faithful replacement from the vault |
| [Layout and sizing](./layout-and-sizing.md) | Measured shell dimensions and layout conventions |
| [Page specifications](./pages/README.md) | Page-by-page parity inventory and coverage |
| [Navigation and access](./navigation-and-access.md) | Application shell, navigation, recent-item drawers, routes, and role visibility |
| [Screen catalogue](./screen-catalogue.md) | Screen families and the responsibilities of each domain area |
| [User interactions and workflows](./user-interactions-and-workflows.md) | Search, edit, state changes, documents, matching, communications, and dashboard behavior |
| [Shared UI and feedback](./shared-ui-and-feedback.md) | Reusable controls, layout conventions, loading, errors, notifications, and responsive behavior |
| [API interaction contract](./api-interaction-contract.md) | UI-to-service interaction patterns and the data needed by replacement screens |
| [Validation schema inventory](./validation-schema-inventory.md) | Source-derived control schemas, validation families, and P2 completion rules |
| [P1 page-contract coverage](./p1-page-contract-coverage.md) | Coverage matrix for routed page responsibilities and interaction surfaces |
| [P2 field catalogue](./p2-field-catalogue.md) | Source-derived field families, conditions, and validation rules |
| [Traceability and open questions](./traceability-and-open-questions.md) | Source evidence, confidence levels, and items requiring product or UX confirmation |
| [Screenshot evidence](./screenshot-evidence.md) | Supplied pre-production captures and visual parity observations |

## Replacement implementation principle

A replacement should preserve:

- the user-visible route and screen responsibilities;
- the search, preview, detail, edit, and relationship-panel flows;
- role-based visibility and authorization outcomes;
- client-side validation and calculated values;
- server-backed validation before important state transitions;
- confirmation, error, loading, and refresh behavior;
- the relationships between contacts, companies, properties, activities,
  requirements, offers, tenancies, documents, and communications.

The replacement does not need to preserve Angular modules, generated client
classes, RxJS services, Angular Material, or the current folder structure.
