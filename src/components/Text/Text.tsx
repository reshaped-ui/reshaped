import React from "react";
import { classNames, responsiveClassNames } from "utilities/helpers";
import type * as T from "./Text.types";
import s from "./Text.module.css";

const Text = <As extends keyof JSX.IntrinsicElements>(props: T.Props<As>) => {
	const {
		variant,
		color,
		weight,
		align,
		/**
		 * Using any here to let TS save on type resolving, otherwise TS throws an error due to the type complexity
		 * It still resolves the attributes correctly based on the tag
		 */
		as: TagName = "div" as any,
		decoration,
		maxLines,
		children,
		className,
		attributes,
	} = props;
	const rootClassName = classNames(
		s.root,
		color && s[`--color-${color}`],
		...responsiveClassNames(s, "--variant", variant),
		...responsiveClassNames(s, "--align", align),
		weight && s[`--weight-${weight}`],
		decoration && s[`--decoration-${decoration}`],
		maxLines !== undefined && s[`--clamp`],
		className
	);
	const style = {
		...attributes?.style,
		"--rs-text-lines": maxLines,
	};

	return (
		<TagName {...attributes} className={rootClassName} style={style}>
			{children}
		</TagName>
	);
};

export default Text;
