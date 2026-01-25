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

export default defineConfig(({ mode }) => {
	const isBundle = mode === "bundle";

	return {
		plugins: [
			react({
				babel: {
					plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
				},
			}),
			tsconfigPaths(),
			!isBundle &&
				dts({
					exclude: [
						"**/*.test.ts",
						"**/*.test.tsx",
						"**/*.stories.tsx",
						"src/utilities/testPresets.tsx",
					],
				}),
		].filter(Boolean),
		css: {
			postcss: resolve(__dirname, "tools/build"),
		},
		build: isBundle
			? {
					target: "es2015",
					emptyOutDir: false,
					lib: {
						entry: resolve(__dirname, "src/index.ts"),
						name: "Reshaped",
						fileName: "bundle",
						formats: ["umd"],
					},
					rollupOptions: {
						logLevel: "silent",
						external: ["react", "react/jsx-runtime", "react-dom"],
						output: {
							entryFileNames: "bundle.js",
							chunkFileNames: "[name].js",
							globals: {
								react: "React",
								"react-dom": "ReactDOM",
								"react/jsx-runtime": "react/jsx-runtime",
							},
						},
					},
				}
			: {
					target: "es2022",
					outDir: "dist",
					emptyOutDir: true,
					sourcemap: false,
					minify: false,
					lib: {
						entry: resolve(__dirname, "src/index.ts"),
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
	};
});
