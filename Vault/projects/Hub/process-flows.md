# Hub process flows

## Status

These are source-derived first-pass flows. They document confirmed behaviour for the Thirdfort asynchronous journey and several high-value business processes. Additional flows are required for property, contact, and remaining integration journeys.

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

## Notification preparation and delivery

```mermaid
flowchart TD
    trigger["Timer, webhook, or domain event"] --> message["Publish PrepareNotificationsQueueMessage"]
    message --> handler["Notification handler receives message"]
    handler --> validateEntity["Validate entity exists and type is supported"]
    validateEntity -->|invalid| error["Log error; halt processing"]
    validateEntity -->|valid| recipients["Determine recipients based on entity type"]
    recipients --> filter["Filter recipients by notification-type enablement"]
    filter --> security["Apply security access checks for secure notification types"]
    security --> recipients_final["Final recipient list"]
    recipients_final --> persist["Create NotificationRecipient records for each recipient"]
    persist --> queue_broadcast["Queue BroadcastNotificationsQueueMessage"]
    queue_broadcast --> queue_mobile["Queue BroadcastMobileNotificationsQueueMessage"]
    queue_mobile --> title["Generate notification title based on type"]
    title --> complete["Message processing complete"]
```

Source: `src/WebJobs/KnightFrank.Antares.WebJobs.Notifications/MessageHandlers/PrepareNotificationsQueueMessageHandler.cs`.

## Activity notification flow (example: outstanding KYC)

```mermaid
flowchart TD
    timer["Daily timer trigger"] --> retrieve["Query activities with outstanding KYC"]
    retrieve --> load_activities["Load activity, parties, and CDD validity records"]
    load_activities --> for_each["For each activity with outstanding KYC"]
    for_each --> get_contacts["Get related contact/party records"]
    get_contacts --> lookup_recipients["Look up recipients assigned to activity"]
    lookup_recipients --> prepare_msg["Build PrepareNotificationsQueueMessage"]
    prepare_msg --> queue["Queue notification message"]
    queue --> next["Process next activity or complete"]
    next --> sends["Recipients receive notifications via BroadcastNotifications and BroadcastMobileNotifications handlers"]
```

Source: `src/WebJobs/KnightFrank.Antares.WebJobs/CommandHandlers/ActivityOutstandingKycTobCommandHandler.cs`.

## CDD validity retriggering cascade

```mermaid
flowchart TD
    event["CDD validity changed for Contact or Company"] --> retrigger_msg["Publish CddValidityRetriggerStatesQueueMessage"]
    retrigger_msg --> handler["CddValidityRetriggerStatesQueueMessageHandler receives"]
    handler --> load_entity["Load contact or company"]
    load_entity --> valid_type{"Entity type valid?"}
    valid_type -->|no| error["Reject message; log error"]
    valid_type -->|yes| exists{"Entity exists?"}
    exists -->|no| fail["Entity-not-found error"]
    exists -->|yes| find_requirements["Find related requirements<br/>active, Applicant role, CDD present"]
    find_requirements --> find_instructions["Find related instructions<br/>active, Client role, CDD not null"]
    find_instructions --> find_activities["Find related activities<br/>active, non-representing, Vendor/Landlord, CDD submitted"]
    find_activities --> publish_requirements["Publish retrigger event for each requirement"]
    publish_requirements --> publish_instructions["Publish retrigger event for each instruction"]
    publish_instructions --> publish_activities["Publish retrigger event for each activity"]
    publish_activities --> complete["Cascade complete; downstream handlers recalculate"]
```

Source: `src/WebJobs/KnightFrank.Antares.WebJobs.CddValidity/MessageHandlers/CddValidityRetriggerStatesQueueMessageHandler.cs`.

## Soft opt-in consent refresh cycle

```mermaid
flowchart TD
    timer["Configured frequency timer"] --> load_contact["Load contact and consent records"]
    load_contact --> get_orgs["Get current active organisation units for contact"]
    get_orgs --> for_each["For each organisation unit"]
    for_each --> has_business{"Contact has business\nwith this org unit?"}
    has_business -->|no| clear["Clear existing consent expiry if present"]
    has_business -->|yes| consent_exists{"Valid consent\nexists?"}
    consent_exists -->|no| create["Create soft opt-in consent"]
    consent_exists -->|yes| still_active{"Contact still\nactive?"}
    still_active -->|yes| clear_expiry["Clear expiry/removal dates"]
    still_active -->|no| set_expiry["Set new expiry based on config"]
    create --> set_date["Assign expiry date from configuration"]
    set_date --> next_org["Move to next org unit"]
    clear --> next_org
    clear_expiry --> next_org
    set_expiry --> next_org
    next_org --> audit["Audit all state transitions"]
    audit --> save["Save contact consents"]
    save --> reindex["Reindex search"]
    reindex --> notify["Send SoftOptInYes or SoftOptInContinuation email"]
    notify --> complete["Consent refresh complete"]
```

Source: `src/WebJobs/KnightFrank.Antares.WebJobs.SoftOptIn/CommandHandlers/SoftOptInCommandHandler.cs`.

## Document-to-PDF conversion and storage

```mermaid
flowchart TD
    request["Document conversion request queued"] --> handler["WordToPdfConversionQueueMessageHandler receives"]
    handler --> validate["Validate conversion parameters"]
    validate -->|error| error["Log error; apply retry policy"]
    validate -->|valid| load_doc["Load source document"]
    load_doc --> convert["Convert to PDF via backend service"]
    convert --> blob["Store PDF in Azure Blob Storage"]
    blob --> notify["Notify completion or trigger dependent process"]
    notify --> attachment["Create document attachment record if needed"]
    attachment --> complete["Conversion complete; mark as sent to external systems"]
```

Source: `src/WebJobs/KnightFrank.Antares.WebJobs/MessageHandlers/WordToPdfConversionQueueMessageHandler.cs`.

## Process documentation gaps

- Entry points for the main property contact-change and churn-risk journeys.
- Requirement auto-match and scheduled notification flow.
- Tenancy lifecycle flow (SLM sync, Fixflo tenancy-started/ended, churn-risk updates, out-of-hours archival).
- Brochure generation flow (request → Frontify → completion → delivery).
- Integration result handlers (HomePpl, TDS, Qube synchronization).
- User reassignment flow (task transfer, tenancy role updates).
- Email delivery flow (queuing, batch Exchange operations, consent/suppression checks).
- Search indexing and projection consistency flow.
- User-visible outcomes and SLAs for each process.
- Retry, poison-message, and dead-letter paths for each process.
- Compensating actions when an external service succeeds but local persistence fails.
- Process owners and operational runbooks.

