import path from "path";
import { fileURLToPath } from "url";
import customMediaPlugin from "postcss-custom-media";
import postcssGlobalData from "@csstools/postcss-global-data";
import baseConfig from "../tools/build/postcss.config.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
	plugins: [
		...baseConfig.plugins,
		postcssGlobalData({
			files: [path.resolve(__dirname, "../src/themes/reshaped/media.css")],
		}),
		customMediaPlugin(),
	],
};
