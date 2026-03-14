import { classNames } from "@reshaped/headless";
import React, { forwardRef } from "react";

import Actionable from "@/components/Actionable";
import { resolveMixin } from "@/styles/mixin";

import s from "./Card.module.css";

import type * as T from "./Card.types";

export type Component = {
	<As extends keyof React.JSX.IntrinsicElements = "div">(
		props: T.Props<As> & React.RefAttributes<HTMLElement>
	): React.ReactNode;
	displayName?: string;
};

const Card: Component = forwardRef((props, ref) => {
	const {
		padding = 4,
		selected,
		elevation = "base",
		bleed,
		height,
		onClick,
		href,
		children,
		className,
		attributes,
		// Using any here to let TS save on type resolving, otherwise TS throws an error due to the type complexity
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		as: TagName = "div" as any,
	} = props;
	const isActionable = !!href || !!onClick;
	const mixinStyles = resolveMixin({
		radius: "medium",
		bleed,
		borderColor: "neutral-faded",
		border: true,
		shadow: elevation,
	});
	const contentMixinStyles = resolveMixin({
		height,
		padding,
	});

	const rootClassNames = classNames(
		s.root,
		mixinStyles.classNames,
		isActionable && s["--actionable"],
		elevation && s[`--elevation-${elevation}`],
		selected && s["--selected"],
		className
	);

	const style = {
		...attributes?.style,
		...mixinStyles.variables,
	};

	const contentNode = (
		<div
			className={classNames(s.content, contentMixinStyles.classNames)}
			style={contentMixinStyles.variables}
		>
			{children}
		</div>
	);

	if (isActionable) {
		return (
			<Actionable
				className={rootClassNames}
				attributes={{ ...attributes, style }}
				href={href}
				as={TagName}
				onClick={onClick}
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				ref={ref as any}
			>
				{contentNode}
			</Actionable>
		);
	}

	return (
		<TagName
			{...attributes}
			onClick={onClick}
			href={href}
			ref={ref}
			className={rootClassNames}
			style={style}
		>
			{contentNode}
		</TagName>
	);
});

Card.displayName = "Card";

export default Card;
