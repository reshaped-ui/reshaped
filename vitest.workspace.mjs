import { defineWorkspace } from "vitest/config";
import { storybookTest } from "@storybook/experimental-addon-test/vitest-plugin";

// More info at: https://storybook.js.org/docs/writing-tests/test-addon
export default defineWorkspace([
	{
		extends: "./vite.config.mjs",
		plugins: [
			// The plugin will run tests for the stories defined in your Storybook config
			// See options at: https://storybook.js.org/docs/writing-tests/test-addon#storybooktest
			storybookTest(),
		],

		test: {
			name: "storybook",
			browser: {
				enabled: true,
				headless: true,
				name: "chromium",
				provider: "playwright",
			},
			coverage: {
				provider: "istanbul",
			},
			// isolate: false,
			setupFiles: [".storybook/vitest.setup.ts"],
		},
	},
	{
		extends: "./vite.config.mjs",
		test: {
			name: "unit",
			isolate: false,
			include: ["./src/**/*.test.ts"],
		},
	},
]);
