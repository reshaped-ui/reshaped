import { getShadowRoot } from "./shadowDom";
import type * as G from "types/global";

export const getClosestFlyoutTarget = (
	el: HTMLElement | null,
	iteration: number = 0
): HTMLElement => {
	const style = el && window.getComputedStyle(el);
	const overflowY = style?.overflowY;
	const position = style?.position;
	const isScrollable = overflowY?.includes("scroll");
	const isFixed = position === "fixed" || position === "sticky";

	// Only check shadow root on the first run
	if (iteration === 0) {
		const shadowRoot = getShadowRoot(el);
		if (shadowRoot?.firstElementChild) return shadowRoot.firstElementChild as HTMLElement;
	}

	if (el === document.body || !el) return document.body;
	if ((isScrollable && el.scrollHeight > el.clientHeight) || isFixed) return el;
	return getClosestFlyoutTarget(el.parentElement, iteration + 1);
};

export const getRectFromCoordinates = (coordinates: DOMRect | G.Coordinates): DOMRect => {
	if (coordinates instanceof DOMRect) return coordinates;

	return {
		...coordinates,
		width: 0,
		height: 0,
		left: coordinates.x,
		right: coordinates.x,
		top: coordinates.y,
		bottom: coordinates.y,
		toJSON: () => {},
	};
};
