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

## Tenancy lifecycle integrations

```mermaid
flowchart TD
    tenancy["Tenancy lifecycle trigger"] --> slm["Queue SlmTenancyQueueMessage"]
    slm --> slmHandler["Load tenant and landlord parties without Qube person IDs"]
    slmHandler --> slmLookup["Look up people in SLM using TenancySlmRef"]
    slmLookup -->|API failure| slmError["Record TenancyQubeException"]
    slmLookup -->|People returned| slmMatch["Match people by name and company"]
    slmMatch -->|Matched| saveQube["Save QubePersonId"]
    slmMatch -->|Not matched| matchError["Record QubePersonRecordNotMatched exception"]
    saveQube --> slmComplete["Save tenancy parties"]
    matchError --> slmComplete

    startTimer["Daily Fixflo start command"] --> startFilter["Select managed UK residential tenancies<br/>starting today or already started and not expired"]
    startFilter --> startParties["Load unsent landlord, tenant, and permitted-occupier parties"]
    startParties -->|Eligible| publishStart["Publish FixfloTenancyStarted event"]
    publishStart --> markSent["Mark published parties as sent to Fixflo"]
    startParties -->|No eligible parties or non-UK property| startSkip["Log and skip"]

    endTimer["Daily Fixflo end command"] --> endFilter["Select UK residential tenancies<br/>whose configured expiry offset has elapsed"]
    endFilter --> endParties["Load parties previously sent to Fixflo"]
    endParties -->|Eligible| publishEnd["Publish FixfloTenancyEnded event"]
    publishEnd --> resetSent["Reset IsSentToFixflo flags"]
    endParties -->|No eligible parties or non-UK property| endSkip["Log and skip"]

    churnTimer["Churn-risk update message"] --> churnLoad["Load tenancy"]
    churnLoad --> churnChanged{"Churn-risk changed?"}
    churnChanged -->|no| churnDone["No persistence"]
    churnChanged -->|yes| churnSave["Save tenancy and audit state change"]
    churnSave --> churnNote["Create tenancy note"]
    churnNote --> churnSearch["Refresh tenancy search fields"]

    archiveTimer["Out-of-hours archival command"] --> archiveFilter["Select eligible managed ILM tenancies<br/>expired more than six months with no current replacement"]
    archiveFilter --> archiveUpdate["Set Adiuvo removal and auto-removal flags"]
    archiveUpdate --> archiveSave["Save changes and audit"]
```

Sources:

- `src/WebJobs/KnightFrank.Antares.WebJobs.SlmTenancy/Services/SlmTenancyService.cs`
- `src/WebJobs/KnightFrank.Antares.WebJobs/CommandHandlers/Tenancy/Started/Fixflo/PublishFixfloTenancyStartedEventWithStartingDateCommandHandler.cs`
- `src/WebJobs/KnightFrank.Antares.WebJobs/CommandHandlers/Tenancy/Ended/Fixflo/PublishFixfloTenancyEndedEventWithEndingDateCommandHandler.cs`
- `src/WebJobs/KnightFrank.Antares.WebJobs/MessageHandlers/UpdateTenancyChurnRiskStatusQueueMessageHandler.cs`
- `src/WebJobs/KnightFrank.Antares.WebJobs/CommandHandlers/RemoveExpiredTenanciesFromOutOfHoursCommandHandler.cs`

## Brochure generation and completion

```mermaid
flowchart TD
    request["GenerateBrochureQueueMessage"] --> build["Build brochure data for activity and selected images"]
    build --> template{"Template name supplied?"}
    template -->|no| allItems["Build all brochure items as custom brochure"]
    template -->|yes| lookup["Request matching template from Frontify"]
    lookup -->|not found| templateError["Raise template-not-found error"]
    lookup -->|found| templateItems["Build items for the selected template"]
    allItems --> audit["Build audit metadata and Frontify request"]
    templateItems --> audit
    audit --> publish["Publish GenerateBrochure event to Frontify topic"]
    publish -->|publish failure| publishError["Raise publish failure"]
    publish -->|published| frontify["Frontify processes brochure"]
    frontify --> completeMsg["CompleteBrochuresQueueMessage"]
    completeMsg --> activity["Validate activity exists and read service line"]
    activity --> residential{"Residential sales or lettings?"}
    residential -->|no| completeSkip["No Frontify completion call"]
    residential -->|yes| complete["Call Frontify CompleteBrochure"]
    complete -->|API error| completeLog["Log Frontify API error"]
```

Sources:

- `src/WebJobs/KnightFrank.Antares.WebJobs/MessageHandlers/GenerateBrochureQueueMessageHandler.cs`
- `src/WebJobs/KnightFrank.Antares.WebJobs/MessageHandlers/CompleteBrochuresQueueMessageHandler.cs`

The inspected handlers publish the request and invoke Frontify completion. PDF storage and delivery notification are not implemented in these two handlers and require tracing elsewhere.

## Integration result handlers

```mermaid
flowchart TD
    response["External integration response"] --> type{"Result type"}

    type -->|HomePpl reference check| homeLoad["Load tenancy, party, and risk-report blob"]
    homeLoad --> homeStore["Store risk report in Blob Storage"]
    homeStore --> homeAttach["Attach report to permitted occupier, tenant, or guarantor"]
    homeAttach --> homeSave["Save progression state and publish status event"]
    homeSave --> homeSearch["Refresh tenancy progression search index"]
    type -->|HomePpl validation IDs| homeIds["Update validation IDs for tenant or permitted occupier"]
    homeIds --> homeIdsSave["Save tenancy progression records"]
    type -->|HomePpl error| homeError["Store reference-check error and reset party statuses"]

    type -->|TDS success| tdsAccepted["Set deposit status registered<br/>store certificate URL and API reference"]
    type -->|TDS failure| tdsFailed["Set deposit status not registered"]
    tdsAccepted --> tdsDownload{"Certificate URL available and download succeeds?"}
    tdsDownload -->|yes| tdsAttach["Store certificate blob and attach current document"]
    tdsDownload -->|no| tdsNoAttach["Log download failure or skip attachment"]
    tdsFailed --> tdsSave["Save progression state and errors"]
    tdsAttach --> tdsSave
    tdsNoAttach --> tdsSave
    tdsSave --> tdsNotify["Publish deposit registration result"]
    tdsAttach --> qubeQueue["Queue Qube tenancy and attachment synchronization"]

    type -->|Qube synchronization| qubeValidate["Validate ID and supported entity type"]
    qubeValidate --> qubeFresh{"No newer successful sync exists?"}
    qubeFresh -->|no| qubeSkip["Log and skip stale message"]
    qubeFresh -->|yes| qubeLoad["Load entity view model"]
    qubeLoad --> qubeSend["Send entity or tenancy attachments to Qube"]
```

Sources:

- `src/WebJobs/KnightFrank.Antares.WebJobs/MessageHandlers/HomePplResultQueueMessageHandler.cs`
- `src/WebJobs/KnightFrank.Antares.WebJobs/MessageHandlers/TDSResultQueueMessageHandler.cs`
- `src/WebJobs/KnightFrank.Antares.WebJobs/MessageHandlers/QubeSynchronizationQueueMessageHandler.cs`

## Email consent, suppression, and delivery

```mermaid
flowchart TD
    dotmailerTimer["Dotmailer suppression timer"] --> enabled{"Suppression job enabled?"}
    enabled -->|no| disabled["Log disabled and stop"]
    enabled -->|yes| runLog["Initialize Dotmailer run log"]
    runLog --> unsub["Import suppressed contacts since last run"]
    unsub -->|initial run| clear["Clear existing suppression records first"]
    unsub -->|new suppression| saveSuppressions["Save per-business suppression records"]
    saveSuppressions --> notifySuppressed["Queue local suppression command for incremental imports"]
    unsub --> resub["Import modified contacts since last run"]
    resub --> removeSuppressions["Remove matching per-business suppression records"]
    notifySuppressed --> runSuccess["Log suppression run success"]
    removeSuppressions --> runSuccess

    queued["Dotmailer email queued"] --> markStarted["Mark queue item started"]
    markStarted --> contact{"Contact and email still exist?"}
    contact -->|no| skipDeleted["Skip deleted contact"]
    contact -->|yes| consent["Resolve business-specific consent"]
    consent --> integrity{"Email-type consent still valid?"}
    integrity -->|no| skipConsent["Do not send"]
    integrity -->|yes| sendDotmailer["Send through Dotmailer"]

    emailQueue["SendEmailQueueMessage"] --> loadEmail["Load email and validate size"]
    loadEmail --> status{"Status is Outbox or Error?"}
    status -->|no| skipStatus["Log and skip"]
    status -->|yes| whitelist["Filter recipients by allowed-address whitelist"]
    whitelist -->|none remain| treatSuccess["Treat as handled without sending"]
    whitelist -->|recipients remain| strategy["Select email server strategy and send"]
    strategy -->|success| sent["Mark Sent and mark recipients sent"]
    strategy -->|failure| retry["Increment retry count and save error"]
    retry -->|fewer than five retries| requeue["Allow host-level retry"]
    retry -->|five or more retries| error["Mark email Error"]
```

Sources:

- `src/WebJobs/KnightFrank.Antares.DotmailerWebJob/Suppressions/DotmailerSuppressionsManager.cs`
- `src/WebJobs/KnightFrank.Antares.DotmailerWebJob/Suppressions/Steps/Unsubscribes/UnsubscribesStepRunner.cs`
- `src/WebJobs/KnightFrank.Antares.DotmailerWebJob/Suppressions/Steps/Resubscribes/ResubscribesStepRunner.cs`
- `src/WebJobs/KnightFrank.Antares.DotmailerWebJob/Emails/Handlers/BaseEmailHandler.cs`
- `src/WebJobs/KnightFrank.Antares.WebJobs.Email/MessageHandlers/SendEmailQueueMessageHandler.cs`

## Process documentation gaps

- Entry points for the main property contact-change and churn-risk journeys.
- Requirement auto-match and scheduled notification flow.
- User reassignment flow (task transfer, tenancy role updates).
- Search indexing and projection consistency flow.
- User-visible outcomes and SLAs for each process.
- Retry, poison-message, and dead-letter paths for each process.
- Compensating actions when an external service succeeds but local persistence fails.
- Process owners and operational runbooks.

