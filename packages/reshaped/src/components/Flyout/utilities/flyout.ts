import { getRectFromCoordinates, getShadowRoot, findClosestPositionContainer } from "utilities/dom";

import { resetStyles } from "../Flyout.constants";

import calculatePosition from "./calculatePosition";
import { SCREEN_OFFSET } from "./constants";
import getPositionFallbacks from "./getPositionFallbacks";
import isFullyVisible from "./isFullyVisible";

import type * as T from "../Flyout.types";
import type * as G from "types/global";

/**
 * Set position of the target element to fit on the screen
 */
const flyout = (
	args: T.Options & {
		flyoutEl: HTMLElement;
		triggerEl: HTMLElement | null;
		triggerBounds?: DOMRect | G.Coordinates | null;
	}
): T.FlyoutData | undefined => {
	const {
		triggerEl,
		flyoutEl,
		triggerBounds: passedTriggerBounds,
		contentShift = 0,
		contentGap = 0,
		position,
		fallbackPositions,
		fallbackAdjustLayout,
		fallbackMinWidth,
		fallbackMinHeight,
		width,
		container: passedContainer,
		lastUsedPosition,
		onPositionChoose,
		rtl,
	} = args;
	const targetClone = flyoutEl.cloneNode(true) as HTMLElement;
	const baseUnit = getComputedStyle(flyoutEl).getPropertyValue("--rs-unit-x1");
	const unitModifier = baseUnit ? parseInt(baseUnit) : 4;
	const triggerBounds = passedTriggerBounds || triggerEl?.getBoundingClientRect();

	if (!triggerBounds) return;

	const resolvedTriggerBounds = getRectFromCoordinates(triggerBounds);

	// Reset all styles applied on the previous hook execution
	targetClone.style.cssText = "";

	Object.keys(resetStyles).forEach((key) => {
		const value = resetStyles[key as keyof React.CSSProperties];

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		if (value) targetClone.style[key] = value.toString();
	});

	if (width === "trigger") {
		targetClone.style.width = `${resolvedTriggerBounds.width}px`;
	} else if (width && width !== "full") {
		targetClone.style.width = width;
	}

	const shadowRoot = triggerEl && getShadowRoot(triggerEl);

	// Insert inside shadow root if possible to make sure styles are applied correctly
	(shadowRoot || document.body).appendChild(targetClone);

	const closestFixedContainer =
		!passedContainer && triggerEl ? findClosestPositionContainer({ el: triggerEl }) : undefined;
	const container =
		passedContainer ||
		// Render inside fixed position container automatically to keep their position synced on scroll
		closestFixedContainer ||
		document.body;
	const renderContainerBounds = container.getBoundingClientRect();

	const applyPosition = (position: T.Position, options?: { width?: T.Width }) => {
		const widthOption = options?.width || width;

		// If there is a width override, apply it to calculate the position and the height correctly
		if (widthOption === "full") {
			targetClone.style.width = `calc(100% - ${SCREEN_OFFSET * 2}px)`;
		} else if (widthOption === "trigger") {
			targetClone.style.width = `${resolvedTriggerBounds.width}px`;
		} else {
			targetClone.style.width = widthOption || "";
		}

		const cloneRect = targetClone.getBoundingClientRect();
		const flyoutBounds = { width: cloneRect.width, height: cloneRect.height };

		return calculatePosition({
			triggerBounds: resolvedTriggerBounds,
			flyoutBounds,
			containerBounds: renderContainerBounds,
			position,
			contentGap: contentGap * unitModifier,
			contentShift: contentShift * unitModifier,
			rtl,
			width: widthOption,
			passedContainer:
				passedContainer ||
				(closestFixedContainer !== document.body ? closestFixedContainer : undefined),
			fallbackAdjustLayout,
			fallbackMinWidth,
			fallbackMinHeight,
		});
	};

	const testVisibility = (calculated: ReturnType<typeof calculatePosition>) => {
		const visualContainerBounds = passedContainer?.getBoundingClientRect() ?? {
			width: window.innerWidth,
			height: window.innerHeight,
			left: window.scrollX,
			top: window.scrollY,
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
		const tested = applyPosition(currentPosition);
		const visible = testVisibility(tested);

		if (visible) calculated = tested;

		return visible;
	});

	// Try full width positions in case it doesn't fit on any side
	if (!calculated) {
		const smallScreenFallbackPositions: T.Position[] = (["top", "bottom"] as const).filter(
			(position) => testOrder.includes(position)
		);

		smallScreenFallbackPositions.some((position) => {
			const tested = applyPosition(position, { width: "full" });
			const visible = testVisibility(tested);

			if (visible) calculated = tested;

			return visible;
		});
	}

	if (!calculated) calculated = applyPosition(lastUsedPosition);

	onPositionChoose(calculated.position);
	targetClone.parentNode?.removeChild(targetClone);

	Object.entries(calculated.styles).forEach(([key, value]) => {
		flyoutEl.style.setProperty(key, value);
	});

	return { position: calculated.position };
};

export default flyout;
