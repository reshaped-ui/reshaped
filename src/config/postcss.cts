import path from "path";

const defaultThemeMediaCSSPath = path.resolve(__dirname, "../themes/reshaped/media.css");

// Using [plugin]: { ...options } format here because it's supported by the most frameworks
// - require('plugin') is not supported by Next
// - ['plugin', options] is not supported by Vite
export const config = {
	plugins: {
		"@csstools/postcss-global-data": {
			files: [defaultThemeMediaCSSPath],
		},
		"postcss-custom-media": {},
		cssnano: { preset: ["default", { calc: false }] },
	},
};

export const getConfig = (options: { themeMediaCSSPath: string }) => {
	const { themeMediaCSSPath = defaultThemeMediaCSSPath } = options;

	return {
		plugins: {
			"@csstools/postcss-global-data": {
				files: [themeMediaCSSPath],
			},
			"postcss-custom-media": {},
			cssnano: { preset: ["default", { calc: false }] },
		},
	};
};
