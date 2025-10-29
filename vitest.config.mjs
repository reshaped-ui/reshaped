import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, mergeConfig } from "vitest/config";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
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
							configDir: path.join(dirname, ".storybook"),
							storybookScript: "pnpm dev --no-open",
						}),
					],
					test: {
						name: "storybook",
						// Enable browser mode
						browser: {
							enabled: true,
							// Make sure to install Playwright
							provider: playwright({}),
							headless: true,
							instances: [{ browser: "chromium" }],
						},
						coverage: {
							provider: "istanbul",
						},
						setupFiles: ["./.storybook/vitest.setup.ts"],
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
