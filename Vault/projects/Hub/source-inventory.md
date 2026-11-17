# Hub source inventory

## Scope

This inventory identifies source areas and their observed architectural roles. It is intentionally a first-pass inventory; it does not claim that every project is independently deployed.

## Runtime and application projects

| Area | Source location | Observed role | Status |
|---|---|---|---|
| Angular client | `src/KnightFrank.Antares.Angular/` | Angular 19 browser application with routing, forms, SignalR, Application Insights, and UI libraries | Confirmed from `package.json` |
| HTTP API | `src/KnightFrank.Antares.Api/` | ASP.NET Web API controllers for activities, contacts, properties, tenancies, documents, notifications, reports, integrations, and configuration | Confirmed from `Controllers/` |
| WebJobs host | `src/WebJobs/KnightFrank.Antares.WebJobs/` | Azure WebJobs SDK host; configures Service Bus, timers, queues, Autofac, cache, SQL types, and retry-related queue settings | Confirmed from `Program.cs` |
| WebJob modules | `src/WebJobs/` | Feature modules for notifications, documents, email, feeds, SAP, Thirdfort, Elasticsearch, tenancy, compliance, text messaging, templates, and more | Confirmed from project/module names |
| Local WebJob service | `src/WebJobs/KnightFrank.Antares.WebJobsLocalService/` | Windows service wrapper for local/background execution | Confirmed from project files |
| Service Bus publisher | `src/KnightFrank.Antares.ServiceBus.Publisher/` | Shared publishing component using Azure.Messaging.ServiceBus | Confirmed from `.csproj` |
| Claims recalculation | `src/KnightFrank.Antares.ClaimsRecalculation/` | Claims recalculation pipelines and Elasticsearch bulk operation support | Confirmed from source files |
| Tools | `tools/` | Data fixes, configuration, image processing, Elastic administration, token generation, and resource/deployment tools | Confirmed from project names |

## Shared application layers

| Layer | Source location | Observed responsibility |
|---|---|---|
| Contracts | `src/Hub.Contracts/` | Service Bus topic message, publisher subject, trigger configuration keys, and Fixflo failure message |
| Domain | `src/KnightFrank.Antares.Domain/` | Business/domain services, validators, events, external-service clients, and integration logic |
| Common | `src/KnightFrank.Antares.Common/` | Shared types, enums, queue messages, extensions, and cross-cutting functionality |
| Data access | `src/KnightFrank.Antares.Dal/` | Repositories and persistence models |
| Hub DB tasks DAL | `src/KnightFrank.Antares.HubDbTasks.Dal/` | Database task repository |
| Azure common | `src/KnightFrank.Antares.Common.Azure/` | Blob, queue, file-share, storage policy, and telemetry abstractions |
| Search | `src/KnightFrank.Antares.Search/` and `src/KnightFrank.Antares.SearchToFile/` | Search access and search-to-file functionality |
| Database | `src/KnightFrank.Antares.Database/` | SQL Server database project and data/configuration scripts |
| Reports | `src/KnightFrank.Antares.Reports/` | Canned/SSRS report project and data sources |

## External systems and integration areas

The repository contains integration code or WebJob modules for:

- DocuSign;
- Fixflo;
- SLM tenancy;
- Thirdfort;
- Frontify;
- SAP;
- Dotmailer;
- email and SMTP/exchange paths;
- Elasticsearch;
- website/property feeds.

The exact endpoint, authentication, schedule, ownership, and failure behaviour for each integration still requires configuration and operational review.

## Deployment and infrastructure evidence

The local provisioning script at `BuildDeploy/ProvisioningConfiguration.ps1` demonstrates:

- IIS features and ASP.NET 4.5 installation;
- Windows authentication configuration for the local client site;
- an IIS application for the API under the client site;
- SQL Server TCP enabled on port 1433;
- Elasticsearch 7.17.6 and Logstash 7.17.6 installed as Windows services/components;
- Node.js 10.23.0 installed for the local client toolchain.

This is **local provisioning evidence**, not proof of the production topology.

## Known gaps

- No complete project-to-production-host mapping has been established.
- Environment-specific configuration is distributed across deployment templates and configuration files.
- Queue names, Service Bus entity names, subscriptions, and retry/dead-letter settings are not yet fully catalogued.
- Identity, network boundaries, secrets management, and monitoring ownership are not established by this inventory.

