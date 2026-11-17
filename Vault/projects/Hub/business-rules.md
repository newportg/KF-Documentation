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

## Rules requiring further extraction

- Contact, property, activity, tenancy, and requirement state transitions.
- Document visibility and current-version rules.
- Notification scheduling and recipient rules.
- CDD validity and compliance rules outside the Thirdfort handlers.
- Search indexing and projection consistency rules.
- Integration retry and reconciliation rules.

