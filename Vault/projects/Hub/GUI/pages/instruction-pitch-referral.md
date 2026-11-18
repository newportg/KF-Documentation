# Instruction, pitch, and referral pages

## Instruction

### Routes

- `/instruction/search`
- `/instruction/add`
- `/instruction/edit`
- `/instruction/view`

### Search

The search page uses expandable advanced-search groups for:

- negotiators;
- client;
- address;
- public sector;
- service lines;
- department;
- divisions;
- instruction type and status;
- registration;
- CDD status and CDD requirement;
- CDD team members;
- dates.

Results support count, export, widening the search, preview, and navigation.

### Add/edit/view

Sections include:

- negotiator;
- history and pitch;
- responsible for administration;
- client;
- billing client;
- client contact details, address, phones, and emails;
- credit-control client;
- additional information;
- registration;
- property;
- related activities, requirements, referrals, and pitch.

Add/edit uses sticky Cancel and Save actions and confirmation/validation
behavior for instruction transitions.

## Pitch

### Routes

- `/pitch/search`
- `/pitch/add`
- `/pitch/edit`
- `/pitch/view`

### Search

Expandable search groups include brief received date, pitch deadline,
potential fee income, and pitch result. Results support reset sorting, PDF/XLS
export, preview, and detail navigation.

### Add/edit/view

The compact pitch form contains:

- basic information;
- instruction relationship;
- pitch details;
- Save;
- Save and Create Instruction.

The view presents the same basic information, instruction, and details regions.

## Referral

### Routes

- `/referral/search`
- `/referral/add`
- `/referral/edit`
- `/referral/view`
- referral template edit.

### Search

The result table includes reference number, requirement, contact, created date,
referrer, recipient, status, connection type, source, linked entity, and
instructed state. Results support filters, clear-all, export, selection, and
preview/detail navigation.

### View/edit

Sections include:

- related information and registration;
- linked activities and requirements;
- referral actions;
- additional information.

Action cards are implemented for accept, forward, instruct, finish, regret,
invalid, and client-paid-in-full outcomes. Each card uses focused fields and
Cancel/Save controls.

## Validation and navigation

Instruction, pitch, and referral edit routes use dirty-navigation protection.
Status/action transitions can require confirmation, additional information, or
linked entity checks.

## Source evidence

`src/app/instruction/`, `src/app/pitch/`, `src/app/referral/`, and the shared
referral action-panel components.
