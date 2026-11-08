import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	resolve: {
		// Mirrors the `@/*` path from tsconfig.json, which excludes test files
		alias: { "@": path.resolve(dirname, "src") },
	},
	test: {
		name: "unit",
		environment: "node",
		include: ["./src/**/*.test.ts"],
		exclude: ["**/node_modules/**", "**/dist/**"],
	},
});
