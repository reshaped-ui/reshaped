import nestedPlugin from "postcss-nested";
import eachPlugin from "postcss-each";
import cssNano from "cssnano";
import responsivePlugin from "./postcss.responsive.js";

export default {
	plugins: [
		responsivePlugin(),
		eachPlugin(),
		nestedPlugin(),
		cssNano({ preset: ["default", { calc: false }] }),
	],
};
