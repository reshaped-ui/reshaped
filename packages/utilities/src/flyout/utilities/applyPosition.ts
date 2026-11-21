import { getShadowRoot } from "@/dom";
import isRTL from "@/i18n/isRTL";
import { RESET_STYLES, VIEWPORT_OFFSET } from "../constants";
import type { ContentMeasurements, ContentSize, Options, Position, Width } from "../types";
import calculateLayoutAdjustment from "./calculateLayoutAdjustment";
import calculatePosition from "./calculatePosition";
import getPositionFallbacks from "./getPositionFallbacks";
import getRectFromCoordinates from "./getRectFromCoordinates";
import isFullyVisible from "./isFullyVisible";

/**
 * Get the viewport-relative rect of the element's containing block.
 * When the content is inside a positioned ancestor (e.g. a fixed overlay),
 * we need to account for its offset instead of using page scroll.
 */
const getContainingBlockRect = (
	el: HTMLElement
): { left: number; top: number; right: number; bottom: number } => {
	const offsetParent = el.offsetParent as HTMLElement | null;

	if (
		!offsetParent ||
		offsetParent === document.body ||
		offsetParent === document.documentElement
	) {
		// Initial containing block matches documentElement.clientWidth/Height,
		// which excludes the classic scrollbars unlike window.innerWidth/Height
		return {
			left: -window.scrollX,
			top: -window.scrollY,
			right: document.documentElement.clientWidth - window.scrollX,
			bottom: document.documentElement.clientHeight - window.scrollY,
		};
	}

	const rect = offsetParent.getBoundingClientRect();
	return { left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom };
};

const applyPosition = (
	args: Options & {
		lastUsedPosition: Position | null;
		/**
		 * Content sizes measured during the previous calls, keyed by the width they were measured with.
		 * Passing the same map again skips measuring the content for the widths it already has
		 */
		measurements?: ContentMeasurements;
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
		measurements,
	} = args;
	const rtl = isRTL();
	const triggerBounds = triggerCoordinates || trigger?.getBoundingClientRect();
	const containerBounds = container?.getBoundingClientRect() ?? {
		width: window.innerWidth,
		height: window.innerHeight,
		left: 0,
		top: 0,
	};

	if (!triggerBounds) return { position };

	const resolvedTriggerBounds = getRectFromCoordinates(triggerBounds);
	let contentClone: HTMLElement | null = null;

	/**
	 * Content is measured with a clone, so its size is not affected by the currently applied position.
	 * Cloning the content and laying it out is the most expensive part of the positioning,
	 * so the clone is only created when the requested size is not available in the passed measurements
	 */
	const measureContent = (styleWidth: string): ContentSize => {
		const measured = measurements?.get(styleWidth);
		if (measured) return measured;

		if (!contentClone) {
			contentClone = content.cloneNode(true) as HTMLElement;
			contentClone.style.cssText = "";

			Object.keys(RESET_STYLES).forEach((_key) => {
				const key = _key as keyof typeof RESET_STYLES;
				const value = RESET_STYLES[key];

				if (value) contentClone!.style[key] = value.toString();
			});

			// Insert inside shadow root if possible to make sure styles are applied correctly
			const root = (trigger && getShadowRoot(trigger)) ?? document.body;

			root.appendChild(contentClone);
		}

		contentClone.style.width = styleWidth;

		const bounds = contentClone.getBoundingClientRect();
		const size = {
			width: bounds.width,
			height: bounds.height,
			clientWidth: contentClone.clientWidth,
			clientHeight: contentClone.clientHeight,
		};

		measurements?.set(styleWidth, size);
		return size;
	};

	const getStyleWidth = (passedWidth?: Width) => {
		if (passedWidth === "100%") return `calc(100% - ${VIEWPORT_OFFSET * 2}px)`;
		if (passedWidth === "trigger") return `${resolvedTriggerBounds.width}px`;
		return width ?? "";
	};

	const testPosition = (
		position: Position,
		options?: { width?: Width; disableMinHeight?: boolean }
	) => {
		const flyoutBounds = measureContent(getStyleWidth(options?.width));

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
			fallbackMinHeight: options?.disableMinHeight ? undefined : fallbackMinHeight,
			width: options?.width,
			flyoutBounds,
			containerBounds,
			triggerBounds: resolvedTriggerBounds,
		});

		return { ...adjustedResult, contentSize: flyoutBounds };
	};

	const testVisibility = (calculated: ReturnType<typeof testPosition>) => {
		const flyoutBounds = {
			// Flyout is rendered in body with position absolute, so bounds need to include the page scroll
			left: calculated.styles.left,
			top: calculated.styles.top,
			height: calculated.styles.height ?? Math.ceil(calculated.contentSize.clientHeight),
			width: calculated.styles.width ?? Math.ceil(calculated.contentSize.clientWidth),
		};

		return isFullyVisible({
			flyoutBounds,
			containerBounds,
		});
	};

	let calculated: ReturnType<typeof testPosition> | null = null;

	const testOrder = getPositionFallbacks(position, fallbackPositions);

	testOrder.some((currentPosition) => {
		const tested = testPosition(currentPosition, { width });
		const visible = testVisibility(tested);

		if (visible) calculated = tested;

		return visible;
	});

	// Try full width positions in case it doesn't fit on any side
	if (!calculated) {
		// Keep the testOrder ordering so the preferred position is tried first
		const smallScreenFallbackPositions: Position[] = testOrder.filter(
			(position) => position === "top" || position === "bottom"
		);

		smallScreenFallbackPositions.some((position) => {
			const tested = testPosition(position, { width: "100%" });
			const visible = testVisibility(tested);

			if (visible) calculated = tested;

			return visible;
		});
	}

	// Nothing fits with the min height applied, meaning it's larger than the space
	// available on any side, so drop it and pick the position showing the most content
	if (!calculated && fallbackAdjustLayout && fallbackMinHeight) {
		let bestHeight = 0;

		testOrder.forEach((currentPosition) => {
			const tested = testPosition(currentPosition, { width, disableMinHeight: true });

			if (!testVisibility(tested)) return;

			const testedHeight = tested.styles.height ?? Math.ceil(tested.contentSize.clientHeight);

			if (testedHeight > bestHeight) {
				bestHeight = testedHeight;
				calculated = tested;
			}
		});
	}

	// None of the positions fit, use the last used position or the default position
	if (!calculated) calculated = testPosition(lastUsedPosition ?? position, { width });

	// Typed explicitly since the clone is assigned inside the measuring closure
	(contentClone as HTMLElement | null)?.remove();

	const { styles } = calculated;
	const containingBlockRect = getContainingBlockRect(content);
	const translateX =
		styles.right !== null
			? window.innerWidth - styles.right - containingBlockRect.right
			: styles.left - containingBlockRect.left;
	const translateY =
		styles.bottom !== null
			? window.innerHeight - styles.bottom - containingBlockRect.bottom
			: styles.top - containingBlockRect.top;
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
		// Writing the same value again still invalidates the content styles
		if (content.style.getPropertyValue(key) === (value ?? "")) return;

		if (value) {
			content.style.setProperty(key, value);
		} else {
			content.style.removeProperty(key);
		}
	});

	return { position: calculated.position };
};

export default applyPosition;
