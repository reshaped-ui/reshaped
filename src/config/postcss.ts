// Using [plugin]: { ...options } format here because it's supported by the most frameworks
// - require('plugin') is not supported by Next
// - ['plugin', options] is not supported by Vite
export const config = {
	plugins: {
		"postcss-custom-media": {},
		autoprefixer: {},
		cssnano: { preset: ["default", { calc: false }] },
	},
};
