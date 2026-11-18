# Hub documentation next steps

This is the actionable backlog. Completed work is recorded in [TASK-COMPLETION-SUMMARY.md](./TASK-COMPLETION-SUMMARY.md); current status is maintained in [README.md](./README.md). Record completed checks in the [verification register](./TASK-COMPLETION-SUMMARY.md#verification-register).

## 1. Production transport confirmation — high priority

**Status:** Blocked on DevOps / Operations input

- Verify that deployment parameters or environment settings replace only the `local`/`dev` environment token with `prd`, preserving the remaining CAF name components.
- Map production topics to subscriptions and consumer modules.
- Record retry counts, visibility timeouts, dead-letter handling, and poison-message policy.
- Record idempotency and duplicate-message guarantees.

**Deliverable:** Production section in [message-transport-inventory.md](../Architecture%20%26%20Infrastructure/message-transport-inventory.md).

## 2. Subject-matter expert review — high priority

**Status:** Pending reviewer availability

- Review [CORE-DOMAIN.md](../Core%20Business%20Domain/CORE-DOMAIN.md).
- Review [API-WORKFLOWS.md](../Core%20Business%20Domain/API-WORKFLOWS.md).
- Review [STATE-MACHINES-VALIDATORS.md](../Core%20Business%20Domain/STATE-MACHINES-VALIDATORS.md).
- Review [business-rules.md](../Architecture%20%26%20Infrastructure/business-rules.md) and [process-flows.md](../Architecture%20%26%20Infrastructure/process-flows.md).
- Record corrections, approved behavior, and rules that remain implementation assumptions.

**Deliverable:** Review notes and approval status.

## 3. Operations handoff — high priority

**Status:** Blocked on production configuration and operations input

- Document monitoring, dashboards, alerts, ownership, and escalation paths.
- Document SLAs and acceptable processing latency.
- Document security, authentication, authorization, and secret-management responsibilities.
- Document deployment gates, rollback, incident response, and troubleshooting runbooks.

**Deliverable:** Operations section in the architecture documentation plus linked runbooks.

## 4. Complete source-derived coverage — medium priority

**Status:** Optional follow-up after the high-priority items

- Add activity and requirement handler-level transition rules.
- Add property contact-change and user reassignment flows.
- Add search indexing and projection consistency flow.
- Add error, retry, reconciliation, and idempotency flows for the highest-risk handlers.
- Add remaining document visibility and notification scheduling rules.

## 5. Replacement GUI and P4 verification — medium priority

**Status:** P0-P3 source-derived contract complete; replacement implementation not started

- Use the [GUI parity specification](../GUI/PARITY-SPECIFICATION.md),
  [P2 field catalogue](../GUI/p2-field-catalogue.md), and
  [P3 visual contract](../GUI/p3-visual-contract.md) as the implementation
  contract.
- Build the replacement without depending on Angular module boundaries.
- Capture replacement screens at the supplied wide-desktop viewport and at the
  source responsive breakpoints.
- Compare representative routes, populated states, loading/empty/error states,
  modals, role variants, and browser behavior.
- Record pixel/layout differences and resolve them before declaring P4 complete.

**Deliverable:** Replacement GUI with P4 rendered comparison and review notes
recorded in the verification register.

## 6. GUI product and accessibility review — medium priority

**Status:** Pending reviewer availability

- Confirm mandatory versus configurable fields, columns, panels, and tabs.
- Confirm supported browsers and resolve the Edge/Chrome discrepancy.
- Confirm keyboard navigation, focus order, announcements, contrast, and touch
  target requirements.
- Confirm which source-derived behavior is approved product policy.

**Deliverable:** Product, browser, and accessibility decisions recorded against
the GUI parity specification.

## Definition of done

The documentation can be marked production-ready when:

- Production transports and hosting targets are confirmed.
- Operational policies and ownership are documented.
- An SME has reviewed and approved the business-facing documentation.
- All unresolved assumptions are explicitly recorded.
