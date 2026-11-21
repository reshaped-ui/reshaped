# Reshaped – agent instructions

Reshaped is a React design system published as the `reshaped` package. This is a pnpm monorepo:

- `packages/reshaped` – the component library (`src/components`, `src/hooks`, `src/utilities`, `src/styles`, `src/themes`)
- `packages/utilities` – framework-agnostic DOM, a11y, flyout and css helpers used by the library (`@reshaped/utilities`)
- `packages/theming` – theme generation (`@reshaped/theming`)
- `plugins/reshaped/skills` – skills for people _using_ Reshaped in their apps, not instructions for working on this repo
- `.storybook` – Storybook config, stories are picked up from `packages/reshaped/src/**/*.stories.tsx`

## Commands

Run from the repo root unless mentioned otherwise.

- `pnpm install`, then `pnpm build` – `packages/reshaped` consumes the built `dist` of the other workspace packages, so build before running tests on a fresh checkout
- `pnpm dev` – Storybook on port 3001
- `pnpm lint` – oxfmt, oxlint and stylelint (`pnpm lint:format`, `pnpm lint:js`, `pnpm lint:css` individually)
- `pnpm test:unit` – node unit tests (`*.test.ts`)
- `pnpm test:browser` – everything that runs in Chromium: story play functions and browser tests
- Inside `packages/reshaped`, target a single project or a path:
  - `pnpm exec vitest run --project=browser src/components/Button` – browser tests (`*.test.tsx`)
  - `pnpm exec vitest run --project=storybook src/components/Button` – story play functions
  - `pnpm exec vitest run --project=unit` – node unit tests
- `pnpm exec tsc -p tsconfig.json --noEmit` inside `packages/reshaped` – type check, including stories and tests

## Component structure

```
src/components/Button/
  Button.tsx            – implementation
  Button.types.ts       – public props, documented with TSDoc
  Button.module.css     – styles (CSS modules)
  index.ts              – public exports
  tests/
    Button.stories.tsx  – visual examples, snapshotted by Chromatic
    Button.test.tsx     – behavior tests, vitest browser mode
```

Hooks follow the same idea with tests in `src/hooks/tests/`.

## Testing

There are three kinds of tests. Pick the kind by asking whether a visual snapshot of the result is useful.

### 1. Stories (`tests/*.stories.tsx`) – what the component looks like

Stories document the visual variants of a component and every story is a Chromatic snapshot (`pnpm test:vrt` / the `chromatic` PR label).
They are also what people browse in Storybook, so keep them focused on variants and states someone wants to look at.

- Add a story when a prop or state changes how the component looks: `variant`, `color`, `size`, `disabled`, `loading`, responsive values, composition with other components, RTL, etc.
- Use the `Example` / `Example.Item` helpers from `@/utilities/storybook` to group variants into one story.
- A story can have a `play` function to assert that the visual state is also correct in the DOM. Keep these small and tied to what the story shows.
  For example, the `disabled` story renders all disabled buttons and its `play` checks that the button is actually `disabled`.
- Visual edge cases that need a screenshot (overflowing text, composition with slots) are stories named `"test: <case>"`.
- Don't add stories that only exist to run assertions: single unstyled elements, handler calls, attribute forwarding, controlled vs uncontrolled state, keyboard navigation. Those belong in browser tests.
- Utility components without visual output of their own (for example `Portal` and `Freeze` in `components/_private`) don't get story files – test them only with browser tests. Hooks get a story only when an interactive demo is useful for manual checks.
- If a story is needed for interactive manual checks but has no visual value, disable its snapshot with `parameters: { chromatic: { disableSnapshot: true } }`.

### 2. Browser tests (`tests/*.test.tsx`) – how the component behaves

Behavior tests run with [Vitest browser mode](https://vitest.dev/guide/browser/) in real Chromium, with the slate theme css loaded and the tree wrapped in the `Reshaped` provider (`React.StrictMode` on, same as Storybook).
They don't show up in Storybook or Chromatic, so this is where edge cases go – add as many as needed.

Typical content: event handlers and their arguments, controlled and uncontrolled behavior, `className` / `attributes` / `as` / `render` forwarding, aria attributes, focus management, keyboard navigation, form integration, hooks.

```tsx
import { describe, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import Button from "@/components/Button";
import { render } from "@/tests/render";

describe("Components/Button", () => {
	test("disabled doesn't trigger onClick", async () => {
		const handleClick = vi.fn();
		await render(
			<Button disabled onClick={handleClick}>
				Trigger
			</Button>
		);
		const el = page.getByRole("button");

		await expect.element(el).toBeDisabled();
		await userEvent.click(el, { force: true });

		expect(handleClick).not.toHaveBeenCalled();
	});
});
```

- Always import `render` / `renderHook` from `@/tests/render`, not from `vitest-browser-react` directly, so the provider and theme are applied.
- Query with `page` locators (`page.getByRole`, `page.getByText`, `page.getByTestId`, …) and prefer roles and accessible names over test ids. Portaled content (modals, flyouts, toasts) is found through `page` too.
- Assert on locators with `await expect.element(locator).toBe…()` – it retries until the DOM settles. Use `locator.element()` when you need the raw element.
- `userEvent` from `vitest/browser` drives real Playwright input. A click hits the innermost element at the cursor, so `event.target` can be a child of the element you clicked; check `currentTarget` or containment instead of strict equality. Clicking disabled elements needs `{ force: true }`.
- Mock functions with `vi.fn()`. Tests are cleaned up between runs automatically.
- Name the `describe` block after the story title (`Components/Button`, `Hooks/useToggle`) and name tests after the prop or scenario they cover.
- Use `renderHook` for hooks that don't need DOM interaction; render a small test component for hooks that do.
- Failure screenshots land in `__screenshots__/` next to the test and are git-ignored.
- Wait for state with `await expect.element(…)`, `expect.poll(…)` or `vi.waitFor(…)`, never with fixed timeouts. Always `await` them – an un-awaited `waitFor` never fails, which is how several old story plays silently tested nothing.
- Tests that need a different provider setup (color mode, RTL, no provider at all) pass their own `wrapper` to `render`. Tests that change `<html>` attributes (`dir`, `data-rs-theme`, `data-rs-color-mode`) must reset them in `beforeEach`/`afterEach` so they don't leak into other tests.

Browser quirks that come up often:

- Visually hidden native inputs (`HiddenInput`, checkbox, radio) can't be clicked by Playwright directly – click their label or the visible control instead.
- An open overlay or flyout covers the elements below it, so a real click lands on the overlay. Click the backdrop, move the pointer outside the content, or use `element.click()` when the test is about state rather than pointer behavior. Submenus may need a wider viewport: `await page.viewport(1024, 768)`.
- Playwright doesn't click `aria-disabled` elements without `{ force: true }`.
- A `<th>` without `scope` has the `cell` role, not `columnheader`.
- React clears `event.currentTarget` after the handler returns, so check `event.target` containment in handler mocks.
- `page.elementLocator()` doesn't work for `<html>`; pass `document.documentElement` to `expect.element` directly.
- Dependencies imported only by tests should be added to `optimizeDeps.include` of the `browser` project in `packages/reshaped/vitest.config.mjs`, otherwise a cold Vite cache (like in CI) reloads the page mid-run.

### 3. Unit tests (`*.test.ts`) – pure logic

Pure functions without React or DOM rendering (style resolvers, prop utilities, color generation) use plain vitest in node. Anything that needs a real DOM or layout goes to browser tests instead (`packages/utilities` runs its `*.test.ts` in browser mode since it's all DOM helpers).

### Which one to write

| You want to check…                                                            | Write                                                                    |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| A new prop value or state that changes the look                               | Story (plus a `play` assertion if it has DOM semantics, like `disabled`) |
| That the visual state also has the right attributes                           | `play` on that story                                                     |
| Handlers, a11y attributes, keyboard, focus, controlled/uncontrolled           | Browser test                                                             |
| Edge cases, regressions, combinations that look the same as an existing story | Browser test                                                             |
| A pure function                                                               | Unit test                                                                |

When fixing a bug, add a regression test in the browser test file unless the bug is visual, in which case add or extend a story.

## Code conventions

- TypeScript, React function components with `forwardRef` where a ref is exposed. Import internal modules through the `@/` alias.
- Public props are documented with TSDoc in `*.types.ts`; keep the docs in sync when changing behavior.
- Styles use CSS modules and the theme tokens (`var(--rs-…)`); responsive props are resolved with the helpers in `@/utilities/props`.
- Formatting and linting are enforced by oxfmt, oxlint and stylelint (pre-commit hook via lefthook).

## Changesets

Every PR with user-facing changes to a published package needs a changeset (`pnpm changeset`, or add a markdown file to `.changeset/`). Test-only and tooling changes don't need one.
