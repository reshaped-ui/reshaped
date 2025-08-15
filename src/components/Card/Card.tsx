import React, { forwardRef } from "react";
import { classNames } from "utilities/props";
import Actionable from "components/Actionable";
import type * as T from "./Card.types";
import s from "./Card.module.css";
import getRadiusStyles from "styles/resolvers/radius";
import getBleedStyles from "styles/resolvers/bleed";
import getPaddingStyles from "styles/resolvers/padding";
import getHeightStyles from "styles/resolvers/height";

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
