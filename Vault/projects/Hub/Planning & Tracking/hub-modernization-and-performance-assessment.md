# Hub modernization and performance assessment

**Assessment date:** 2026-11-24  
**Status:** Source-informed opportunities; not an approved delivery plan  
**Audience:** Product, architecture, engineering, operations and security

## Executive summary

Hub can be modernized incrementally without replacing the whole application.
The best starting point is to measure real user journeys and production
workloads, then address the slowest requests, search queries and background
processes. In parallel, establish a supported technology roadmap and protect
business behaviour with tests before migrating individual components.

The strongest source-backed candidates are:

1. Remove blocking asynchronous request reads from API upload paths and review
   model binders that synchronously read request bodies.
2. Measure and improve the claims-recalculation code that repeatedly scans
   result sets for each entity.
3. Measure the Angular initial bundle, route loading and rendering; examine
   globally loaded libraries and the current 6 MB warning budget.
4. Align local provisioning, CI and Angular toolchain versions; their declared
   Node.js versions currently differ.
5. Improve end-to-end visibility and message reliability before changing
   concurrency, retries or deployment topology.
6. Plan staged migration from the .NET Framework 4.8 Web API while preserving
   existing API, identity, integration and business-rule contracts.

These are **opportunities, not measured savings or confirmed production
incidents**. No live system, telemetry, database plans, dependency advisory
scan, accessibility audit or load test was inspected. The list is deliberately
broad but is not an exhaustive audit of every file or production resource.

## Evidence and boundaries

- Source reviewed: `C:\Source\Devops\KnightFrank.hub`; checked-out commit
  `4a8f6f2dfde` dated 2026-11-19, with local uncommitted changes elsewhere in
  the source worktree. References below are relative to that source root.
- Existing context: [architecture blueprint](../Architecture%20%26%20Infrastructure/architecture-blueprint.md),
  [source inventory](../Architecture%20%26%20Infrastructure/source-inventory.md),
  [message and transport inventory](../Architecture%20%26%20Infrastructure/message-transport-inventory.md),
  [business workflows](../Core%20Business%20Domain/API-WORKFLOWS.md) and
  [GUI parity specification](../GUI/PARITY-SPECIFICATION.md).
- Source shows an Angular 19 client, .NET Framework 4.8 Web API, EF6, SQL
  Server, Elasticsearch, WebJobs, Storage queues and Service Bus. Actual
  production versions, topology, volumes, support entitlements and ownership
  require confirmation.
- **Observed** means a code or configuration fact; **investigate** means a
  plausible improvement whose cost or benefit still needs measurement. P1 is
  the first tranche, P2 follows once dependencies are understood, and P3 is
  strategic. Effort is indicative: S = days, M = weeks, L = multiple weeks or
  more; discovery and dependencies may change it.

## Prioritized opportunities

### Performance and scalability

| ID | Priority / effort | Opportunity and evidence | Recommended next action / acceptance |
|---|---|---|---|
| PERF-01 | P1 / M | **Baseline actual journeys and workloads.** Existing JMeter plans are in `src/KnightFrank.Antares.PerformanceTests/`; their current relevance and execution results are unknown. | Agree representative contact, property, activity, search, upload and background-job scenarios; capture request rate, concurrency, p50/p95/p99, errors, payload, SQL duration, queue age and browser metrics. Save a reproducible baseline and compare changes with the same data and workload. |
| PERF-02 | P1 / M | **Remove sync-over-async on API I/O.** `src/KnightFrank.Antares.Api/Controllers/ContactsController.cs:1017` and `:1024` use `Task.Run(...).Result` for multipart upload; `DevelopmentController.cs:366` and `:373` follow the same pattern. `ModelBinders/DocuSignNotificationModelBinder.cs:25` and `ModelBinders/ConfigurableModelBinder.cs:33` block on request reads. This can consume request threads under concurrency. | Convert upload actions and their dependent I/O to asynchronous flows; for synchronous `IModelBinder`, assess an async-compatible formatter, handler or action instead of simply adding `async` to the interface. Preserve validation, stream lifetimes and response contracts. Load-test before/after and compare tail latency, errors and thread-pool pressure. |
| PERF-03 | P1 / M | **Bound upload memory and processing.** `ContactsController.cs:1017` uses `MultipartMemoryStreamProvider`, buffering multipart content. Actual file sizes and enforced limits are unknown. | Measure concurrent upload memory; evaluate bounded streaming or staged storage, explicit size/type limits, cancellation and cleanup. Test large files, rejection paths, concurrency and unchanged business validation. |
| PERF-04 | P1 / S-M | **Reduce repeated scans in claims recalculation.** `src/KnightFrank.Antares.Dal/Repository/FunctionsRepository.cs:1036-1055` filters several materialized collections for every entity; `:1080-1095` repeats the pattern for instructions. Cost grows with batch and result sizes. | Benchmark representative batch sizes; build lookups by entity ID once where semantics allow, preserving missing and duplicate-row behaviour and authorization results. Compare elapsed time, allocations and result equality. |
| PERF-05 | P1 / M | **Measure SQL and EF access on hot paths.** EF6 and stored procedures are used; `ReadGenericRepository.cs:28-31` already uses `AsNoTracking`, and `FunctionsRepository.cs` materializes procedure results. This is not evidence that all queries are inefficient. | Use query timings, execution plans, reads and row counts to find top offenders. Consider projections, appropriate pagination, batching, indexes and reduced round trips only where supported by plans; verify write cost and existing access rules. |
| PERF-06 | P1 / M | **Measure frontend payload and rendering.** `src/KnightFrank.Antares.Angular/angular.json` sets a production initial-bundle warning at 6 MB and error at 10 MB and globally loads jQuery, SignalR, JSTS and editor styles. Actual compressed transfer and user impact have not been measured. | Collect production build stats, compressed transfer, cache-hit rate, route waterfalls and browser traces. Defer or replace costly dependencies only where compatible; reduce budgets to agreed, measured limits without breaking functionality. |
| PERF-07 | P2 / M | **Optimize specific Angular routes and large grids.** Lazy routes already exist in `src/KnightFrank.Antares.Angular/src/app/activity/activity.module.ts`; `OnPush`, `trackBy` and `takeUntilDestroyed` also appear in the client. `activity-add-edit/activity-add-edit-base.component.ts` is large, but size alone does not establish a bottleneck. | Profile affected journeys and apply route-level splitting, stable row identities, virtual scrolling, change-detection or form decomposition where traces justify them. Preserve sorting, selection, editing and accessibility; compare interaction latency and memory. |
| PERF-08 | P2 / M | **Optimize search as a separate workload.** Elasticsearch and indexing jobs are documented in the [architecture blueprint](../Architecture%20%26%20Infrastructure/architecture-blueprint.md); deployed index size, query latency and projection lag are unknown. | Measure query latency, slow queries, result sizes, index health and source-to-search lag. Review mappings, pagination, bulk indexing, refresh policy and reindex strategy against real query patterns; verify search permissions and result parity. |
| PERF-09 | P2 / M | **Tune background throughput safely.** `src/WebJobs/KnightFrank.Antares.WebJobs/Program.cs:55-78` reads polling, visibility and batch settings and selects a queue processor. Real settings, retry and poison-message policies are unknown. | Measure queue age, throughput, retries, handler duration and downstream saturation. Tune concurrency/batches and backpressure per workload; test duplicate delivery, visibility expiry and recovery before rollout. |
| PERF-10 | P2 / M | **Review external I/O and caching.** Hub has external-service adapters, document storage and shared caches; the host initializes `ICacheable` instances in `Program.cs:54-55`. No latency or cache-hit evidence was reviewed. | Trace dependency latency; review client connection lifetimes, timeouts, bounded retries, cache lifetimes and invalidation on measured hot paths. Test stale data, recovery, cancellation and rate limits. |
| PERF-11 | P3 / M-L | **Review reports, exports and document conversion.** These exist in the source inventory; no representative runtime profile was reviewed. | Identify long-running exports and conversions; measure memory, duration and concurrency. Where justified use streaming or asynchronous jobs with progress, quotas and retention; preserve downloadable output and permissions. |

### Platform and engineering modernization

| ID | Priority / effort | Opportunity and evidence | Recommended next action / acceptance |
|---|---|---|---|
| MOD-01 | P1 / M | **Create a supported dependency and runtime inventory.** The API project targets .NET Framework 4.8/C# 7.3 and references EF 6.1.3 and older libraries (`src/KnightFrank.Antares.Api/KnightFrank.Antares.Api.csproj:16-17` and references). The client declares Angular 19 and TypeScript `~5.5.4` (`package.json`). Declared versions do not prove deployed versions or vulnerabilities. | Inventory deployed runtimes, transitive packages, licensing and vendor support dates; validate Angular/TypeScript/Node compatibility against the applicable vendor matrix and scan approved lockfiles/artifacts. Prioritize fixes by exposure, support and compatibility; rehearse upgrades. |
| MOD-02 | P1 / S-M | **Align developer provisioning with the real client build.** `BuildDeploy/ProvisioningConfiguration.ps1:189-191` installs Node 10.23.0 locally, while `BuildDeploy/pipelines/steps/BuildAngular.yml` selects Node 24 and `package.json` uses Angular 19. These describe different environments, not proof either is currently deployed. | Establish a vendor-supported Node/package-manager/Angular/TypeScript combination; pin and document it for developer and CI use, update stale setup instructions and prove a clean restore, build, lint and test run. |
| MOD-03 | P2 / L | **Migrate the API in slices, not a big-bang rewrite.** The API is ASP.NET Web API on .NET Framework, with Autofac, SignalR and shared domain/DAL dependencies. | Select a supported .NET LTS target at delivery time; inventory blocking libraries, Windows/IIS assumptions, authentication, serializers and transactions. Pilot a low-risk endpoint behind existing routing, compare responses and authorization, and retain rollback. Reassess EF and job migration separately. |
| MOD-04 | P2 / M-L | **Modernize WebJobs and messaging deliberately.** The current host uses `JobHostConfiguration` and `UseServiceBus()` (`Program.cs`). | Inventory SDK support, triggers and deployment dependencies. Compare supported host/SDK options, including remaining on a supported host, before choosing. Migrate one consumer at a time with message contract, retry, ordering, idempotency and replay tests. |
| MOD-05 | P2 / M | **Control dependency and build reproducibility.** Existing pipelines build backend and Angular, run Angular lint/tests, and have dedicated integration-test definitions (`BuildDeploy/pipelines/`). | Verify which pipelines are required gates and publish test results; lock and review dependency resolution, generate an SBOM, audit package advisories, and build immutable artifacts. Avoid claiming missing controls solely from one pipeline file. |
| MOD-06 | P2 / M | **Reduce coupling around business workflows.** Shared domain and DAL code are used by API and jobs; contracts and state rules are documented in the vault. | Map ownership and transaction boundaries around one business capability; introduce explicit application interfaces and versioned contracts incrementally. Do not split into microservices without a measured operational and organizational benefit. |
| MOD-07 | P2 / M | **Improve API contracts and compatibility.** `BuildDeploy/Diff-Api.ps1` and `BuildDeploy/pipelines/tests/IntegrationTests.PactIO.yml` show existing API-diff and Pact assets. Current enforcement and coverage are unverified. | Inventory consumers and compatibility rules; exercise API diffs, contract tests, consistent validation/error responses and version/deprecation policy. Verify existing clients, SignalR and webhook payloads before changes. |
| MOD-08 | P2 / M | **Modernize the frontend incrementally.** The current client already uses route lazy loading, strict templates and Angular 19. GUI parity documentation describes observable behaviour, not a mandate to replace Angular. | Upgrade through supported versions in compatible steps, simplify measured complex areas and remove obsolete libraries when practical. Preserve the [GUI parity contract](../GUI/PARITY-SPECIFICATION.md), including P4 rendered comparison where replacement screens are introduced. |
| MOD-09 | P2 / M | **Strengthen automated regression coverage.** Existing client tests, integration pipelines, Pact assets and JMeter scripts are present; coverage and gating are not established. | Turn approved business workflows, state transitions and authorization cases into executable regression tests. Add focused integration, message duplicate/retry and representative UI tests, then verify the required CI gates and ownership. |

### Reliability, security, operations and user experience

| ID | Priority / effort | Opportunity and evidence | Recommended next action / acceptance |
|---|---|---|---|
| OPS-01 | P1 / M | **Define observability and service objectives.** Application Insights is a client dependency and the WebJob host uses log4net; end-to-end propagation and production dashboards are unverified. | Establish journey-level service indicators and error budgets; propagate correlation/trace IDs across UI, API, SQL, queues and integrations; build actionable dashboards and alerts. Include queue age, dependency errors and business completion, with privacy controls. |
| OPS-02 | P1 / M | **Make asynchronous work recoverable.** The [transport inventory](../Architecture%20%26%20Infrastructure/message-transport-inventory.md) records many message channels; deployed dead-letter, retry, idempotency and reconciliation behaviour remains unverified. | Inventory each critical producer/consumer, delivery guarantee and business owner. Add safe retry with backoff, deduplication, poison/dead-letter handling, alerting, replay and reconciliation as needed. Test a failure and duplicate delivery end to end. |
| OPS-03 | P1 / M | **Review sensitive data in logs and configuration.** `DocuSignNotificationModelBinder.cs:53-59` logs full request content on exceptions. Whether it contains personal or sensitive data depends on the payload. | Classify payloads; replace raw-body logging with an appropriate correlation ID and safe metadata, apply redaction and retention policy, and review access to secrets and logs. Verify incident diagnostics still work; do not copy payloads into tickets. |
| OPS-04 | P1 / M | **Verify identity, authorization and secrets end to end.** The production identity, network boundaries and secrets-management model are not established in the current inventory. | Review roles and object-level authorization across API, jobs, search, reports and document access; validate service identities, least privilege, secret rotation and audit trails. Treat gaps as unverified until reviewed with security and operations. |
| OPS-05 | P2 / M | **Improve release, rollback and data-change safety.** Build and database deployment scripts exist; production release gates and recovery procedures remain unverified. | Define tested deployment/rollback playbooks, backward-compatible database expand/contract migrations, feature flags for risky behaviour and post-deploy checks. Rehearse recovery, including queued messages and search projections. |
| OPS-06 | P2 / M | **Confirm resilience and recovery objectives.** Source cannot establish production redundancy, backups or recovery times. | Agree RTO/RPO and owners; test restore, dependency outage, queue backlog, database failover and search rebuild. Ensure recovery procedures preserve business data and avoid duplicate side effects. |
| UX-01 | P2 / M | **Assess accessibility and usability.** The vault records screen, interaction and layout contracts; no independent accessibility or user research audit was reviewed. | Test keyboard navigation, focus, forms, errors, contrast, screen readers and representative browsers with users. Prioritize issues by impact, preserve existing workflows, and verify improvements against an agreed accessibility standard. |
| UX-02 | P2 / M | **Improve feedback for slow and asynchronous operations.** Hub has bulk uploads, exports and background integrations; current end-to-end user feedback varies by workflow and needs validation. | Observe users and add actionable progress, cancellation where safe, clear failure/retry states and completion notifications. Test refresh, duplicate submission and permission changes. |
| OPS-07 | P3 / M | **Manage cost and capacity using measured demand.** Hosting, licensing and production capacity are not established from source. | Map resource ownership and utilization; evaluate right-sizing, workload scheduling, storage retention and license use after performance and resilience baselines exist. Compare savings against service objectives. |

## Suggested delivery sequence

1. **Discovery and safety:** assign product, engineering, operations and
   security owners; confirm deployed inventory, current incidents, support
   dates and user journeys. Establish PERF-01 and OPS-01/02/03/04 first.
2. **Targeted improvements:** profile the candidates in PERF-02 to PERF-06,
   select the highest-impact items, agree budgets and regression tests, then
   deliver and measure each change independently. Align toolchains under
   MOD-02.
3. **Strengthen foundations:** implement the highest-value testing, release,
   observability, search and messaging improvements. Establish API and GUI
   compatibility gates before moving workloads.
4. **Modernize by capability:** pilot the API/runtime and job migration on
   independently reversible slices. Review the outcome and support matrix
   before expanding; keep SQL, integrations and consumers compatible.

This sequence is dependency-based rather than a fixed calendar; staffing,
vendor support, contracts and production risk must determine scheduling.

## Measures and decisions

Agree numerical thresholds with service owners **after baseline collection**;
none are represented as current performance or contractual commitments.

| Measure | Baseline and acceptance method |
|---|---|
| Key API journeys | Record p50/p95/p99, throughput and error rate by endpoint under representative peak and normal load; an improvement must beat the baseline without unacceptable regression in correctness or capacity. |
| Browser | Record initial compressed transfer, route-ready time, interaction responsiveness and memory on agreed devices/network profiles; agree bundle and user-journey budgets. |
| Database | Record top query duration, logical reads, calls and lock waits; verify index or query changes against write overhead and representative parameters. |
| Background processing | Record oldest-message age, successful completion time, retries, dead-letter count and duplicate effects; demonstrate recovery and reconciliation. |
| Reliability | Define availability, recovery time and data-loss objectives; demonstrate alerts and a restore/failover exercise. |
| Delivery | Record build/test duration, required gate results, deployment failure rate and rollback time; validate with a representative release. |

Before delivery, decide which business journeys matter most; the production
deployment and owner of each component; traffic and data volumes; the support
and licensing constraints; accessible browser/device requirements; acceptable
downtime and RTO/RPO; API consumer compatibility; and the budget and capacity
for migration. SME approval is required for business rules and GUI changes.

## Focused .NET scan record

This is **not** a whole-repository performance scan. The two API model binders
were read in full and scanned as a narrow sample: 2 files, 146 lines. Counts
are matching **lines**, not distinct defects; type/flow and hot-path review
remain necessary. Recipes requiring .NET 6+ or 7+ are not immediate fixes for
the current .NET Framework API.

| Recipe / signal | Matching lines |
|---|---:|
| `IndexOf` literal; `Substring`; literal `StartsWith`/`EndsWith`; literal `Contains` | 0 / 0 / 0 / 0 |
| `ToLower`/`ToUpper`; three chained `Replace`; `params`; character `All`/`Any` | 0 / 0 / 0 / 0 |
| Static readonly `Dictionary` / `FrozenDictionary` | 0 / 0 |
| `new List` / `new Dictionary`, excluding lines containing static or readonly | 1 / 0 |
| `StringComparer.CurrentCulture`; LINQ `Select`/`Where`/`Cast`/`Take`/`Aggregate` | 0 / 0 |
| `async void` excluding event lines; blocking `.Result`/`.Wait` candidates | 0 / 2 |
| `new HttpClient`; non-static/non-readonly `new JsonSerializerOptions` | 0 / 0 |
| `RegexOptions.Compiled`; `GeneratedRegex`; `new Regex` | 0 / 0 / 0 |
| Public/internal class declarations / sealed declarations | 2 / 0 |
| Other scan signals: `JsonSerializer`; `stackalloc`; `ValueTask`; `string.Format`; `+=`; nested regex quantifier candidate; `new byte[]`; `IndexOfAny`; `ContainsKey`; `foreach` | 4 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 / 0 |
| Additional broad checks: `Select`/`Where`/`OrderBy`/`GroupBy`; `All`/`Any`; `Replace`; `StartsWith`/`EndsWith`/`Contains`; `IEquatable` | 0 / 0 / 0 / 0 / 0 |

The two blocking reads are confirmed task-result accesses, but actual impact
and deadlock occurrence are unmeasured. The list allocation is part of
per-request Newtonsoft converter configuration; measure before changing
serializer settings or caching converters. The `JsonSerializer` hits include
Newtonsoft identifiers, not evidence of `System.Text.Json` options misuse.
Class sealing, the absence of `GeneratedRegex` or `FrozenDictionary`, and
zero regex/collection hits in these two files do not establish an
application-wide issue. Other critical patterns, including repeated
enumeration and cross-method allocations, need semantic review and profiling;
the table is not proof of their absence.

| Performance-scan classification | Findings | Top issue |
|---|---:|---|
| Critical candidate | 1 | Blocking request reads in synchronous model binders; verify deadlock/starvation risk and redesign the binding path. |
| Moderate | 0 | No quantified hot-path improvement established. |
| Information | 1 | Per-request converter/list allocation; profile before optimizing. |

> **Disclaimer:** This AI-assisted assessment can contain false positives,
> omissions or recommendations unsuitable for the deployed environment.
> Validate findings with benchmarks, human review and production-specific
> evidence before implementing changes.
