# Hub API Workflows - Main User Journeys and Integration Points

## Overview

This document maps the main user workflows through the Hub API endpoints, showing how contacts, properties, activities, requirements, and tenancies interact. Each workflow illustrates a complete business process from start to finish.

---

## Workflow 1: Create and Market a Property (Lettings)

**Scenario:** Landlord wants to let their office building

**Actors:** Landlord Contact, Negotiator (assigned agent), Property, Activity (lettings instruction), Requirement (tenant looking), Tenancy

### API Sequence

```
1. Create Property
   POST /properties
   {
     address: "123 Business Street, London",
     propertyType: "Office",
     division: "Commercial",
     characteristics: { totalArea: 10000, floors: 3, features: [...] }
   }
   → Property ID: prop-001

2. Add Ownership
   POST /properties/prop-001/ownerships
   {
     ownerContactId: contact-landlord-001,
     percentage: 100,
     managingCompanyId: company-001
   }

3. Create Lettings Activity (Marketing Instruction)
   POST /activities
   {
     propertyId: prop-001,
     activityType: "Lettings",
     activitySubType: "New Let",
     serviceLine: "Commercial Lettings",
     parties: [
       { role: "Landlord", contactId: contact-landlord-001 },
       { role: "Agent", contactId: contact-agent-001, negotiatorId: negotiator-001 }
     ],
     status: "Live"
   }
   → Activity ID: act-001

4. Set Marketing Details
   PUT /activities/act-001
   {
     marketedDate: "2026-11-17",
     agencyExpiry: "2027-05-17",
     quotedRent: 50000,  // annual
     marketingImages: [image1.jpg, image2.jpg, ...],
     description: "Modern office space, flexible lease..."
   }

5. Publish to Fixflo (Marketing Platform)
   POST /activities/act-001/marketing/fixflo
   {
     fixtloReference: "FXF-12345",
     publishDate: "2026-11-17",
     listingStatus: "Active"
   }
   → Marketing begins, reaches prospective tenants

6. [Matching begins asynchronously]
   System finds Requirement records matching criteria
   (Location: London, Space: 8000-15000 sqm, Rent: £40-60k annual)
   
7. Tenant creates Requirement (separately, by their own API call)
   POST /requirements
   {
     requirementType: "Tenant Requirement",
     applicantContactId: contact-tenant-001,
     criteria: {
       propertyTypes: ["Office"],
       priceRange: { min: 40000, max: 60000 },
       sizeRange: { min: 8000, max: 15000 },
       location: "London",
       tenantType: "Corporate"
     },
     status: "Active"
   }
   → Requirement ID: req-001

8. Auto-Match (scheduler runs nightly or on-demand)
   System matches req-001 to act-001 (property meets criteria)
   
9. Requirement matches Activity
   POST /requirements/req-001/matches/act-001
   {
     matchScore: 0.95,  // 95% match
     reasonForMatch: "Size, rent, location all match tenant criteria"
   }
   → Match ID: match-001

10. Tenant views matched properties and schedules viewing
    POST /requirements/req-001/viewings
    {
      activityId: act-001,
      preferredDate: "2026-11-25",
      preferredTime: "14:00"
    }
    → Viewing ID: view-001
    → Negotiator notified

11. Viewing happens, tenant interested, makes Offer
    POST /activities/act-001/offers
    {
      offerorContactId: contact-tenant-001,
      offeredRent: 45000,
      proposedCommencement: "2027-01-15",
      proposedLease: 3,  // 3-year lease
      leaseTerm: { breaks: [], reviews: ["Annually"] }
    }
    → Offer ID: offer-001

12. Landlord accepts Offer
    PUT /offers/offer-001
    {
      status: "Accepted",
      acceptedDate: "2026-11-26",
      acceptedRent: 45000
    }

13. Activity moves to "Under Offer"
    PUT /activities/act-001/status
    {
      status: "Under Offer",
      statusReason: "Offer accepted from tenant-contact-001",
      acceptedOfferRent: 45000,
      agreedCommencement: "2027-01-15"
    }

14. Activity moves to Completion
    PUT /activities/act-001/status
    {
      status: "Completed",
      completionDate: "2026-12-20",
      completionReason: "Lease exchange and completion"
    }

15. Create Tenancy (from Activity)
    POST /tenancies
    {
      propertyId: prop-001,
      activityId: act-001,  // Link back to activity
      requirementId: req-001,  // Link to requirement
      tenancyType: "Full Repairing",
      parties: [
        { role: "Tenant", contactId: contact-tenant-001 },
        { role: "Landlord", contactId: contact-landlord-001 }
      ],
      terms: {
        completionDate: "2026-12-20",
        commencementDate: "2027-01-15",
        expiryDate: "2030-01-14",  // 3-year term
        rentPerAnnum: 45000,
        rentPayment: "Quarterly in advance",
        leaseBreak: null  // No break clause
      },
      status: "Draft"
    }
    → Tenancy ID: ten-001

16. Right-to-Rent Check
    POST /tenancies/ten-001/right-to-rent
    {
      checkDate: "2026-12-15",
      companyRegistration: "12345678",
      directorVerified: true,
      documentationType: "Certificate of Incorporation"
    }
    → Status: "Verified"

17. Activate Tenancy (move to live/active status)
    PUT /tenancies/ten-001/activate
    {
      activationDate: "2027-01-15",
      rentsCollectionMethod: "Direct Debit",
      managingAgent: negotiator-001
    }
    → Tenancy now LIVE, rent tracking begins

18. [Later: Renewal tracking begins]
    As expiry date approaches (2030-01-14), system flags for renewal
    New Renewal record created for decision (renew, let expire, or renegotiate)
```

**Outcome:** Property successfully let, tenancy created and activated, rent tracking begins

---

## Workflow 2: Buy/Sell Activity with Chain Transaction

**Scenario:** Investor buying office building; seller must buy another property first (chain)

### API Sequence

```
1. Seller creates Activity (Sales Instruction)
   POST /activities
   {
     propertyId: prop-002,
     activityType: "Sales",
     activitySubType: "Investment Property",
     serviceLine: "Commercial Sales",
     parties: [
       { role: "Vendor", contactId: contact-seller-001 },
       { role: "Agent", contactId: contact-agent-001 }
     ],
     status: "Live"
   }
   → Activity ID: act-seller-001

2. Buyer creates Requirement
   POST /requirements
   {
     requirementType: "Buyer Requirement",
     applicantContactId: contact-buyer-001,
     criteria: {
       propertyTypes: ["Office"],
       priceRange: { min: 500000, max: 750000 },
       location: "London",
       sector: "Commercial",
       investmentYield: 4.5  // Looking for 4.5%+ yield
     }
   }
   → Requirement ID: req-buyer-001

3. Requirement matched to Activity
   POST /requirements/req-buyer-001/matches/act-seller-001
   {
     matchScore: 0.92
   }
   → Match ID: match-buyer-001

4. Buyer's Offer
   POST /activities/act-seller-001/offers
   {
     offerorContactId: contact-buyer-001,
     offeredPrice: 650000,
     exchangeDate: "2027-02-15",
     completionDate: "2027-03-15",
     conditions: ["Subject to satisfactory survey", "Subject to finance"]
   }
   → Offer ID: offer-buyer-001

5. Seller Accepts (but seller must also buy another property first - chain)
   
   Seller creates their own Requirement (looking to buy replacement property)
   POST /requirements
   {
     requirementType: "Seller/Buyer Requirement",
     applicantContactId: contact-seller-001,
     criteria: { /* replacement property criteria */ }
   }
   → Requirement ID: req-seller-buying-001

6. Seller finds matching replacement property
   Activity for replacement property is found/created
   POST /activities
   {
     propertyId: prop-replacement-001,
     activityType: "Purchase",  // Seller is now buying
     parties: [
       { role: "Buyer", contactId: contact-seller-001 },  // Seller acting as buyer
       { role: "Vendor", contactId: contact-replacement-seller-001 }
     ]
   }
   → Activity ID: act-replacement-001

7. Create Chain Transaction linking both activities
   POST /activities/act-seller-001/chain-transactions
   {
     linkedActivityId: act-replacement-001,
     chainPosition: 1,  // Position in chain
     chainDependency: "MUST_COMPLETE_REPLACEMENT_FIRST",
     chainNotes: "Seller must complete purchase of replacement before selling current property"
   }

8. Chain activities progress together:
   - act-replacement-001 → Exchange → Completion (seller buys replacement)
   - act-seller-001 → Exchange → Completion (seller's original property sold to buyer)
   
9. Final completion of original sale
   PUT /activities/act-seller-001/status
   {
     status: "Completed",
     completionDate: "2027-03-15",
     completionPrice: 650000,
     exchangeDate: "2027-02-15",
     chainCompletionSequence: 1  // Completed first in chain
   }

10. Buyer becomes Owner
    POST /properties/prop-002/ownerships
    {
      ownerContactId: contact-buyer-001,
      percentage: 100,
      acquisitionDate: "2027-03-15",
      acquisitionPrice: 650000
    }
```

**Outcome:** Chain transaction successfully completed, buyer now owns property, seller has completed purchase of replacement property

---

## Workflow 3: Requirement Auto-Matching and Viewing Tour

**Scenario:** Tenant has active requirement; scheduled matcher finds and notifies of matches

### API Sequence

```
1. Tenant creates Requirement (earlier workflow step)
   POST /requirements
   {
     type: "Tenant Requirement",
     applicant: contact-tenant-002,
     criteria: { ... },
     status: "Active"
   }
   → Requirement ID: req-003

2. [Scheduled Matcher runs - e.g., nightly at 2 AM]
   Matcher finds all Activities matching req-003 criteria
   Creates Match records for each suitable activity

3. Negotiator views Requirement and Matches
   GET /requirements/req-003
   GET /requirements/req-003/matches
   → Returns list of matched activities with match scores

4. Negotiator wants to arrange viewing tour for top 3 matches
   POST /requirements/req-003/viewings
   {
     activityIds: [act-003, act-004, act-005],
     tourDate: "2026-12-05",
     tourStartTime: "09:00",
     tourNotes: "Walking tour of three offices in West End"
   }
   → Viewing Tour ID: tour-001

5. Viewings scheduled for each activity
   POST /activities/act-003/appointments
   {
     viewingTourId: tour-001,
     appointmentTime: "09:00",
     duration: 30,
     appointmentType: "Viewing"
   }
   
   POST /activities/act-004/appointments
   {
     viewingTourId: tour-001,
     appointmentTime: "09:45",
     duration: 30,
     appointmentType: "Viewing"
   }
   
   POST /activities/act-005/appointments
   {
     viewingTourId: tour-001,
     appointmentTime: "10:30",
     duration: 30,
     appointmentType: "Viewing"
   }

6. Viewings occur, tenant feedback recorded
   PUT /activities/act-003/appointments/app-001
   {
     viewingNotes: "Tenant liked the space, good light, good location",
     viewingOutcome: "Interested"
   }

7. Negotiator creates offers for interested properties
   POST /activities/act-003/offers
   {
     offerorContactId: contact-tenant-002,
     offeredRent: 35000,
     proposedCommencement: "2027-02-01",
     proposedLease: 2,
     conditions: ["Subject to satisfactory survey", "Break clause at year 1"]
   }

8. Activity and Requirement progress through offer/acceptance/completion workflow
   (as described in Workflow 1)
```

**Outcome:** Requirement matched to multiple properties, viewings arranged and completed, offer made and accepted for one property

---

## Workflow 4: Tenancy Renewal and Extension

**Scenario:** Tenancy expiry approaching; landlord and tenant need to agree renewal terms

### API Sequence

```
1. Tenancy reaching expiry (e.g., 6 months before end date)
   System flags tenancy for renewal workflow
   GET /tenancies/ten-002
   → Expiry date: "2027-01-15" (6 months away)

2. Negotiator initiates renewal process
   POST /tenancies/ten-002/renewal
   {
     renewalOptionDate: "2026-07-15",  // Decision date
     proposedRenewalTerms: {
       newExpiryDate: "2030-01-15",  // Another 3 years
       proposedRent: 46000,  // 2.2% increase
       rentReviewFrequency: "Annual",
       proposedBreaks: [{ breakDate: "2028-01-15" }]
     },
     renewalNotes: "2.2% increase in line with inflation; tenant-friendly break at 2 years"
   }
   → Renewal ID: renew-001

3. Landlord reviews and approves renewal terms
   PUT /tenancies/ten-002/renewal/renew-001
   {
     status: "Approved",
     approvedDate: "2026-06-30",
     approvedRent: 46000,
     approvedExpiryDate: "2030-01-15",
     approvedBreaks: [{ breakDate: "2028-01-15" }],
     landlordNotes: "Tenant has been reliable; happy with renewal terms"
   }

4. Tenant notified of renewal terms
   Send notification via API (tenant receives via portal/email)
   
5. Tenant accepts renewal
   PUT /tenancies/ten-002/renewal/renew-001
   {
     tenantAcceptance: "Accepted",
     tenantAcceptanceDate: "2026-07-01",
     tenantNotes: "Break clause at year 2 is important for us"
   }

6. Create new Tenancy record for renewal period
   POST /tenancies
   {
     propertyId: prop-001,
     previousTenancyId: ten-002,  // Link to prior tenancy
     parties: [ /* same as previous */ ],
     terms: {
       commencementDate: "2027-01-15",  // Start of renewal period
       expiryDate: "2030-01-15",
       rentPerAnnum: 46000,
       breaks: [{ breakDate: "2028-01-15" }]
     },
     status: "Draft"
   }
   → New Tenancy ID: ten-003

7. Activate new tenancy at commencement
   PUT /tenancies/ten-003/activate
   {
     activationDate: "2027-01-15"
   }

8. Update rent collection configuration
   PUT /tenancies/ten-003
   {
     rentAmount: 46000,
     rentPaymentMethod: "Direct Debit",
     rentPaymentFrequency: "Quarterly in advance"
   }

9. If tenant doesn't accept renewal:
   PUT /tenancies/ten-002/status
   {
     status: "Expired",
     expiryDate: "2027-01-15",
     renewalOutcome: "Tenant vacated; not renewed"
   }
   → End of tenancy workflow
```

**Outcome:** Tenancy renewed with agreed terms, new tenancy record created, or tenancy ended if not renewed

---

## Workflow 5: Property with Multiple Tenancies

**Scenario:** Multi-let building with 10 tenancies across different units, various renewal dates

### API Sequence

```
1. Property structure
   Property: prop-multilet-001 (whole building)
     ├─ Unit 1 (1000 sqm): Tenancy ten-m1 (expires 2027-03-15)
     ├─ Unit 2 (1200 sqm): Tenancy ten-m2 (expires 2028-06-30)
     ├─ Unit 3 (1500 sqm): Tenancy ten-m3 (expires 2026-12-01) ← SOON
     ├─ Unit 4 (900 sqm): Tenancy ten-m4 (expires 2027-09-15)
     └─ ... (6 more units)

2. Negotiator views all property tenancies
   GET /properties/prop-multilet-001/tenancies
   → Returns list of all tenancies with status, rent, expiry dates

3. Identify tenancies requiring attention (expiring within 6 months)
   GET /properties/prop-multilet-001/tenancies?filter=expiryWithin=6months
   → Returns [ten-m3, ten-m1]

4. For ten-m3 (expiring soon: 2026-12-01)
   
   POST /tenancies/ten-m3/renewal
   {
     renewalOptionDate: "2026-10-01",
     proposedRenewalTerms: { /* ... */ }
   }

5. If tenant vacates at end of date:
   PUT /tenancies/ten-m3/status
   {
     status: "Expired",
     expiryDate: "2026-12-01",
     vacationDate: "2026-12-01",
     unitAvailability: "Available for new let"
   }

6. Create new Activity for re-let (Unit 3)
   POST /activities
   {
     propertyId: prop-multilet-001,
     unitIdentifier: "Unit 3",
     activityType: "Lettings",
     activitySubType: "New Let (Re-let)",
     quotedRent: 25000,  // per annum
     status: "Live"
   }

7. New tenancy created when new tenant found
   POST /tenancies
   {
     propertyId: prop-multilet-001,
     unitIdentifier: "Unit 3",
     previousTenancyId: ten-m3,  // Link to previous tenant
     parties: [ /* new tenant */ ],
     terms: { /* new terms */ }
   }

8. Negotiator tracks property occupancy
   GET /properties/prop-multilet-001/occupancy
   → Returns: 90% occupied (9 of 10 units let)
   → Vacant units: ["Unit 3 (re-letting in progress)"]
```

**Outcome:** Property portfolio management, multi-tenancy tracking, coordinated renewals and re-letting

---

## Workflow 6: CDD Compliance and Right-to-Rent Checks

**Scenario:** Activity and tenancy require compliance verification before completion

### API Sequence

```
1. Activity/Tenancy created with parties
   Must verify CDD (Customer Due Diligence) before completion

2. For Activity with vendor requiring CDD:
   POST /activities/act-001/cdd
   {
     vendorContactId: contact-seller-001,
     complianceRequirement: "Full CDD - Investment property sale >£500k",
     documentationRequired: ["Proof of identity", "Proof of address", "Corporate structure"]
   }
   → CDD ID: cdd-001

3. CDD handler (Thirdfort integration) processes verification
   POST /cdd-handler/process
   {
     cddId: cdd-001,
     partyContactId: contact-seller-001,
     partyType: "Company"
   }
   → Sends to Thirdfort for verification

4. Thirdfort returns verification results
   - If verified: CDD status = "Completed", Activity can proceed
   - If warnings: CDD status = "Warning - Review Required"
   - If failed: CDD status = "Failed - Cannot proceed"

5. For Tenancy with right-to-rent check (before commencement):
   POST /tenancies/ten-001/right-to-rent
   {
     partyContactId: contact-tenant-001,
     partyType: "Company",
     documentationType: "Certificate of Incorporation",
     documentationDate: "2026-10-01",
     directorName: "John Doe"
   }
   → RTR check sent to external service (e.g., Qube)

6. Right-to-rent verification returns
   - If verified: RTR status = "Verified", Tenancy can commence
   - If failed: RTR status = "Failed - Cannot commence"

7. Activity/Tenancy CDD/RTR gates completion/commencement
   PUT /activities/act-001/status
   {
     status: "Completion",
     completionDate: "2027-03-15",
     cddVerified: true,  // Must be true to allow completion
     cddCompletionDate: "2027-02-20"
   }
   
   PUT /tenancies/ten-001/activate
   {
     activationDate: "2027-01-15",
     rightToRentVerified: true,  // Must be true to allow commencement
     rightToRentVerificationDate: "2026-12-20"
   }
```

**Outcome:** Compliance verified before activity completion and tenancy commencement

---

## Key API Patterns

### Pattern 1: Create Entity + Add Related Data
```
POST /contacts → GET contact
POST /contacts/{id}/addresses → Add multiple addresses
POST /contacts/{id}/phones → Add contact numbers
PUT /contacts/{id} → Update properties
```

### Pattern 2: Status Transitions
```
Activity: Live → Under Offer → Completion → Completed
Tenancy: Draft → Activated → Live → Renewed/Expired/Surrendered
Requirement: Active → Matched → Completed/Withdrawn
```

### Pattern 3: Matching and Linking
```
POST /requirements/{id}/matches/{activity-id} → Link requirement to activity
POST /activities/{id}/offers → Receive offer from interested party
POST /activities/{id}/chain-transactions → Link dependent activities
```

### Pattern 4: Compliance Gates
```
POST /activities/{id}/cdd → CDD verification required
POST /tenancies/{id}/right-to-rent → RTR check required
PUT /activities/{id}/status (completion) → Can only complete if cddVerified=true
PUT /tenancies/{id}/activate → Can only activate if rightToRentVerified=true
```

### Pattern 5: Event Cascades
```
Activity completion → Create Tenancy (if letting)
Activity withdrawal → Notify matched requirements of property unavailability
Requirement matched to Activity → Send notification to applicant
Tenancy expiry approaching → Flag for renewal workflow
```

---

## State Diagram: Complete Property Lifecycle

```
                    Property Created
                           ↓
                  ┌─────────┴─────────┐
                  ↓                   ↓
            Ownership Added    Activity Created
                  │                   │
                  │          ┌────────┴────────┐
                  │          ↓                 ↓
                  │       Marketing        (Under-Offer)
                  │          │                 │
                  │    Requirement             │
                  │    Matched                 │
                  │          │                 │
                  │    Viewing Done     Offer Accepted
                  │          │                 │
                  └──────────┬─────────────────┤
                             ↓                 ↓
                        Offer Made      Completion
                             │                 │
                             └────────┬────────┘
                                      ↓
                             Tenancy Created
                                      ↓
                         (Activate, Live, Renew, Expire)
```

