const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const postcssConfig = require("../build/postcss.config");

const rootPath = path.resolve(__dirname, "../..");
const bundlesOutputPath = path.resolve(rootPath, "dist");
const srcPath = path.resolve(rootPath, "src");

// Base config for bundle build
module.exports = {
	mode: "production",
	optimization: {
		minimizer: [new TerserJSPlugin({})],
	},
	output: {
		path: bundlesOutputPath,
		filename: `bundle.js`,
		// globalObject is an undocumented feature of Webpack
		// this is a workaround for https://github.com/webpack/webpack/issues/6784
		globalObject: "(typeof self !== 'undefined' ? self : this)",
		library: "reshaped",
		libraryTarget: "umd",
	},
	externals: {
		react: {
			root: "React",
			commonjs2: "react",
			commonjs: "react",
			amd: "react",
		},
		"react-dom": {
			root: "ReactDOM",
			commonjs2: "react-dom",
			commonjs: "react-dom",
			amd: "react-dom",
		},
	},
	devtool: "source-map",
	entry: path.resolve(srcPath, "index.ts"),
	plugins: [
		new MiniCssExtractPlugin({
			filename: `bundle.css`,
			ignoreOrder: true,
		}),
	],
	resolve: {
		modules: [srcPath, "node_modules"],
		extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				loader: "ts-loader",
				options: {
					configFile: "tsconfig.esm.json",
					compilerOptions: {
						// Compiled by the tsc
						declaration: false,
					},
				},
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							modules: {
								auto: true,
								localIdentName: "[name]-[local]-[hash:base64:5]",
							},
						},
					},
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								config: false,
								plugins: postcssConfig.plugins,
							},
						},
					},
				],
			},
		],
	},
};
