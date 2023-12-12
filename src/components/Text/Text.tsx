import React from "react";
import { classNames, responsiveClassNames } from "utilities/helpers";
import type * as T from "./Text.types";
import s from "./Text.module.css";

const tagMap: Partial<Record<T.Variant, keyof JSX.IntrinsicElements>> = {
	"title-1": "h1",
	"title-2": "h2",
	"title-3": "h3",
	"title-4": "h4",
	"title-5": "h5",
	"title-6": "h6",
};

const Text = <As extends keyof JSX.IntrinsicElements>(props: T.Props<As>) => {
	const { variant, color, weight, align, decoration, maxLines, children, className, attributes } =
		props;
	const largestVariant =
		typeof variant === "string" ? variant : variant?.xl || variant?.l || variant?.m || variant?.s;
	/**
	 * Using any here to let TS save on type resolving, otherwise TS throws an error due to the type complexity
	 * It still resolves the attributes correctly based on the tag
	 */
	const TagName: any = props.as || (largestVariant && tagMap[largestVariant]) || "div";
	const rootClassName = classNames(
		s.root,
		color && s[`--color-${color}`],
		...responsiveClassNames(s, "--variant", variant),
		...responsiveClassNames(s, "--align", align),
		weight && s[`--weight-${weight}`],
		decoration && s[`--decoration-${decoration}`],
		maxLines !== undefined && s[`--clamp`],
		maxLines === 1 && s["--break-all"],
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
