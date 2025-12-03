import type * as G from "types/global";

type Value = string | boolean | number | undefined;
type ClassNameResolver = string | ((value: Value) => string);

/**
 * Resolve an array of values into a classname string
 */
export const classNames = (...args: G.ClassName[]): string => {
	return args
		.reduce<string>((acc, cur) => {
			if (Array.isArray(cur)) {
				const className = classNames(...cur);
				if (!className) return acc;
				return `${acc} ${className}`;
			}
			if (cur) return `${acc} ${cur}`;
			return acc;
		}, "")
		.trim();
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
