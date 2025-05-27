import type * as T from "./types";
import type {
	PassedThemeDefinition,
	GeneratedThemeDefinition,
	TokenType,
	TransformedToken,
} from "./tokens/types";
import * as transforms from "./tokens/transforms";
import { variablesTemplate, mediaTemplate } from "./tokens/css";
import { generateUnits } from "./tokens/unit/utilities/generate";
import generateMetaColors from "./tokens/color/utilities/generateMetaColors";

const transform = (name: string, definition: PassedThemeDefinition, options: T.PrivateOptions) => {
	const { isFragment, themeOptions } = options;
	const generatedUnits = isFragment ? {} : generateUnits(definition);
	const generatedMetaColors = generateMetaColors(definition, themeOptions);
	const generatedViewports = definition.viewport?.m?.minPx
		? { s: { maxPx: definition.viewport.m.minPx - 1 } }
		: {};

	const theme: GeneratedThemeDefinition = {
		...definition,
		color: {
			...definition.color,
			...generatedMetaColors,
		},
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
			const transformedTokens = transform(tokenName, token, theme);

			transformedTokens.forEach((transformedToken) => {
				transformedStorage[transformedToken.type].push(transformedToken);
			});
		});
	});

	return {
		variables: variablesTemplate(name, transformedStorage.variable),
		media: !isFragment ? mediaTemplate(transformedStorage.media) : undefined,
	};
};

export default transform;
