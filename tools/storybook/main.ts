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
	stories: ["../../src/**/*.stories.tsx"],
	staticDirs: ["./public"],
	addons: [
		"@storybook/addon-storysource",
		"@storybook/addon-controls",
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
		});
	},
};

export default config;
