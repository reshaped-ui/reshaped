import type * as T from "./Flyout.types";

export const mouseEnter = 800;
export const mouseEnterShort = 100;
export const mouseLeave = 150;

export const defaultStyles: T.Styles = {
	left: 0,
	top: 0,
	width: "auto",
	height: "auto",
	zIndex: "var(--rs-z-index-absolute)",
};

export const resetStyles: T.Styles = {
	left: 0,
	top: 0,
	position: "absolute",
	visibility: "hidden",
	animation: "none",
	transition: "none",
	zIndex: "var(--rs-z-index-absolute)",
};
