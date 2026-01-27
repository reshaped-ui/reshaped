import { playwright } from "@vitest/browser-playwright";
import { defineConfig, mergeConfig } from "vitest/config";

import viteConfig from "./vite.config.mjs";

export default mergeConfig(
	viteConfig,
	defineConfig({
		test: {
			exclude: ["**/node_modules/**", "**/dist/**"],
			projects: [
				{
					extends: true,
					test: {
						name: "browser",
						include: ["./src/**/*.test.ts"],
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
			],
		},
	})
);
