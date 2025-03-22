const path = require("path");
const customMediaPlugin = require("postcss-custom-media");
const postcssGlobalData = require("@csstools/postcss-global-data");
const baseConfig = require("../tools/build/postcss.config");

module.exports = {
	plugins: [
		...baseConfig.plugins,
		postcssGlobalData({
			files: [path.resolve(__dirname, "../src/themes/reshaped/media.css")],
		}),
		customMediaPlugin(),
	],
};
