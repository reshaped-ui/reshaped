import React, { forwardRef } from "react";

import Actionable from "components/Actionable";
import { resolveMixin } from "styles/mixin";
import { classNames } from "utilities/props";

import s from "./Card.module.css";

import type * as T from "./Card.types";

const Card = forwardRef(
	<As extends keyof React.JSX.IntrinsicElements = "div">(
		props: T.Props<As>,
		ref: React.Ref<HTMLElement>
	) => {
		const { padding = 4 } = props;
		const {
			selected,
			elevated,
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
			height,
			padding,
		});

		const rootClassNames = classNames(
			s.root,
			mixinStyles.classNames,
			isActionable && s["--actionable"],
			elevated && s["--elevated"],
			selected && s["--selected"],
			className
		);

		const style = {
			...attributes?.style,
			...mixinStyles.variables,
		};

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
					{children}
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
				{children}
			</TagName>
		);
	}
);

Card.displayName = "Card";

export default Card;
