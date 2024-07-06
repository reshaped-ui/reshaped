import reshapedDefinition from "themes/_generator/definitions/reshaped";
import { camelToKebab } from "utilities/string";
import mergeDefinitions from "themes/_generator/utilities/mergeDefinitions";
import type { ThemeDefinition } from "themes/_generator/tokens/types";
import { bgWithDynamicForeground } from "themes/_generator/constants";

export const getTheme = (theme?: ThemeDefinition) => {
	const config: Record<
		| "backgroundColor"
		| "textColor"
		| "borderColor"
		| "colors"
		| "borderRadius"
		| "spacing"
		| "boxShadow"
		| "screens",
		Record<string, string>
	> = {
		backgroundColor: {},
		textColor: {},
		borderColor: {},
		colors: {},
		borderRadius: {},
		spacing: {},
		boxShadow: {},
		screens: {},
	};

	const definition = theme
		? (mergeDefinitions(reshapedDefinition, theme) as ThemeDefinition)
		: reshapedDefinition;

	Object.keys(definition.color).forEach((tokenName) => {
		const cssTokenName = camelToKebab(tokenName);
		const cssVariable = ["rs", "color", cssTokenName].join("-");
		const configValue = `var(--${cssVariable})`;

		if (tokenName.startsWith("background")) {
			const name = cssTokenName.replace("background-", "");
			config.backgroundColor[name] = configValue;

			if (bgWithDynamicForeground.includes(tokenName as any)) {
				const cssVariable = ["rs", "color", "on", cssTokenName].join("-");
				const configValue = `var(--${cssVariable})`;
				config.textColor[`on-${name}`] = configValue;
			}

			return;
		}

		if (tokenName.startsWith("foreground")) {
			const name = cssTokenName.replace("foreground-", "");
			config.textColor[name] = configValue;
			return;
		}

		if (tokenName.startsWith("border")) {
			const name = cssTokenName.replace("border-", "");
			config.borderColor[name] = configValue;
			return;
		}

		config.backgroundColor[cssTokenName] = configValue;
		config.borderColor[cssTokenName] = configValue;
		config.textColor[cssTokenName] = configValue;
		config.colors[cssTokenName] = configValue;
	});

	Object.keys(definition.unit).forEach((tokenName) => {
		const cssTokenName = camelToKebab(tokenName);
		const cssVariable = ["rs", "unit", cssTokenName].join("-");
		const configValue = `var(--${cssVariable})`;

		if (tokenName.startsWith("radius")) {
			const name = cssTokenName.replace("radius-", "");
			config.borderRadius[name] = configValue;
			return;
		}

		if (tokenName.startsWith("base")) {
			[...Array(11).keys()].forEach((i) => {
				if (i === 0) {
					config.spacing["0"] = "0px";
				} else {
					config.spacing[`x${i}`] = `var(--rs-unit-x${i})`;
				}
			});
			return;
		}
	});

	Object.keys(definition.shadow).forEach((tokenName) => {
		const cssTokenName = camelToKebab(tokenName);
		const cssVariable = ["rs", "shadow", cssTokenName].join("-");
		const configValue = `var(--${cssVariable})`;

		const name = cssTokenName.replace("shadow-", "");
		config.boxShadow[name] = configValue;
		return;
	});

	Object.entries(definition.viewport).forEach(([tokenName, tokenValue]) => {
		if (!tokenValue.minPx) return;
		config.screens[tokenName] = `${tokenValue.minPx}px`;
	});

	return config;
};
