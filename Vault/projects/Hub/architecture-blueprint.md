# Hub architecture blueprint

## Status

**In progress - source-derived baseline with first-pass inventories and flows**

This blueprint was produced from the repository at `C:\Source\Devops\KnightFrank.hub`. It describes the architecture visible in source code and project files; it is not yet a production deployment diagram. Hosting topology, network boundaries, data ownership, and operational responsibilities must be confirmed against the deployment configuration and Azure resources.

## Scope and goals

The Hub is a business application platform with:

- an Angular web client;
- an ASP.NET Web API facade;
- domain, data-access, and shared infrastructure libraries;
- SQL Server persistence;
- asynchronous processing through Azure WebJobs, Azure Storage queues, and Azure Service Bus;
- document and image storage in Azure Storage;
- search and indexing through Elasticsearch;
- integrations with external services such as DocuSign, Fixflo, SLM, Thirdfort, Frontify, email, SAP, and Dotmailer;
- scheduled, batch, and operational tools;
- reporting and deployment assets.

The initial documentation scope is Hub only. Azure service-specific documentation should be created later in separate service folders after this baseline has been reviewed.

## Evidence used

| Area | Source evidence |
|---|---|
| Web client | `src/KnightFrank.Antares.Angular/package.json` |
| API surface | `src/KnightFrank.Antares.Api/Controllers/` |
| API composition | `src/KnightFrank.Antares.Api/App_Start/AutofacConfiguration.cs` |
| Domain and persistence | `src/KnightFrank.Antares.Domain/`, `src/KnightFrank.Antares.Dal/`, `src/KnightFrank.Antares.Database/` |
| Background processing | `src/WebJobs/` and `src/KnightFrank.Antares.WebJobsLocalService/` |
| Queue and Service Bus contracts | `src/Hub.Contracts/` and `src/KnightFrank.Antares.ServiceBus.Publisher/` |
| Azure Storage | `src/KnightFrank.Antares.Common.Azure/Services/AzureStorage/` |
| External integrations | `src/KnightFrank.Antares.ExternalServices/` and WebJob integration projects |
| Search | `src/KnightFrank.Antares.Search/`, `src/KnightFrank.Antares.SearchToFile/`, and Elasticsearch WebJobs |
| Reports and operations | `src/KnightFrank.Antares.Reports/`, `BuildDeploy/`, and `tools/` |

## Architecture summary

Hub is best treated as a **modular business platform with synchronous and asynchronous execution paths**, rather than as a single application:

1. Users and external clients call the Web API through the Angular application or other API consumers.
2. The API resolves application services through Autofac and uses domain logic, the DAL, SQL Server, search, storage, and external-service adapters.
3. API operations publish work to queues or Service Bus when processing is asynchronous or integration-driven.
4. Azure WebJobs consume queue, Service Bus, and timer-triggered work. They perform notifications, documents, feeds, compliance-related updates, search indexing, messaging, and external integrations.
5. Shared contracts define message subjects and trigger constants so publishers and consumers can interoperate.

## C4 system context

The following is a C4-style system-context view. Relationships are based on repository evidence; the precise external system names and trust boundaries remain to be confirmed.

```mermaid
flowchart LR
    user[/"Hub users"/]
    client[/"External API clients"/]
    hub["Hub platform"]
    ext["External business services\nDocuSign, Fixflo, SLM, Thirdfort,\nFrontify, SAP, Dotmailer, email"]
    identity["Identity and access provider\nconfirm exact implementation"]
    ops["Operations and deployment tooling"]

    user -->|"Uses web application"| hub
    client -->|"Calls HTTP API"| hub
    hub -->|"Reads/writes and exchanges business data"| ext
    user -->|"Authenticates"| identity
    hub -->|"Deployment, scheduled jobs, diagnostics"| ops
```

## C4 container view

Containers here represent deployable or independently hosted runtime areas visible in the repository. Several WebJob projects may be deployed together or separately; deployment configuration must confirm the final grouping.

```mermaid
flowchart TB
    user[/"Hub user"/]
    angular["Angular web client\nKnightFrank.Antares.Angular"]
    api["ASP.NET Web API\nKnightFrank.Antares.Api"]
    domain["Domain/application libraries\nKnightFrank.Antares.Domain\nKnightFrank.Antares.Common"]
    dal["Data access layer\nKnightFrank.Antares.Dal\nHubDbTasks.Dal"]
    db[("SQL Server\nAntares database project")]
    storage[("Azure Storage\nBlob, queue and file-share access")]
    bus[("Azure Service Bus")]
    jobs["Azure WebJobs host and modules\nWebJobs/*"]
    search[("Elasticsearch")]
    external["External service adapters\nExternalServices and integration jobs"]
    reports["Reporting and report assets\nSSRS/canned reports"]
    tools["Operational and data-fix tools"]

    user --> angular
    angular -->|"HTTP / SignalR"| api
    api --> domain
    api --> dal
    api --> storage
    api --> bus
    api --> search
    api --> external
    dal --> db
    domain --> dal
    jobs -->|"Queue and timer triggers"| storage
    jobs -->|"Service Bus triggers/messages"| bus
    jobs --> domain
    jobs --> dal
    jobs --> storage
    jobs --> search
    jobs --> external
    api --> reports
    tools --> db
    tools --> storage
    tools --> search
```

## Component view: asynchronous processing

This view shows the recurring asynchronous pattern. The exact queue names, retry policies, dead-letter handling, and idempotency guarantees should be documented per process.

```mermaid
flowchart LR
    api["API command or domain event"]
    publisher["ServiceBus.Publisher\nor queue client"]
    queue[("Azure Storage Queue\nor Service Bus topic/queue")]
    host["WebJobs host"]
    module["Feature WebJob module"]
    handler["Command/message handler"]
    data[("SQL / Storage / Elasticsearch")]
    integration["External integration"]
    telemetry["Logging and telemetry"]

    api --> publisher
    publisher --> queue
    queue --> host
    host --> module
    module --> handler
    handler --> data
    handler --> integration
    host --> telemetry
    handler --> telemetry
```

## ArchiMate-inspired layered view

This view uses ArchiMate concepts as labels while using Mermaid for portability in Obsidian. It is intended to be converted to a formal ArchiMate model once business actors, capabilities, and deployment nodes are confirmed.

```mermaid
flowchart TB
    subgraph business["Business layer"]
        actor["Business users\n<<business actor>>"]
        process["Property, contact, tenancy,\nactivity and document processes\n<<business process>>"]
        rule["Business rules and compliance decisions\n<<business rule>>"]
    end

    subgraph application["Application layer"]
        ui["Angular Hub UI\n<<application component>>"]
        api["Hub Web API\n<<application component>>"]
        jobs["Hub background processing\n<<application component>>"]
        integration["Integration adapters\n<<application component>>"]
        search["Search/indexing capability\n<<application service>>"]
    end

    subgraph technology["Technology layer"]
        runtime["Web/API and WebJob runtimes\n<<technology service>>"]
        sql["SQL Server\n<<technology node>>"]
        azure["Azure Storage and Service Bus\n<<technology service>>"]
        elastic["Elasticsearch\n<<technology node>>"]
        external["External platforms\n<<technology collaboration>>"]
    end

    actor --> process
    process --> rule
    process --> ui
    ui --> api
    api --> jobs
    api --> integration
    api --> search
    api --> runtime
    jobs --> azure
    jobs --> sql
    jobs --> elastic
    integration --> external
    api --> sql
    search --> elastic
```

## Key architectural characteristics

- **Synchronous API path:** Angular and other clients call a broad controller surface in the Web API.
- **Shared domain path:** API and WebJobs both reference shared domain/common code, so changes to domain behaviour can affect both interactive and background processing.
- **Asynchronous integration:** Queue and Service Bus messages decouple API work from long-running, scheduled, or integration-heavy processes.
- **Document-centric storage:** Azure Storage abstractions cover blobs, queues, and file shares, including document, image, video, template, and certificate resources.
- **Search projection:** Elasticsearch is a separate search/indexing concern and should be documented as a projection of authoritative business data, unless source analysis proves otherwise.
- **Modular background jobs:** WebJob projects are feature-oriented, including email, notifications, documents, feeds, SAP, Thirdfort, Elasticsearch, tenancy, and compliance-related processing.
- **Legacy and modern technology coexistence:** The repository contains .NET Framework projects and an Angular 19 client, so runtime and deployment compatibility needs explicit documentation.

