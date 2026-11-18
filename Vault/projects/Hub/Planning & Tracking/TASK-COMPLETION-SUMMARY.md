# Hub documentation completed-deliverable register

This file records what has been delivered. It is not the active backlog; see [README.md](./README.md) and [NEXT-STEPS.md](./NEXT-STEPS.md).

## Completed deliverables

| Area | Delivered | Location |
|---|---|---|
| Architecture | System context, runtime inventory, hosting evidence, stores, transports, and integration boundaries | [architecture-blueprint.md](../Architecture%20%26%20Infrastructure/architecture-blueprint.md), [source-inventory.md](../Architecture%20%26%20Infrastructure/source-inventory.md) |
| Handler inventory | 27 WebJob modules and 60+ handler classes with triggers, message types, and responsibilities | [message-transport-inventory.md](../Architecture%20%26%20Infrastructure/message-transport-inventory.md) |
| Process flows | 12 Mermaid diagrams covering asynchronous processing, Thirdfort, notifications, CDD, consent, documents, tenancy, brochures, integration results, and email | [process-flows.md](../Architecture%20%26%20Infrastructure/process-flows.md) |
| Integration rules | 41 Gherkin scenarios covering integrations, consent, notifications, CDD, tenancy, brochures, and result handlers | [business-rules.md](../Architecture%20%26%20Infrastructure/business-rules.md) |
| Core domain | Contact, Property, Activity, Requirement, Tenancy, Offer, relationships, and business processes | [CORE-DOMAIN.md](../Core%20Business%20Domain/CORE-DOMAIN.md) |
| API workflows | Six end-to-end workflows with API sequences, preconditions, and state changes | [API-WORKFLOWS.md](../Core%20Business%20Domain/API-WORKFLOWS.md) |
| State and validation | State machines, validators, transition matrices, and 33 state-machine/validation scenarios | [STATE-MACHINES-VALIDATORS.md](../Core%20Business%20Domain/STATE-MACHINES-VALIDATORS.md) |
| Angular GUI baseline | Application structure, routes, entities, processes, validations, screen layouts, generated services, API call patterns, and embedded business-rule classification | [angular-gui-analysis.md](../Architecture%20%26%20Infrastructure/angular-gui-analysis.md) |
| GUI parity P0-P3 | Route inventory, page contracts, source-derived field/validation catalogue, visual/layout contract, responsive rules, feedback states, and supplied screenshot evidence | [GUI parity specification](../GUI/PARITY-SPECIFICATION.md), [P2 field catalogue](../GUI/p2-field-catalogue.md), [P3 visual contract](../GUI/p3-visual-contract.md) |
| Configuration baseline | Checked-in local/development queue, topic, and subscription values | [message-transport-inventory.md](../Architecture%20%26%20Infrastructure/message-transport-inventory.md) |

## Current totals

- 27 WebJob modules
- 60+ handler classes
- 12 Mermaid process-flow diagrams
- 41 integration-rule Gherkin scenarios
- 33 state-machine/validation Gherkin scenarios
- 74 Gherkin scenarios overall

## Not included in the completed count

The following remain open and must not be presented as complete:

- Production configuration overrides and transport policies
- SME approval
- Monitoring, security, SLA, deployment, and operations handoff
- Additional handler-level error, retry, reconciliation, and idempotency coverage
- Replacement GUI implementation and P4 rendered comparison

## Verification register

Use this register for items that require confirmation after documentation has
been written. An item is only complete when the status is `Verified` and the
evidence or source of confirmation is recorded.

| Verification item | Status | Evidence / source | Verified by | Date |
|---|---|---|---|---|
| Dev/local queue names match checked-in configuration | Verified | `Web.config` and `App.config` inventory | Documentation review | 2026-11-17 |
| Dev/local Service Bus topics and subscriptions match checked-in configuration | Verified | `Web.config` and `App.config` inventory | Documentation review | 2026-11-17 |
| Production changes only the `local`/`dev` environment token to `prd` | Pending | Deployment parameters or environment settings required | — | — |
| Production transport retry, timeout, dead-letter, poison-message, and idempotency policies | Pending | Operations configuration or runbook required | — | — |
| Core domain, API workflows, state machines, and business rules reviewed by SME | Pending | SME review notes or approval | — | — |
| Angular GUI screens, layouts, validations, and API call map reviewed by front-end SME | Pending | HTML/SCSS review, API specification comparison, or approval notes | — | — |
| Embedded Angular business rules classified against server/API behaviour | Verified | Source scan recorded in `angular-gui-analysis.md`; server-backed transition validation identified | Documentation review | 2026-11-17 |
| GUI parity P0-P3 source-derived documentation complete | Verified | Route, page-contract, P2 schema, P3 visual-contract, and screenshot-evidence documents | Documentation review | 2026-11-18 |
| Monitoring, security, SLA, ownership, deployment, and rollback documentation reviewed | Pending | Operations / Security / DevOps review | — | — |

### Verification status values

- `Verified` — evidence has been recorded and the named verifier confirmed it.
- `Pending` — not yet checked or evidence is still required.
- `Blocked` — verification cannot proceed until a named dependency or owner responds.
- `Rejected` — the documented assumption or implementation is incorrect and needs correction.
