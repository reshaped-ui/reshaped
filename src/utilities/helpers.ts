export const sleep = (milliseconds: number) => {
	return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const range = (start: number, end: number) => {
	if (start > end) return [];
	return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

// from https://gist.github.com/ca0v/73a31f57b397606c9813472f7493a940
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const debounce = <T extends Function>(cb: T, wait = 20) => {
	let timer: ReturnType<typeof setTimeout>;
	const callable = (...args: unknown[]) => {
		clearTimeout(timer);
		timer = setTimeout(() => cb(...args), wait);
	};
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return <T>(<any>callable);
};

export function debounceHandler<T extends React.SyntheticEvent | Event>(
	handler: (event: T) => void,
	timeout: number
): (event: T) => void {
	const debounced = debounce(handler, timeout);

	return (event) => {
		if ("persist" in event) event.persist();
		return debounced(event);
	};
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const throttle = <T extends Function>(cb: T, wait: number) => {
	let waiting = false;

	return (...args: unknown[]) => {
		if (!waiting) {
			cb(...args);
			waiting = true;
			setTimeout(() => {
				waiting = false;

				setTimeout(() => {
					if (waiting) return;
					cb(...args);
				}, wait);
			}, wait);
		}
	};
};

export function throttleHandler<T extends React.SyntheticEvent | Event>(
	handler: (event: T) => void,
	timeout: number
): (event: T) => void {
	const throttled = throttle(handler, timeout);

	return (event) => {
		if ("persist" in event) event.persist();
		return throttled(event);
	};
}
