# Hub process flows

## Status

These are source-derived first-pass flows. They document confirmed behaviour for the Thirdfort asynchronous journey and a generic Hub asynchronous processing pattern. Additional flows are required for the main property, contact, tenancy, document, notification, and feed journeys.

## Generic asynchronous processing

```mermaid
flowchart TD
    trigger["API request, webhook, timer, or domain event"] --> publish["Publish queue or Service Bus message"]
    publish --> receive["WebJobs host receives message"]
    receive --> resolve["Resolve feature handler through dependency injection"]
    resolve --> validate["Validate message and business preconditions"]
    validate -->|invalid| logError["Log error and apply host retry behaviour"]
    validate -->|valid| process["Execute business operation"]
    process --> persist["Persist SQL, blob, search, or integration result"]
    persist --> success["Complete message"]
    process -->|failure| logError
```

## Thirdfort request

```mermaid
flowchart TD
    request["Thirdfort request message"] --> validateRequired["Validate required-check data"]
    validateRequired -->|errors| response["Queue Thirdfort response with errors"]
    validateRequired -->|valid| validateId["Validate identity-check data"]
    validateId -->|errors| response
    validateId -->|valid| build["Build Thirdfort transaction"]
    build --> send["Send request to Thirdfort"]
    send -->|external errors| response
    send -->|accepted| save["Save contact-to-transaction external ID"]
```

Source: `src/WebJobs/KnightFrank.Antares.WebJobs.Thirdfort/MessageHandlers/ThirdfortRequestQueueMessageHandler.cs`.

## Thirdfort response and report

```mermaid
flowchart TD
    response["Thirdfort response message"] --> contact["Load contact and latest CDD validity"]
    contact --> exists{"Contact exists?"}
    exists -->|no| fail["Log and rethrow processing failure"]
    exists -->|yes| errors{"Response contains errors?"}
    errors -->|yes| markError["Set Thirdfort error status and description"]
    errors -->|no| download["Download Thirdfort transaction report"]
    download --> blob["Create CDD PDF in Blob Storage"]
    blob --> attachment["Add current contact attachment"]
    attachment --> cleanup["Delete transaction record"]
    cleanup --> acknowledge["Acknowledge Thirdfort inbox message"]
    markError --> audit["Record changed business state"]
    acknowledge --> audit
    audit --> publish["Publish CDD validity updated event"]
```

Source: `src/WebJobs/KnightFrank.Antares.WebJobs.Thirdfort/MessageHandlers/ThirdfortResponseQueueMessageHandler.cs`.

## Process documentation gaps

- Entry points for the main property, contact, tenancy, document, and notification processes.
- User-visible outcomes and SLAs.
- Retry, poison-message, and dead-letter paths for each process.
- Compensating actions when an external service succeeds but local persistence fails.
- Process owners and operational runbooks.

