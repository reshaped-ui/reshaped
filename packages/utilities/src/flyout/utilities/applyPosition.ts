import { getShadowRoot } from "@/dom";
import isRTL from "@/i18n/isRTL";

import { VIEWPORT_OFFSET, RESET_STYLES } from "../constants";

import calculateLayoutAdjustment from "./calculateLayoutAdjustment";
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
		left: 0,
		top: 0,
	};

	contentClone.style.cssText = "";

	if (!triggerBounds) return { position };

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

		const flyoutBounds = contentClone.getBoundingClientRect();

		const result = calculatePosition({
			triggerBounds: resolvedTriggerBounds,
			flyoutBounds,
			position,
			contentGap,
			contentShift,
			rtl,
		});

		const adjustedResult = calculateLayoutAdjustment({
			...result,
			fallbackAdjustLayout,
			fallbackMinHeight,
			width: options?.width,
			flyoutBounds,
			containerBounds,
			triggerBounds: resolvedTriggerBounds,
		});

		return adjustedResult;
	};

	const testVisibility = (calculated: ReturnType<typeof calculateLayoutAdjustment>) => {
		const flyoutBounds = {
			// Flyout is rendered in body with position absolute, so bounds need to include the page scroll
			left: calculated.styles.left,
			top: calculated.styles.top,
			height: calculated.styles.height ?? Math.ceil(contentClone.clientHeight),
			width: calculated.styles.width ?? Math.ceil(contentClone.clientWidth),
		};

		return isFullyVisible({
			flyoutBounds,
			containerBounds,
		});
	};

	let calculated: ReturnType<typeof calculateLayoutAdjustment> | null = null;

	const testOrder = getPositionFallbacks(position, fallbackPositions);

	testOrder.some((currentPosition) => {
		const tested = testPosition(currentPosition, { width });
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
	if (!calculated) calculated = testPosition(lastUsedPosition ?? position, { width });

	root.removeChild(contentClone);

	const { styles } = calculated;
	const translateX = (styles.right !== null ? -styles.right : styles.left) + window.scrollX;
	const translateY = (styles.bottom !== null ? -styles.bottom : styles.top) + window.scrollY;
	const resolvedStyles = {
		left: styles.right === null ? "0px" : undefined,
		right: styles.right === null ? undefined : "0px",
		top: styles.bottom === null ? "0px" : undefined,
		bottom: styles.bottom === null ? undefined : "0px",
		height: styles.height !== null ? `${styles.height}px` : undefined,
		width: styles.width !== null ? `${styles.width}px` : (width ?? undefined),
		transform: `translate(${translateX}px, ${translateY}px)`,
	};

	Object.entries(resolvedStyles).forEach(([key, value]) => {
		content.style.removeProperty(key);

		if (!value) return;
		content.style.setProperty(key, value);
	});

	return { position: calculated.position };
};

export default applyPosition;
