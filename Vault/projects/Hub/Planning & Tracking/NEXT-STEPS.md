# Hub Documentation - Next Steps & Remaining Work

## Immediate Priority Tasks

### Task #2 Follow-up: Extract Physical Queue/Topic Names
**Owner:** DevOps / Operations team

**What's needed:**
1. Collect all 11 Service Bus topic physical names from Azure subscription
2. Map each topic to its subscriptions and consumer modules
3. Document retry count, visibility timeout, and dead-letter policy for each topic
4. Identify all Azure Storage queue names from deployment configuration
5. Document poison-message handling policy for each queue

**Where to look:**
- Azure portal → Service Bus namespace → Topics and subscriptions
- Environment configuration templates (ARM, Bicep, Terraform)
- Deployment parameter files (Dev, Test, Prod)
- Application configuration (app.config, appSettings.json)

**Expected output:**
- Updated [message-transport-inventory.md](./message-transport-inventory.md) with physical names
- Topic-to-consumer mapping table
- Retry and dead-letter configuration per entity

---

## High-Value Remaining Process Flows

### Task #4a: Tenancy Lifecycle Flow
**Components involved:**
- SLM Tenancy sync (SlmTenancyQueueMessageHandler)
- Fixflo tenancy-started/ended events (PublishFixfloTenancyStartedEventWithStartingDateCommandHandler, etc.)
- Tenancy churn-risk calculation (UpdateTenancyChurnRiskStatusQueueMessageHandler)
- Out-of-hours archival (RemoveExpiredTenanciesFromOutOfHoursCommandHandler)

**Mermaid diagram needed:**
Trigger → Load tenancy → Sync to SLM → Publish Fixflo events → Calculate churn-risk → Update Elasticsearch → Archive if needed

**Source files:**
- `src/WebJobs/KnightFrank.Antares.WebJobs.SlmTenancy/`
- `src/WebJobs/KnightFrank.Antares.WebJobs/CommandHandlers/PublishFixfloTenancyStartedEventWithStartingDateCommandHandler.cs`
- `src/WebJobs/KnightFrank.Antares.WebJobs/MessageHandlers/UpdateTenancyChurnRiskStatusQueueMessageHandler.cs`

---

### Task #4b: Brochure Generation Flow
**Components involved:**
- Brochure request queuing
- Frontify API integration (GenerateBrochureQueueMessageHandler)
- Completion handling (CompleteBrochuresQueueMessageHandler)
- Document storage and delivery

**Mermaid diagram needed:**
API request → Queue message → Frontify request → Frontify processes → Response queued → PDF stored → Delivery notification

**Source files:**
- `src/WebJobs/KnightFrank.Antares.WebJobs/MessageHandlers/GenerateBrochureQueueMessageHandler.cs`
- `src/WebJobs/KnightFrank.Antares.WebJobs/MessageHandlers/CompleteBrochuresQueueMessageHandler.cs`

---

### Task #4c: Integration Result Handlers
**Components involved:**
- HomePpl compliance results (HomePplResultQueueMessageHandler)
- TDS certificate results (TDSResultQueueMessageHandler)
- Qube synchronization (QubeSynchronizationQueueMessageHandler)

**Mermaid diagram needed:**
External system response → Message received → Data validation → SQL persistence → Attachment creation → Elasticsearch update → Notification

**Source files:**
- `src/WebJobs/KnightFrank.Antares.WebJobs/MessageHandlers/HomePplResultQueueMessageHandler.cs`
- `src/WebJobs/KnightFrank.Antares.WebJobs/MessageHandlers/TDSResultQueueMessageHandler.cs`
- `src/WebJobs/KnightFrank.Antares.WebJobs/MessageHandlers/QubeSynchronizationQueueMessageHandler.cs`

---

## High-Value Remaining Business Rules

### Task #5a: Email Consent and Suppression Rules
**Rules to extract:**
- When is a contact suppressed from receiving email?
- How does Dotmailer suppression list interact with local consent?
- What is the relationship between soft opt-in consent and email sending?
- How are exchange/SMTP failures handled?
- Retry and dead-letter policies for email sending

**Source files:**
- `src/WebJobs/KnightFrank.Antares.WebJobs.Email/`
- `src/WebJobs/KnightFrank.Antares.WebJobs/MessageHandlers/SendEmailQueueMessageHandler.cs`
- `src/WebJobs/KnightFrank.Antares.WebJobs.Dotmailer/`

**Output format:**
Gherkin scenarios for consent validation, suppression checking, and retry behavior

---

### Task #5b: Tenancy State Transitions
**Rules to extract:**
- What triggers a tenancy state change? (started, ended, archived, churn-risk)
- What validations occur before state transitions?
- What downstream events are published?
- SLM sync preconditions and postconditions
- Out-of-hours archival rules

**Source files:**
- `src/WebJobs/KnightFrank.Antares.WebJobs/CommandHandlers/PublishFixfloTenancyStartedEventWithStartingDateCommandHandler.cs`
- `src/WebJobs/KnightFrank.Antares.WebJobs/MessageHandlers/UpdateTenancyChurnRiskStatusQueueMessageHandler.cs`
- `src/WebJobs/KnightFrank.Antares.WebJobs/CommandHandlers/RemoveExpiredTenanciesFromOutOfHoursCommandHandler.cs`

**Output format:**
Gherkin scenarios for each state transition

---

### Task #5c: Activity and Requirement State Transitions
**Rules to extract:**
- Activity state changes (price changed, state changed, automatic locking, etc.)
- Requirement auto-matching rules and scheduling
- CDD expiry notification rules
- EPC overdues and exchange date monitoring
- KYC validation and outstanding KYC notifications

**Source files:**
- `src/WebJobs/KnightFrank.Antares.WebJobs/CommandHandlers/ActivityOutstandingKycTobCommandHandler.cs`
- `src/WebJobs/KnightFrank.Antares.WebJobs/CommandHandlers/ProcessRequirementAutoMatchesCommandHandler.cs`
- `src/WebJobs/KnightFrank.Antares.WebJobs/CommandHandlers/ProcessActivityEpcOverdueNotificationsCommandHandler.cs`
- `src/WebJobs/KnightFrank.Antares.WebJobs/CommandHandlers/ProcessAutomaticallyLockedActivitiesCommandHandler.cs`

**Output format:**
Gherkin scenarios for state transitions and validations

---

## Blocking Tasks (Awaiting External Input)

### Task #6: Subject-Matter Expert Review
**Status:** Awaiting availability

**What needs review:**
- Architecture diagrams (C4 system context, container, component views, ArchiMate layers)
- Process flows (Thirdfort, notifications, CDD, opt-in, documents + all remaining flows)
- Business rules (Gherkin scenarios across all feature areas)
- Outstanding validation questions (10 questions in README.md)

**Deliverable:**
- Reviewed and approved documentation
- Any corrections or clarifications noted
- Signed-off on accuracy of business rules

---

### Task #7: Production Configuration & Operations Review
**Status:** Awaiting handoff

**What needs to be documented:**
- Monitoring, alerting, and SLA definitions per process
- Retry policies and dead-letter handling per handler
- Security roles and authentication/authorization model
- Operational runbooks and troubleshooting procedures
- Deployment gates, rollback procedures, and incident response
- Cost and capacity planning

**Where this information lives:**
- Azure Monitor / Application Insights configurations
- Operations documentation (if any exists)
- Deployment and DevOps automation (Bicep, Terraform, AKS configurations)
- SLAs and support agreements (business documents)

---

## Medium-Priority Enhancements

### Add Handler Error-Handling Flows
Create detailed error-handling and retry flows for top-5 handlers:
1. SendEmailQueueMessageHandler
2. PrepareNotificationsQueueMessageHandler
3. CddValidityRetriggerStatesQueueMessageHandler
4. ElasticSearchQueueMessageHandler
5. QubeSynchronizationQueueMessageHandler

**Output:** Detailed Mermaid diagrams showing: success path → error detection → retry decision → dead-letter handling

---

### Add SLA Documentation Per Process
Document for each process:
- Expected processing time (happy path)
- Timeout/max-retry duration
- SLA for delivery to external systems (Fixflo, SAP, Elasticsearch, etc.)
- Maximum acceptable latency for end-user facing operations

---

### Add Idempotency Rules Per Handler
Document which handlers are idempotent and which are not:
- What is the idempotency key?
- How is duplicate detection implemented?
- What happens if the same message is processed twice?

---

## Working Strategy

### Phase 1 (1-2 days) — Immediate
1. ✓ DONE: Handler catalog + process flows + business rules (Thirdfort, opt-in, CDD, notifications)
2. → NEXT: Extract email consent and tenancy rules (Task #5a, #5b)
3. → NEXT: Create tenancy lifecycle and brochure generation flows (Task #4a, #4b)

### Phase 2 (2-3 days) — High-Value
1. → Collect physical queue/topic names from DevOps (Task #2)
2. → Add activity/requirement state transition rules (Task #5c)
3. → Create integration result handler flows (Task #4c)
4. → Document error-handling flows for top-5 handlers

### Phase 3 (Blocking) — External Review
1. → Subject-matter expert review and sign-off (Task #6)
2. → Production configuration and operations handoff (Task #7)
3. → Document monitoring, retry, security, and runbooks

---

## Checklist for Completeness

- [ ] All 27 WebJob modules have documented handlers
- [ ] All 11 Service Bus topics have physical names and subscriptions mapped
- [ ] All major processes have Mermaid flow diagrams
- [ ] All major business rules have Gherkin BDD scenarios
- [ ] Error handling and retry policies documented for each handler
- [ ] SLAs defined for each major process
- [ ] Idempotency rules documented
- [ ] Security and authorization model documented
- [ ] Monitoring and alerting rules documented
- [ ] Operational runbooks created
- [ ] Subject-matter expert has reviewed and approved
- [ ] Production configuration validated

---

## Success Criteria

Documentation is "done" when:
1. Every runtime project is mapped to its production hosting target
2. Every persistent store and message transport has an owner and data-flow description
3. The highest-value business processes have detailed Mermaid flows AND Gherkin rules
4. Business rules have been reviewed by a Hub subject-matter expert
5. All unresolved assumptions are listed (not presented as facts)
6. Monitoring, retry, dead-letter, security, and operational ownership are documented

