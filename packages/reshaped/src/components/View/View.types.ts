import type React from "react";
import type { ClassName } from "@reshaped/utilities";

import type * as TStyles from "@/styles/types";
import type * as G from "@/types/global";
import type { Attributes } from "@/types/global";

type Columns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "auto";
export type Direction = "row" | "column" | "row-reverse" | "column-reverse";

export type Props<TagName extends keyof React.JSX.IntrinsicElements | void = void> = {
	/** Node for inserting the content */
	children?: React.ReactNode;
	/** Render as a different element
	 * @default "div"
	 */
	as?: TagName extends keyof React.JSX.IntrinsicElements
		? TagName
		: keyof React.JSX.IntrinsicElements;
	/** Render a divider between each child, dividers follow the View direction.
	 * `gap` is applied on both sides of every divider
	 */
	divided?: boolean;
	/** Flex direction for the content. View becomes a flex container when `direction`, `gap`, `align`
	 * or `justify` is passed and uses the "column" direction unless another one is set.
	 * Row directions wrap the children by default, see `wrap`
	 */
	direction?: G.Responsive<Direction>;
	/** Gap between children, base unit token number multiplier: `gap={4}` is 16px with the default 4px base unit */
	gap?: G.Responsive<number>;
	/** Flex wrap for the content, row directions wrap by default and column directions don't.
	 * `false` also stops the children from shrinking, pass `shrink` to the ones that should still shrink
	 */
	wrap?: G.Responsive<boolean>;
	/** Flex align-items for the content. When not passed, children are stretched in the column directions
	 * and aligned to the start in the row directions
	 */
	align?: G.Responsive<TStyles.Align>;
	/** Flex justify-content for the content */
	justify?: G.Responsive<TStyles.Justify>;
	/** Height style, literal string value or a base unit token number multiplier */
	height?: G.Responsive<string | number>;
	/** Width style, literal string value or a base unit token number multiplier */
	width?: G.Responsive<string | number>;
	/** Aspect ratio style, represented as width / height, e.g. `16 / 9`.
	 * Only sizes the View itself, its children keep their own dimensions
	 */
	aspectRatio?: G.Responsive<number>;
	/** Maximum height style, literal string value or a base unit token number multiplier */
	maxHeight?: G.Responsive<string | number>;
	/** Maximum width style, literal string value or a base unit token number multiplier */
	maxWidth?: G.Responsive<string | number>;
	/** Minimum height style, literal string value or a base unit token number multiplier */
	minHeight?: G.Responsive<string | number>;
	/** Minimum width style, literal string value or a base unit token number multiplier */
	minWidth?: G.Responsive<string | number>;
	/** Padding style for all sides, base unit token number multiplier.
	 * Side and axis padding props take priority over it for the sides they define
	 */
	padding?: G.Responsive<number>;
	/** Padding top, base unit token number multiplier */
	paddingTop?: G.Responsive<number>;
	/** Padding bottom, base unit token number multiplier */
	paddingBottom?: G.Responsive<number>;
	/** Padding inline start, base unit token number multiplier */
	paddingStart?: G.Responsive<number>;
	/** Padding inline end, base unit token number multiplier */
	paddingEnd?: G.Responsive<number>;
	/** Padding inline, base unit token number multiplier. Takes priority over `paddingStart` and `paddingEnd` */
	paddingInline?: G.Responsive<number>;
	/** Padding block, base unit token number multiplier. Takes priority over `paddingTop` and `paddingBottom` */
	paddingBlock?: G.Responsive<number>;
	/** Apply negative inline margin to extend the View outside of its parent padding,
	 * base unit token number multiplier. Also removes the side borders and the border radius
	 */
	bleed?: G.Responsive<number>;
	/** Text align for the content */
	textAlign?: G.Responsive<TStyles.TextAlign>;
	/** Background color, based on the color tokens. Also sets the text color matching the selected background */
	backgroundColor?:
		| "neutral"
		| "neutral-faded"
		| "critical"
		| "critical-faded"
		| "positive"
		| "positive-faded"
		| "warning"
		| "warning-faded"
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
	/** Border color, based on the color tokens. Adds a border to all sides,
	 * unless `border` or any of the side border props is passed
	 */
	borderColor?: G.Responsive<TStyles.BorderColor>;
	/** Add border to all sides, uses the color from `borderColor`.
	 * Pass `false` to remove the border added by `borderColor`
	 */
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
	/** Position style
	 * @default "relative"
	 */
	position?: G.Responsive<TStyles.Position>;
	/** Inset style, base unit token number multiplier when used as a number, "center" centers the element on both axes */
	inset?: G.Responsive<TStyles.InsetAxis>;
	/** Inset start, base unit token number multiplier when used as a number */
	insetStart?: G.Responsive<TStyles.Inset>;
	/** Inset end, base unit token number multiplier when used as a number */
	insetEnd?: G.Responsive<TStyles.Inset>;
	/** Inset top, base unit token number multiplier when used as a number */
	insetTop?: G.Responsive<TStyles.Inset>;
	/** Inset bottom, base unit token number multiplier when used as a number */
	insetBottom?: G.Responsive<TStyles.Inset>;
	/** Inset inline, base unit token number multiplier when used as a number, "center" centers on the inline axis */
	insetInline?: G.Responsive<TStyles.InsetAxis>;
	/** Inset block, base unit token number multiplier when used as a number, "center" centers on the block axis */
	insetBlock?: G.Responsive<TStyles.InsetAxis>;
	/** z-index style, based on the z-index tokens when used as a string */
	zIndex?: TStyles.ZIndex;
	/** Shadow style, based on the shadow tokens */
	shadow?: TStyles.Shadow;
	/** Overflow style */
	overflow?: "hidden" | "auto";
	/** Add transition for the background-color, color, border-color and box-shadow css properties of the root element */
	animated?: boolean;
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element */
	attributes?: Attributes<TagName>;
} & Pick<ItemProps, "grow" | "shrink">;

export type ItemProps<TagName extends keyof React.JSX.IntrinsicElements | void = void> = {
	/** Flex order of the item inside the parent */
	order?: G.Responsive<number>;
	/** Number of columns the item should span in the parent, View uses 12 columns.
	 * Sets the item width with the parent `gap` taken into account, so use it in a View with the row direction.
	 * "auto" sizes the item based on its content
	 */
	columns?: G.Responsive<Columns>;
	/** Grow to take the remaining space of the parent View, works for View.Item and View
	 * rendered as direct children of a View. The parent View becomes a flex container
	 * that doesn't wrap and its other children stop shrinking
	 */
	grow?: G.Responsive<boolean>;
	/** Apply flex-shrink, lets the item shrink inside a View using `wrap={false}` or a `grow` child,
	 * where children don't shrink by default
	 */
	shrink?: boolean;
	/** Individual gap before the item, overrides the parent View gap. Base unit token number multiplier,
	 * "auto" takes all the free space before the item and pushes it to the end of the View
	 */
	gapBefore?: G.Responsive<number> | "auto";
	/** Render as a different element
	 * @default "div"
	 */
	as?: TagName extends keyof React.JSX.IntrinsicElements
		? TagName
		: keyof React.JSX.IntrinsicElements;
	/** Additional attributes for the root element */
	attributes?: Attributes<TagName>;
	/** Additional classname for the root element */
	className?: ClassName;
	/** Node for inserting the item content */
	children?: React.ReactNode;
};

export type RenderItem = (args: {
	className?: string;
	// Using any in favor of resolving the props in runtime where we don't know their props definitions
	child: any;
	index: number;
	fallbackKey?: React.Key;
}) => React.ReactNode;

export type RenderDivider = (args: { className?: string; key?: React.Key }) => React.ReactNode;
