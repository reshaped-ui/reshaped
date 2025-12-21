import type React from "react";
import type * as TStyles from "styles/types";
import type * as G from "types/global";

type Columns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "auto";
export type Direction = "row" | "column" | "row-reverse" | "column-reverse";

export type Props<TagName extends keyof React.JSX.IntrinsicElements | void = void> = {
	/** Node for inserting the content */
	children?: React.ReactNode;
	/** Render as a different element */
	as?: TagName extends keyof React.JSX.IntrinsicElements
		? TagName
		: keyof React.JSX.IntrinsicElements;
	/** Render a divider between each child */
	divided?: boolean;
	/** Flex direction for the content */
	direction?: G.Responsive<Direction>;
	/** Gap between children, base unit token number multiplier */
	gap?: G.Responsive<number>;
	/** Flex wrap for the content */
	wrap?: G.Responsive<boolean>;
	/** Flex align-items for the content */
	align?: G.Responsive<TStyles.Align>;
	/** Flex justify-content for the content */
	justify?: G.Responsive<TStyles.Justify>;
	/** Height style, literal string value or a base unit token number multiplier */
	height?: G.Responsive<string | number>;
	/** Width style, literal string value or a base unit token number multiplier */
	width?: G.Responsive<string | number>;
	/** Aspect ratio style, represented as width / height */
	aspectRatio?: G.Responsive<number>;
	/** Maximum height style, literal string value or a base unit token number multiplier */
	maxHeight?: G.Responsive<string | number>;
	/** Maximum width style, literal string value or a base unit token number multiplier */
	maxWidth?: G.Responsive<string | number>;
	/** Minimum height style, literal string value or a base unit token number multiplier */
	minHeight?: G.Responsive<string | number>;
	/** Minimum width style, literal string value or a base unit token number multiplier */
	minWidth?: G.Responsive<string | number>;
	/** Padding style for all sides, base unit token number multiplier */
	padding?: G.Responsive<number>;
	/** Padding top, base unit token number multiplier */
	paddingTop?: G.Responsive<number>;
	/** Padding bottom, base unit token number multiplier */
	paddingBottom?: G.Responsive<number>;
	/** Padding inline start, base unit token number multiplier */
	paddingStart?: G.Responsive<number>;
	/** Padding inline end, base unit token number multiplier */
	paddingEnd?: G.Responsive<number>;
	/** Padding inline, base unit token number multiplier */
	paddingInline?: G.Responsive<number>;
	/** Padding block, base unit token number multiplier */
	paddingBlock?: G.Responsive<number>;
	/** Apply negative margin and remove side borders, base unit token number multiplier */
	bleed?: G.Responsive<number>;
	/** Text align for the content */
	textAlign?: G.Responsive<TStyles.TextAlign>;
	/** Background color, based on the color tokens */
	backgroundColor?:
		| "neutral"
		| "neutral-faded"
		| "critical"
		| "critical-faded"
		| "positive"
		| "warning"
		| "warning-faded"
		| "positive-faded"
		| "primary"
		| "primary-faded"
		| "elevation-base"
		| "elevation-raised"
		| "elevation-overlay"
		| "page"
		| "page-faded"
		| "disabled"
		| "disabled-faded"
		| "brand"
		| "white"
		| "black";
	/** Border color, based on the color tokens */
	borderColor?: G.Responsive<TStyles.BorderColor>;
	/** Add border to all sides */
	border?: G.Responsive<TStyles.Border>;
	/** Add border to the top side */
	borderTop?: G.Responsive<TStyles.Border>;
	/** Add border to the bottom side */
	borderBottom?: G.Responsive<TStyles.Border>;
	/** Add border to the inline start side */
	borderStart?: G.Responsive<TStyles.Border>;
	/** Add border to the inline end side */
	borderEnd?: G.Responsive<TStyles.Border>;
	/** Add border to the inline direction */
	borderInline?: G.Responsive<TStyles.Border>;
	/** Add border to the block direction */
	borderBlock?: G.Responsive<TStyles.Border>;
	/** Border radius, based on the radius tokens */
	borderRadius?: G.Responsive<TStyles.Radius>;
	/** Position style */
	position?: G.Responsive<TStyles.Position>;
	/** Inset style, base unit token number multiplier when used as a number */
	inset?: G.Responsive<TStyles.Inset>;
	/** Inset start, base unit token number multiplier when used as a number */
	insetStart?: G.Responsive<TStyles.Inset>;
	/** Inset end, base unit token number multiplier when used as a number */
	insetEnd?: G.Responsive<TStyles.Inset>;
	/** Inset top, base unit token number multiplier when used as a number */
	insetTop?: G.Responsive<TStyles.Inset>;
	/** Inset bottom, base unit token number multiplier when used as a number */
	insetBottom?: G.Responsive<TStyles.Inset>;
	/** z-index style */
	zIndex?: number;
	/** Shadow style, based on the shadow tokens */
	shadow?: "raised" | "overlay";
	/** Overflow style */
	overflow?: "hidden" | "auto";
	/** Add transition for the properties */
	animated?: boolean;
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Additional attributes for the root element */
	attributes?: G.Attributes<TagName>;
} & Pick<ItemProps, "grow" | "shrink">;

export type ItemProps<TagName extends keyof React.JSX.IntrinsicElements | void = void> = {
	/** Flex order of the item inside the parent */
	order?: G.Responsive<number>;
	/** Number of columns the item should span in the parent, View uses 12 columns */
	columns?: G.Responsive<Columns>;
	/** Apply flex-grow, using it on View.Item applies additional styles on the parent View	*/
	grow?: G.Responsive<boolean>;
	/** Apply flex-shrink */
	shrink?: boolean;
	/** Individual gap before the item, overrides the parent View gap */
	gapBefore?: G.Responsive<number> | "auto";
	/** Render as a different element */
	as?: TagName extends keyof React.JSX.IntrinsicElements
		? TagName
		: keyof React.JSX.IntrinsicElements;
	/** Additional attributes for the root element */
	attributes?: G.Attributes<TagName>;
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Node for inserting the item content */
	children?: React.ReactNode;
};

export type RenderItem = (args: {
	className?: string;
	// Using any in favor of resolving the props in runtime where we don't know their props definitions
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	child: any;
	index: number;
}) => React.ReactNode;

export type RenderDivider = (args: { className?: string; key: string }) => React.ReactNode;
