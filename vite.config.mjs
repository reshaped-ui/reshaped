import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	css: {
		postcss: resolve(__dirname, "tools/build"),
	},
	build: {
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
			external: ["react", "react-dom"],
			output: {
				entryFileNames: "bundle.js",
				chunkFileNames: "[name].js",
			},
		},
	},
});
