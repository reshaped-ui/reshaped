import type React from "react";

import type { ViewProps } from "@/components/View";
import type { UseDragCallbackArgs } from "@/hooks/_internal/useDrag";

export type Props = {
	/** Component render variant */
	variant?: "bordered" | "borderless";
	/** Component content direction with the resize handle rendered in between the chidlren */
	direction?: Extract<ViewProps["direction"], "row" | "column">;
} & Pick<ViewProps, "children" | "className" | "attributes" | "height" | "gap">;

export type ItemProps = {
	/** Node for inserting content */
	children: React.ReactNode;
	/** Minimum size of the resizable pane */
	minSize?: `${number}px`;
	/** Maximum size of the resizable pane */
	maxSize?: `${number}px`;
	/** Default size of the resizable pane */
	defaultSize?: `${number}px`;
};

export type HandleProps = {
	/** Render function for custom resize handles with attributes and props passed as arguments */
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
