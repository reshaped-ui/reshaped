import path from "path";

const defaultThemeMediaCSSPath = path.resolve(__dirname, "../themes/media.css");

// Using [plugin]: { ...options } format here because it's supported by the most frameworks
// - require('plugin') is not supported by Next
// - ['plugin', options] is not supported by Vite
export const config = {
	plugins: {
		"postcss-custom-media": {
			importFrom: defaultThemeMediaCSSPath,
		},
		autoprefixer: {},
		cssnano: { preset: ["default", { calc: false }] },
	},
};

export const getConfig = (options: { themeMediaCSSPath: string }) => {
	const { themeMediaCSSPath = defaultThemeMediaCSSPath } = options;

	return {
		plugins: {
			"postcss-custom-media": {
				importFrom: themeMediaCSSPath,
			},
			autoprefixer: {},
			cssnano: { preset: ["default", { calc: false }] },
		},
	};
};
