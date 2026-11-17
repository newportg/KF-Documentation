# Hub Core Domain - Contact, Property, Activity, and Requirement Management

## Overview

The Hub is a **relationship and transaction management platform** for commercial real estate. It tracks:

- **Contacts** — buyers, sellers, tenants, landlords, agents, professionals
- **Properties** — office, industrial, retail assets with ownerships and tenancies
- **Activities** — marketing instructions, transactions, negotiations on properties
- **Requirements** — what buyers/sellers/tenants/landlords are looking for
- **Tenancies** — landlord-tenant relationships with compliance, rent management, and renewal

---

## Core Entities and Relationships

```
Contact
├─ Companies (employment, ownership)
├─ Addresses (home, business, correspondence)
├─ Phone/Email/Social (communication channels)
├─ Negotiators (assigned staff responsible for relationship)
├─ Property Interests (what types they care about: offices, retail, etc.)
├─ Consents (marketing, soft opt-in, newsletters)
├─ Requirements (what they're looking for)
├─ Activities (properties they're interested in)
├─ Ownerships (properties they own)
├─ Tenancies (properties they occupy)
└─ Referrals (clients they've introduced)

Property (Asset)
├─ Address, type, phase/estate, division
├─ Characteristics (size, floors, facilities)
├─ Ownerships
│  ├─ Owner contact/company
│  ├─ Ownership percentage
│  └─ Management company
├─ Tenancies
│  ├─ Tenant contact
│  ├─ Landlord contact
│  ├─ Rent, lease terms, end date
│  └─ Status (active, expired, surrendered)
├─ Activities (marketing instructions and transactions)
├─ Parties and negotiators
└─ Notes, appointments, attachments

Activity
├─ Property (the asset being marketed/sold/let)
├─ Type (sales, lettings, management, acquisition)
├─ Status (live, under offer, completed, withdrawn)
├─ Parties (vendors, landlords, agents, negotiators)
├─ Requirement Matches (which requirements match this property)
├─ Offers (from interested parties)
├─ Tenancies (resulting from lettings activities)
├─ Chain Transactions (linked activities)
├─ Marketing (Fixflo listings, brochures, images)
├─ Viewings/Appointments
├─ Instructions (compliance/special instructions)
├─ CDD/Appraisal records
└─ Attachments, notes, reviews

Requirement
├─ Type (tenant requirement, buyer requirement, seller requirement)
├─ Status (active, matched, withdrawn, sold)
├─ Party/Applicant (contact looking to buy/let/occupy)
├─ Criteria (price range, location, size, tenure, tenant type, etc.)
├─ Matches (activities that match this requirement)
├─ Offers (proposals to the applicant)
├─ Viewings/Appointments
├─ Next steps/notes
└─ Attachments, communication history

Tenancy
├─ Property (the asset)
├─ Tenant/Landlord/Guarantor parties
├─ Commencement/Expiry/Surrender dates
├─ Rent, fees, lease terms
├─ Status (live, completed, expired, surrendered)
├─ Right-to-rent checks (compliance)
├─ Progression checks (guarantor verification, insurance, etc.)
├─ Renewal records
├─ Break clauses
├─ Linked Activity (which letting activity created this tenancy)
├─ Linked Requirement (which tenant requirement was matched)
└─ Sign-offs, notes, attachments
```

---

## Core Business Processes

### Process 1: Contact and Relationship Management

**Actors:** Contact, Negotiator (assigned staff), Company, Properties, Requirements

**Flow:**

1. Contact record created (buyer, seller, tenant, landlord, agent, professional)
1. Contact details added (address, phone, email, company, negotiator assignment)
1. Contact interests captured (property types, locations, transaction types)
1. Consents managed (marketing, newsletters, soft opt-in, CDD compliance)
1. Contact linked to requirements (what they're looking for)
1. Contact linked to activities (properties they're viewing/transacting on)
1. Contact linked to ownerships (properties they own)
1. Contact linked to tenancies (properties they occupy)
1. Contact relationships tracked (clients they've introduced, referral chains)

**Key Business Rules:**

- Contact must have primary negotiator assigned
- Contact consents must be validated (soft opt-in, CDD, marketing)
- Prospect contacts may become active, deceased, retired, or locked
- Contact name/address changes are audited
- Multiple contact records may be identified as duplicates and merged

**Data Model:**

- `Contact` (Id, Names, Salutation, Nationality, Profession, BirthDate)
- `ContactAddress` (Primary, Business, Correspondence, Delivery)
- `ContactPhone`, `ContactEmail`, `ContactSocial`
- `ContactCompany` (Employment, Ownership)
- `ContactNegotiator` (Assigned staff)
- `ContactType`, `ContactInterest`, `Consent`, `SoftOptin`

**Key APIs:**

- `POST /contacts` — Create contact
- `PUT /contacts/{id}` — Update contact details
- `PUT /contacts/{id}/negotiator` — Assign negotiator
- `POST /contacts/{id}/addresses` — Add address
- `PUT /contacts/{id}/consents` — Update marketing/CDD consents
- `POST /contacts/merge` — Merge duplicate contacts
- `GET /contacts/search` — Find contacts by criteria

---

### Process 2: Property and Ownership Management

**Actors:** Property, Owner Contact/Company, Negotiator, Property Manager

**Flow:**
1. Property created with address, type, division, characteristics
1. Ownership added (contact/company, percentage, management details)
1. Property characteristics documented (floors, areas, WAULT, amenities)
1. Property marketed through Activities
1. Tenancies created on property
1. Property may be archived or deleted (soft delete with versioning)

**Key Business Rules:**
- Property must have address and type
- Property may have multiple owners (fractional ownership)
- Property manager assigned for management activities
- Property characteristics (area, floors) must be valid
- Property may be linked to development/estate/phase
- Duplicate properties can be merged

**Data Model:**
- `Property` (Id, Address, PropertyType, Division, Phase, Estate)
- `PropertyCharacteristics` (TotalArea, Floors, WAULT, Acreage)
- `Ownership` (Property, Owner Contact/Company, Percentage, Manager)
- `PropertyContact` (Property Manager, Maintenance Contact, etc.)

**Key APIs:**
- `POST /properties` — Create property
- `PUT /properties/{id}` — Update property details
- `POST /properties/{id}/ownerships` — Add ownership
- `PUT /properties/{id}/ownerships/{oid}` — Update ownership
- `POST /properties/{id}/areas` — Document floor/area details
- `PUT /properties/{id}/merge` — Merge duplicate property
- `GET /properties/search` — Find properties

---

### Process 3: Activity (Marketing Instruction) Lifecycle

**Actors:** Property, Negotiator, Activity Parties (Vendor, Landlord, Agent, Tenant, Buyer), Requirements, Offers

**Flow:**
1. Activity created on property (instruction to market or manage)
1. Activity type, sub-type, and service-line defined (sales, lettings, management, acquisition)
1. Parties added (vendors, landlords, agents, negotiators, solicitors)
1. Marketing started (Fixflo listing, brochures, images, advertising)
1. Viewings/Appointments scheduled
1. Requirements matched to activity (qualified leads)
1. Offers received (from interested parties)
1. Offer accepted (transaction progresses)
1. Activity moves to completion (tenancy created) or withdrawn

**Key Business Rules:**
- Activity must reference a property
- Activity type determines allowed parties and workflows
- Activity status controls allowed operations (can't accept offer if withdrawn)
- Status changes are timestamped and audited
- Price changes must be recorded (quoted vs. agreed)
- Chain transactions link multiple activities (dependent transactions)
- Withdrawal must include reason (sold elsewhere, deceased, etc.)
- Marketing expiry dates control advertising lifecycle
- CDD/Appraisal records must be maintained for compliance

**Activity Status State Machine:**
- **Live** → Active marketing, accepting viewings, receiving offers
- **Under Offer** → Accepted offer, awaiting completion
- **Completion** → Transaction completed, tenancy or ownership transferred
- **Withdrawn** → Marketing stopped, reason recorded

**Data Model:**
- `Activity` (Id, PropertyId, ActivityTypeId, ActivitySubTypeId, ActivityStatusId)
- `ActivityParty` (Activity, PartyRole: Vendor/Landlord/Agent/Buyer/Tenant/Introducer/Solicitor)
- `ActivityPrice` (Quoted, Agreed, Rent values)
- `ActivityMarketing` (Fixflo, Images, Advertisements, Marketing Expiry)
- `ActivityOffer` (Accepted/Rejected, Offeror)
- `ActivityMatch` (Linked Requirement, Why matched)
- `ActivityChainTransaction` (Linked Activity, Dependency)

**Key APIs:**
- `POST /activities` — Create activity (instruction)
- `PUT /activities/{id}` — Update activity details
- `POST /activities/{id}/parties` — Add party (vendor, agent, etc.)
- `PUT /activities/{id}/price` — Update price/rent
- `POST /activities/{id}/offers` — Receive offer
- `POST /activities/{id}/matches` — Match requirement to activity
- `PUT /activities/{id}/status` — Change status (live → under-offer → completion)
- `POST /activities/{id}/marketing/fixflo` — Publish to Fixflo
- `POST /activities/{id}/brochure` — Generate brochure
- `POST /activities/{id}/complete` — Mark as completed (tenancy created)
- `GET /activities/search` — Find activities by property, negotiator, status

---

### Process 4: Requirement and Matching

**Actors:** Requirement (Tenant/Buyer/Seller), Applicant Contact, Activities, Matches, Viewings, Offers

**Flow:**
1. Requirement created (contact looking to buy, let space, or sell property)
1. Requirement type defined (tenant requirement, buyer requirement, seller instruction)
1. Criteria captured (price/rent range, location, size, tenure, tenant type, features)
1. Requirement assigned to negotiator
1. Automated matching algorithm finds activities matching criteria
1. Requirement matched to activities (qualified opportunities)
1. Viewings arranged for matched activities
1. Offers made to applicant
1. Requirement progresses to completion (tenancy/sale) or withdrawn

**Key Business Rules:**
- Requirement must have applicant contact
- Requirement criteria must be valid (price/rent ranges, dates, etc.)
- Requirement status controls allowed operations
- Requirements can be auto-matched (scheduled matching runs)
- Requirement hotness score reflects activity level
- Selling status and next-action guide workflow (for seller requirements)
- CDD status tracked separately from requirement status
- Requirement may link to current/selling property (what they currently occupy/own)

**Requirement Status State Machine:**
- **Active** → Seeking properties, reviewing matches, arranging viewings
- **Matched** → Found property, offer pending or accepted
- **Sold/Completed** → Transaction completed
- **Withdrawn** → No longer seeking

**Data Model:**
- `Requirement` (Id, RequirementTypeId, RequirementStatusId, ApplicantContactId)
- `RequirementParty` (Requirement, PartyRole, Contact)
- `RequirementCriteria` (PropertyTypes, PriceRange, RentRange, LocationPreferences)
- `RequirementMatch` (Requirement, Activity, MatchScore, Status)
- `RequirementOffer` (Requirement, Activity, OfferTerms, Status)
- `RequirementViewing` (Requirement, Activity, AppointmentDate)

**Key APIs:**
- `POST /requirements` — Create requirement (tenant/buyer/seller looking for property)
- `PUT /requirements/{id}` — Update requirement criteria
- `POST /requirements/{id}/parties` — Add party (co-applicant, etc.)
- `GET /requirements/{id}/matches` — Find matching activities
- `POST /requirements/{id}/matches/{aid}` — Accept/create match
- `POST /requirements/{id}/offers` — Generate offer to applicant
- `POST /requirements/{id}/viewings` — Schedule viewing
- `PUT /requirements/{id}/status` — Progress requirement (active → matched → completed)
- `GET /requirements/search` — Find requirements by criteria

---

### Process 5: Tenancy and Property Management

**Actors:** Tenancy (Landlord, Tenant, Guarantor), Property, Related Activity, Linked Requirement, Negotiator

**Flow:**
1. Tenancy created (from activity match or manual creation)
1. Parties assigned (tenant, landlord, guarantor, management company)
1. Lease terms documented (commencement, expiry, rent, fees, breaks)
1. Completion recorded
1. Commencement date — tenancy becomes active
1. Right-to-rent checks performed (UK compliance)
1. Guarantor checks and verification
1. Rent reviews and reviews occur
1. Break clauses exercised (optional early exit)
1. Renewal records tracked
1. Expiry date approaches — renewal or surrender option
1. Tenancy surrendered (early or at end date) or renewed

**Key Business Rules:**
- Tenancy must reference property and have parties (tenant, landlord)
- Commencement date must be after completion date
- Expiry date must be after commencement date
- Rent/fees must be positive
- Right-to-rent status must be verified before commencement (compliance)
- Guarantor verification required (if guarantor present)
- Tenancy progression through stages (activation → completion → commencement)
- Renewal options and terms documented
- Linked Activity records what activity created this tenancy
- Linked Requirement records what requirement was matched
- Soft-delete and versioning for audit
- Churn-risk calculated (likelihood tenant will leave)

**Tenancy Lifecycle State Machine:**
- **Draft** → Created but not yet active/completed
- **Active (Live)** → Commenced, rent-paying
- **Completed** → Transaction closed
- **Expired** → End date passed, no renewal
- **Surrendered** → Early termination, tenant departed
- **Renewed** → Links to next tenancy record

**Data Model:**
- `Tenancy` (Id, AssetId, TenancyTypeId, TenancyStatusId)
- `TenancyParty` (Tenancy, PartyRole: Tenant/Landlord/Guarantor/Agent)
- `TenancyTerms` (CommencementDate, ExpiryDate, SurrenderDate, RentAmount)
- `TenancyBreak` (BreakDate, ExercisedDate, Status)
- `TenancyRenewal` (OptionDate, RenewalTerms, ApprovedDate)
- `RightToRent` (Status, ExpirationDate, DocumentationDate)
- `TenancyProgression` (ActivationDate, CompletionDate, Checks: Guarantor, Insurance, etc.)
- `TenancyLinkedActivity` (Related Activity that produced this tenancy)
- `TenancyLinkedRequirement` (Related Requirement that was matched)

**Key APIs:**
- `POST /tenancies` — Create tenancy (from activity or manual)
- `PUT /tenancies/{id}` — Update tenancy terms
- `POST /tenancies/{id}/parties` — Add party (tenant, landlord, guarantor)
- `PUT /tenancies/{id}/activate` — Activate tenancy (move to live)
- `PUT /tenancies/{id}/end-date` — Update end date (break exercise, renewal extension)
- `PUT /tenancies/{id}/terminate` — Surrender tenancy early
- `POST /tenancies/{id}/right-to-rent` — Record right-to-rent check
- `POST /tenancies/{id}/progression-checks` — Guarantor verification, insurance, etc.
- `POST /tenancies/{id}/renewal` — Create renewal record
- `GET /tenancies/search` — Find tenancies by property, tenant, status
- `PUT /tenancies/{id}/status` — Manage lifecycle (active → completed → expired/renewed)

---

## User Journeys and Workflows

### Journey 1: Tenant Looking for Office Space

1. **Tenant Contact** submits **Requirement** (100 sq m office, £5k/month, West London)
1. System auto-matches Requirement to current Activities on the market
1. Matching Activities shown to negotiator (properties meeting criteria)
1. **Viewings** scheduled for top matches
1. Tenant likes one property → **Offer** made
1. Landlord accepts offer (Activity moves to "Under Offer" → "Completion")
1. **Tenancy** created with matching terms (commencement, rent, parties)
1. Right-to-rent check performed
1. Tenancy becomes **live** on commencement date
1. Rent tracked, renewal options monitored
1. At expiry → renewal negotiated or tenancy surrenders

### Journey 2: Property Owner Selling a Building

1. **Property** listed in system (address, type, ownership)
1. Owner creates **Activity** (sales instruction)
1. Marketing setup (brochure, Fixflo listing, images)
1. Potential buyers create **Requirements** (what they're looking for)
1. System matches Requirements to this Activity
1. Viewings scheduled
1. Buyer makes an **Offer**
1. Activity moves to "Under Offer"
1. If accepted → completion and Activity finalized
1. If ownership changes → **Ownership** record updated
1. Building may be leased → new **Tenancies** on the property

### Journey 3: Agent Managing Multiple Properties

1. Agent assigned as **Negotiator** for property portfolio
1. Agent creates/manages **Activities** (marketing instructions, tenancy management)
1. Agent reviews incoming **Requirement** matches
1. Agent schedules **Viewings/Appointments** with interested parties
1. Agent negotiates **Offers**
1. Agent manages **Tenancies** (renewals, right-to-rent, compliance checks)
1. Agent coordinates with **Parties** (vendors, landlords, tenants, solicitors)
1. Agent prepares brochures, marketing images, documentation

---

## Key State Machines

### Activity Status Flow

```
                    ┌─→ Withdrawn (reason: sold elsewhere, withdrawn by vendor, etc.)
                    │
Live (Marketing) → Under Offer → Completion → Completed
                                     ↓
                              Tenancy Created
                              (if letting)
```

### Requirement Status Flow

```
Active → Matched → Completed/Sold
  ↑                     ↓
  └─→ Withdrawn ←──────┘
         (no suitable found)
```

### Tenancy Status Flow

```
Draft → Activated → Live → Completed → Expired/Surrendered
                      ↓
                   Renewed
```

---

## Core Business Rules and Validations

### Contact Rules

- Contact must have at least one negotiator assignment
- Contact consents must be managed (CDD, marketing, newsletters)
- Soft opt-in consent expires after configured period
- Contact may be marked deceased or retired (soft deletion)
- Duplicate contacts can be merged (manual process)
- Contact relationships to companies, properties, requirements must be maintained

### Activity Rules

- Activity must reference valid property
- Activity type must match property type (can't rent out a sale-only property)
- Party roles must be valid for activity type (vendor required for sales, landlord for lettings)
- Activity status changes are timestamped and must follow allowed transitions
- Withdrawal reason is mandatory
- Price changes create audit trail (quoted vs. agreed)
- Chain transactions link dependent activities (can't complete A without completing B first)
- CDD/Appraisal records are compliance requirements
- Marketing expiry controls Fixflo/advertising lifecycle

### Requirement Rules

- Requirement must have applicant contact
- Requirement criteria must be internally consistent (price range: min ≤ max)
- Requirement status controls allowed changes (can't match if completed/withdrawn)
- Auto-matching runs on schedule (nightly or on-demand)
- Requirements link to current property (what applicant currently owns/occupies)
- CDD status tracked separately (may be in progress, completed, warning)
- Hotness score affects priority in matching

### Tenancy Rules

- Tenancy must reference property and have required parties
- Commencement date must be after completion/agreement date
- Expiry date must be after commencement date
- Rent/fees must be positive
- Right-to-rent status must be verified before tenancy becomes live
- Guarantor verification must be completed (if present)
- Break clauses must have valid break dates
- Tenancy progression through stages (activation → completion → commencement)
- Renewal options documented and tracked
- Soft-delete with versioning for audit trail
- May link to activity (which activity produced this tenancy) and requirement (which requirement was matched)

---

## Data Persistence

**Primary Database:** SQL Server (Antares database project)
- Contact, Activity, Property, Requirement, Tenancy and related tables
- Audit tables tracking changes over time
- Reference data (Activity Types, Statuses, Party Roles, etc.)

**Search/Indexing:** Elasticsearch
- Full-text search on contacts, activities, requirements, properties
- Aggregations for dashboards and reporting
- Projection of authoritative SQL data

**Blob Storage:** Azure Storage
- Attachments (documents, images, brochures)
- PDFs, reports
- Marketing materials

**Message Queue:** Azure Storage Queue, Service Bus
- Activity state change events
- Requirement match notifications
- Tenancy progression events
- External integration messages (Fixflo, SAP, etc.)

---

## Integration with External Systems

**Fixflo** — Property marketing platform
- Marketing instructions synced to Fixflo
- Viewing/enquiry data synced back to Hub

**SAP** — Enterprise resource planning
- Activity transactions recorded in SAP
- Party/contact master data synced

**SLM** — Tenancy management (specialist system)
- Tenancy data synced to SLM for detailed management
- Payments, checklists, compliance tracked in SLM

**Qube** — Referencing platform
- Tenant/guarantor verification data

**Thirdfort** — CDD compliance
- CDD documentation and verification

**Dotmailer** — Email marketing
- Contact consents and subscription lists
- Campaign tracking

