import path from "path";
import type { StorybookConfig } from "@storybook/react-vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { mergeConfig, UserConfig } from "vite";

const config: StorybookConfig = {
	framework: "@storybook/react-vite",
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
	core: {
		builder: {
			name: "@storybook/builder-vite",
			options: { fsCache: false },
		},
	},
	stories: ["../src/**/*.stories.tsx"],
	staticDirs: ["./public"],
	addons: [
		"@storybook/addon-vitest",
		"@storybook/addon-a11y",
		"./plugins/preset.js",
		{
			name: "@storybook/addon-docs",
			options: {
				sourceLoaderOptions: {
					injectStoryParameters: false,
				},
			},
		},
	],
	async viteFinal(config: UserConfig) {
		return mergeConfig(config, {
			plugins: [tsconfigPaths()],
			css: {
				postcss: path.resolve(__dirname),
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
