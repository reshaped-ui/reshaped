// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rafThrottle = <T extends (...args: any[]) => void>(fn: T): T => {
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

export default rafThrottle;
