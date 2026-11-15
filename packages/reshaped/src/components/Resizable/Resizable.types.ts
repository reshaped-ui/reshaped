import type React from "react";

import type { ViewProps } from "@/components/View";
import type { UseDragCallbackArgs } from "@/hooks/_internal/useDrag";

export type Props = {
	/** Component render variant. Bordered handles render a visible divider line, while borderless handles are only displayed on hover, focus and drag
	 * @default "borderless"
	 */
	variant?: "bordered" | "borderless";
	/** Component content direction with the resize handle rendered in between the children
	 * @default "row"
	 */
	direction?: Extract<ViewProps["direction"], "row" | "column">;
} & Pick<ViewProps, "children" | "className" | "attributes" | "height" | "gap">;

export type ItemProps = {
	/** Node for inserting content */
	children: React.ReactNode;
	/** Minimum size of the resizable pane, its width for the row direction and height for the column direction */
	minSize?: `${number}px`;
	/** Maximum size of the resizable pane, its width for the row direction and height for the column direction */
	maxSize?: `${number}px`;
	/** Default width of the resizable pane in the row direction, which can be resized afterwards. Panes without it share the remaining space equally */
	defaultSize?: `${number}px`;
};

export type HandleProps = {
	/** Render function for custom resize handles with attributes and props passed as arguments.
	 * Pass `attributes` to the element that starts the drag, it has to be focusable to keep resizing with arrow keys working.
	 * `props` contain the direction and the current drag status
	 */
	children?: (
		attributes: { ref: React.RefObject<HTMLButtonElement | null> },
		props: Pick<Props, "direction"> & { status: "idle" | "dragging" }
	) => React.ReactNode;
};

export type Context = {
	containerRef: React.RefObject<HTMLDivElement | null>;
	registerItem: (
		el: HTMLDivElement,
		getProps: Pick<ItemProps, "minSize" | "maxSize">
	) => () => void;
	onDrag: (args: UseDragCallbackArgs & { handleEl: HTMLElement }) => void;
} & Pick<Props, "direction">;
