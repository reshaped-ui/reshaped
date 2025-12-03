import cssNano from "cssnano";
import eachPlugin from "postcss-each";
import nestedPlugin from "postcss-nested";

import responsivePlugin from "./postcss.responsive.mjs";

export default {
	plugins: [
		responsivePlugin(),
		eachPlugin(),
		nestedPlugin(),
		cssNano({ preset: ["default", { calc: false }] }),
	],
};
