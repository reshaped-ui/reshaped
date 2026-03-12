import type { GeneratedThemeDefinition, PassedThemeDefinition } from "@/generation/tokens/types";
import type { GeneratedName as GeneratedUnitName } from "@/generation/tokens/unit/unit.types";

export const generateUnits = (definition: PassedThemeDefinition) => {
	const result: Partial<GeneratedThemeDefinition["unit"]> = {};
	const baseValue = definition.unit?.base?.px;

	// If base value hasn't changed, we don't need to regenerate tokens
	if (!baseValue) return;

	for (let i = 1; i <= 10; i += 1) {
		const generatedName = `x${i}` as GeneratedUnitName;
		result[generatedName] = { px: baseValue * i };
	}

	result["x0-5"] = { px: baseValue * 0.5 };
	result["x1-5"] = { px: baseValue * 1.5 };

	return result;
};
