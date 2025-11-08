import { defineConfig, globalIgnores } from "eslint/config";
import esConfig from "@eslint/js";
import tsConfig from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier/recommended";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";

export default defineConfig([
	globalIgnores(["bin/*.js", "src/**/*.stories.tsx"]),
	esConfig.configs.recommended,
	...tsConfig.configs.recommended,
	prettierPlugin,
	reactHooksPlugin.configs.flat.recommended,
	jsxA11yPlugin.flatConfigs.recommended,
	{
		plugins: {
			import: importPlugin,
		},
		rules: {
			"import/no-unresolved": "off",
			"import/order": [
				"error",
				{
					groups: [
						"builtin",
						"external",
						"internal",
						"parent",
						"sibling",
						"index",
						"type",
					],
					pathGroups: [
						{
							pattern: "@/**",
							group: "internal",
							position: "before",
						},
						{
							pattern: "{components,hooks,utilities,config,constants,icons,styles,themes,types,cli,tests}/**",
							group: "internal",
							position: "before",
						},
						{
							pattern: "*.css",
							group: "index",
							position: "after",
						},
					],
					pathGroupsExcludedImportTypes: ["builtin", "external", "type"],
					"newlines-between": "always",
					alphabetize: {
						order: "asc",
						caseInsensitive: true,
					},
				},
			],
			"react-hooks/rules-of-hooks": "error",
			"react-hooks/exhaustive-deps": "error",
		},
		settings: {
			"import/resolver": {
				typescript: {
					alwaysTryTypes: true,
					project: "./tsconfig.json",
				},
			},
		},
	},
]);
