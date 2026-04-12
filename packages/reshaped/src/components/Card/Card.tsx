import React, { forwardRef } from "react";
import { classNames } from "@reshaped/utilities";

import Actionable from "@/components/Actionable";
import View from "@/components/View";
import { resolveMixin } from "@/styles/mixin";
import type * as T from "./Card.types";
import s from "./Card.module.css";

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
		raised,
		bleed,
		height,
		direction,
		gap,
		align,
		justify,
		onClick,
		href,
		children,
		className,
		attributes,
		// Using any here to let TS save on type resolving, otherwise TS throws an error due to the type complexity
		as: TagName = "div" as any,
	} = props;
	const isActionable = !!href || !!onClick;
	const mixinStyles = resolveMixin({
		radius: "large",
		bleed,
		borderColor: "neutral-faded",
		border: true,
		shadow: raised ? "raised" : "outline",
		height,
	});

	const rootClassNames = classNames(
		s.root,
		mixinStyles.classNames,
		isActionable && s["--actionable"],
		raised && s["--elevation-raised"],
		selected && s["--selected"],
		className
	);

	const style = {
		...attributes?.style,
		...mixinStyles.variables,
	};

	const contentNode = (
		<View
			className={s.content}
			padding={padding}
			direction={direction}
			gap={gap}
			align={align}
			justify={justify}
		>
			{children}
		</View>
	);

	if (isActionable) {
		return (
			<Actionable
				className={rootClassNames}
				attributes={{ ...attributes, style }}
				href={href}
				as={TagName}
				onClick={onClick}
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
