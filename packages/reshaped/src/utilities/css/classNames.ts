import type { ClassName } from "@/types/global";

/**
 * Resolve an array of values into a classname string
 */
const classNames = (...args: ClassName[]): string => {
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

export default classNames;
