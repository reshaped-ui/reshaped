export const sleep = (milliseconds: number) => {
	return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const range = (start: number, end: number) => {
	if (start > end) return [];
	return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const rafThrottle = <T extends (...args: any[]) => void>(fn: T): T => {
	let rafId: number | null = null;
	let args: Parameters<T> | null = null;

	return function (...newArgs: Parameters<T>) {
		args = newArgs;

		if (rafId === null) {
			rafId = requestAnimationFrame(() => {
				rafId = null;
				fn(...args!);
			});
		}
	} as T;
};
