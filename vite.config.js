import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

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
				assetFileNames: (assetInfo) => {
					if (assetInfo.name === "bundle.umd.js") return "bundle.js";
					if (assetInfo.name === "style.css") return "bundle.css";
					return assetInfo.name;
				},
			},
		},
	},
});
