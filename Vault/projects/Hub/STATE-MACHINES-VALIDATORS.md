# Hub Entity State Machines & Validation Rules

## Overview

This document details the state machines and validation rules that govern the behavior of Hub's core entities. Each entity follows a strict state progression model, with validations enforcing business rules at every transition.

---

## 1. Activity State Machine

### Overview
Activities represent marketing instructions for properties (Sales, Lettings, Purchases, etc.). They progress through a linear lifecycle from creation to completion.

### State Diagram

```
       Create Activity
              ↓
           DRAFT
              ↓
       [Publish/Market]
              ↓
            LIVE ←─────────────────┐
              ↓                     │
       [Offer Received]            │
              ↓                     │
        UNDER_OFFER ────[Renegotiate]─┘
              ↓
       [Exchange of Contract]
              ↓
        COMPLETION
              ↓
       [Complete Property Transfer]
              ↓
         COMPLETED
              
         (Parallel path: Can transition to WITHDRAWN/EXPIRED at any stage)
```

### Valid State Transitions

| From | To | Trigger | Preconditions | Actions |
|------|----|---------|----|---------|
| DRAFT | LIVE | Publish | • Activity has property assigned<br/>• All mandatory details set (address, activity type)<br/>• Marketing terms defined | Generate marketing content, notify agents |
| LIVE | UNDER_OFFER | Offer Received | • At least one valid offer received<br/>• Offer approved by vendor/landlord<br/>• No active competing offers requiring priority | Update activity status, trigger CDD if applicable |
| LIVE | WITHDRAWN | Withdraw Instruction | • Withdrawal authorized by vendor/landlord<br/>• No pending completion | Notify all parties, archive offers, delist property |
| LIVE | EXPIRED | Expiry Date Reached | • Current date = Expiry date<br/>• Activity marked for auto-expiry | Archive activity, notify parties |
| UNDER_OFFER | COMPLETION | Exchange of Contract | • Contract exchanged (documented)<br/>• CDD completed (if applicable)<br/>• All party conditions satisfied<br/>• Survey and finance satisfactory | Lock down terms, set completion date |
| UNDER_OFFER | LIVE | Renegotiate | • Offer withdrawn or fell through<br/>• Authorized by all parties | Reset to LIVE, re-market property |
| UNDER_OFFER | WITHDRAWN | Withdraw | • Both parties agree OR vendor/landlord initiates | Terminate offer, archive activity |
| COMPLETION | COMPLETED | Complete Property Transfer | • Completion date reached<br/>• All funds transferred<br/>• Legal ownership transferred | Generate completion statement, trigger integrations |
| COMPLETION | WITHDRAWN | Complete Withdrawal | • Transaction fell through at completion stage | Reverse state changes, re-market or archive |
| (Any) | WITHDRAWN | Force Withdrawal | • Authorized withdrawal<br/>• Reason documented | Notify all parties, cleanup offers/matches |

### Activity Status Validation Rules (Gherkin)

```gherkin
Feature: Activity Status Transitions

  Scenario: Activity cannot go from LIVE to COMPLETED directly
    Given an Activity in LIVE status
    When I attempt to set Activity status to COMPLETED
    Then the operation fails with ValidationException
    And the error message is "Activity must be UNDER_OFFER or COMPLETION before COMPLETED"

  Scenario: Activity cannot transition WITHDRAWN to any other state
    Given an Activity in WITHDRAWN status
    When I attempt to transition it to LIVE
    Then the operation fails with InvalidStateException
    And the error message is "WITHDRAWN is a terminal state"

  Scenario: Offer acceptance automatically moves Activity to UNDER_OFFER
    Given an Activity in LIVE status with multiple offers
    When I accept an offer from the vendor
    Then the Activity status changes to UNDER_OFFER
    And the accepted offer is marked as "Active"
    And all other offers are marked as "Withdrawn" or "Superseded"

  Scenario: Activity expiry must respect the agreed expiry date
    Given an Activity with expiryDate = "2026-12-31"
    When the system date becomes "2027-01-01"
    Then the Activity is automatically moved to EXPIRED status
    And the Activity cannot be re-activated without explicit renewal

  Scenario: Cannot move to COMPLETION without CDD verification (for high-value activities)
    Given an Activity for a property valued >£500,000
    When I attempt to move Activity to COMPLETION
    And CDD verification is not complete
    Then the operation fails with ComplianceException
    And the error message is "CDD must be completed before COMPLETION for activities >£500k"

  Scenario: Multiple properties in a chain must complete together
    Given Activity A (Seller selling) linked to Activity B (Seller buying) in a chain
    When I attempt to complete Activity A before Activity B
    Then the operation fails with ChainTransactionException
    And the error message is "Chain partner activities must complete in order"
```

---

## 2. Requirement State Machine

### Overview
Requirements represent what buyers, tenants, landlords seek. They progress through matching and completion.

### State Diagram

```
     Create Requirement
            ↓
         ACTIVE ←──────────────────┐
            ↓                      │
     [Match to Activity]           │
            ↓                      │
        MATCHED ───[Renegotiate]──┘
            ↓
    [Offer Accepted/Deal Agreed]
            ↓
       COMPLETING
            ↓
      [Completion Done]
            ↓
       COMPLETED
       
    (Parallel: Can move to WITHDRAWN/EXPIRED at any stage)
```

### Valid State Transitions

| From | To | Trigger | Preconditions | Actions |
|------|----|---------|----|---------|
| ACTIVE | MATCHED | Match Found | • At least one Activity matches criteria<br/>• Match score meets threshold (default: >0.7)<br/>• Auto-matcher has run OR manual match approved | Create Match record, notify applicant |
| ACTIVE | EXPIRED | Expiry Date Reached | • Current date = Requirement expiry date | Archive requirement, notify applicant |
| ACTIVE | WITHDRAWN | Withdraw Requirement | • Authorized by applicant<br/>• No active offers | Archive requirement |
| MATCHED | COMPLETING | Offer Accepted | • Offer accepted from matched Activity<br/>• All party conditions met | Lock requirement to accepted property |
| MATCHED | ACTIVE | Renegotiate | • No active offer OR applicant requests renegotiation<br/>• Previously matched activities still available | Reset to ACTIVE for further matching |
| MATCHED | WITHDRAWN | Withdraw | • Applicant decides not to proceed<br/>• All offers withdrawn | Archive requirement |
| COMPLETING | COMPLETED | Completion | • Activity has completed<br/>• All transfer documentation done | Mark requirement fulfilled, archive |
| (Any) | EXPIRED | Manual Expiry | • Requirement criteria no longer relevant<br/>• User-initiated | Archive requirement |

### Requirement Matching Logic

```gherkin
Feature: Requirement Matching

  Scenario: Auto-matcher finds matching activities nightly
    Given a Requirement for Tenant with:
      | propertyType | "Office"           |
      | minSize      | 5000 sqm           |
      | maxSize      | 15000 sqm          |
      | minRent      | £30,000 p/a        |
      | maxRent      | £60,000 p/a        |
      | location     | "London"           |
    
    And Activities exist:
      | Activity | Type    | Size  | Rent      | Location | Status |
      | ACT-001  | Lettings| 10000 | £45,000   | London   | LIVE   |
      | ACT-002  | Lettings| 3000  | £50,000   | London   | LIVE   |
      | ACT-003  | Lettings| 8000  | £35,000   | Paris    | LIVE   |
    
    When the nightly matcher runs
    Then only ACT-001 is matched to the Requirement
    And ACT-002 is not matched (size < 5000)
    And ACT-003 is not matched (location ≠ London)

  Scenario: Requirement matching respects activity status
    Given a Requirement matching criteria to multiple Activities
    When some Activities are in WITHDRAWN or COMPLETED status
    Then those Activities are excluded from matching
    And only LIVE and UNDER_OFFER Activities are considered

  Scenario: Matching score reflects how well Activity meets Requirement
    Given a Requirement with strict criteria:
      | propertyType | "Office" (strict)          |
      | size         | 10000 sqm (±10% tolerance) |
      | rent         | £50k (±5% tolerance)       |
    
    And Activity with:
      | propertyType | "Office" (exact match)     |
      | size         | 10000 sqm (exact match)    |
      | rent         | £50k (exact match)         |
    
    Then the match score is highest (e.g., 0.99)
    
    And when Activity has:
      | propertyType | "Office"      |
      | size         | 11000 sqm     | (outside tolerance)
      | rent         | £52k          | (outside tolerance)
    
    Then the match score is lower (e.g., 0.65)

  Scenario: Once-matched requirement can be matched to multiple activities
    Given a Requirement in MATCHED status matched to Activity-A
    When a new better Activity-B is published that matches the Requirement
    Then the Requirement can receive a second Match notification
    But the applicant must actively accept both or choose one
```

---

## 3. Tenancy State Machine

### Overview
Tenancies represent active leases between tenant and landlord. They progress from creation through commencement, renewal, and expiry.

### State Diagram

```
   Create Tenancy
        ↓
     DRAFT (pre-activation)
        ↓
   [Right-to-Rent Check]
        ↓
   [Activate on Commencement Date]
        ↓
     ACTIVE (or LIVE)
        ↓
   ┌──────────────────────────────┐
   │                              │
   │    [Renewal Option Date]     │
   │           ↓                  │
   │       RENEWING               │
   │           ↓                  │
   │    [Renewal Agreed]          │
   │           ↓                  │
   │    Create New Tenancy        │
   │                              │
   └──────────────────────────────┘
        ↓
   [Expiry Date Reached]
        ↓
     EXPIRED
     
   (Parallel paths: SURRENDERED, TERMINATED)
```

### Valid State Transitions

| From | To | Trigger | Preconditions | Actions |
|------|----|---------|----|---------|
| DRAFT | ACTIVE | Activate | • Right-to-rent verified (if applicable)<br/>• All party information complete<br/>• Commencement date reached<br/>• Rent collection method configured | Activate lease, begin rent tracking |
| ACTIVE | RENEWING | Initiate Renewal | • 6 months before expiry date<br/>• Renewal option available<br/>• Notice given to other party | Create renewal proposal, notify parties |
| ACTIVE | SURRENDERED | Surrender Agreed | • Both parties (tenant + landlord) agree<br/>• Early termination authorized<br/>• Any break conditions met | Terminate lease early, vacate property |
| ACTIVE | TERMINATED | Force Termination | • Legal grounds exist (breach, forfeiture)<br/>• Proper notice given (per lease terms)<br/>• Authorized by landlord/legal | Initiate eviction if needed, vacate property |
| RENEWING | ACTIVE | Renewal Rejected | • Either party rejects renewal<br/>• No renewal agreement reached | Revert to ACTIVE for final months, plan exit |
| RENEWING | ACTIVE | Renewal Accepted | • Both parties agree new terms<br/>• New Tenancy created for renewal period | Create new Tenancy record, old Tenancy expires |
| ACTIVE | EXPIRED | Expiry Date Reached | • Current date = Expiry date<br/>• No renewal agreed | Archive tenancy, record as naturally ended |
| (Any) | CANCELLED | Cancel Pre-Activation | • Tenancy in DRAFT status<br/>• Before activation<br/>• Authorized cancellation | Discard tenancy, notify parties |

### Tenancy Activation Preconditions

```gherkin
Feature: Tenancy Activation

  Scenario: Right-to-rent must be verified before activation
    Given a Tenancy in DRAFT status created with:
      | tenantType       | "Company"                    |
      | tenantContactId  | contact-company-001          |
    
    When I attempt to activate the Tenancy
    And rightToRentVerified = false
    Then the activation fails with ComplianceException
    And the error message is "Right-to-rent verification required for company tenants"

  Scenario: Commencement date must equal or exceed today
    Given a Tenancy in DRAFT status with commencementDate = "2026-01-01"
    When the system date is "2026-12-31" (after commencement)
    Then I cannot activate the Tenancy
    And the error message is "Cannot activate a Tenancy after its commencement date"

  Scenario: Rent collection method must be configured
    Given a Tenancy in DRAFT status
    When I attempt to activate without setting rentPaymentMethod
    Then the activation fails with ValidationException
    And the error message is "Rent collection method (Direct Debit, Standing Order, etc.) must be configured"

  Scenario: Break clause verification for mid-term exits
    Given a Tenancy with breakClause = { breakDate: "2028-01-15" }
    When a Surrender request is submitted after breakDate
    Then the break conditions are waived
    But if surrendered before breakDate
    Then break penalties may apply (per lease terms)

  Scenario: Automatic activation on commencement date
    Given a Tenancy in DRAFT status with commencementDate = "2026-12-25"
    When the system date becomes "2026-12-25"
    Then the Tenancy is automatically activated
    And the status changes from DRAFT to ACTIVE
```

### Tenancy Renewal Logic

```gherkin
Feature: Tenancy Renewal

  Scenario: Renewal option opens 6 months before expiry
    Given a Tenancy expiring on "2027-06-30"
    When the system date becomes "2026-12-30" (6 months before)
    Then the Tenancy is flagged as "Available for Renewal"
    And a renewal workflow is initiated

  Scenario: Renewal terms must be agreed by both parties
    Given a Tenancy in RENEWING status
    When the landlord proposes renewal terms:
      | newExpiryDate  | "2030-06-30"           |
      | proposedRent   | £50,000 p/a (+2.2%)    |
    
    When the tenant accepts the terms:
    Then a new Tenancy record is created with:
      | previousTenancyId | original tenancy ID    |
      | commencementDate  | expiry date + 1 day    |
      | expiryDate        | "2030-06-30"           |
      | rentPerAnnum      | £50,000                |
    
    And the original Tenancy is closed/archived

  Scenario: If renewal not agreed by expiry date, tenancy expires
    Given a Tenancy in RENEWING status with expiryDate = "2027-06-30"
    When the system date becomes "2027-07-01"
    And no renewal agreement has been reached
    Then the Tenancy moves to EXPIRED status
    And the property becomes available for new letting
```

---

## 4. Offer State Machine

### Overview
Offers represent an interested party's proposal to purchase/rent a property or proceed with an activity.

### State Diagram

```
    Create Offer
        ↓
   PENDING_REVIEW (or PENDING)
        ↓
   ┌────┴────┐
   ↓         ↓
ACCEPTED  REJECTED
   ↓         ↓
 ACTIVE   WITHDRAWN
   ↓
EXPIRED
```

### Valid State Transitions

| From | To | Trigger | Preconditions | Actions |
|------|----|---------|----|---------|
| PENDING | ACCEPTED | Vendor/Landlord Accepts | • Valid offer received<br/>• Authorized by vendor/landlord<br/>• Within expiry window | Mark offer as accepted, trigger Activity → UNDER_OFFER |
| PENDING | REJECTED | Vendor/Landlord Rejects | • Offer withdrawn or below asking price<br/>• Authorized rejection | Mark offer as rejected, notify offeror |
| PENDING | WITHDRAWN | Offeror Withdraws | • Offeror changes mind before acceptance<br/>• Withdrawal authorized | Mark offer withdrawn, Activity remains LIVE |
| ACTIVE | EXPIRED | Offer Expiry Date Passes | • Current date > expiry date<br/>• No action taken | Mark offer expired, Activity may remain UNDER_OFFER (if another active offer) |
| ACTIVE | WITHDRAWN | Later Withdrawal | • Offeror withdraws after acceptance<br/>• Activity has not yet completed | Revert Activity to LIVE if no other active offers |

---

## 5. Contact Validation Rules

### Overview
Contacts are the foundation of Hub data. They must meet strict validation requirements.

### Contact Types and Required Fields

```gherkin
Feature: Contact Validation

  Scenario: Individual Contact requires minimum information
    Given a Contact with contactType = "Individual"
    When I save the Contact
    Then the following fields are required:
      | firstName    | String, 1-50 chars      |
      | lastName     | String, 1-50 chars      |
      | emailAddress | Valid email format      |
    
    And optional fields include:
      | middleNames  | String, optional        |
      | dateOfBirth  | Date, optional          |
      | phone        | Phone number, optional  |

  Scenario: Company Contact requires business information
    Given a Contact with contactType = "Company"
    When I save the Contact
    Then the following fields are required:
      | companyName  | String, 1-100 chars     |
      | crn          | UK Company Registration Number (required for UK) |
      | registeredAddress | Full address        |
    
    And optional fields include:
      | companyPhone | Phone number            |
      | vatNumber    | VAT registration number |
      | directors    | List of director contacts |

  Scenario: Contact must have at least one address
    Given a Contact without any addresses
    When I save the Contact
    Then the operation fails with ValidationException
    And the error message is "Contact must have at least one address"

  Scenario: Contact must have at least one phone or email
    Given a Contact with:
      | phones       | empty list              |
      | emails       | empty list              |
    
    When I save the Contact
    Then the operation fails with ValidationException
    And the error message is "Contact must have at least one email or phone number"

  Scenario: Email consent rules enforce opt-in/opt-out status
    Given a Contact with email = "buyer@example.com"
    When an email is sent to the Contact
    And the Contact has consentStatus = "OPTED_OUT"
    Then the email send operation fails
    And the error message is "Contact has opted out of email marketing"

  Scenario: Duplicate Contact detection
    Given Contact A with:
      | firstName  | "John"               |
      | lastName   | "Smith"              |
      | email      | "john@example.com"   |
    
    When I create Contact B with identical details
    Then the system detects a potential duplicate
    And suggests merging or discarding Contact B
    
  Scenario: Contact merge combines records
    Given Contact A and Contact B identified as duplicates
    When I approve Contact merge (A absorbs B)
    Then:
      | Contact A gets Contact B's addresses   |
      | Contact A gets Contact B's phone numbers |
      | Contact A gets Contact B's linked activities |
      | Contact B is marked as MERGED/ARCHIVED |
      | All activities linked to B now link to A |
```

### Negotiator Assignment

```gherkin
Feature: Negotiator Assignment

  Scenario: Every Contact must have a primary Negotiator (assigned staff)
    Given a Contact without a Negotiator assigned
    When I save the Contact
    Then the operation fails with ValidationException
    And the error message is "Contact must have a primary Negotiator"

  Scenario: Negotiator must be active/enabled in the system
    Given a Contact with assignedNegotiator = negotiator-inactive
    When I save the Contact
    Then the operation fails with ValidationException
    And the error message is "Assigned Negotiator is inactive; select an active Negotiator"

  Scenario: Negotiator can be changed during Contact lifecycle
    Given a Contact with assignedNegotiator = negotiator-A
    When I change assignedNegotiator = negotiator-B
    Then all future activities created will assign negotiator-B
    But existing activities linked to negotiator-A remain unchanged
```

---

## 6. Property Validation Rules

### Overview
Properties represent physical real estate assets with strict data requirements.

### Property Structure

```gherkin
Feature: Property Creation and Validation

  Scenario: Property requires complete address information
    Given a Property without a complete address
    When I save the Property
    Then the operation fails with ValidationException
    And the error message is "Property must have complete address (street, town, postcode)"

  Scenario: Property must have at least one Ownership record
    Given a Property without any Ownership records
    When I save the Property
    Then the operation fails with ValidationException
    And the error message is "Property must have at least one Ownership record"

  Scenario: Ownership percentages must total 100% (or be flexible for fractional ownership)
    Given a Property with Ownerships:
      | Contact | Percentage |
      | Owner-A | 60%        |
      | Owner-B | 30%        |
    
    When I save the Property
    Then the operation fails (if system enforces 100% rule)
    And the error message is "Ownership percentages must total 100%"

  Scenario: Property characteristics vary by type
    Given a Property with propertyType = "Office"
    When I save the Property
    Then the following characteristics should be provided:
      | totalArea      | Numeric, sqm            |
      | floors         | Integer, number of floors |
      | openPlan       | Boolean                 |
      | meetingRooms   | Integer count           |

  Scenario: Property can have multiple Tenancies simultaneously (multi-let)
    Given a Property with 5 Units
    When I create Tenancies for Units 1, 2, 3, 4, 5
    Then all 5 Tenancies are active simultaneously
    And the Property occupancy = 100% (5/5 units occupied)
    And each unit can track separate rent, parties, and renewal dates
```

---

## 7. Business Rule Summary Table

| Rule | Entity | Validation | Enforcement |
|------|--------|-----------|------------|
| Activities must have property | Activity | Property ID not null | Pre-save |
| Cannot delete property with live activities | Property | Check for LIVE/UNDER_OFFER activities | Pre-delete |
| Requirement expiry must be future date | Requirement | expiry_date > today | Pre-save |
| Offer expiry must be after creation | Offer | offer_expiry_date >= created_date | Pre-save |
| Tenancy commencement >= creation | Tenancy | commencement_date >= created_date | Pre-activate |
| CDD required for high-value activities | Activity | value > threshold → CDD required | Pre-completion |
| Right-to-rent required for tenancy activation | Tenancy | company tenant → RTR required | Pre-activate |
| Contact must have negotiator | Contact | assigned_negotiator IS NOT NULL | Pre-save |
| Requirement must have applicant | Requirement | applicant_contact_id IS NOT NULL | Pre-save |
| Offer must have offeror | Offer | offeror_contact_id IS NOT NULL | Pre-save |
| Chain activities must be linked | Activity | chain_partner_id NULL if no chain | Chain validation |
| Contact merge updates all references | Contact | Merge operation cascades | On merge |
| Soft-deleted records excluded from active queries | All | is_deleted = false | Query default |

---

## 8. State Transition Validation Matrix

### How to Read This Table
- **Rows** = Current State
- **Columns** = Target State
- **Cell Content** = ✅ (allowed), ❌ (not allowed), ⚠️ (conditional)

### Activity State Transitions Matrix

```
         DRAFT | LIVE | UNDER_OFFER | COMPLETION | COMPLETED | WITHDRAWN | EXPIRED
DRAFT      -   |  ✅  |     ❌      |     ❌     |    ❌     |    ✅     |   ❌
LIVE       ❌   |  -   |     ✅      |     ❌     |    ❌     |    ✅     |   ⚠️
UNDER_OFFER ❌  |  ✅  |     -       |     ✅     |    ❌     |    ✅     |   ❌
COMPLETION ❌  |  ❌  |     ❌      |     -      |    ✅     |    ✅     |   ❌
COMPLETED  ❌  |  ❌  |     ❌      |     ❌     |    -      |    ❌     |   ❌
WITHDRAWN  ❌  |  ❌  |     ❌      |     ❌     |    ❌     |    -      |   ❌
EXPIRED    ❌  |  ❌  |     ❌      |     ❌     |    ❌     |    ⚠️     |   -
```

**Legend:**
- ✅ = Always allowed
- ❌ = Never allowed
- ⚠️ = Conditional (requires specific business logic)
- `-` = Same state (no transition)

### Requirement State Transitions Matrix

```
         ACTIVE | MATCHED | COMPLETING | COMPLETED | WITHDRAWN | EXPIRED
ACTIVE     -    |   ✅    |     ❌     |    ❌     |    ✅     |   ⚠️
MATCHED    ✅   |   -     |     ✅     |    ❌     |    ✅     |   ⚠️
COMPLETING ❌   |   ❌    |     -      |    ✅     |    ❌     |   ❌
COMPLETED  ❌   |   ❌    |     ❌     |    -      |    ❌     |   ❌
WITHDRAWN  ❌   |   ❌    |     ❌     |    ❌     |    -      |   ❌
EXPIRED    ❌   |   ❌    |     ❌     |    ❌     |    ⚠️     |   -
```

### Tenancy State Transitions Matrix

```
         DRAFT | ACTIVE | RENEWING | EXPIRED | SURRENDERED | TERMINATED | CANCELLED
DRAFT      -   |   ✅   |    ❌    |   ❌   |     ❌      |     ❌      |    ✅
ACTIVE     ❌   |   -    |    ✅    |   ⚠️   |     ✅      |     ✅      |    ❌
RENEWING   ❌   |   ✅   |    -     |   ✅   |     ✅      |     ✅      |    ❌
EXPIRED    ❌   |   ❌   |    ❌    |   -    |     ❌      |     ❌      |    ❌
SURRENDERED ❌  |   ❌   |    ❌    |   ❌   |     -       |     ❌      |    ❌
TERMINATED ❌   |   ❌   |    ❌    |   ❌   |     ❌      |     -       |    ❌
CANCELLED  ❌   |   ❌   |    ❌    |   ❌   |     ❌      |     ❌      |    -
```

---

## Implementation Notes

### State Storage
- States stored as **foreign key references** to reference data tables (not C# enums)
  - Allows runtime configuration of valid states
  - Enables future workflow customization per division/office
- Transition validation logic typically in domain service layer
- State change events published to message queue for integrations

### Validation Enforcement Points
- **Pre-save validation**: Catch violations before database insert
- **Pre-transition validation**: Enforce state machine rules during status updates
- **Post-save events**: Publish domain events (Activity.StateChanged) for async workflows
- **Query-time filtering**: Soft-deleted, expired, and archived records excluded by default

### Testing Strategy
- Unit tests for each valid state transition
- Unit tests for each invalid transition attempt
- Integration tests for cross-entity validations (e.g., Contact + Activity + Tenancy workflow)
- Use Gherkin scenarios as acceptance criteria for complex business rules

