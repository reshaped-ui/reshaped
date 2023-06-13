const path = require("path");
// const postcss = require("postcss");
// const cssConfig = require("../build/postcss.config");
const viteTsconfig = require("vite-tsconfig-paths");
const tsconfigPaths = viteTsconfig.default;

const { mergeConfig } = require("vite");

// const srcPath = path.resolve(__dirname, "../../src");

module.exports = {
	framework: "@storybook/react-vite",
	typescript: { reactDocgen: false },
	stories: ["../../src/**/*.stories.tsx"],
	staticDirs: ["./public"],
	addons: ["@storybook/addon-a11y"],

	async viteFinal(config) {
		return mergeConfig(config, {
			plugins: [tsconfigPaths()],
			css: {
				postcss: path.resolve(__dirname, "../build"),
			},
		});
	},
};
