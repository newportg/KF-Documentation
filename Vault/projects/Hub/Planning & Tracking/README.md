# Hub project planning and tracking

**Status:** Stage 1 in progress; stages 2 and 3 proposed, not started
**Last updated:** 2026-11-24

This directory contains the project plan and current documentation status.
Historical checkpoint summaries are retained for traceability but are not the
source of current counts or task status.

## Project stages

| Stage | Objective | Current position | Exit / decision gate |
|---|---|---|---|
| **1. Document what we have** | Establish and review the current architecture, business rules, workflows, GUI, integrations and operating model. | Source-derived documentation is substantially complete; production validation, SME review and operations handoff remain open. | Review and approve the baseline, record unresolved assumptions and obtain owners' agreement that it is sufficient to support change. |
| **2. Short-term strategic updates** | Deliver selected, high-impact technology and architecture improvements in bounded increments. | Options identified; scope, owners and delivery have not been approved. | Review pilot evidence, business value, operational readiness and rollback; agree which changes are ready for production and which support stage 3. |
| **3. Major architectural changes** | Evolve Hub toward a UX and logic layer with client, property/asset and transaction capabilities separated where justified. | Target direction proposed; domain ownership, topology and migration scope are undecided. | Approve target design and business case; migrate by capability with verified data ownership, compatibility and operational handover. |

Stages provide the intended sequence, not fixed dates. Discovery for a later
stage can inform earlier work; production changes require an agreed baseline
and appropriate approval. Details and outstanding tasks are in
[NEXT-STEPS.md](./NEXT-STEPS.md), including the
[visual progress overview](./NEXT-STEPS.md#project-progress).

## Stage 1: current documentation snapshot

| Area | Status | Current position |
|---|---|---|
| Runtime and architecture inventory | Complete | Runtime projects, hosting evidence, stores, transports, and integrations are documented. |
| WebJob handler inventory | Substantially complete | 27 WebJob modules and 60+ handler classes are catalogued. |
| Core business domain | Complete for source review | Contact, Property, Activity, Requirement, Tenancy, and Offer coverage is documented. |
| API workflows | Complete for source review | Six end-to-end workflows are documented. |
| Process flows | Substantially complete | 12 Mermaid process-flow diagrams are documented. |
| Business rules | Substantially complete | 41 integration-rule scenarios plus 33 state-machine scenarios are documented. |
| Angular GUI analysis | P0-P3 complete | Routes, page contracts, field/validation schemas, visual/layout contract, responsive rules, feedback states, and supplied screenshot evidence are documented; replacement implementation and P4 comparison remain open. |
| Queue/topic configuration | Partial | Dev/local names are in repository configuration; production naming and transport policies remain unverified. |
| SME review | Not started | Business and technical validation is still required. |
| Operations handoff | Not started | Production monitoring, retry, security, SLA, and runbook information is still required. |

Verification status is tracked in the [verification register](./TASK-COMPLETION-SUMMARY.md#verification-register). Items are not complete until evidence, verifier, and date are recorded.

## Completed

- Documented the system context, runtime projects, data stores, integrations, and asynchronous processing pattern.
- Catalogued 27 WebJob modules and 60+ handler classes in [message-transport-inventory.md](../Architecture%20%26%20Infrastructure/message-transport-inventory.md).
- Added 12 Mermaid diagrams to [process-flows.md](../Architecture%20%26%20Infrastructure/process-flows.md).
- Added 41 integration-rule Gherkin scenarios to [business-rules.md](../Architecture%20%26%20Infrastructure/business-rules.md).
- Documented core entities and relationships in [CORE-DOMAIN.md](../Core%20Business%20Domain/CORE-DOMAIN.md).
- Documented six API journeys in [API-WORKFLOWS.md](../Core%20Business%20Domain/API-WORKFLOWS.md).
- Documented state machines, validators, and transition matrices in [STATE-MACHINES-VALIDATORS.md](../Core%20Business%20Domain/STATE-MACHINES-VALIDATORS.md).
- Added [angular-gui-analysis.md](../Architecture%20%26%20Infrastructure/angular-gui-analysis.md) covering Angular structure, entities, processes, validations, screen layouts, and API call layout.
- Classified embedded GUI rules as client-enforced, server-backed, or implementation-inferred.
- Completed the framework-neutral GUI parity specification through P3: route coverage,
  page contracts, validation schemas, visual/layout contract, responsive rules,
  feedback states, and screenshot evidence.
- Recorded local/development queue, topic, and subscription values from checked-in configuration.
- Enabled MkDocs strikeout rendering with `pymdownx.tilde`.

## Stage 1: open work

| Priority | Work item | Owner/input needed | Output |
|---|---|---|---|
| High | Verify deployment replaces only the `local`/`dev` environment token with `prd` | DevOps / Operations | Production transport verification |
| High | Confirm retry, visibility timeout, dead-letter, poison-message, and idempotency policies | DevOps / Operations | Operational transport rules |
| High | Review core entities, workflows, state transitions, and business rules | Hub SME / Product | Corrections and approval |
| High | Document monitoring, alerting, security, ownership, SLAs, deployment, rollback, and incident response | Operations / Security / DevOps | Operations handoff |
| Medium | Review GUI parity specification and replacement behavior with product | Front-end SME / Product | Corrections, approval, and browser/accessibility decisions |
| Medium | Add activity and requirement handler-level transition rules | Engineering / Product | Additional source-derived rules |
| Medium | Add property contact-change, user reassignment, and search projection flows | Engineering | Mermaid process flows |
| Medium | Add top-handler error, retry, and reconciliation flows | Engineering / Operations | Error-path diagrams and rules |
| Medium | Document remaining document visibility, scheduling, retry, and idempotency rules | Engineering / Product | Additional Gherkin scenarios |

Replacement GUI implementation and P4 verification are tracked under
stage 3 in [NEXT-STEPS.md](./NEXT-STEPS.md), if a replacement is approved.

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
- Use [hub-architecture-modernization-strategy.md](./hub-architecture-modernization-strategy.md) for the proposed target architecture and strategic step changes.
- Use [hub-high-impact-modernization-options.md](./hub-high-impact-modernization-options.md) for short-term modernization pilots and their trade-offs.
- Use [hub-modernization-and-performance-assessment.md](./hub-modernization-and-performance-assessment.md) for prioritized application improvement opportunities and a proposed sequence.
- Use [NEXT-STEPS.md](./NEXT-STEPS.md) for the ordered action list.
- Use [TASK-COMPLETION-SUMMARY.md](./TASK-COMPLETION-SUMMARY.md) for the completed-deliverable register.
- Use the [verification register](./TASK-COMPLETION-SUMMARY.md#verification-register) to record confirmed items.

