/**
 * Transform JS theme defintion to Tailwind 4 CSS definition
 */
import reshapedDefinition from "themes/_generator/definitions/reshaped";
import mergeDefinitions from "themes/_generator/utilities/mergeDefinitions";
import { camelToKebab } from "utilities/string";

import type { GeneratedThemeDefinition, ThemeDefinition } from "themes/_generator/tokens/types";

export const transformToTailwind = (theme?: GeneratedThemeDefinition) => {
	const variables: Record<string, string> = {};

	const definition = theme
		? (mergeDefinitions(reshapedDefinition, theme) as ThemeDefinition)
		: reshapedDefinition;

	Object.keys(definition.color).forEach((tokenName) => {
		const cssTokenName = camelToKebab(tokenName);
		const cssVariable = ["rs", "color", cssTokenName].join("-");
		const configValue = `var(--${cssVariable})`;

		if (cssTokenName.startsWith("rgb-")) return;

		if (cssTokenName.startsWith("background-")) {
			const name = cssTokenName.replace("background-", "");
			variables[`--background-color-${name}`] = configValue;

			return;
		}

		if (cssTokenName.startsWith("on-")) {
			// Replacing on- separately to support on-brand
			const name = cssTokenName.replace("on-", "").replace("background-", "");

			variables[`--text-color-on-${name}`] = configValue;
			return;
		}

		if (cssTokenName.startsWith("foreground-")) {
			const name = cssTokenName.replace("foreground-", "");

			variables[`--text-color-${name}`] = configValue;
			return;
		}

		if (cssTokenName.startsWith("border-")) {
			const name = cssTokenName.replace("border-", "");

			variables[`--border-color-${name}`] = configValue;
			return;
		}

		variables[`--color-${cssTokenName}`] = configValue;
	});

	Object.keys(definition.radius).forEach((tokenName) => {
		const cssTokenName = camelToKebab(tokenName);

		variables[`--radius-${tokenName}`] = `var(--rs-radius-${cssTokenName})`;
		return;
	});

	Object.keys(definition.unit).forEach((tokenName) => {
		if (tokenName.startsWith("base")) {
			[...Array(11).keys()].forEach((i) => {
				if (i === 0) {
					variables[`--spacing-0`] = "0px";
				} else {
					variables[`--spacing-x${i}`] = `var(--rs-unit-x${i})`;
				}
			});
		}
	});

	Object.keys(definition.shadow).forEach((tokenName) => {
		const cssTokenName = camelToKebab(tokenName);
		const cssVariable = ["rs", "shadow", cssTokenName].join("-");
		const configValue = `var(--${cssVariable})`;

		const name = cssTokenName.replace("shadow-", "");

		variables[`--shadow-${name}`] = configValue;
		return;
	});

	Object.entries(definition.viewport).forEach(([tokenName, tokenValue]) => {
		if (!tokenValue.minPx) return;

		variables[`--breakpoint-${tokenName}`] = `${tokenValue.minPx}px`;
	});

	return `@theme inline {
    ${Object.entries(variables)
			.map(([key, value]) => `${key}: ${value};`)
			.join("\n")}
  }`;
};
