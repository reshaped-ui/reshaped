import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ReactCompilerConfig = {
	target: "18",
};

export default defineConfig({
	plugins: [
		react({
			babel: {
				plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
			},
		}),
		tsconfigPaths(),
		dts({
			exclude: ["**/*.stories.tsx"],
		}),
	],
	build: {
		target: "es2022",
		outDir: "dist",
		emptyOutDir: true,
		sourcemap: false,
		minify: false,
		lib: {
			entry: {
				index: resolve(__dirname, "src/index.ts"),
				internal: resolve(__dirname, "src/internal.ts"),
			},
			formats: ["es"],
		},
		rollupOptions: {
			external: [
				"react",
				"react/jsx-runtime",
				"react-dom",
				"react-compiler-runtime",
				/^@reshaped\//,
			],
			output: {
				preserveModules: true,
				preserveModulesRoot: "src",
				entryFileNames: "[name].js",
			},
		},
	},
});
