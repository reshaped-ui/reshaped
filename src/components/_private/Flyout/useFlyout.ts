import React from "react";
import useRTL from "hooks/useRTL";
import { getClosestFlyoutTarget, getShadowRoot } from "utilities/dom";
import calculatePosition from "./utilities/calculatePosition";
import getPositionFallbacks from "./utilities/getPositionFallbacks";
import type * as T from "./Flyout.types";

/**
 * Typings
 */
type ElementRef = React.RefObject<HTMLElement>;
type PassedFlyoutOptions = {
	width?: T.Width;
	position?: T.Position;
	defaultActive?: boolean;
	forcePosition?: boolean;
	container?: HTMLElement | null;
};

type Flyout = (
	args: T.Options & {
		triggerEl: HTMLElement;
		flyoutEl: HTMLElement;
		triggerBounds?: DOMRect | null;
		contentGap?: number;
	}
) => T.FlyoutData;

type FlyoutRenderAction = { type: "render"; payload?: never };
type FlyoutPositionAction = {
	type: "position";
	payload: Pick<T.State, "styles" | "position"> & { sync?: boolean };
};
type FlyoutShowAction = { type: "show"; payload?: never };
type FlyoutHideAction = { type: "hide"; payload?: never };
type FlyoutRemoveAction = { type: "remove"; payload?: never };
type FlyoutAction =
	| FlyoutRenderAction
	| FlyoutPositionAction
	| FlyoutShowAction
	| FlyoutHideAction
	| FlyoutRemoveAction;

type UseFlyout = (
	args: PassedFlyoutOptions & {
		triggerElRef: ElementRef;
		flyoutElRef: ElementRef;
		triggerBoundsRef: React.RefObject<DOMRect | undefined>;
		contentGap?: number;
	}
) => Pick<T.State, "styles" | "position" | "status"> & {
	updatePosition: (options?: { sync?: boolean }) => void;
	render: () => void;
	hide: () => void;
	remove: () => void;
	show: () => void;
};

/**
 * Check if element visually fits on the screen
 */
const fullyVisible = (args: ReturnType<typeof calculatePosition>) => {
	const { styles, scopeOffset } = args;
	const htmlEl = document.documentElement;
	const pageLeft = htmlEl.scrollLeft;
	const pageRight = pageLeft + htmlEl.clientWidth;
	const pageTop = htmlEl.scrollTop;
	const pageBottom = pageTop + htmlEl.clientHeight;

	return (
		styles.left + scopeOffset.left >= pageLeft &&
		styles.left + styles.width + scopeOffset.left <= pageRight &&
		styles.top + scopeOffset.top >= pageTop &&
		styles.top + styles.height + scopeOffset.top <= pageBottom
	);
};

/**
 * Order of keys here is responsible for the order of styles applied
 */
const defaultStyles: T.Styles = {
	left: 0,
	top: 0,
	width: "auto",
	height: "auto",
	// z-index doesn't accept strings
	zIndex: "var(--rs-z-index-flyout)" as any,
};

const resetStyles: T.Styles = {
	left: 0,
	top: 0,
	position: "fixed",
	// opacity: 0,
	visibility: "hidden",
	animation: "none",
	transition: "none",
	zIndex: "var(--rs-z-index-tooltip)" as any,
};

/**
 * Set position of the target element to fit on the screen
 */
const flyout: Flyout = (args) => {
	const {
		triggerEl,
		flyoutEl,
		triggerBounds: passedTriggerBounds,
		contentGap = 0,
		...options
	} = args;
	const { position, forcePosition, width, container } = options;
	const targetClone = flyoutEl.cloneNode(true) as HTMLElement;
	const triggerBounds = passedTriggerBounds || triggerEl.getBoundingClientRect();
	const contentGapModifier = parseInt(getComputedStyle(flyoutEl).getPropertyValue("--rs-unit-x1"));

	// Reset all styles applied on the previous hook execution
	targetClone.style.cssText = "";

	Object.keys(resetStyles).forEach((key) => {
		const value = resetStyles[key as keyof T.Styles];
		targetClone.style[key as any] = value!.toString();
	});

	if (width) {
		if (width === "trigger") {
			targetClone.style.width = `${triggerBounds.width}px`;
		} else if (width !== "full") {
			targetClone.style.width = width;
		}
	}

	const shadowRoot = getShadowRoot(triggerEl);

	// Insert inside shadow root if possible to make sure styles are applied correctly
	(shadowRoot || document.body).appendChild(targetClone);

	const flyoutBounds = targetClone.getBoundingClientRect();
	const containerParent = container || getClosestFlyoutTarget(triggerEl);
	const containerBounds = containerParent.getBoundingClientRect();

	const scopeOffset = {
		top: containerBounds.top + document.documentElement.scrollTop - containerParent.scrollTop,
		left: containerBounds.left + document.documentElement.scrollLeft - containerParent.scrollLeft,
	};

	let calculated: ReturnType<typeof calculatePosition> | null = null;
	const testOrder = getPositionFallbacks(position);

	testOrder.some((currentPosition, index) => {
		const tested = calculatePosition({
			...options,
			triggerBounds,
			flyoutBounds,
			scopeOffset,
			position: currentPosition,
			contentGap: contentGap * contentGapModifier,
		});
		const visible = fullyVisible(tested);
		const validPosition = visible || forcePosition;

		// Saving first try in case non of the options work
		if (validPosition || index === 0) {
			calculated = tested;
		}

		return validPosition;
	});

	if (!calculated) {
		throw new Error(`Reshaped: Can't calculate styles for the ${position} position`);
	}

	targetClone.parentNode?.removeChild(targetClone);
	return calculated;
};

const flyoutReducer = (state: T.State, action: FlyoutAction): T.State => {
	switch (action.type) {
		case "render":
			if (state.status !== "idle") return state;
			// Disable events before it's positioned to avoid mouseleave getting triggered
			return { ...state, status: "rendered", styles: { pointerEvents: "none", ...resetStyles } };
		case "position":
			if (!action.payload.sync && state.status !== "rendered") return state;
			if (action.payload.sync && state.status !== "visible") return state;

			return {
				...state,
				status: action.payload.sync ? "visible" : "positioned",
				position: action.payload.position,
				styles: { ...defaultStyles, ...action.payload.styles },
			};
		case "show":
			if (state.status !== "positioned") return state;
			return { ...state, status: "visible" };
		case "hide":
			if (state.status !== "visible") return state;
			return { ...state, status: "hidden" };
		case "remove":
			if (state.status !== "hidden" && state.status !== "visible") return state;
			return { ...state, status: "idle", styles: resetStyles };

		default:
			throw new Error("Invalid reducer type");
	}
};

const useFlyout: UseFlyout = (args) => {
	const { triggerElRef, flyoutElRef, triggerBoundsRef, contentGap, ...options } = args;
	const { position: defaultPosition = "bottom", forcePosition, width, container } = options;
	const [isRTL] = useRTL();
	const [state, dispatch] = React.useReducer(flyoutReducer, {
		position: defaultPosition,
		styles: defaultStyles,
		status: "idle",
	});

	const render = React.useCallback(() => {
		dispatch({ type: "render" });
	}, []);

	const show = React.useCallback(() => {
		dispatch({ type: "show" });
	}, []);

	const hide = React.useCallback(() => {
		dispatch({ type: "hide" });
	}, []);

	const remove = React.useCallback(() => {
		dispatch({ type: "remove" });
	}, []);

	const updatePosition = React.useCallback(
		(options?: { sync?: boolean }) => {
			if (!triggerElRef.current || !flyoutElRef.current) return;

			const nextFlyoutData = flyout({
				triggerEl: triggerElRef.current,
				flyoutEl: flyoutElRef.current,
				triggerBounds: triggerBoundsRef.current,
				width,
				position: defaultPosition,
				forcePosition,
				rtl: isRTL,
				container,
				contentGap,
			});

			if (nextFlyoutData)
				dispatch({ type: "position", payload: { ...nextFlyoutData, sync: options?.sync } });
		},
		[
			container,
			defaultPosition,
			forcePosition,
			isRTL,
			flyoutElRef,
			triggerElRef,
			triggerBoundsRef,
			width,
			contentGap,
		]
	);

	React.useEffect(() => {
		if (state.status === "rendered") updatePosition();
	}, [state.status, updatePosition]);

	return React.useMemo(
		() => ({
			position: state.position,
			styles: state.styles,
			status: state.status,
			updatePosition,
			render,
			hide,
			remove,
			show,
		}),
		[render, updatePosition, hide, remove, show, state.position, state.styles, state.status]
	);
};

export default useFlyout;
