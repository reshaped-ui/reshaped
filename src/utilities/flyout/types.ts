export type Position =
	| "bottom"
	| "bottom-start"
	| "bottom-end"
	| "top"
	| "top-start"
	| "top-end"
	| "start"
	| "start-top"
	| "start-bottom"
	| "end"
	| "end-top"
	| "end-bottom";

export type PositionOrder = "bottom" | "top" | "end" | "start";
export type PositionStyles = Record<"left" | "top" | "width" | "height", number>;

export type Options = {
	width?: "trigger" | string;
	position: Position;
	rtl: boolean;
	forcePosition?: boolean;
};
