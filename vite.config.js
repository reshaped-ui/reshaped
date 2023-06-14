import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	build: {
		lib: {
			plugins: [react(), tsconfigPaths({ projects: [resolve(__dirname, "tsconfig.esm.json")] })],
			entry: resolve(__dirname, "src/index.ts"),
			name: "Reshaped",
			fileName: "bundle",
		},
		rollupOptions: {
			external: ["react", "react-dom"],
		},
	},
});
