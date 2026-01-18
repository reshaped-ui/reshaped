import type { Coordinates } from "@/types/global";

type XSide = "start" | "end";
type YSide = "top" | "bottom";

export type Side = XSide | YSide;
export type Position = `${YSide}` | `${YSide}-${XSide}` | `${XSide}` | `${XSide}-${YSide}`;
export type Width = "trigger" | string;

export type Options = {
	content: HTMLElement;
	trigger?: HTMLElement | null;
	container?: HTMLElement | null;
	triggerCoordinates?: Coordinates | null;

	position: Position;
	fallbackPositions?: Position[];

	width?: Width;
	fallbackAdjustLayout?: boolean;
	fallbackMinHeight?: string;

	contentGap?: number;
	contentShift?: number;

	onDeactivate: () => void;
};
