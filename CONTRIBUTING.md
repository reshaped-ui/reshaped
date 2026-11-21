Looking to contribute? We're excited to have you! ✨

## Overview

While Reshaped is open-source, we might be quite opinionated about what should be included in the library.
There are multiple reasons for this:

- We need to make sure all changes make sense in long term. We make a maximum of 1 major release per year and a lot of the APIs should be stable for years to come.
- All changes we're making in code are always synced with the Figma library and sometimes are decisions and priorities are impacted by the features available in Figma.
- We make sure that maintenance of Reshaped is sustainable for us so we might be saying no to some ideas just because of their maintenance cost. Instead we would encourage the community to build their solutions on top of Reshaped.

### Good issues to work on

It's always a good idea to start with the reported bugs, missing tests and/or storybook examples.
For all new features, we recommend to start with a feature proposal first where we can discuss its implementation details.

## Development environment

- Make sure you're using `pnpm` as the package manager.
- Run `pnpm install` to install the dependencies.
- Run `pnpm dev` to start Storybook and start developing.

### Testing

Component tests are split by what they check:

- **Stories** (`tests/*.stories.tsx`) show the visual variants and states of a component. Every story is a visual regression snapshot in Chromatic. A story can have a `play` function asserting that its visual state is correct in the DOM too, e.g. a disabled button story checking the `disabled` attribute. Play functions run in Storybook's test widget and with `pnpm test:browser`.
- **Browser tests** (`tests/*.test.tsx`) cover behavior: handlers, controlled and uncontrolled state, keyboard navigation, focus, attribute forwarding and other edge cases. They run with Vitest browser mode in Chromium and don't produce snapshots, so they're the place for adding as many edge cases as needed without adding more stories. Run them with `pnpm --filter reshaped test:components`.
- **Unit tests** (`*.test.ts`) cover pure functions and run with `pnpm test:unit`.

See [AGENTS.md](./AGENTS.md#testing) for the detailed conventions and examples.

Visual regression testing access is limited to the repository maintainers and will be triggered manually before the release or for pull requests with major changes.

## Changelog

We use [Changesets](https://github.com/changesets/changesets) to manage versions and generate changelogs.

### Adding a changeset

Every PR with user-facing changes should include a changeset:

1. Run `pnpm changeset` and follow the prompts to choose the bump type:
   - **patch**: bug fixes and internal tweaks
   - **minor**: backward-compatible feature additions
   - **major**: breaking changes (rare; coordinate with maintainers first)

2. Write a concise summary describing what changed and why. This becomes part of the changelog.

3. Commit the generated `.md` file under `.changeset/` directory with your PR.

### Useful commands

- `pnpm changeset` – create a new changeset
- `pnpm changeset:status` – preview what will be released
- `pnpm version` – consume all changesets and bump package version (used during release)
