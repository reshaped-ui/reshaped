import path from "path";
import { fileURLToPath } from "url";

import postcssGlobalData from "@csstools/postcss-global-data";
import customMediaPlugin from "postcss-custom-media";

import baseConfig from "../packages/reshaped/tools/build/postcss.config.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
	plugins: [
		...baseConfig.plugins,
		postcssGlobalData({
			files: [path.resolve(__dirname, "../packages/reshaped/src/themes/reshaped/media.css")],
		}),
		customMediaPlugin(),
	],
};
