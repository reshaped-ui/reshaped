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
	docs: {
		autodocs: true,
	},
	stories: ["../../src/**/*.stories.tsx", "../../src/**/*.mdx"],
	staticDirs: ["./public"],
	addons: ["@storybook/addon-a11y", "@storybook/addon-docs"],

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
