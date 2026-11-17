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
