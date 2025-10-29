import { defineConfig, globalIgnores } from "eslint/config";
import esConfig from "@eslint/js";
import tsConfig from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier/recommended";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";

export default defineConfig([
	globalIgnores(["bin/*.js", "src/**/*.stories.tsx"]),
	esConfig.configs.recommended,
	...tsConfig.configs.recommended,
	prettierPlugin,
	reactHooksPlugin.configs.flat.recommended,
	jsxA11yPlugin.flatConfigs.recommended,
	{
		rules: {
			"import/no-unresolved": "off",
			"react-hooks/rules-of-hooks": "error",
			"react-hooks/exhaustive-deps": "error",
		},
	},
]);
