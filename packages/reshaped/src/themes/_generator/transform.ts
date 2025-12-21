import { formatHex8, formatHex } from "culori/fn";

import { Token } from "./tokens/color/color.types";
import generateMetaColors from "./tokens/color/utilities/generateMetaColors";
import { variablesTemplate, mediaTemplate } from "./tokens/css";
import * as transforms from "./tokens/transforms";
import { generateUnits } from "./tokens/unit/utilities/generate";

import type {
	PassedThemeDefinition,
	GeneratedThemeDefinition,
	TokenType,
	TransformedToken,
} from "./tokens/types";
import type * as T from "./types";

const transform = (name: string, definition: PassedThemeDefinition, options: T.PrivateOptions) => {
	const { isFragment, themeOptions } = options;
	const generatedUnits = generateUnits(definition);
	const generatedViewports = definition.viewport?.m?.minPx
		? { s: { maxPx: definition.viewport.m.minPx - 1 } }
		: {};
	const generatedMetaColors = generateMetaColors(definition, themeOptions);
	const generatedColors = Object.entries({
		...definition.color,
		...generatedMetaColors,
	}).reduce<GeneratedThemeDefinition["color"]>((res, [key, token]) => {
		const next = { ...token } as Token;
		if (!token) return res;
		if (!token.hex && token.oklch) {
			next.hex =
				token.oklch.alpha !== undefined
					? formatHex8({ ...token.oklch, mode: "oklch" })
					: formatHex({ ...token.oklch, mode: "oklch" });
		}
		if (!token.hexDark && token.oklchDark) {
			next.hexDark =
				token.oklchDark.alpha !== undefined
					? formatHex8({ ...token.oklchDark, mode: "oklch" })
					: formatHex({ ...token.oklchDark, mode: "oklch" });
		}

		return { ...res, [key]: next };
	}, {});

	const theme: GeneratedThemeDefinition = {
		...definition,
		color: generatedColors,
		unit: {
			...definition.unit,
			...generatedUnits,
		},
		viewport: {
			...definition.viewport,
			...generatedViewports,
		},
	};

	const transformedStorage: Record<TransformedToken["type"], TransformedToken[]> = {
		variable: [],
		media: [],
	};

	Object.entries(theme).forEach(([tokenType, tokenValues]) => {
		if (!tokenValues) return;

		const transform = transforms.css[tokenType as TokenType];

		Object.entries(tokenValues).forEach(([tokenName, token]) => {
			const transformedTokens = transform(tokenName, token, {
				theme,
				themeOptions: options.themeOptions,
			});

			transformedTokens.forEach((transformedToken) => {
				transformedStorage[transformedToken.type].push(transformedToken);
			});
		});
	});

	return {
		variables: variablesTemplate(name, transformedStorage.variable),
		media: !isFragment ? mediaTemplate(transformedStorage.media) : undefined,
		theme,
	};
};

export default transform;
