import type * as G from "types/global";
import { getRectFromCoordinates, getShadowRoot, findClosestPositionContainer } from "utilities/dom";
import calculatePosition from "./calculatePosition";
import getPositionFallbacks from "./getPositionFallbacks";
import isFullyVisible from "./isFullyVisible";
import { resetStyles } from "../Flyout.constants";
import type * as T from "../Flyout.types";

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
		const value = resetStyles[key as keyof T.Styles];

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

	const cloneRect = targetClone.getBoundingClientRect();
	const flyoutBounds = { width: cloneRect.width, height: cloneRect.height };
	const closestFixedContainer =
		!passedContainer && triggerEl ? findClosestPositionContainer({ el: triggerEl }) : undefined;
	const container =
		passedContainer ||
		// Render inside fixed position container automatically to keep their position synced on scroll
		closestFixedContainer ||
		document.body;
	const renderContainerBounds = container.getBoundingClientRect();
	const visualContainerBounds = (passedContainer || document.body).getBoundingClientRect();

	const applyPosition = (position: T.Position) => {
		return calculatePosition({
			triggerBounds: resolvedTriggerBounds,
			flyoutBounds,
			containerBounds: renderContainerBounds,
			position,
			contentGap: contentGap * unitModifier,
			contentShift: contentShift * unitModifier,
			rtl,
			width,
			passedContainer:
				passedContainer ||
				(closestFixedContainer !== document.body ? closestFixedContainer : undefined),
			fallbackAdjustLayout,
			fallbackMinWidth,
			fallbackMinHeight,
		});
	};

	const testVisibility = (calculated: ReturnType<typeof calculatePosition>) => {
		return isFullyVisible({
			flyoutBounds: calculated.boundaries,
			visualContainerBounds,
			renderContainerBounds,
			container,
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

	if (!calculated) calculated = applyPosition(lastUsedPosition);

	onPositionChoose(calculated.position);
	targetClone.parentNode?.removeChild(targetClone);
	return calculated;
};

export default flyout;
