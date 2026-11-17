# Hub message and transport inventory

## Service Bus topic configuration keys

`src/Hub.Contracts/HubServiceBus/HubServiceBusTriggerConstants.cs` defines the following application-setting keys:

| Key | Likely message area | Physical entity name |
|---|---|---|
| `ActivityServiceBusTriggerTopicName` | Activity events | To be resolved from environment configuration |
| `CompanyServiceBusTriggerTopicName` | Company events | To be resolved from environment configuration |
| `ContactServiceBusTriggerTopicName` | Contact events | To be resolved from environment configuration |
| `FixfloWebhookServiceBusTriggerTopicName` | Fixflo webhook events | To be resolved from environment configuration |
| `PropertyServiceBusTriggerTopicName` | Property events | To be resolved from environment configuration |
| `PropertyManagementServiceBusTriggerTopicName` | Property management events | To be resolved from environment configuration |
| `TenancyServiceBusTriggerTopicName` | Tenancy events | To be resolved from environment configuration |
| `UserServiceBusTriggerTopicName` | User events | To be resolved from environment configuration |
| `TealRequestServiceBusTriggerTopicName` | Teal requests | To be resolved from environment configuration |
| `FrontifyServiceBusTriggerTopicName` | Frontify events | To be resolved from environment configuration |
| `NorthStarContactServiceBusTriggerTopicName` | NorthStar contact events | To be resolved from environment configuration |

These are configuration keys, not confirmed Azure entity names.

## Message contract

`HubServiceBusTopicMessage<T>` carries:

- `Topic`;
- `PublishEventType`;
- typed `MessageData`;
- optional `CustomMetadata`;
- optional `SessionId`.

`HubServiceBusPublisherSubject` represents an entity type and publish event type using string-enum JSON conversion.

## Storage queues

The common Azure storage layer exposes queue clients and wrappers, and feature handlers use queue message types such as:

- `ThirdfortRequestQueueMessage`;
- `ThirdfortResponseQueueMessage`;
- email, text message, notification, document, and integration queue messages.

The physical queue names and poison-message handling policy require environment-level configuration review.

## Processing pattern

1. A controller, domain service, timer, webhook, or integration publishes a message.
2. Azure Storage Queue or Service Bus delivers the message to the WebJobs host.
3. A feature module resolves a handler through the dependency-injection container.
4. The handler validates and processes the message.
5. The handler writes to SQL, Blob Storage, Elasticsearch, or an external service.
6. Failures are logged and rethrown in the inspected Thirdfort handlers, allowing the host's configured retry behaviour to apply.

## Required follow-up

- Extract physical names from environment templates and deployment parameters.
- Map each topic to subscriptions and consumer modules.
- Record retry count, visibility timeout, dead-letter/poison handling, and idempotency behaviour.
- Identify message versioning and compatibility rules.

