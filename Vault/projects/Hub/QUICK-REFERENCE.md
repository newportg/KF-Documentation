# Hub Documentation - Quick Reference Guide

**Last Updated:** 2026-11-17  
**Status:** ✅ Checkpoint 4 Complete — Core Business Domain Fully Documented

---

## 📚 Documentation Index

### 🏢 Business Domain (START HERE)

| Document | Purpose | Key Content | For Whom |
|----------|---------|------------|----------|
| **[CORE-DOMAIN.md](./Core Business Domain/CORE-DOMAIN.md)** | Understand Hub's business entities and how they relate | 5 core entities, relationships, 5 business processes, user journeys, state machines | Business analysts, architects, all teams |
| **[API-WORKFLOWS.md](./Core Business Domain/API-WORKFLOWS.md)** | See real-world workflows through the Hub API | 6 end-to-end workflows (Lettings, Sales, Auto-match, Renewals, Multi-let, Compliance) with complete API sequences | Developers, QA, architects |
| **[STATE-MACHINES-VALIDATORS.md](./Core Business Domain/STATE-MACHINES-VALIDATORS.md)** | Reference for state machines and validation rules | 8 state machines, 51 Gherkin scenarios, validation matrices | Developers, QA, architects |

### 🏗️ Architecture & Infrastructure (SUPPORTING DOCS)

| Document | Purpose | Key Content | For Whom |
|----------|---------|------------|----------|
| **[architecture-blueprint.md](./Architecture & Infrastructure/architecture-blueprint.md)** | System architecture overview | C4 diagrams, ArchiMate layers, component roles | Architects, senior developers |
| **[source-inventory.md](./Architecture & Infrastructure/source-inventory.md)** | Runtime projects and their purposes | All .NET projects, their roles, dependencies | Developers, architects |
| **[message-transport-inventory.md](./Architecture & Infrastructure/message-transport-inventory.md)** | WebJob handlers and async processing | 60+ handler catalog, message types, feature areas | Developers, operations |
| **[process-flows.md](./Architecture & Infrastructure/process-flows.md)** | Key process flows with Mermaid diagrams | 8 diagrams (Thirdfort, notifications, CDD, opt-in, etc.) | All teams, operations |
| **[business-rules.md](./Architecture & Infrastructure/business-rules.md)** | Integration-specific business rules | 22+ Gherkin scenarios (Thirdfort, CDD, notifications) | Developers, QA |

### 📋 Guides & Summaries

| Document | Purpose | Key Content |
|----------|---------|-----------|
| **[README.md](./Planning & Tracking/README.md)** | Project overview and task status | Contents, completed work, outstanding tasks |
| **[CHECKPOINT-4-SUMMARY.md](./Planning & Tracking/CHECKPOINT-4-SUMMARY.md)** | Executive summary of this checkpoint | Deliverables, coverage, next steps |
| **[SESSION-COMPLETION-SUMMARY.md](./Planning & Tracking/SESSION-COMPLETION-SUMMARY.md)** | Complete session handoff summary | Accomplishments, metrics, outstanding work |
| **[NEXT-STEPS.md](./Planning & Tracking/NEXT-STEPS.md)** | Future work priorities | Blocking tasks, recommendations |
| **[TASK-COMPLETION-SUMMARY.md](./Planning & Tracking/TASK-COMPLETION-SUMMARY.md)** | Prior checkpoint summary | Tasks 2-5 completion status |

---

## 🎯 Find What You Need

### "I want to understand what Hub does"
👉 **[CORE-DOMAIN.md](./Core Business Domain/CORE-DOMAIN.md)** → Sections: Core Entities, Business Processes, User Journeys

### "I need to implement a feature / fix a bug"
👉 **[API-WORKFLOWS.md](./Core Business Domain/API-WORKFLOWS.md)** → Find your workflow  
👉 **[STATE-MACHINES-VALIDATORS.md](./Core Business Domain/STATE-MACHINES-VALIDATORS.md)** → Check entity state machine & validation rules  
👉 **[CORE-DOMAIN.md](./Core Business Domain/CORE-DOMAIN.md)** → Understand related entities

### "I'm writing tests"
👉 **[STATE-MACHINES-VALIDATORS.md](./Core Business Domain/STATE-MACHINES-VALIDATORS.md)** → 51 Gherkin scenarios  
👉 **[API-WORKFLOWS.md](./Core Business Domain/API-WORKFLOWS.md)** → Expected API sequences

### "I need to integrate an external service"
👉 **[message-transport-inventory.md](./Architecture & Infrastructure/message-transport-inventory.md)** → WebJob handlers  
👉 **[process-flows.md](./Architecture & Infrastructure/process-flows.md)** → Event flow diagrams  
👉 **[business-rules.md](./Architecture & Infrastructure/business-rules.md)** → Integration-specific rules

### "I'm setting up monitoring/operations"
👉 **[message-transport-inventory.md](./Architecture & Infrastructure/message-transport-inventory.md)** → Message flow, topics, handlers  
👉 **[process-flows.md](./Architecture & Infrastructure/process-flows.md)** → End-to-end flows to monitor  
👉 (Task #7 - Awaiting operations documentation)

### "I'm reviewing/validating the architecture"
👉 **[architecture-blueprint.md](./Architecture & Infrastructure/architecture-blueprint.md)** → System context & components  
👉 **[source-inventory.md](./Architecture & Infrastructure/source-inventory.md)** → Runtime projects  
👉 **[CORE-DOMAIN.md](./Core Business Domain/CORE-DOMAIN.md)** → Business requirements driving design

---

## 📊 Content Checklist

### Core Entities ✅

- [x] Contact (entity, relationships, validation)
- [x] Property (entity, relationships, validation)
- [x] Activity (entity, relationships, state machine, validation)
- [x] Requirement (entity, relationships, state machine, validation)
- [x] Tenancy (entity, relationships, state machine, validation)
- [x] Offer (entity, relationships, state machine)

### Business Processes ✅

- [x] Contact management
- [x] Property/Ownership management
- [x] Activity lifecycle (Lettings, Sales, Purchases)
- [x] Requirement matching
- [x] Tenancy/property management
- [x] Compliance (CDD, Right-to-Rent)

### API Documentation ✅

- [x] Workflow 1: Lettings (19 steps)
- [x] Workflow 2: Sales/Chain (10 steps)
- [x] Workflow 3: Auto-matching (7 steps)
- [x] Workflow 4: Tenancy Renewal (9 steps)
- [x] Workflow 5: Multi-let Portfolio (8 steps)
- [x] Workflow 6: Compliance (7 steps)
- [x] API patterns documented
- [x] 50+ endpoints documented

### State Machines ✅

- [x] Activity state machine (7 states)
- [x] Requirement state machine (6 states)
- [x] Tenancy state machine (8 states)
- [x] Offer state machine (5 states)
- [x] Contact validation rules
- [x] Property validation rules

### Validation Rules ✅

- [x] 51 Gherkin scenarios (all entities)
- [x] 11 key business rules table
- [x] 3 state transition validation matrices
- [x] Implementation guidance

### Infrastructure ✅

- [x] 60+ WebJob handler catalog
- [x] 8 Mermaid process flow diagrams
- [x] 22+ integration business rules
- [x] Architecture blueprint
- [x] Source inventory

---

## 🚀 State Machine Quick Lookup

### Activity States
```
DRAFT → LIVE → UNDER_OFFER → COMPLETION → COMPLETED
  ↓                ↓            ↓
(any) ←────── WITHDRAWN ←─────(any)
(any) ←────── EXPIRED (auto)
```
📖 [Full details](./Core Business Domain/STATE-MACHINES-VALIDATORS.md#1-activity-state-machine)

### Requirement States
```
ACTIVE ⇄ MATCHED → COMPLETING → COMPLETED
  ↓               ↓
WITHDRAWN ← (any)
EXPIRED ← (auto)
```
📖 [Full details](./Core Business Domain/STATE-MACHINES-VALIDATORS.md#2-requirement-state-machine)

### Tenancy States
```
DRAFT → ACTIVE ⇄ RENEWING → EXPIRED
           ↓↑        ↓↑
         (various transitions)
```
📖 [Full details](./Core Business Domain/STATE-MACHINES-VALIDATORS.md#3-tenancy-state-machine)

---

## 🔄 Data Flow: From Business Core to Infrastructure

```
1. Business Event Triggers
   (Contact created, Activity status changed, Tenancy commenced)
        ↓
2. Domain Entity State Transition
   (Activity LIVE → UNDER_OFFER, with precondition checks)
        ↓
3. API Endpoint Called
   (PUT /activities/{id}/status, POST /offers)
        ↓
4. Validation Rules Applied
   (Contact must have negotiator, CDD required for high-value activities)
        ↓
5. Domain Event Published
   (Activity.StatusChanged, Tenancy.Commenced event messages)
        ↓
6. Message Queue Processing
   (Events posted to Service Bus topics)
        ↓
7. WebJob Message Handler
   (60+ handlers consume messages from queues)
        ↓
8. External Integration
   (Push to Fixflo, SAP, Thirdfort, Qube, Dotmailer)
        ↓
9. Elasticsearch Projection
   (Updated search index for analytics)
        ↓
10. Callback/Webhook
    (External system sends result back)
        ↓
11. Hub State Update
    (WebJob updates Hub database with result)
```

**Documentation Coverage:**
- Steps 1-5: **[CORE-DOMAIN.md](./Core Business Domain/CORE-DOMAIN.md)**, **[API-WORKFLOWS.md](./Core Business Domain/API-WORKFLOWS.md)**, **[STATE-MACHINES-VALIDATORS.md](./Core Business Domain/STATE-MACHINES-VALIDATORS.md)**
- Steps 6-11: **[message-transport-inventory.md](./Architecture & Infrastructure/message-transport-inventory.md)**, **[process-flows.md](./Architecture & Infrastructure/process-flows.md)**, **[business-rules.md](./Architecture & Infrastructure/business-rules.md)**

---

## 📈 Documentation Statistics

| Category | Count |
|----------|-------|
| **Entities Documented** | 5 core + supporting entities |
| **State Machines** | 8 |
| **Valid State Transitions** | 46+ |
| **API Workflows** | 6 |
| **API Endpoints** | 50+ |
| **Gherkin Scenarios** | 51 |
| **Mermaid Diagrams** | 8+ |
| **WebJob Handlers** | 60+ catalogued |
| **Business Rules** | 51 scenarios + 11 rules |
| **Total Documentation Size** | ~100 KB |
| **Files** | 12 markdown files |

---

## ⚠️ Remaining Work

| Task | Status | Blocking | For Whom |
|------|--------|----------|----------|
| Task #7: Operations & Monitoring | ⏳ Pending | Production access | Operations team |
| Task #8: Subject-Matter Expert Review | ⏳ Pending | SME availability | Validation/approval |

👉 See **[NEXT-STEPS.md](./Planning & Tracking/NEXT-STEPS.md)** for detailed roadmap

---

## 👥 Recommended Reading by Role

### 👨‍💼 Product Manager / Business Analyst

1. [CORE-DOMAIN.md](./Core Business Domain/CORE-DOMAIN.md) — 20 min read
2. [API-WORKFLOWS.md](./Core Business Domain/API-WORKFLOWS.md) — Pick your workflow (15-30 min)
3. [README.md](./Planning & Tracking/README.md) — 5 min overview

### 👨‍💻 Backend Developer

1. [API-WORKFLOWS.md](./Core Business Domain/API-WORKFLOWS.md) — 30 min read
2. [STATE-MACHINES-VALIDATORS.md](./Core Business Domain/STATE-MACHINES-VALIDATORS.md) — 45 min reference
3. [CORE-DOMAIN.md](./Core Business Domain/CORE-DOMAIN.md) — Entity relationships (15 min)

### 🏗️ Architect / Technical Lead

1. [architecture-blueprint.md](./Architecture & Infrastructure/architecture-blueprint.md) — 15 min
2. [CORE-DOMAIN.md](./Core Business Domain/CORE-DOMAIN.md) — 20 min
3. [source-inventory.md](./Architecture & Infrastructure/source-inventory.md) — 10 min reference

### 🧪 QA / Test Engineer

1. [API-WORKFLOWS.md](./Core Business Domain/API-WORKFLOWS.md) — 30 min (test case planning)
2. [STATE-MACHINES-VALIDATORS.md](./Core Business Domain/STATE-MACHINES-VALIDATORS.md) — 45 min (Gherkin scenarios)
3. [business-rules.md](./Architecture & Infrastructure/business-rules.md) — 15 min reference

### 🛠️ DevOps / Operations

1. [message-transport-inventory.md](./Architecture & Infrastructure/message-transport-inventory.md) — 20 min
2. [process-flows.md](./Architecture & Infrastructure/process-flows.md) — 15 min
3. (Task #7 - Awaiting operations documentation)

---

## ✅ Sign-Off Checklist

**Use this checklist to verify you have everything you need:**

- [ ] **I understand Hub's core entities** (Contact, Property, Activity, Requirement, Tenancy)
- [ ] **I know how they relate to each other**
- [ ] **I can trace a complete user workflow** (e.g., Lettings from property creation to tenancy)
- [ ] **I understand entity state machines** and what transitions are valid
- [ ] **I know what validation rules apply** to each entity
- [ ] **I can find the WebJob handler** for any business event
- [ ] **I know how external integrations work** (Fixflo, SAP, Thirdfort, etc.)
- [ ] **I have questions addressed** in the outstanding validation questions list

---

## 🤝 Feedback & Next Steps

### For Subject-Matter Experts
📧 Please review:
- **Priority 1:** [STATE-MACHINES-VALIDATORS.md](./Core Business Domain/STATE-MACHINES-VALIDATORS.md) — Validate all state transitions
- **Priority 2:** [API-WORKFLOWS.md](./Core Business Domain/API-WORKFLOWS.md) — Confirm workflows match real Hub usage
- **Priority 3:** [CORE-DOMAIN.md](./Core Business Domain/CORE-DOMAIN.md) — Verify entity relationships

✏️ Provide feedback on:
- State transitions that don't match actual behavior
- Missing workflows or use cases
- Incorrect business rule descriptions
- Ambiguities or unclear documentation

### For Operations Team
📧 Please provide:
- Production configuration templates (monitoring, alerting, SLA)
- Security configuration (identity, authorization, encryption)
- Deployment procedures and rollback plans
- Operational ownership matrix

### For Development Team
📧 Please use documentation for:
- Feature implementation references
- Test case creation
- API contract validation
- State machine implementation

---

**Last Updated:** 2026-11-17  
**Next Review:** Pending SME validation and operations input  
**Version:** 1.0 (Checkpoint 4)

