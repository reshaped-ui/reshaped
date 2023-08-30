type Obj = { [key: string]: unknown };

// Level 1 is token types, level 2 is token values
// { color: { foreground: {} } }
// We don't merge token values
const MAX_LEVEL = 2;

const mergeDefinitions = (originalDefinition: Obj, newDefinition: Obj, currentLevel = 1) => {
	// Overwrite the token value
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
