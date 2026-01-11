import getShadowRoot from "dom/getShadowRoot";
import isRTL from "i18n/isRTL";

import { CONTAINER_OFFSET, RESET_STYLES } from "../constants";

import calculatePosition from "./calculatePosition";
import findClosestFixedContainer from "./findClosestFixedContainer";
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
		container: passedContainer,
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

	const closestFixedContainer =
		!passedContainer && trigger ? findClosestFixedContainer({ el: trigger }) : undefined;
	const container =
		passedContainer ||
		// Render inside fixed position container automatically to keep their position synced on scroll
		closestFixedContainer ||
		document.body;
	const renderContainerBounds = container.getBoundingClientRect();

	const testPosition = (position: Position, options?: { width?: Width }) => {
		if (options?.width === "100%") {
			contentClone.style.width = `calc(100% - ${CONTAINER_OFFSET * 2}px)`;
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
			containerBounds: renderContainerBounds,
			position,
			contentGap,
			contentShift,
			rtl,
			width,
			passedContainer:
				passedContainer ||
				(closestFixedContainer !== document.body ? closestFixedContainer : undefined),
			fallbackAdjustLayout,
			fallbackMinHeight,
		});
	};

	const testVisibility = (calculated: ReturnType<typeof calculatePosition>) => {
		const visualContainerBounds = passedContainer?.getBoundingClientRect() ?? {
			width: window.innerWidth,
			height: window.innerHeight,
			left: 0,
			top: 0,
		};

		return isFullyVisible({
			flyoutBounds: calculated.boundaries,
			visualContainerBounds,
			renderContainerBounds,
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
