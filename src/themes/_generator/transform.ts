import type * as T from "./types";
import type { FullThemeDefinition, TokenType, TransformedToken } from "./tokens/types";
import * as transforms from "./tokens/transforms";
import { variablesTemplate, mediaTemplate } from "./utilities/css";
import generateBackgroundColors from "./utilities/generateBackgroundColors";
import generateUnits from "./utilities/generateUnits";

const transform = (
	name: string,
	definition: T.PartialDeep<FullThemeDefinition>,
	options: T.PrivateOptions
) => {
	const { isPrivate, isFragment, themeOptions } = options;

	generateBackgroundColors(definition, themeOptions);
	generateUnits(definition);

	const transformedStorage: Record<TransformedToken["type"], TransformedToken[]> = {
		variable: [],
		media: [],
	};

	Object.entries(definition).forEach(([tokenType, tokenValues]) => {
		if (!tokenValues) return;

		const transform = transforms.css[tokenType as TokenType];

		Object.entries(tokenValues).forEach(([tokenName, token]) => {
			const transformedTokens = transform(tokenName, token, definition as FullThemeDefinition);

			transformedTokens.forEach((transformedToken) => {
				transformedStorage[transformedToken.type].push(transformedToken);
			});
		});
	});

	return {
		variables: variablesTemplate(name, transformedStorage.variable),
		media: isPrivate && !isFragment ? mediaTemplate(transformedStorage.media) : undefined,
	};
};

export default transform;
