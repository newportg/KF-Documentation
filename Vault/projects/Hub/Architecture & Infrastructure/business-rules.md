# Hub business rules

## Status

These rules are source-derived and require business-owner confirmation. They are written as Gherkin scenarios to make the expected behaviour testable. They do not replace automated tests.

## Thirdfort request validation

Source: `src/WebJobs/KnightFrank.Antares.WebJobs.Thirdfort/MessageHandlers/ThirdfortRequestQueueMessageHandler.cs`.

```gherkin
Feature: Thirdfort request validation

  Scenario: Required-check data is invalid
    Given a Thirdfort request message is received
    When required-check data validation returns errors
    Then the request is not sent to Thirdfort
    And a Thirdfort response message containing those errors is queued

  Scenario: Identity-check data is invalid
    Given a Thirdfort request has valid required-check data
    When identity-check data validation returns errors
    Then the request is not sent to Thirdfort
    And a Thirdfort response message containing those errors is queued

  Scenario: Thirdfort request is accepted
    Given a Thirdfort request passes required-check and identity-check validation
    When the transaction is built and sent successfully
    Then the external transaction identifier is stored against the contact
    And the transaction record is saved

  Scenario: Thirdfort rejects the request
    Given a Thirdfort request passes local validation
    When Thirdfort returns errors
    Then no successful transaction record is stored
    And a Thirdfort response message containing the external errors is queued
```

## Thirdfort response processing

Source: `src/WebJobs/KnightFrank.Antares.WebJobs.Thirdfort/MessageHandlers/ThirdfortResponseQueueMessageHandler.cs`.

```gherkin
Feature: Thirdfort response processing

  Scenario: Thirdfort reports an error
    Given a Thirdfort response is received for an existing contact
    When the response contains one or more errors
    Then the latest contact CDD validity is marked as a Thirdfort error
    And the error description is stored
    And a CDD validity update event is published

  Scenario: Thirdfort report is received
    Given a Thirdfort response is received for an existing contact
    And the response contains no errors
    When the transaction report is downloaded
    Then the report is stored as a CDD PDF blob
    And a current contact attachment is created
    And the external transaction record is deleted
    And the Thirdfort inbox message is acknowledged
    And a CDD validity update event is published

  Scenario: Response references an unknown contact
    Given a Thirdfort response references a contact that cannot be found
    When the response is processed
    Then processing fails explicitly
    And the failure is logged and rethrown for host-level handling
```

## Soft opt-in consent lifecycle

Source: `src/WebJobs/KnightFrank.Antares.WebJobs.SoftOptIn/CommandHandlers/SoftOptInCommandHandler.cs`.

```gherkin
Feature: Soft opt-in consent lifecycle

  Scenario: Contact gains a soft opt-in for a new business entity
    Given a contact is linked to a business for the first time
    When the soft opt-in consent check runs
    Then a soft opt-in consent is created for the contact and business
    And the consent is set to SoftOptin status
    And the consent is assigned an expiry date based on configuration months
    And a SoftOptInYes email notification is sent

  Scenario: Contact loses connection to a business entity
    Given a contact is linked to a business with valid soft opt-in consent
    When the contact is removed from the business
    Then the existing soft opt-in consent may receive a new expiry date
    And audit events record the state transition
    And the contact is removed from affected subscriptions

  Scenario: Existing invalid consent is refreshed
    Given a contact has a consent record for an organisation unit no longer valid
    When the soft opt-in refresh runs
    Then the consent status is set to NotAsked
    And the expiry date is cleared
    And subsequent processing creates a new soft opt-in consent

  Scenario: Contact remains connected to active business
    Given a contact with existing soft opt-in consent is re-validated
    When the contact still has active entities with the business
    Then existing expiry and removal dates are cleared
    And the consent remains valid
    And a SoftOptInContinuation email is sent if renewal is applicable

  Scenario: Soft opt-in consent expires
    Given a contact's soft opt-in consent has an expiry date in the past
    When the consent expiry check runs (processed by renewal handler)
    Then the contact is flagged as requiring consent renewal
    And renewal reminder emails are sent
    (Note: Expiry enforcement is performed by SoftOptInConsentRenewalCommandHandler)
```

## CDD validity retriggering

Source: `src/WebJobs/KnightFrank.Antares.WebJobs.CddValidity/MessageHandlers/CddValidityRetriggerStatesQueueMessageHandler.cs`.

```gherkin
Feature: CDD validity retriggering for related entities

  Scenario: Contact CDD validity changes
    Given a contact's CDD validity state changes
    When a CDD validity retrigger event is received
    Then the system identifies related requirements, instructions, and activities
    And a retrigger event is published for each related entity
    And downstream handlers recalculate CDD validity for those entities

  Scenario: Related requirements are retrieved and retriggered
    Given a contact CDD validity retrigger has been initiated
    When the system looks up related requirements
    Then only active requirements with Applicant party role and non-Unsubmitted CDD status are included
    And a retrigger event is published for each matching requirement

  Scenario: Related instructions are retrieved and retriggered
    Given a contact CDD validity retrigger has been initiated
    When the system looks up related instructions
    Then only active instructions with Client role, non-null CDD completion, and non-excluded status are included
    And a retrigger event is published for each matching instruction

  Scenario: Related activities are retrieved and retriggered
    Given a contact CDD validity retrigger has been initiated
    When the system looks up related activities
    Then only active non-representing activities with Vendor/Landlord role and submitted CDD are included
    And a retrigger event is published for each matching activity

  Scenario: Company CDD validity changes
    Given a company's CDD validity state changes
    When a CDD validity retrigger event is received for the company
    Then the system identifies related lease-advisory activities
    And a retrigger event is published for each active lease-advisory activity with submitted CDD
    And downstream handlers recalculate CDD validity for those lease-advisory activities

  Scenario: Invalid entity type in retrigger event
    Given a CDD validity retrigger event is received
    When the entity type is not Contact or Company
    Then the message is rejected
    And an error is logged
```

## Notification recipient filtering and delivery

Source: `src/WebJobs/KnightFrank.Antares.WebJobs.Notifications/MessageHandlers/PrepareNotificationsQueueMessageHandler.cs` and `NotificationBlacklistHelper`.

```gherkin
Feature: Notification recipient filtering and delivery

  Scenario: User has disabled notifications for a notification type
    Given a notification of type X is to be sent to a user
    When the user has disabled notifications for that notification type
    Then the user is excluded from the recipient list
    And no notification is sent to that user
    And no mobile notification is queued for that user

  Scenario: Notification entity exists and is accessible
    Given a prepare-notifications message is received
    When the entity (activity, requirement, instruction, etc.) must be validated
    Then the system checks that the entity exists
    And the system checks that the user has security access to the entity
    And if either check fails, notification preparation stops with an error

  Scenario: Notification recipient list is generated for secure notification type
    Given a notification is of type ActivityPriceChanged, ActivityStateChanged, or similar secure type
    When recipients are determined
    Then only users with security access to the activity/entity receive the notification
    And additional blacklist filtering is applied

  Scenario: Notification is prepared and queued for delivery
    Given a notification passes all validation and recipient filtering
    When the notification is prepared
    Then a NotificationRecipient record is created for each eligible recipient
    And a BroadcastNotificationsQueueMessage is queued for standard delivery
    And a BroadcastMobileNotificationsQueueMessage is queued for mobile-push delivery
    And a suitable notification title is generated based on the notification type
```

## Rules requiring further extraction

- Contact, property, activity, tenancy, and requirement state transitions (beyond CDD and soft opt-in).
- Document visibility and current-version rules.
- Notification scheduling, blacklist-trigger, and recipient assignment rules (beyond access control).
- CDD update and completion rules for different entity types.
- Search indexing and projection consistency rules.
- Integration retry, reconciliation, and idempotency rules (Fixflo, SAP, NorthStar, Qube).
- Tenancy lifecycle events (SLM sync rules, Fixflo tenancy-started/ended events, churn-risk calculation).
- Email consent and suppression rules (Dotmailer, exchange, delivery).

