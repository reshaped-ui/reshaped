import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";
import { mergeConfig, UserConfig } from "vite";

export default {
	framework: "@storybook/react-vite",
	typescript: { reactDocgen: false },
	stories: ["../../src/**/*.stories.tsx"],
	staticDirs: ["./public"],
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
