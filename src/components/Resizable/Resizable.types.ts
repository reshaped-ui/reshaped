import type React from "react";
import type { ViewProps } from "components/View";
import type { UseDragCallbackArgs } from "hooks/_private/useDrag";

export type Props = {
	variant?: "bordered" | "borderless";
} & Pick<ViewProps, "children" | "className" | "attributes" | "height" | "direction" | "gap">;

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
	children?: (attributes: { ref: React.RefObject<HTMLButtonElement | null> }) => React.ReactNode;
};

export type PrivateHandleProps = HandleProps & {
	containerRef: React.RefObject<HTMLDivElement | null>;
	index: number;
	onDrag: (args: UseDragCallbackArgs & { index: number }) => void;
} & Pick<Props, "direction">;

export type ItemsRefProps = { el: HTMLDivElement | null; props: ItemProps }[];
