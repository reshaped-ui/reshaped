export const sleep = (milliseconds: number) => {
	return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const range = (start: number, end: number) => {
	if (start > end) return [];
	return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};
