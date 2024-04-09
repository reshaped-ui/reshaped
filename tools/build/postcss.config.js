const nestedPlugin = require("postcss-nested");
const eachPlugin = require("postcss-each");
const cssNano = require("cssnano");
const responsivePlugin = require("./postcss.responsive");

module.exports = {
	plugins: [
		responsivePlugin(),
		eachPlugin(),
		nestedPlugin(),
		cssNano({ preset: ["default", { calc: false, convertValues: false }] }),
	],
};
