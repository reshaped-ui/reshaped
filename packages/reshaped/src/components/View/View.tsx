import React, { isValidElement } from "react";

import Divider, { type DividerProps } from "components/Divider";
import Hidden from "components/Hidden";
import { resolveMixin } from "styles/mixin";
import { classNames, responsiveClassNames, responsiveVariables } from "utilities/props";

import s from "./View.module.css";

import type * as T from "./View.types";
import type * as G from "types/global";

export const ViewItem = <As extends keyof React.JSX.IntrinsicElements = "div">(
	props: T.ItemProps<As>
) => {
	const {
		columns,
		grow,
		shrink,
		gapBefore,
		// Using any here to let TS save on type resolving, otherwise TS throws an error due to the type complexity
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		as: TagName = "div" as any,
		order,
		children,
		className,
		attributes,
	} = props;
	const itemClassNames = classNames(
		s.item,
		className,
		gapBefore === "auto" && s["item--gap-auto"],
		gapBefore !== undefined && s["item--gap-before"],
		columns && s["item--columns"],
		shrink && s["item--shrink"],
		...responsiveClassNames(s, "item--grow", grow),
		...responsiveClassNames(s, "item--columns", columns)
	);

	const itemVariables = {
		...responsiveVariables("--rs-view-item-order", order),
		...responsiveVariables("--rs-view-item-gap-before", gapBefore),
	};

	return (
		<TagName
			{...attributes}
			style={{ ...attributes?.style, ...itemVariables }}
			className={itemClassNames}
		>
			{children}
		</TagName>
	);
};

const View = <As extends keyof React.JSX.IntrinsicElements = "div">(props: T.Props<As>) => {
	const {
		/**
		 * Layout props
		 */
		align,
		justify,
		wrap,
		gap,
		height,
		width,
		aspectRatio,
		maxHeight,
		maxWidth,
		minHeight,
		minWidth,
		padding,
		paddingInline,
		paddingBlock,
		paddingBottom,
		paddingEnd,
		paddingStart,
		paddingTop,
		bleed,

		/**
		 * Style props
		 * */
		animated,
		backgroundColor,
		borderColor,
		borderTop,
		borderBottom,
		borderStart,
		borderEnd,
		borderInline,
		borderBlock,
		borderRadius,
		shadow,
		textAlign,
		overflow,
		position,
		inset,
		insetTop,
		insetBottom,
		insetStart,
		insetEnd,
		zIndex,

		/**
		 * Item prop
		 */
		grow,
		shrink,

		// Using any here to let TS save on type resolving, otherwise TS throws an error due to the type complexity
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		as: TagName = "div" as any,
		children,
		divided,
		className,
		attributes,
	} = props;
	const border =
		props.border ??
		(borderColor
			? !borderTop && !borderBottom && !borderStart && !borderEnd && !borderInline && !borderBlock
			: undefined);
	let isFlex = !!align || !!justify || !!gap || !!props.direction;
	const direction = props.direction || (isFlex ? "column" : undefined);
	const mixinStyles = resolveMixin({
		align,
		inset,
		insetTop,
		insetBottom,
		insetStart,
		insetEnd,
		bleed,
		width,
		height,
		maxWidth,
		maxHeight,
		minWidth,
		minHeight,
		position,
		aspectRatio,
		textAlign,
		justify,
		padding,
		paddingInline,
		paddingBlock,
		paddingBottom,
		paddingEnd,
		paddingStart,
		paddingTop,
		borderColor,
		border,
		borderTop,
		borderBottom,
		borderStart,
		borderEnd,
		borderInline,
		borderBlock,
		radius: borderRadius,
	});

	let renderedItemIndex = 0;
	// If wrap is not defined, it can be set based on item grow and split usage
	let nowrap;

	const renderDivider: T.RenderDivider = ({ className, key }) => {
		const dividerClassName = classNames(s.divider, className);
		let isDividerVertical: DividerProps["vertical"] = false;

		if (typeof direction === "string" && direction.startsWith("row")) {
			isDividerVertical = true;
		} else if (direction) {
			const viewports = Object.keys(direction) as Array<keyof G.ResponsiveOnly<string>>;
			isDividerVertical = viewports.reduce((acc, viewport) => {
				const viewportDirection = (direction as G.ResponsiveOnly<T.Direction>)[viewport];

				if (!viewportDirection) return acc;

				return {
					...acc,
					[viewport]: viewportDirection.startsWith("row"),
				};
			}, {} as G.ResponsiveOnly<boolean>);
		}

		return (
			<div className={dividerClassName} key={`${key}-divider`}>
				<Divider vertical={isDividerVertical} blank />
			</div>
		);
	};

	const renderItem: T.RenderItem = ({ className, child, index }) => {
		const isElement = isValidElement(child);
		const isItem = isElement && child.type === ViewItem;
		const isView = isElement && child.type === View;
		const key = child.key;
		const dividerElement = !!index && divided && renderDivider({ className, key });
		let itemElement;

		if (isItem) {
			itemElement = React.cloneElement(child, {
				// @ts-expect-error -- child is guaranteed to be an element
				className: classNames(className, child.props.className),
			});
		} else if (
			!className &&
			(React.isValidElement(child) ||
				React.Children.count(children === 1) ||
				typeof child === "string")
		) {
			itemElement = child;
		} else {
			itemElement = (
				<div className={className} key={key}>
					{child}
				</div>
			);
		}

		// Passing grow here because it's responsive and nowrap should follow it
		// @ts-expect-error -- child is guaranteed to be an element
		if ((isItem || isView) && child.props?.grow) {
			// @ts-expect-error -- child is guaranteed to be an element
			nowrap = child.props.grow;
			isFlex = true;
		}
		// @ts-expect-error -- child is guaranteed to be an element
		if (isItem && child.props?.gap === "auto") nowrap = true;

		return (
			<React.Fragment key={key ? `${key}-fragment` : undefined}>
				{dividerElement}
				{itemElement}
			</React.Fragment>
		);
	};

	// Using any in favor of resolving the props in runtime where we don't know their props definitions
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const formattedChildren = React.Children.map(children, (child: any, index) => {
		if (!child) return null;

		const usedIndex = renderedItemIndex;
		// eslint-disable-next-line react-hooks/immutability
		renderedItemIndex += 1;

		if (isValidElement(child) && child.type === Hidden) {
			// @ts-expect-error -- child is guaranteed to be an element
			const { children: hiddenChild, ...hiddenProps } = child.props;
			const key = child.key || index;

			return (
				<Hidden {...hiddenProps} key={key}>
					{renderItem({ child: hiddenChild, index: usedIndex })}
				</Hidden>
			);
		}

		if (child.type === React.Fragment && React.Children.count(child.props.children) > 1) {
			// Using any in favor of resolving the props in runtime where we don't know their props definitions
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			return child.props.children.map((child: any) => {
				if (!child) return null;
				renderedItemIndex += 1;
				return renderItem({ child, index: renderedItemIndex });
			});
		}

		return renderItem({ child, index: usedIndex });
	});

	// Classnames and attributes are written here so we can assign nowrap to the root element based on the children
	const rootClassNames = classNames(
		s.root,
		className,
		mixinStyles.classNames,
		backgroundColor && s[`--bg-${backgroundColor}`],
		shadow && s[`--shadow-${shadow}`],
		overflow && s[`--overflow-${overflow}`],
		animated && s["--animated"],
		divided && s["--divided"],
		(isFlex || nowrap) && s["--flex"],
		...responsiveClassNames(s, "--direction", direction),
		// Wrap and nowrap are separate here because inverting any of them could result into a false value which will be ignored by classNames
		...responsiveClassNames(s, "--nowrap", nowrap || wrap === false),
		...responsiveClassNames(s, "--wrap", wrap),
		// Item classnames
		...responsiveClassNames(s, "item--grow", grow),
		shrink && s["item--shrink"]
	);

	const rootVariables = {
		...attributes?.style,
		...responsiveVariables("--rs-view-gap", gap),
		...mixinStyles.variables,
		...(zIndex ? { "--rs-view-z": zIndex } : {}),
	};

	return (
		<TagName {...attributes} className={rootClassNames} style={rootVariables}>
			{formattedChildren}
		</TagName>
	);
};

View.displayName = "View";
ViewItem.displayName = "View.Item";

export default View;
