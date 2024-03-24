export const getPrecision = (value: number) => {
	const floatPart = value.toString().split(".")[1];
	return floatPart?.length || 0;
};

export const applyStepToValue = (value: number, step: number) => {
	const isStepFloat = step % 1 !== 0;
	const result = Math.round(value / step) * step;

	// Handle javascript floats manually with string conversion
	if (isStepFloat) {
		const precision = getPrecision(step);
		return Number(result.toFixed(precision));
	}

	return result;
};
