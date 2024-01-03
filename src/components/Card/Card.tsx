import React from "react";
import { classNames } from "utilities/helpers";
import Actionable, { ActionableRef } from "components/Actionable";
import type * as T from "./Card.types";
import s from "./Card.module.css";
import getRadiusStyles from "styles/radius";
import getBleedStyles from "styles/bleed";
import getPaddingStyles from "styles/padding";
import getHeightStyles from "styles/height";

const Card = <As extends keyof JSX.IntrinsicElements = "div">(
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
		/**
		 * Using any here to let TS save on type resolving, otherwise TS throws an error due to the type complexity
		 * It still resolves the attributes correctly based on the tag
		 */
		as: TagName = "div" as any,
	} = props;
	const isActionable = !!href || !!onClick;
	const radiusStyles = getRadiusStyles("medium");
	const bleedStyles = getBleedStyles(bleed);
	const paddingStyles = getPaddingStyles(padding);
	const heightStyles = getHeightStyles(height);

	const rootClassNames = classNames(
		s.root,
		radiusStyles?.classNames,
		bleedStyles?.classNames,
		heightStyles?.classNames,
		isActionable && s["--actionable"],
		elevated && s["--elevated"],
		selected && s["--selected"],
		className
	);

	const style = {
		...attributes?.style,
		...bleedStyles?.variables,
		...paddingStyles?.variables,
		...heightStyles?.variables,
	};

	if (isActionable) {
		return (
			<Actionable
				className={rootClassNames}
				attributes={{ ...attributes, style } as any}
				href={href}
				as={TagName}
				onClick={onClick}
				ref={ref as ActionableRef}
			>
				<span className={s.content}>{children}</span>
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
			<span className={s.content}>{children}</span>
		</TagName>
	);
};

export default React.forwardRef(Card);
