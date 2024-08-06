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

export const getDragCoord = ({
	event,
	vertical,
}: {
	event: MouseEvent | TouchEvent;
	vertical?: boolean;
}) => {
	if (vertical) {
		if (event instanceof MouseEvent) return event.clientY;
		return event.changedTouches[0].clientY;
	}

	if (event instanceof MouseEvent) return event.clientX;
	return event.changedTouches[0].clientX;
};
