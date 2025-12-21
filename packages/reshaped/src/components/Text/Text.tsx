import { resolveMixin } from "styles/mixin";
import { classNames, responsiveClassNames } from "utilities/props";

import s from "./Text.module.css";

import type * as T from "./Text.types";

const tagMap: Partial<Record<T.Variant, keyof React.JSX.IntrinsicElements>> = {
	"title-1": "h1",
	"title-2": "h2",
	"title-3": "h3",
	"title-4": "h4",
	"title-5": "h5",
	"title-6": "h6",
};

const Text = <As extends keyof React.JSX.IntrinsicElements = "div">(props: T.Props<As>) => {
	const {
		variant,
		color,
		weight,
		align,
		decoration,
		maxLines,
		wrap,
		monospace,
		numeric,
		children,
		className,
		attributes,
	} = props;
	const largestVariant =
		typeof variant === "string" ? variant : variant?.xl || variant?.l || variant?.m || variant?.s;
	const mixinStyles = resolveMixin({ textAlign: align });

	// Using any here to let TS save on type resolving, otherwise TS throws an error due to the type complexity
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const TagName: any = props.as || (largestVariant && tagMap[largestVariant]) || "div";

	const rootClassName = classNames(
		s.root,
		color && s[`--color-${color}`],
		...responsiveClassNames(s, "--variant", variant),
		...responsiveClassNames(s, "--weight", weight),
		decoration && s[`--decoration-${decoration}`],
		maxLines !== undefined && s[`--clamp`],
		maxLines === 1 && s["--break-all"],
		wrap && s[`--wrap-${wrap}`],
		monospace && s["--monospace"],
		numeric && s["--numeric"],
		className,
		mixinStyles.classNames
	);
	const style = {
		...attributes?.style,
		...mixinStyles.variables,
		"--rs-text-lines": maxLines,
	};

	return (
		<TagName {...attributes} className={rootClassName} style={style}>
			{children}
		</TagName>
	);
};

Text.displayName = "Text";

export default Text;
