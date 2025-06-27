import type React from "react";
import type { ViewProps } from "components/View";
import type { UseDragCallbackArgs } from "hooks/_private/useDrag";

export type Props = {
	variant?: "bordered" | "borderless";
	direction?: Extract<ViewProps["direction"], "row" | "column">;
} & Pick<ViewProps, "children" | "className" | "attributes" | "height" | "gap">;

export type ItemProps = {
	children: React.ReactNode;
	minSize?: `${number}px`;
	maxSize?: `${number}px`;
	defaultSize?: `${number}px`;
};

export type PrivateItemProps = ItemProps & {
	index: number;
};

export type HandleProps = {
	children?: (
		attributes: { ref: React.RefObject<HTMLButtonElement | null> },
		props: Pick<Props, "direction"> & { status: "idle" | "dragging" }
	) => React.ReactNode;
};

export type HandleContext = {
	containerRef: React.RefObject<HTMLDivElement | null>;
	index: number;
	onDrag: (args: UseDragCallbackArgs & { index: number }) => void;
} & Pick<Props, "direction">;

export type ItemsRefProps = { el: HTMLDivElement | null; props: ItemProps }[];
