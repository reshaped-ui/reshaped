# @reshaped/theming

## 4.0.0-canary.17

### Major Changes

- [#608](https://github.com/reshaped-ui/reshaped/pull/608) [`ceee808`](https://github.com/reshaped-ui/reshaped/commit/ceee8082348b8b8e2fb40f0168c19378e763e0df) Thanks [@blvdmitry](https://github.com/blvdmitry)! - Updated shadow tokens structure to base/raised/overlay and intense variant

- [#608](https://github.com/reshaped-ui/reshaped/pull/608) [`ee64b76`](https://github.com/reshaped-ui/reshaped/commit/ee64b76e3e9490aa2e58534575669bd17289f1b1) Thanks [@blvdmitry](https://github.com/blvdmitry)! - Removed rgb color variables

- [#595](https://github.com/reshaped-ui/reshaped/pull/595) [`88d890b`](https://github.com/reshaped-ui/reshaped/commit/88d890beff8b4a48f9744174a71ae83250e9c9a1) Thanks [@blvdmitry](https://github.com/blvdmitry)! - Updated theming structure and values
  - Added x0-5 and x1-5 units
  - Updated medium radius to 6px by default
  - Added new shadow tokens for simulating borders mixed with shadows: `border`, `borderFaded`, `borderRaised`, `borderFadedRaised`, `borderOverlay`, `borderFadedOverlay`
  - Updated typography structure. Title 1-6 moved to headline 1-3 for marketing use cases, featured 1-3 are now title 1-6. Body 2 and body 3 are now body 1 and body 2 with body 2 being the default body text style.
  - Updated easing and duration values
  - Added new backgroundHighlightedFaded color tokens for custom hover effects

### Patch Changes

- [#608](https://github.com/reshaped-ui/reshaped/pull/608) [`a5a26fe`](https://github.com/reshaped-ui/reshaped/commit/a5a26fe68842f4ccfb73f8a67efe1de814f8f668) Thanks [@blvdmitry](https://github.com/blvdmitry)! - Added highlighted faded background colors to theme config
