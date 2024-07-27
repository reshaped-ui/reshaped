import type React from "react";
import type { ViewProps } from "components/View";

export type Props = Pick<ViewProps, "children" | "className" | "attributes" | "height">;

export type ItemProps = {
	children: React.ReactNode;
};

export type PrivateItemProps = ItemProps & {
	index: number;
};

export type HandleProps = {};

export type PrivateHandleProps = HandleProps & {
	containerRef: React.RefObject<HTMLDivElement | null>;
	index: number;
	onDrag: (args: { x: number; y: number; index: number }) => void;
};
