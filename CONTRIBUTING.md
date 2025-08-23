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

- All component tests we write are running directly in Storybook and you can see their results in the action panel of a specific component. You can also run all component using the storybook test widget in the browser.
- All unit tests for other utilities can be executed using `pnpm test:unit`.
- Visual regression testing access is limited to the repository maintainers and will be triggered manually before the release or for pull requests with major changes.

## Changelog

We're using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) to generate changelog entries.
Whenever you make a commit, our script will validate the commit message format and during the release process all commits will be added to the changelog automatically.

### Changelog script API

`yarn changelog` – runs automatically after a version bump. Generates changelog entries for the latest version.

`yarn changelog --dry` – shows changelog entries without saving to file.

`yarn changelog --unreleased --dry` – generates changelog entries for the upcoming release before a new version was created.
Can be used to preview the changelog entries beforehand.

`yarn changelog [version]` – generates changelog entries for a specific version.
Can be used with `--dry` to preview the changelog entries beforehand.
