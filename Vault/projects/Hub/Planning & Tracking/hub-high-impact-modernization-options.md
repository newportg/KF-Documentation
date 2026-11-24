# Hub: high-impact modernization options

**Date:** 2026-11-24  
**Status:** Options for discussion; estimates and benefits require validation

## Summary

Hub can make meaningful architectural progress quickly by creating boundaries
around the existing application and piloting one modernized journey. A short
pilot is not the same as a complete production migration.

The suggested first steps are to **decouple the frontend** and **pilot a
modern .NET experience/logic layer** in parallel. Evaluate an OpenSearch
replacement separately against a specific cost, support or operational need.

Indicative durations below assume a focused team and suitable environments.
They cover a bounded pilot, not production rollout, domain extraction or
decommissioning. Actual times depend on dependencies, access, testing and
operational constraints.

## Options

| Option | Potential impact | First step and indicative pilot | Main considerations |
|---|---|---|---|
| **Decouple the frontend** | Enables independent UI releases and establishes a clearer Hub UX boundary. | **1-3 weeks:** deploy the existing Angular frontend separately against the existing API; verify a representative user journey. | Agree API contracts, authentication, deployment sequencing and rollback. This does not by itself separate business capabilities. |
| **Introduce a Hub logic/API layer** | Establishes an experience and orchestration layer between the UI and business capabilities. | **2-4 weeks:** place a thin experience API in front of one client, property or transaction journey, initially delegating to existing Hub functions. | Avoid duplicating business rules or creating another system of record. A facade alone does not make the underlying domains independently owned. |
| **.NET Framework 4.8 to modern .NET** | Provides a supported modernization path, modern hosting options and a route to Linux containers. | **2-4 weeks for a pilot:** move one representative API journey to ASP.NET Core while the existing API remains in service. | A full migration is substantially larger: assess ASP.NET Web API, shared libraries, EF, authentication, SignalR, integrations and background jobs. Performance improvement is not guaranteed. Select a supported .NET version at delivery time. |
| **Containerisation** | Improves deployment consistency and can support scaling and repeatable environments. | **1-3 weeks:** prove a containerized component and its deployment process. The Angular frontend already has a local container setup. | The existing .NET Framework API requires a Windows runtime and Windows containers if containerized as-is; Linux containers generally follow migration to modern .NET. Containerisation alone does not guarantee better performance or resilience. |
| **Elasticsearch to OpenSearch** | May improve licensing, hosting flexibility or vendor choice, depending on the comparison. | **2-4 weeks for a compatibility proof of concept:** test representative indexes, queries and indexing against OpenSearch. | Not inherently a performance upgrade. Hub uses an Elastic .NET client, custom analyzers, synonyms, plugins and indexing pipelines; compatibility, relevance, security, reindexing and rollback must be demonstrated. A production migration could take substantially longer. |

## Recommended sequence

1. **Agree one representative journey** and establish its current functional,
   security and performance baseline. Property search or an instruction
   journey are candidates, subject to ownership and dependency review.
2. **In parallel, prove independent frontend deployment and a modern .NET
   logic-layer slice.** Keep the current API and business rules authoritative
   until ownership and migration are agreed.
3. **Prove container deployment** for the selected component, including
   configuration, health checks, logging and rollback. Select the hosting
   platform only after operational requirements are understood.
4. **Run an OpenSearch proof of concept only if there is a clear objective.**
   Compare cost and support as well as result quality, performance and
   migration effort against the existing search platform.
5. **Use pilot evidence to select the next investment:** a larger runtime
   migration, a reusable capability boundary or a search-platform change.

Production delivery requires security and operational review, regression and
load testing, deployment and rollback plans, consumer compatibility, data
reconciliation where relevant, and approval from the relevant owners.

## Existing evidence and caveats

- The API project targets .NET Framework 4.8. The local
  `podman\README.md` in the Hub source repository describes Angular,
  Elasticsearch and proxy containers alongside an API running on IIS Express.
  That local configuration is **not** evidence of production topology.
- The search project references an Elastic .NET client. Search mappings include
  custom analyzers and synonyms, while local provisioning also uses a phonetic
  plugin and indexing pipelines. Production versions, data volumes, costs and
  compatibility have not been verified.
- The suggested timelines are discussion ranges, not commitments or measured
  outcomes. A platform change should be justified by the value demonstrated
  for Hub rather than by a technology substitution alone.

See the [architecture modernization strategy](./hub-architecture-modernization-strategy.md)
for the target UX, logic and business-capability boundaries, and the
[modernization and performance assessment](./hub-modernization-and-performance-assessment.md)
for supporting engineering detail.
