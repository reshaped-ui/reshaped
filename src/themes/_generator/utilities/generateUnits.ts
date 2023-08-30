import type * as T from "themes/_generator/types";
import type { FullThemeDefinition } from "themes/_generator/tokens/types";
import { GeneratedName as GeneratedUnitName } from "themes/_generator/tokens/unit/unit.types";

const generateUnits = (definition: T.PartialDeep<FullThemeDefinition>) => {
	const baseValue = definition.unit?.base?.px;

	// If base value hasn't changed, we don't need to regenerate tokens
	if (!baseValue) return;

	for (let i = 1; i <= 10; i += 1) {
		const generatedName = `x${i}` as GeneratedUnitName;

		// eslint-disable-next-line no-param-reassign
		definition.unit![generatedName] = {
			px: baseValue * i,
		};
	}
};

export default generateUnits;
