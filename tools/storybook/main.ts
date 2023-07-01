import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";
import { mergeConfig, UserConfig } from "vite";

export default {
	framework: "@storybook/react-vite",
	typescript: { reactDocgen: false },
	stories: ["../../src/**/*.stories.tsx"],
	staticDirs: ["./public"],

	/**
	 * We're only using a single storybook addon for testing accessibility since we have
	 * built-in environment controls for testing color modes and rtl
	 * You can install more essential plugins using this guide https://storybook.js.org/docs/react/essentials/introduction
	 */
	addons: ["@storybook/addon-a11y"],

	async viteFinal(config: UserConfig) {
		return mergeConfig(config, {
			plugins: [tsconfigPaths()],
			css: {
				postcss: path.resolve(__dirname, "../build"),
			},
		});
	},
};
