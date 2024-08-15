import React from "react";
import { classNames, responsiveClassNames, responsiveVariables } from "utilities/helpers";
import Divider, { type DividerProps } from "components/Divider";
import Hidden from "components/Hidden";
import type * as G from "types/global";
import type * as T from "./View.types";
import s from "./View.module.css";
import getRadiusStyles from "styles/radius";
import getBleedStyles from "styles/bleed";
import getWidthStyles from "styles/width";
import getHeightStyles from "styles/height";
import getMaxWidthStyles from "styles/maxWidth";
import getMaxHeightStyles from "styles/maxHeight";
import getMinWidthStyles from "styles/minWidth";
import getMinHeightStyles from "styles/minHeight";
import getPositionStyles from "styles/position";
import getInsetStyles from "styles/inset";
import getAspectRatioStyles from "styles/aspectRatio";
import getBorderStyles from "styles/border";
import getTextAlignStyles from "styles/textAlign";

const ViewItem = <As extends keyof JSX.IntrinsicElements = "div">(props: T.ItemProps<As>) => {
	const {
		columns,
		grow,
		gapBefore,
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

const View = <As extends keyof JSX.IntrinsicElements = "div">(props: T.Props<As>) => {
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
		borderRadius,
		shadow,
		textAlign,
		overflow,
		position = "relative",
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

		/**
		 * Using any here to let TS save on type resolving, otherwise TS throws an error due to the type complexity
		 * It still resolves the attributes correctly based on the tag
		 */
		as: TagName = "div" as any,
		children,
		divided,
		className,
		attributes,
	} = props;
	let isFlex = !!align || !!justify || !!gap || !!props.direction;
	const direction = props.direction || (isFlex ? "column" : undefined);
	const radiusStyles = getRadiusStyles(borderRadius);
	const bleedStyles = getBleedStyles(bleed);
	const widthStyles = getWidthStyles(width);
	const heightStyles = getHeightStyles(height);
	const maxWidthStyles = getMaxWidthStyles(maxWidth);
	const maxHeightStyles = getMaxHeightStyles(maxHeight);
	const minWidthStyles = getMinWidthStyles(minWidth);
	const minHeightStyles = getMinHeightStyles(minHeight);
	const positionStyles = getPositionStyles(position);
	const insetStyles = getInsetStyles(inset);
	const insetTopStyles = getInsetStyles(insetTop, "top");
	const insetBottomStyles = getInsetStyles(insetBottom, "bottom");
	const insetStartStyles = getInsetStyles(insetStart, "start");
	const insetEndStyles = getInsetStyles(insetEnd, "end");
	const aspectRatioStyles = getAspectRatioStyles(aspectRatio);
	const borderStyles = getBorderStyles(borderColor);
	const textAlignStyles = getTextAlignStyles(textAlign);

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
		const isItem = child.type === ViewItem;
		const isView = child.type === View;
		const key = child.key || index;
		const dividerElement = !!index && divided && renderDivider({ className, key });
		let itemElement;

		if (isItem) {
			itemElement = React.cloneElement(child, {
				className: classNames(className, child.props.className),
			});
		} else if (className || !React.isValidElement(child)) {
			itemElement = (
				<div className={className} key={key}>
					{child}
				</div>
			);
		} else {
			itemElement = child;
		}

		// Passing grow here because it's responsive and nowrap should follow it
		if (isItem && child.props?.grow) nowrap = child.props.grow;
		if (isItem && child.props?.gap === "auto") nowrap = true;
		if ((isItem || isView) && child.props?.grow) isFlex = true;
		return [dividerElement, itemElement];
	};

	const formattedChildren = React.Children.map(children, (child: any, index) => {
		if (!child) return null;

		// Ignore the indices of the items that rendered nothing
		const renderedIndex = renderedItemIndex;
		renderedItemIndex += 1;

		if (child.type === Hidden) {
			const { children: hiddenChild, ...hiddenProps } = child.props;
			const key = child.key || index;

			return (
				<Hidden {...hiddenProps} key={key}>
					{renderItem({ child: hiddenChild, index: renderedIndex })}
				</Hidden>
			);
		}

		if (child.type === React.Fragment && React.Children.count(child.props.children) > 1) {
			return child.props.children.map((child: any) => {
				if (!child) return null;
				const index = renderedIndex;
				renderedItemIndex += 1;
				return renderItem({ child, index });
			});
		}

		return renderItem({ child, index: renderedIndex });
	});

	// Classnames and attributes are written here so we can assign nowrap to the root element based on the children
	const rootClassNames = classNames(
		s.root,
		className,
		radiusStyles?.classNames,
		positionStyles?.classNames,
		bleedStyles?.classNames,
		widthStyles?.classNames,
		heightStyles?.classNames,
		aspectRatioStyles?.classNames,
		maxWidthStyles?.classNames,
		maxHeightStyles?.classNames,
		minWidthStyles?.classNames,
		minHeightStyles?.classNames,
		insetStyles?.classNames,
		insetTopStyles?.classNames,
		insetBottomStyles?.classNames,
		insetStartStyles?.classNames,
		insetEndStyles?.classNames,
		borderStyles?.classNames,
		textAlignStyles?.classNames,
		backgroundColor && s[`--bg-${backgroundColor}`],
		shadow && s[`--shadow-${shadow}`],
		overflow && s[`--overflow-${overflow}`],
		animated && s["--animated"],
		divided && s["--divided"],
		(padding !== undefined || paddingInline !== undefined || paddingBlock !== undefined) &&
			s["--padding"],
		paddingBottom !== undefined && s["--padding-bottom"],
		paddingEnd !== undefined && s["--padding-end"],
		paddingStart !== undefined && s["--padding-start"],
		paddingTop !== undefined && s["--padding-top"],
		(isFlex || nowrap) && s["--flex"],
		...responsiveClassNames(s, "--direction", direction),
		...responsiveClassNames(s, "--align", align),
		...responsiveClassNames(s, "--justify", justify),
		// Wrap and nowrap are separate here because inverting any of them could result into a false value which will be ignored by classNames
		...responsiveClassNames(s, "--nowrap", nowrap || wrap === false),
		...responsiveClassNames(s, "--wrap", wrap),
		// Item classnames
		...responsiveClassNames(s, "item--grow", grow)
	);

	const rootVariables = {
		...attributes?.style,
		...responsiveVariables("--rs-view-gap", gap),
		...responsiveVariables("--rs-view-p-vertical", paddingBlock || padding),
		...responsiveVariables("--rs-view-p-horizontal", paddingInline || padding),
		...responsiveVariables("--rs-view-p-bottom", paddingBottom),
		...responsiveVariables("--rs-view-p-top", paddingTop),
		...responsiveVariables("--rs-view-p-start", paddingStart),
		...responsiveVariables("--rs-view-p-end", paddingEnd),
		...bleedStyles?.variables,
		...widthStyles?.variables,
		...heightStyles?.variables,
		...aspectRatioStyles?.variables,
		...maxWidthStyles?.variables,
		...maxHeightStyles?.variables,
		...minWidthStyles?.variables,
		...minHeightStyles?.variables,
		...insetStyles?.variables,
		...insetTopStyles?.variables,
		...insetBottomStyles?.variables,
		...insetStartStyles?.variables,
		...insetEndStyles?.variables,
		...(zIndex ? { "--rs-view-z": zIndex } : {}),
	};

	return (
		<TagName {...attributes} className={rootClassNames} style={rootVariables}>
			{formattedChildren}
		</TagName>
	);
};

View.Item = ViewItem;
export default View;
