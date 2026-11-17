# Hub documentation

## Status

**In progress - architecture baseline and first process/rule slices documented**

The Hub documentation is based on the source repository at `C:\Source\Devops\KnightFrank.hub`. It is not complete until the source inventory, architecture, process flows, and business rules have been reviewed by a Hub subject-matter expert and the remaining deployment and operational gaps are resolved or recorded.

## Contents

- [Architecture blueprint](./architecture-blueprint.md)
- [Source inventory](./source-inventory.md)
- [Message and transport inventory](./message-transport-inventory.md)
- [Process flows](./process-flows.md)
- [Business rules](./business-rules.md)

## Completed in this pass

- Documented the system context, containers, asynchronous processing pattern, and ArchiMate-inspired layers.
- Identified the Angular client, ASP.NET Web API, shared domain/DAL libraries, SQL Server database project, WebJobs, Azure Storage, Service Bus contracts, Elasticsearch, external adapters, reporting, and operational tools.
- Recorded IIS/Windows hosting evidence from the local provisioning script.
- Catalogued the Service Bus topic configuration keys from `Hub.Contracts`.
- Documented the Thirdfort request and response flow from source handlers.
- Captured source-linked Gherkin scenarios for Thirdfort validation, persistence, error handling, report storage, and acknowledgement.

## Remaining work

1. Map every runtime project to its production hosting target and deployment package.
2. Resolve actual queue/topic/subscription names from environment configuration.
3. Catalogue all WebJob handlers and associate them with business processes.
4. Add process flows for the highest-value property, contact, tenancy, document, notification, and integration journeys.
5. Extract additional business rules from domain validators and handlers.
6. Review diagrams and rules with a Hub subject-matter expert.
7. Record monitoring, retry, dead-letter, security, and operational ownership.

Azure service-specific notes remain blocked until the Hub baseline has been reviewed.

