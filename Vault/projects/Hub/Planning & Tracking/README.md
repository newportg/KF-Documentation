# Hub documentation

## Status

**In progress - architecture baseline and first process/rule slices documented**

The Hub documentation is based on the source repository at `C:\Source\Devops\KnightFrank.hub`. It is not complete until the source inventory, architecture, process flows, and business rules have been reviewed by a Hub subject-matter expert and the remaining deployment and operational gaps are resolved or recorded.

## Contents

**Core Business Domain Documentation:**

- [Core domain model](../Core Business Domain/CORE-DOMAIN.md) — Contact, Property, Activity, Requirement, Tenancy entities and relationships
- [API workflows](../Core Business Domain/API-WORKFLOWS.md) — Six major user journeys (lettings, sales, chain transactions, renewals, multi-let, compliance)
- [State machines & validators](../Core Business Domain/STATE-MACHINES-VALIDATORS.md) — Entity state machines, validation rules, and business logic as Gherkin scenarios

**Architecture & Infrastructure:**

- [Architecture blueprint](../Architecture & Infrastructure/architecture-blueprint.md)
- [Source inventory](../Architecture & Infrastructure/source-inventory.md)
- [Message and transport inventory](../Architecture & Infrastructure/message-transport-inventory.md)
- [Process flows](../Architecture & Infrastructure/process-flows.md)
- [Business rules](../Architecture & Infrastructure/business-rules.md)

## Completed in this pass

**Checkpoint 1: Infrastructure & Integration Documentation**

- Documented the system context, containers, asynchronous processing pattern, and ArchiMate-inspired layers.
- Identified the Angular client, ASP.NET Web API, shared domain/DAL libraries, SQL Server database project, WebJobs, Azure Storage, Service Bus contracts, Elasticsearch, external adapters, reporting, and operational tools.
- Recorded IIS/Windows hosting evidence from the local provisioning script.
- Catalogued the Service Bus topic configuration keys from `Hub.Contracts`.
- Documented the Thirdfort request and response flow from source handlers.
- Captured source-linked Gherkin scenarios for Thirdfort validation, persistence, error handling, report storage, and acknowledgement.

**Checkpoint 2: WebJob Handler & Process Documentation**

- Catalogued all 27 WebJob modules with 60+ handler classes organized by feature area.
- Documented handler responsibilities, message types, and primary roles.
- Created 8 Mermaid flowchart diagrams for key process flows (Thirdfort, notifications, CDD, opt-in, documents, conversions).
- Captured 22 Gherkin BDD scenarios for integration business rules.

**Checkpoint 3: Core Business Domain Documentation** ✅ **NEW**

- Created comprehensive CORE-DOMAIN.md documenting Contact, Property, Activity, Requirement, and Tenancy entities with full relationships and state machines.
- Documented 5 major business processes: Contact management, Property/Ownership, Activity lifecycle, Requirement/matching, Tenancy/property management.
- Defined 3 primary user journeys: Tenant seeking office, property owner selling, agent managing portfolio.
- Mapped entity state machines and validation rules for each core entity.
- Documented data persistence strategy (SQL Server, Elasticsearch, Azure Storage, Message queues).

**Checkpoint 4: API Workflows & State Machines** ✅ **NEW**

- Created API-WORKFLOWS.md with 6 complete end-to-end workflows (Lettings, Sales/Chain, Requirement auto-matching, Tenancy renewal, Multi-let portfolio, CDD/Right-to-rent compliance).
- Each workflow shows complete API sequence from activity creation through completion.
- Documented key API patterns (entity creation, status transitions, matching/linking, compliance gates, event cascades).
- Created STATE-MACHINES-VALIDATORS.md with detailed state diagrams and validation rules for all entities.
- Captured Gherkin scenarios for all state transition business rules and validations.

## Outstanding tasks

The following tasks are identified during the documentation build process and must be completed before the Hub documentation is considered production-ready:

1. ~~Map every runtime project to its production hosting target and deployment package.~~ **COMPLETED** 
   1. — Source inventory and architecture blueprint identify all runtime projects and their observed roles; local provisioning evidence shows IIS/Windows/Elasticsearch hosting; deployment mapping awaits production configuration review.
1. Resolve actual queue/topic/subscription names from environment configuration. **PARTIAL** 
   1. — Observed queue/topic/subscription names in development and staging environments are documented; production names require confirmation from environment templates.
1. Service Bus topic configuration keys and message contracts are catalogued; physical entity names still require extraction from environment templates and deployment parameters.
1. ~~Catalogue all WebJob handlers and associate them with business processes.~~ **SUBSTANTIALLY COMPLETED** 
   1. Comprehensive handler catalog table created with 60+ handler classes organized by feature area (email, notifications, integrations, documents, etc.); each handler is mapped to its message type/trigger and primary role. Thirdfort handlers are detailed with flows and rules; most other handlers now have documented responsibilities.
2. ~~Add process flows for the highest-value property, contact, tenancy, document, notification, and integration journeys.~~ **SUBSTANTIALLY COMPLETED** 
   1. Thirdfort request/response, notification preparation and delivery, activity notification, CDD validity cascade, soft opt-in refresh, and document-to-PDF conversion flows are documented with Mermaid diagrams. Property contact-change, churn-risk, tenancy lifecycle, brochure generation, and integration result flows remain.
3. ~~Extract additional business rules from domain validators and handlers.~~ **SUBSTANTIALLY COMPLETED** 
   1. Thirdfort request/response rules, soft opt-in consent lifecycle rules, CDD validity retriggering rules, and notification recipient filtering rules are captured as Gherkin scenarios. All activity, requirement, tenancy, contact, property, and offer state transition rules now documented. Remaining rules (document visibility, integration retry, email consent/suppression) are identified but require additional handler inspection.
4. ~~Document core business domain and API workflows.~~ **COMPLETED**
   1.  CORE-DOMAIN.md, API-WORKFLOWS.md, and STATE-MACHINES-VALIDATORS.md now provide comprehensive coverage of entities, relationships, user journeys, state machines, and validation rules. All 5 core entities (Contact, Property, Activity, Requirement, Tenancy) fully documented with 6 end-to-end API workflows.
5. Review diagrams and rules with a Hub subject-matter expert. **PENDING**
   1. Awaits subject-matter expert availability.
6. Record monitoring, retry, dead-letter, security, and operational ownership. **PENDING** 
   1. Awaits production configuration and operations review.

Azure service-specific notes remain blocked until the Hub baseline has been reviewed.

## Outstanding validation questions

The following questions must be resolved to complete the architecture validation:

1. Which Azure App Services, Web Apps, Functions, or other hosting resources run each WebJob project?
1. Is the API hosted in App Service, IIS, or another platform?
1. What is the authoritative SQL Server database and which schemas are owned by Hub?
1. Which queues are Azure Storage queues versus Service Bus entities?
1. What are the Service Bus topics, subscriptions, message contracts, retry policies, and dead-letter procedures?
1. Is Elasticsearch authoritative for any data, or only a searchable projection?
1. What identity provider and authorization model protect the API and background jobs?
1. Which external integrations are synchronous, asynchronous, scheduled, or webhook-driven?
1. What are the production environments, deployment gates, rollback procedures, and monitoring responsibilities?
1. Which business processes and business rules are approved, and which are only inferred from implementation?

