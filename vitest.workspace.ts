import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
	// {
	// extends: "vite.config.mjs",
	// 	test: {
	// 		include: ["./src/**/*.test.{ts,tsx}"],
	// 		name: "unit",
	// 		environment: "node",
	// 	},
	// },
	{
		extends: "vite.config.mjs",
		test: {
			include: ["./src/**/*.browser.test.{ts,tsx}"],
			name: "browser",
			browser: {
				enabled: true,
				name: "chromium",
				headless: true,
				provider: "playwright",
				// https://playwright.dev
				providerOptions: {},
			},
		},
	},
]);
