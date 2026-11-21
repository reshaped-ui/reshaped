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

export type ContentSize = {
	width: number;
	height: number;
	clientWidth: number;
	clientHeight: number;
};

/** Sizes of the content keyed by the css width value they were measured with */
export type ContentMeasurements = Map<string, ContentSize>;
