type XSide = "start" | "end";
type YSide = "top" | "bottom";

export type Side = XSide | YSide;
export type Position = `${YSide}` | `${YSide}-${XSide}` | `${XSide}` | `${XSide}-${YSide}`;
export type Coordinates = { x: number; y: number };
export type Width = "trigger" | string;

export type Options = {
	content: HTMLElement;
	trigger?: HTMLElement | null;
	container?: HTMLElement | null;
	triggerBounds: DOMRect | Coordinates | null;

	width: Width;
	fallbackAdjustLayout: boolean;
	fallbackMinHeight: number;
	contentGap: number;
	contentShift: number;
	position: Position;
	fallbackPositions?: Position[];

	onPosition?: (position: Position) => void;
	onClose: () => void;
};
