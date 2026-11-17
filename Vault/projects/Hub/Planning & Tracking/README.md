# Hub documentation planning and tracking

**Status:** Source-derived documentation substantially complete; production validation and review remain open
**Last updated:** 2026-11-17

This directory contains the current status and backlog for the Hub documentation. Historical checkpoint summaries are retained for traceability but are not the source of current counts or task status.

## Current snapshot

| Area | Status | Current position |
|---|---|---|
| Runtime and architecture inventory | Complete | Runtime projects, hosting evidence, stores, transports, and integrations are documented. |
| WebJob handler inventory | Substantially complete | 27 WebJob modules and 60+ handler classes are catalogued. |
| Core business domain | Complete for source review | Contact, Property, Activity, Requirement, Tenancy, and Offer coverage is documented. |
| API workflows | Complete for source review | Six end-to-end workflows are documented. |
| Process flows | Substantially complete | 12 Mermaid process-flow diagrams are documented. |
| Business rules | Substantially complete | 41 integration-rule scenarios plus 33 state-machine scenarios are documented. |
| Queue/topic configuration | Partial | Dev/local names are in repository configuration; deployment changes the environment token to `prd`, while transport policies remain unverified. |
| SME review | Not started | Business and technical validation is still required. |
| Operations handoff | Not started | Production monitoring, retry, security, SLA, and runbook information is still required. |

## Completed

- Documented the system context, runtime projects, data stores, integrations, and asynchronous processing pattern.
- Catalogued 27 WebJob modules and 60+ handler classes in [message-transport-inventory.md](../Architecture%20%26%20Infrastructure/message-transport-inventory.md).
- Added 12 Mermaid diagrams to [process-flows.md](../Architecture%20%26%20Infrastructure/process-flows.md).
- Added 41 integration-rule Gherkin scenarios to [business-rules.md](../Architecture%20%26%20Infrastructure/business-rules.md).
- Documented core entities and relationships in [CORE-DOMAIN.md](../Core%20Business%20Domain/CORE-DOMAIN.md).
- Documented six API journeys in [API-WORKFLOWS.md](../Core%20Business%20Domain/API-WORKFLOWS.md).
- Documented state machines, validators, and transition matrices in [STATE-MACHINES-VALIDATORS.md](../Core%20Business%20Domain/STATE-MACHINES-VALIDATORS.md).
- Recorded local/development queue, topic, and subscription values from checked-in configuration.
- Enabled MkDocs strikeout rendering with `pymdownx.tilde`.

## Open work

| Priority | Work item | Owner/input needed | Output |
|---|---|---|---|
| High | Verify deployment replaces only the `local`/`dev` environment token with `prd` | DevOps / Operations | Production transport verification |
| High | Confirm retry, visibility timeout, dead-letter, poison-message, and idempotency policies | DevOps / Operations | Operational transport rules |
| High | Review core entities, workflows, state transitions, and business rules | Hub SME / Product | Corrections and approval |
| High | Document monitoring, alerting, security, ownership, SLAs, deployment, rollback, and incident response | Operations / Security / DevOps | Operations handoff |
| Medium | Add activity and requirement handler-level transition rules | Engineering / Product | Additional source-derived rules |
| Medium | Add property contact-change, user reassignment, and search projection flows | Engineering | Mermaid process flows |
| Medium | Add top-handler error, retry, and reconciliation flows | Engineering / Operations | Error-path diagrams and rules |
| Medium | Document remaining document visibility, scheduling, retry, and idempotency rules | Engineering / Product | Additional Gherkin scenarios |

## Open validation questions

1. What production resources host each API and WebJob project?
2. Which SQL Server database and schemas are authoritative for Hub?
3. Which transports are Azure Storage queues versus Service Bus entities?
4. Do deployment parameters replace only the `local`/`dev` environment token with `prd`, and what are the retry policies and dead-letter procedures?
5. Is Elasticsearch authoritative or a derived search projection?
6. What identity, authorization, and secret-management model protects the API and jobs?
7. Which integrations are synchronous, asynchronous, scheduled, or webhook-driven?
8. What are the production deployment gates, rollback procedures, and monitoring responsibilities?
9. Which documented workflows and rules are approved business behavior rather than implementation inference?

## How to use this directory

- Start here for the current status and backlog.
- Use [NEXT-STEPS.md](./NEXT-STEPS.md) for the ordered action list.
- Use [TASK-COMPLETION-SUMMARY.md](./TASK-COMPLETION-SUMMARY.md) for the completed-deliverable register.

