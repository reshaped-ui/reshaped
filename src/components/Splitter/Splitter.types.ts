import type React from "react";
import type { ViewProps } from "components/View";

export type Props = Pick<ViewProps, "children" | "className" | "attributes" | "height"> & {
	direction?: "row" | "column";
};

export type ItemProps = {
	children: React.ReactNode;
	minSize?: number;
	maxSize?: number;
};

export type PrivateItemProps = ItemProps & {
	index: number;
};

export type HandleProps = {
	children?: (attributes: { ref: React.RefObject<HTMLButtonElement> }) => React.ReactNode;
};

export type PrivateHandleProps = HandleProps & {
	containerRef: React.RefObject<HTMLDivElement | null>;
	index: number;
	onDrag: (args: { x: number; y: number; index: number }) => void;
} & Pick<Props, "direction">;
