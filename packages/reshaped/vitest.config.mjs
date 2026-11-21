import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig, mergeConfig } from "vitest/config";

import viteConfig from "./vite.config.mjs";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/writing-tests/test-addon
export default mergeConfig(
	viteConfig,
	defineConfig({
		test: {
			exclude: ["**/node_modules/**", "**/dist/**"],
			projects: [
				{
					extends: true,
					plugins: [
						storybookTest({
							configDir: path.join(dirname, "../../.storybook"),
							storybookScript: "pnpm dev --no-open",
						}),
					],
					test: {
						name: "storybook",
						// Storybook merges `root` to the repo root; keep test discovery scoped to this package.
						dir: dirname,
						// Runs story play functions in the browser
						browser: {
							enabled: true,
							provider: playwright({}),
							headless: true,
							instances: [{ browser: "chromium" }],
						},
						coverage: {
							provider: "istanbul",
						},
					},
				},
				{
					extends: true,
					test: {
						name: "browser",
						// Component and hook behavior tests that don't need a visual snapshot
						include: ["./src/**/*.test.tsx"],
						setupFiles: ["./src/tests/setup.ts"],
						browser: {
							enabled: true,
							provider: playwright({}),
							headless: true,
							instances: [{ browser: "chromium" }],
						},
						coverage: {
							provider: "istanbul",
						},
					},
				},
				{
					extends: true,
					test: {
						name: "unit",
						isolate: false,
						include: ["./src/**/*.test.ts"],
					},
				},
			],
		},
	})
);
