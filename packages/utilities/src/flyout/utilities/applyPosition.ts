import getShadowRoot from "dom/getShadowRoot";
import isRTL from "i18n/isRTL";

import { VIEWPORT_OFFSET, RESET_STYLES } from "../constants";

import calculatePosition from "./calculatePosition";
import getPositionFallbacks from "./getPositionFallbacks";
import getRectFromCoordinates from "./getRectFromCoordinates";
import isFullyVisible from "./isFullyVisible";

import type { Position, Width, Options } from "../types";

const applyPosition = (
	args: Options & {
		lastUsedPosition: Position | null;
	}
) => {
	const {
		trigger,
		content,
		triggerCoordinates,
		container,
		contentShift = 0,
		contentGap = 0,
		position,
		fallbackPositions,
		fallbackAdjustLayout,
		fallbackMinHeight,
		width,
		lastUsedPosition,
	} = args;
	const rtl = isRTL();
	const contentClone = content.cloneNode(true) as HTMLElement;
	const triggerBounds = triggerCoordinates || trigger?.getBoundingClientRect();
	const containerBounds = container?.getBoundingClientRect() ?? {
		width: window.innerWidth,
		height: window.innerHeight,
		left: window.scrollX,
		top: window.scrollY,
	};

	contentClone.style.cssText = "";

	if (!triggerBounds) throw new Error("Trigger bounds are required");

	const resolvedTriggerBounds = getRectFromCoordinates(triggerBounds);

	Object.keys(RESET_STYLES).forEach((_key) => {
		const key = _key as keyof typeof RESET_STYLES;
		const value = RESET_STYLES[key];

		if (value) contentClone.style[key] = value.toString();
	});

	// Insert inside shadow root if possible to make sure styles are applied correctly
	const root = (trigger && getShadowRoot(trigger)) ?? document.body;

	root.appendChild(contentClone);

	const testPosition = (position: Position, options?: { width?: Width }) => {
		if (options?.width === "100%") {
			contentClone.style.width = `calc(100% - ${VIEWPORT_OFFSET * 2}px)`;
		} else if (options?.width === "trigger") {
			contentClone.style.width = `${resolvedTriggerBounds.width}px`;
		} else if (width) {
			contentClone.style.width = width;
		} else {
			contentClone.style.width = "";
		}

		return calculatePosition({
			triggerBounds: resolvedTriggerBounds,
			flyoutBounds: contentClone.getBoundingClientRect(),
			position,
			contentGap,
			contentShift,
			rtl,
			width,
			fallbackAdjustLayout,
			fallbackMinHeight,
		});
	};

	const testVisibility = (calculated: ReturnType<typeof calculatePosition>) => {
		return isFullyVisible({
			flyoutBounds: calculated.boundaries,
			containerBounds,
		});
	};

	let calculated: ReturnType<typeof calculatePosition> | null = null;

	const testOrder = getPositionFallbacks(position, fallbackPositions);

	testOrder.some((currentPosition) => {
		const tested = testPosition(currentPosition);
		const visible = testVisibility(tested);

		if (visible) calculated = tested;

		return visible;
	});

	// Try full width positions in case it doesn't fit on any side
	if (!calculated) {
		const smallScreenFallbackPositions: Position[] = (["top", "bottom"] as const).filter(
			(position) => testOrder.includes(position)
		);

		smallScreenFallbackPositions.some((position) => {
			const tested = testPosition(position, { width: "100%" });
			const visible = testVisibility(tested);

			if (visible) calculated = tested;

			return visible;
		});
	}

	// None of the positions fit, use the last used position or the default position
	if (!calculated) calculated = testPosition(lastUsedPosition ?? position);

	root.removeChild(contentClone);
	Object.entries(calculated.styles).forEach(([key, value]) => {
		content.style.setProperty(key, value);
	});

	return { position: calculated.position };
};

export default applyPosition;
