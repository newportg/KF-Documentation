# Offer pages

## Routes and entry points

- Offer add/edit.
- Offer view.
- Offer preview panels.
- Offer creation can be initiated from an activity, including note of
  interest and reservation variants.

## Add/edit page

### Header and parties

- vendor or landlord;
- availability;
- applicant;
- agent;
- responsible-for-sale.

### Detail sections

- offer details;
- progress summary;
- mortgage details;
- additional survey;
- other details;
- area breakdown and terms where applicable.

The add panel can show warning information and offers Cancel and Save actions.

## Offer type behavior

Offer type changes the available status and fields. Reservation offers use the
restricted Reservation/Withdrawn status behavior documented in the shared
offer-status service. Accepted offers can default agreed price from offer
price. Area-based and annual amounts are converted according to the selected
period and currency context.

## View page

The offer view includes:

- delete action where permitted;
- joint-agent and reservation indicators;
- vendor/landlord;
- availability;
- applicant;
- summary;
- offer details;
- progress summary;
- mortgage details;
- additional survey;
- other details.

## Validation and navigation

- Offer add/edit uses dirty-navigation protection.
- Offer status and type choices are conditional.
- Lease dates reject invalid, inverted, expired, or overlong values where
  relevant.
- Save refreshes the offer and its linked activity state.

## Source evidence

`src/app/offer/offer-add-edit/`, `offer-add-panel/`, `offer-view/`,
`offer-preview-panel/`, and `src/app/common/services/offer-status.service.ts`.
