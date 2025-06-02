import type {
	GeneratedThemeDefinition,
	PassedThemeDefinition,
} from "themes/_generator/tokens/types";
import type { GeneratedName as GeneratedUnitName } from "themes/_generator/tokens/unit/unit.types";

export const generateUnits = (definition: PassedThemeDefinition) => {
	const result: Partial<GeneratedThemeDefinition["unit"]> = {};
	const baseValue = definition.unit?.base?.px;

	// If base value hasn't changed, we don't need to regenerate tokens
	if (!baseValue) return;

	for (let i = 1; i <= 10; i += 1) {
		const generatedName = `x${i}` as GeneratedUnitName;
		result[generatedName] = { px: baseValue * i };
	}

	return result;
};
