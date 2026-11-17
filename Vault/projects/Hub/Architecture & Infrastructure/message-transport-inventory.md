# Hub message and transport inventory

## Service Bus topic configuration keys

`src/Hub.Contracts/HubServiceBus/HubServiceBusTriggerConstants.cs` defines the following application-setting keys. The values below are from the checked-in `Web.config` and `App.config` files and represent local/development configuration, not confirmed production values.

| Key | Likely message area | Physical entity name |
|---|---|---|
| `ActivityServiceBusTriggerTopicName` | Activity events | `sbt-activity-local-ee` |
| `CompanyServiceBusTriggerTopicName` | Company events | `sbt-company-local-ee` |
| `ContactServiceBusTriggerTopicName` | Contact events | `sbt-contact-local-ee` |
| `FixfloWebhookServiceBusTriggerTopicName` | Fixflo webhook events | `sbt-fixflowebhook-local-ee` |
| `PropertyServiceBusTriggerTopicName` | Property events | `sbt-property-local-ee` |
| `PropertyManagementServiceBusTriggerTopicName` | Property management events | Not present in inspected configs |
| `TenancyServiceBusTriggerTopicName` | Tenancy events | `sbt-tenancy-local-ee` |
| `UserServiceBusTriggerTopicName` | User events | `sbt-user-local-ee` |
| `TealRequestServiceBusTriggerTopicName` | Teal requests | `sbt-tealrequest-dev-ne` |
| `FrontifyServiceBusTriggerTopicName` | Frontify requests | `sbt-frontifyrequest-dev-ne` |
| `NorthStarContactServiceBusTriggerTopicName` | NorthStar contact events | `sbt-northstar-dev-ne` |

Source: `src/KnightFrank.Antares.Api/Web.config` and `src/WebJobs/KnightFrank.Antares.WebJobs/App.config`.

The `local-ee` and `dev-ne` suffixes identify the checked-in environment configuration. Production values still require the deployed environment configuration.

## Additional Service Bus topics and subscriptions

| Configuration key | Physical entity name |
|---|---|
| `FrontifyResponseServiceBusTriggerTopicName` | `sbt-frontifyresponse-dev-ne` |
| `FixfloFailedMessageServiceBusTriggerTopicName` | `sbt-fixflo-api-failed-message-local-ee` |
| `EmailMessageServiceBusTriggerTopicName` | `sbt-email-api-message-local-ee` |
| `AzureBusTopicName` | `sbt-docmgmt-scan-result-dev-ne` |
| `TealResponseServiceBusTriggerTopicName` | `sbt-tealresponse-dev-ne` |

| Configuration key | Subscription name |
|---|---|
| `FrontifyBespokeBrochureResponseSubscriptionName` | `sbts-kfl-md-generatebrochure-dev-ne` |
| `HubApiFixfloFailedMessageServiceBusSubscriptionName` | `sbts-hub-antares-api-local-ee` |
| `HubApiEmailMessageServiceBusSubscriptionName` | `sbts-hub-antares-api-local-ee` |
| `AzureBusSubscriptionName` | `sbts-docmgmt-scan-result-dev-ne` |
| `TealSendInvitationsResponseServiceBusSubscriptionName` | `sbts-tealresponse-sendinvitations-dev-ne` |
| `TealMaterialInformationResponseServiceBusSubscriptionName` | `sbts-tealresponse-materialinformation-dev-ne` |
| `TealTitleDeedResponseServiceBusSubscriptionName` | `sbts-tealresponse-titledeeds-dev-ne` |

## Configured Azure Storage queues

The checked-in API and WebJob configuration defines these queue names:

| Configuration key | Physical queue name |
|---|---|
| `Queue.AzureResource` | `command-queue-azure-resource` |
| `Queue.PrepareNotifications` | `command-queue-prepare-notifications` |
| `Queue.ElasticSearch` | `command-queue-elastic-search` |
| `Queue.FeedCentre` | `command-queue-feed-centre` |
| `Queue.ExternalPortalsFeed` | `command-queue-external-portals-feed` |
| `Queue.Email` | `command-queue-email` |
| `Queue.SlmTenancy` | `command-queue-slm-tenancy` |
| `Queue.BatchEmail` | `command-queue-batch-email` |
| `Queue.TextMessage` | `command-queue-text-message` |
| `Queue.WordToPdfConversion` | `command-queue-word-to-pdf` |
| `Queue.UploadedContact` | `command-queue-uploaded-contact` |
| `Queue.Sap` | `command-queue-sap` |
| `Queue.Qube` | `command-queue-qube` |
| `Queue.ReassignUser` | `command-queue-reassign-user` |
| `Queue.ResyncPropertiesToFixflo` | `command-queue-resync-properties-to-fixflo` |
| `Queue.QubeFailures` | `command-queue-qube-failure` |
| `Queue.BroadcastNotifications` | `command-queue-broadcast` |
| `Queue.BroadcastMobileNotifications` | `command-queue-broadcast-mob` |
| `Queue.SearchToFile` | `command-queue-search-to-file` |
| `Queue.ContactNegotiatorNotification` | `command-queue-contact-negotiator` |
| `Queue.ExportMarketingListToDotmailer` | `command-queue-dotmailer-export` |
| `Queue.TemplateGeneration` | `command-queue-template-generation` |
| `Queue.PrimaryAddressNotification` | `command-queue-primary-address` |
| `Queue.CddValidityRetriggerStates` | `command-queue-cdd-validity-retrigger` |
| `Queue.ActivityCddUpdate` | `command-queue-activity-cdd-update` |
| `Queue.ActivityCounterpartyCddUpdate` | `command-queue-activity-cnt-cdd-upd` |
| `Queue.MergeMarketingLists` | `command-queue-merge-marketing-lists` |
| `Queue.RequirementCddUpdate` | `command-queue-requirement-cdd-update` |
| `Queue.BulkMarketingReport` | `command-queue-bulk-marketing-report` |
| `Queue.BulkMatchEmail` | `command-queue-bulk-match-email` |
| `Queue.ThirdfortRequest` | `command-queue-thirdfort-request` |
| `Queue.ThirdfortResponse` | `command-queue-thirdfort-response` |
| `Queue.SoftOptIn` | `command-queue-soft-optin` |
| `Queue.ContactCustomerJourneys` | `command-queue-contact-journey` |
| `Queue.ActivityAssetWebLinks` | `command-queue-web-links` |
| `Queue.BatchEwsOperations` | `command-queue-batch-ews-operations` |
| `Queue.TenancyChurnRiskStatus` | `command-queue-tenancy-churn-risk` |
| `Queue.UpdatePortalVisibilityExistingDocs` | `command-queue-update-portal-visibility` |
| `Queue.RefreshRelatedActivityNotes` | `command-queue-related-notes` |
| `Queue.FixfloTenancy` | `command-queue-fixflo-tenancy` |
| `Queue.CompleteBrochures` | `command-queue-complete-brochures` |
| `Queue.GenerateBrochure` | `command-queue-generate-brochure` |
| `Queue.HomePplRequests` | `command-queue-homeppl-request` |
| `Queue.HomePplCallback` | `command-queue-homeppl-callback` |
| `Queue.TDSSend` | `command-queue-tds-outbound` |
| `Queue.TDSRetrieve` | `command-queue-tds-inbound` |
| `Queue.NorthStar` | `command-queue-northstar` |
| `Queue.DepartmentRequirementAutoMatch` | `command-queue-auto-match` |

## Message contract

`HubServiceBusTopicMessage<T>` carries:

- `Topic`;
- `PublishEventType`;
- typed `MessageData`;
- optional `CustomMetadata`;
- optional `SessionId`.

`HubServiceBusPublisherSubject` represents an entity type and publish event type using string-enum JSON conversion.

The common Azure storage layer exposes queue clients and wrappers. The queue names above are the configured local/development values; poison-message handling, retry counts, visibility timeouts, and production overrides still require environment-level review.

## WebJob handlers and message consumers

The following table catalogs all WebJob handler classes and their primary message types. Handlers are organized by feature area.

| WebJob Module | Handler Class | Message Type / Trigger | Primary Role |
|---|---|---|---|
| **Email** | `SendEmailQueueMessageHandler` | Azure Storage queue | Sends queued emails, tracks delivery/failure, handles recipient lists |
| **Email** | `BatchEwsOperationsQueueMessageHandler` | Azure Storage queue | Batch deletion and Exchange Web Services operations |
| **Email** | `BulkMatchEmailMessageHandler` | Azure Storage queue | Bulk email matching and correlation |
| **Email** | `DelayedMessagesQueueCommandHandler` | Timer trigger | Publishes delayed queued messages to correct queues based on delay schedule |
| **Dotmailer** | `DotmailerEmailsTimeEventHandler` | Timer trigger | Syncs emails to Dotmailer platform |
| **Dotmailer** | `DotmailerContactCampaignsTimeEventHandler` | Timer trigger | Syncs contact campaigns to Dotmailer |
| **Dotmailer** | `DotmailerAccountsSyncTimeEventHandler` | Timer trigger | Syncs account data to Dotmailer |
| **Dotmailer** | `DotmailerSuppressionsTimeEventHandler` | Timer trigger | Syncs suppression lists to Dotmailer |
| **Dotmailer** | `ExportMarketingListToDotmailerMessageHandler` | Service Bus message | Exports marketing lists to Dotmailer address books; creates/updates contacts |
| **Dotmailer** | `ConsentNoEmailHandler`, `ConsentYesEmailHandler`, `ConsentPermissionEmailHandler`, `RenewalOfConsentEmailHandler`, `PrivacyPolicyEmailHandler`, `SoftOptInContinuationEmailHandler`, `SoftOptInYesEmailHandler` | Email queue | Consent-related email sending with Dotmailer integration |
| **Dotmailer** | `FpnEmailHandler` | Email queue | Fixed property news email handler |
| **TextMessage** | `SendTextMessageQueueMessageHandler` | Azure Storage queue | Sends SMS text messages; validates recipients and persists delivery state |
| **Notifications** | `ActivityOutstandingKycTobCommandHandler` | Timer trigger | Sends notifications for activities with outstanding KYC |
| **Notifications** | `ProcessActivityEpcOverdueNotificationsCommandHandler` | Timer trigger | Notifies for overdue EPC activities |
| **Notifications** | `ProcessAutomaticallyLockedActivitiesCommandHandler` | Timer trigger | Notifies for automatically locked activities |
| **Notifications** | `ProcessMatchesScheduledNotificationsCommandHandler` | Timer trigger | Sends scheduled notifications for matched properties/requirements |
| **Notifications** | `ProcessReferralNotificationsCommandHandler` | Timer trigger | Sends referral-related notifications |
| **Notifications** | `ProcessTenancyNotificationsCommandHandler` | Timer trigger | Sends tenancy-related notifications |
| **Notifications** | `ProcessTenancyStartWelcomeEmailsCommandHandler` | Timer trigger | Sends welcome emails for new tenancies |
| **Notifications** | `ProcessActivitiesWithExpiredExchangeOrCompletionDateCommandHandler` | Timer trigger | Notifies when activity exchange/completion dates expire |
| **Notifications** | `RetrieveScheduledNotificationsCommandHandler` | Timer trigger | Retrieves pending scheduled notifications |
| **Notifications** | `ScheduledBaseNotificationsCommandHandler` | Timer trigger | Base command handler for scheduled notifications |
| **Notifications** | `PrepareNotificationsQueueMessageHandler` | Service Bus message | Prepares bulk notifications for entities; validates recipients; routes based on entity type |
| **Notifications** | `BroadcastNotificationsQueueMessageHandler` | Azure Storage queue | Broadcasts prepared notifications to recipients |
| **Notifications** | `BroadcastMobileNotificationsQueueMessageHandler` | Azure Storage queue | Broadcasts notifications via mobile push channels |
| **Notifications** | `MobileNotificationRecipientStatusUpdatedEventHandler` | Service Bus message | Handles mobile notification delivery/read status updates |
| **Notifications** | `BulkMarketingReportMessageHandler` | Service Bus message | Generates and sends bulk marketing reports |
| **Elasticsearch** | `ElasticSearchQueueMessageHandler` | Azure Storage queue | Indexes and updates Elasticsearch with business entity changes |
| **Elasticsearch** | `RefreshTenanciesCommandHandler` | Timer trigger | Refreshes tenancy index entries in Elasticsearch |
| **CddUpdates** | `ActivityCddUpdateQueueMessageHandler` | Service Bus message | Processes activity CDD updates and validity events |
| **CddUpdates** | `ActivityCounterpartyCddUpdateQueueMessageHandler` | Service Bus message | Processes counterparty CDD updates for activities |
| **CddUpdates** | `RequirementCddUpdateQueueMessageHandler` | Service Bus message | Processes requirement CDD updates |
| **CddValidity** | `CddValidityRetriggerStatesQueueMessageHandler` | Service Bus message | Retrigggers CDD validity checks for contacts, companies, and related entities |
| **ContactPrimaryAddress** | `PrimaryAddressNotificationQueueMessageHandler` | Service Bus message | Notifies when contact primary address changes |
| **Templates** | `TemplateGenerationMessageHandler` | Service Bus/Queue message | Generates document and email templates |
| **WordToPdf** | `WordToPdfConversionQueueMessageHandler` | Azure Storage queue | Converts Word documents to PDF; stores in blob storage with document attachment |
| **Thirdfort** | `ThirdfortRequestQueueMessageHandler` | Azure Storage queue | Validates and sends Thirdfort compliance requests; (see Process flows for details) |
| **Thirdfort** | `ThirdfortResponseQueueMessageHandler` | Azure Storage queue | Processes Thirdfort responses; stores PDFs, publishes events; (see Process flows for details) |
| **Sap** | `RegisterSapQueueMessageHandler` | Azure Storage queue | Sends entity registration and change events to SAP |
| **SlmTenancy** | `SlmTenancyQueueMessageHandler` | Azure Storage queue | Syncs tenancy data to SLM platform |
| **SoftOptIn** | `SoftOptInCommandHandler` | Timer trigger | Processes soft opt-in consent expiry; assigns expiry dates; updates contact status |
| **SoftOptIn** | `SoftOptInConsentRenewalCommandHandler` | Timer trigger | Renews consent for contacts with active entities |
| **SoftOptIn** | `SoftOptinQueueMessageHandler`, `ContactCustomerJourneysQueueMessageHandler` | Azure Storage queue | Processes opt-in queue messages and customer journey events |
| **FeedCentre** | `FeedCentreQueueMessageHandler` | Azure Storage queue | Processes feed centre updates and distribution |
| **FeedCentre** | `ExternalPortalsFeedQueueMessageHandler` | Azure Storage queue | Distributes feeds to external portals |
| **LatestView** | `CleanUpLatestViewCommandHandler` | Timer trigger | Removes latest-view records older than retention threshold |
| **MarketingList** | `MergeMarketingListsQueueMessageHandler` | Azure Storage queue | Merges marketing lists and updates contacts |
| **Instructions** | `ResultHandler` | Service Bus/Queue message (various) | Processes external instruction results (HomePpl, TDS, Qube, etc.) |
| **Qube** | `QubeSynchronizationQueueMessageHandler` | Azure Storage queue | Syncs activities, tenancies, companies, contacts, attachments, properties to Qube |
| **Fixflo** | `ArchiveOccupiersOrTenancyInFixfloHandler` | Timer trigger | Archives occupiers/tenancies in Fixflo system |
| **Fixflo** | `PublishFixfloTenancyEndedEventWithEndingDateCommandHandler` | Timer trigger | Publishes tenancy-ended events to Fixflo with end dates |
| **Fixflo** | `PublishFixfloTenancyStartedEventWithStartingDateCommandHandler` | Timer trigger | Publishes tenancy-started events to Fixflo with start dates |
| **Fixflo** | `FixfloFailedMessageEventHandler` | Service Bus message | Handles failed Fixflo webhook messages |
| **Brochures** | `GenerateBrochureQueueMessageHandler` | Azure Storage queue | Generates brochures via Frontify API; queues for delivery |
| **Brochures** | `CompleteBrochuresQueueMessageHandler` | Azure Storage queue | Marks brochures complete and notifies recipients |
| **Integrations** | `HomePplResultQueueMessageHandler` | Azure Storage queue | Processes HomePpl compliance results and attachments |
| **Integrations** | `TDSResultQueueMessageHandler` | Azure Storage queue | Processes TDS compliance results and certificates |
| **Integrations** | `NorthStarUpdateQueueMessageHandler` | Service Bus message | Syncs contact data updates to NorthStar platform |
| **Integrations** | `AzureResourceQueueMessageHandler` | Azure Storage queue | Processes Azure resource configuration messages |
| **Integrations** | `ProcessDocumentCommandHandler` | Service Bus message (AzureServiceBusDocs) | Processes documents delivered via Service Bus |
| **User Management** | `ReassignUserCommandHandler` | Timer trigger | Reassigns tasks and tenancies when user/property manager changes |
| **Main WebJobs Host** | `DeleteLogsCommandHandler`, `DisableNdaActivityFlagCommandHandler`, `DisableNdaRequirementFlagCommandHandler`, `RemoveExpiredTenanciesFromOutOfHoursCommandHandler`, `UpdateWebEnquiryStatusCommandHandler` | Timer trigger | Various operational commands (log cleanup, NDA flags, tenancy cleanup, web enquiry status) |
| **Main WebJobs Host** | `InstructionCddExpireSoonCommandHandler`, `InstructionCddExpiredCommandHandler` | Timer trigger | Sends notifications when instruction CDD records expire soon or have expired |
| **Main WebJobs Host** | `MonitorAvailabilityCommandHandler` | Timer trigger | Monitors API, Elasticsearch, and database availability; tracks metrics |
| **Main WebJobs Host** | `MonitorQueuesLengthCommandHandler` | Timer trigger | Tracks queue lengths and publishes metrics |
| **Main WebJobs Host** | `MonitorTrakheesiExpiryDateCommandHandler` | Timer trigger | Monitors Trakheesi appointment expiry dates; notifies upcoming expirations |
| **Main WebJobs Host** | `ProcessRequirementAutoMatchesCommandHandler` | Timer trigger | Finds requirements matching scheduled times and departments; queues notifications |
| **Main WebJobs Host** | `ProcessDepartmentRequirementAutoMatchesMessageHandler` | Service Bus message | Processes auto-matches for a specific department/requirement |
| **Main WebJobs Host** | `UpdateTenanciesChurnRiskStatusCommandHandler` | Timer trigger | Syncs tenancy churn-risk status to Elasticsearch |
| **Main WebJobs Host** | `UpdateTenancyChurnRiskStatusQueueMessageHandler` | Azure Storage queue | Updates individual tenancy churn-risk status and audit notes |
| **Main WebJobs Host** | `ResyncPropertiesQueueMessageHandler` | Azure Storage queue | Resyncs property data to integrated systems; flags Fixflo delivery |
| **Main WebJobs Host** | `UploadedContactQueueMessageHandler` | Azure Storage queue | Processes bulk-uploaded contact records |
| **Main WebJobs Host** | `ContactNegotiatorNotificationQueueMessageHandler` | Azure Storage queue | Notifies negotiators about new activities/requirements for their contacts |
| **Main WebJobs Host** | `SendAdiuvoSpreadsheetCommandHandler` | Timer trigger | Generates and sends Adiuvo compliance spreadsheets |
| **Main WebJobs Host** | `ActivityOutstandingKycTobCommandHandler` | Timer trigger | (see Notifications module) |
| **Main WebJobs Host** | `UpcomingAnniversaryCommandHandler` | Timer trigger | Sends anniversary notifications for entities |
| **Main WebJobs Host** | `RefreshRelatedActivityNotesQueueMessageHandler` | Azure Storage queue | Refreshes activity notes after changes |
| **Main WebJobs Host** | `UpdatePortalVisibilityExistingDocsMessageHandler` | Azure Storage queue | Updates document visibility on external portals |

## Processing pattern

1. A controller, domain service, timer, webhook, or integration publishes a message
2. Azure Storage Queue or Service Bus delivers the message to the WebJobs host
3. A feature module resolves a handler through the dependency-injection container
4. The handler validates and processes the message
5. The handler writes to SQL, Blob Storage, Elasticsearch, or an external service
6. Failures are logged and rethrown in the inspected Thirdfort handlers, allowing the host's configured retry behaviour to apply

## Required follow-up

- Extract physical names from environment templates and deployment parameters.
- Map each topic to subscriptions and consumer modules.
- Record retry count, visibility timeout, dead-letter/poison handling, and idempotency behaviour.
- Identify message versioning and compatibility rules.
- Document retry/error policies for each handler (some use host retry, others implement custom retry logic).

