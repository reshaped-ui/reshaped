import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { mergeConfig, UserConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import type { StorybookConfig } from "@storybook/react-vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
	framework: "@storybook/react-vite",
	features: {
		experimentalComponentsManifest: true,
		experimentalCodeExamples: true,
	},
	typescript: {
		reactDocgen: "react-docgen-typescript",
		reactDocgenTypescriptOptions: {
			shouldExtractLiteralValuesFromEnum: true,
			compilerOptions: {
				allowSyntheticDefaultImports: false,
				esModuleInterop: false,
			},
			propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
		},
	},
	stories: ["../packages/reshaped/src/**/*.stories.tsx"],
	staticDirs: ["./public"],
	addons: [
		"@storybook/addon-vitest",
		"@storybook/addon-a11y",
		"./plugins/preset.mjs",
		{
			name: "@storybook/addon-docs",
			options: {
				sourceLoaderOptions: {
					injectStoryParameters: false,
				},
			},
		},
		"@storybook/addon-mcp",
	],
	async viteFinal(config: UserConfig) {
		return mergeConfig(config, {
			plugins: [
				tsconfigPaths({
					projects: [resolve(__dirname, "../packages/reshaped/tsconfig.json")],
				}),
			],
			css: {
				postcss: resolve(__dirname),
			},
			build: {
				rollupOptions: {
					logLevel: "silent",
					onwarn: (warning: { code: string }, warn: (warning: { code: string }) => void) => {
						if (warning.code === "MODULE_LEVEL_DIRECTIVE") return;
						warn(warning);
					},
				},
			},
		});
	},
};

export default config;
