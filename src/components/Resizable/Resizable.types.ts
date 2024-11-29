import type React from "react";
import type { ViewProps } from "components/View";
import type { UseDragCallbackArgs } from "hooks/useDrag";

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
	children?: (attributes: { ref: React.RefObject<HTMLButtonElement> }) => React.ReactNode;
};

export type PrivateHandleProps = HandleProps & {
	containerRef: React.RefObject<HTMLDivElement>;
	index: number;
	onDrag: (args: UseDragCallbackArgs & { index: number }) => void;
} & Pick<Props, "direction">;

export type ItemsRefProps = { el: HTMLDivElement | null; props: ItemProps }[];
