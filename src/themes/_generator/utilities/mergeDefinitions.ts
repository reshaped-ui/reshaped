type Obj = Record<string, unknown>;

/**
 * Stop at level 2 to not merge the token values, they should completely override the defaults
 * Level 1 is token types
 * Level 2 is token values
 * Example: theme = { color: { foreground: {} } }
 */
const MAX_LEVEL = 2;

const mergeDefinitions = (originalDefinition: Obj, newDefinition: Obj, currentLevel = 1) => {
	if (currentLevel > MAX_LEVEL) return newDefinition;

	const mergedDefinition = { ...originalDefinition };

	Object.keys(newDefinition).forEach((key) => {
		mergedDefinition[key] = mergeDefinitions(
			mergedDefinition[key] as Obj,
			newDefinition[key] as Obj,
			currentLevel + 1
		);
	});

	return mergedDefinition;
};

export default mergeDefinitions;
