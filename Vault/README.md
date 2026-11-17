# KF-Documentation

I dump raw stuff into `/raw`. AI turns it into clean notes in `/wiki`. That's it.

## Folders

- `/raw` — anything I capture: notes, PDFs, screenshots, links
- `/wiki` — clean notes written by AI
- `/projects` — active work, one folder per project, each with its own README
- `/archive` — processed `/raw` files land here so I can see what's been handled

## The Loop

1. Write or drop anything into `/raw`.
2. Run an AI agent with the prompt in `translate.md`.
3. Read the updated `/wiki`.

The whole folder is a git repo, so nothing is ever lost.

# Goals

Hub source code is stored locally here : C:\Source\Devops\KnightFrank.hub
Goal : The task is to document the Hub source code and any related processes or notes.
Goal : All Hub documentation will be captured in the projects\Hub folder.
Goal : Start with hub only.
Goal : Architecture documentation with diagrams in Archimate format.
Goal : Process flows with diagrams in Mermaid format.
Goal : Business Rules in Gerkin format.

Once Hub documetation has been complete.
Goal : Any Azure Service related documentation will also be captured in the projects folder under the service name.

# Tasks

1. **Access and scope**
   - Confirm the Hub source location is available.
   - Define which Hub components and related processes are in scope.
   - Record assumptions and unknowns.

2. **Source inventory**
   - Catalogue applications, services, repositories, integrations, data stores, Azure resources, and deployment mechanisms.
   - Identify authoritative sources and gaps.

3. **Architecture documentation**
   - Create ArchiMate diagrams for:
     - Context and stakeholders
     - Application/component landscape
     - Integration and data flows
     - Infrastructure/deployment view
   - Add explanatory documentation for each diagram.

4. **Process documentation**
   - Identify key business and technical processes.
   - Create Mermaid flow diagrams.
   - Document triggers, actors, inputs, outputs, exceptions, and hand-offs.

5. **Business rules**
   - Extract rules from source code, configuration, and existing notes.
   - Write them as Gherkin scenarios.
   - Link each rule to its source or flag it as unverified.

6. **Review and completion**
   - Validate diagrams and terminology.
   - Check that all identified components and processes are covered.
   - Update the Hub project README with status, gaps, and outstanding questions.

7. **Azure service documentation**
   - Keep this blocked until Hub documentation is complete.
   - Then create one project folder per Azure service and document its role, configuration, integrations, operations, and dependencies.

# Complete
Hub documentation is considered complete only when the source inventory, architecture, processes, and business rules have all been reviewed and known gaps are explicitly recorded.

# Publishing

The Vault is published with MkDocs and GitHub Pages.

## Local preview

Install Python and the dependencies in `requirements.txt`, then run:

```powershell
python -m pip install -r requirements.txt
python -m mkdocs serve
```

Open the local address shown by MkDocs, normally `http://127.0.0.1:8000`.

## GitHub Pages deployment

The workflow in `.github/workflows/deploy-docs.yml` builds the site on pushes to the `master` branch and deploys it through GitHub Pages. In the GitHub repository settings, set **Pages > Build and deployment > Source** to **GitHub Actions**.

The repository must have a GitHub remote configured before it can be pushed. The workflow publishes the pages listed in `mkdocs.yml`; raw captures, archive files, prompts, and agent instructions are excluded from the generated site.