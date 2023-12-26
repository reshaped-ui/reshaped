const importPlugin = require("postcss-import");
const nestedPlugin = require("postcss-nested");
const eachPlugin = require("postcss-each");
const customMediaPlugin = require("postcss-custom-media");
const autoprefixer = require("autoprefixer");
const cssNano = require("cssnano");
const responsivePlugin = require("./postcss.responsive");

module.exports = {
	plugins: [
		importPlugin(),
		responsivePlugin(),
		eachPlugin(),
		nestedPlugin(),
		customMediaPlugin(),
		autoprefixer(),
		cssNano({ preset: ["default", { calc: false }] }),
	],
};
