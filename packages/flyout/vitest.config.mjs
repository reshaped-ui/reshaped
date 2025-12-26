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
						name: "unit",
						isolate: false,
						include: ["./src/**/*.test.ts"],
					},
				},
			],
		},
	})
);
