import type * as G from "types/global";

export const range = (start: number, end: number) => {
	if (start > end) return [];
	return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

// from https://gist.github.com/ca0v/73a31f57b397606c9813472f7493a940
export const debounce = <T extends Function>(cb: T, wait = 20) => {
	let timer: ReturnType<typeof setTimeout>;
	const callable = (...args: any) => {
		clearTimeout(timer);
		timer = setTimeout(() => cb(...args), wait);
	};
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

type Value = string | boolean | number | undefined;
type ClassNameResolver = string | ((value: Value) => string);

export const classNames = (...args: G.ClassName[]): string => {
	return args.reduce<string>((acc, cur) => {
		if (Array.isArray(cur)) {
			const className = classNames(...cur);
			if (!className) return acc;
			return `${acc} ${className}`;
		}
		if (cur) return `${acc} ${cur}`;
		return acc;
	}, "");
};

const applyClassName = (
	passedClassName: ClassNameResolver,
	value: Value,
	options?: { base?: boolean; excludeValueFromClassName?: boolean }
) => {
	const { base, excludeValueFromClassName } = options || {};
	const className = typeof passedClassName === "string" ? passedClassName : passedClassName(value);

	if ((value === true && base) || excludeValueFromClassName) return className;

	// CSS should be turned on/off for non base viewport with mobile first approach
	if (value === true && !base) return `${className}-true`;
	if (value === false && !base) return `${className}-false`;

	if (value !== undefined) return `${className}-${value}`;
	return null;
};

export const responsiveClassNames = <V extends G.Responsive<Value>>(
	s: Record<string, string>,
	className: ClassNameResolver,
	value: V,
	options?: { excludeValueFromClassName?: boolean }
) => {
	if (typeof value !== "object") {
		const staticClassName = applyClassName(className, value, {
			base: true,
			excludeValueFromClassName: options?.excludeValueFromClassName,
		});
		return staticClassName ? [s[staticClassName]] : [];
	}

	return Object.keys(value).reduce<string[]>((acc, viewport) => {
		const base = viewport === "s";
		const viewportClassName = applyClassName(className, value[viewport as G.Viewport], {
			base,
			excludeValueFromClassName: options?.excludeValueFromClassName,
		});
		const suffix = base ? "" : `--${viewport}`;

		return [...acc, s[`${viewportClassName}${suffix}`]];
	}, []);
};

export const responsiveVariables = <V extends Value = Value>(
	variableName: G.CSSVariable,
	value?: G.Responsive<V>
): Record<G.CSSVariable, V> => {
	if (value === undefined) return {};
	if (typeof value !== "object") return { [`${variableName}-s`]: value };

	return Object.keys(value).reduce<Record<G.CSSVariable, V>>((acc, key) => {
		const viewportValue = value[key as G.Viewport];

		if (viewportValue === undefined) return acc;
		if (viewportValue === false) return acc;
		return {
			...acc,
			[`${variableName}-${key}`]: viewportValue,
		};
	}, {});
};

const isResponsive = (prop: G.Responsive<unknown>): prop is G.ResponsiveOnly<unknown> => {
	if (prop === null) return false;
	return typeof prop === "object" && prop !== null && "s" in prop;
};

export const responsivePropDependency = <Result, T>(
	prop: G.Responsive<T>,
	resolver: (value: T, key: G.Viewport) => Result
): Result => {
	if (!isResponsive(prop)) return resolver(prop as T, "s");

	const keys = Object.keys(prop) as G.Viewport[];

	return keys.reduce((acc, viewport) => {
		const viewportValue = prop[viewport];
		if (viewportValue === undefined || viewportValue === null) return acc;
		return { ...acc, [viewport]: resolver(viewportValue, viewport) };
	}, {} as Result);
};

const viewports: G.Viewport[] = ["s", "m", "l", "xl"];
export const resolveViewportValue = <T>(viewport: G.Viewport, value: G.Responsive<T>) => {
	let result;

	if (!isResponsive(value)) return value;

	for (let currentViewport of viewports) {
		const viewportValue = value[currentViewport];

		if (viewportValue !== undefined) result = viewportValue;
		if (currentViewport === viewport) return result;
	}
};
