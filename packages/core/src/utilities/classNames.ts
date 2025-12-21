import type * as G from "types/global";

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
