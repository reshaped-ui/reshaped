import React from "react";
import useRTL from "hooks/useRTL";
import { findClosestRenderContainer, getShadowRoot, getRectFromCoordinates } from "utilities/dom";
import calculatePosition from "./utilities/calculatePosition";
import getPositionFallbacks from "./utilities/getPositionFallbacks";
import isFullyVisible from "./utilities/isFullyVisible";
import type * as G from "types/global";
import type * as T from "./Flyout.types";

/**
 * Typings
 */
type Flyout = (
	args: T.Options & {
		flyoutEl: HTMLElement;
		triggerEl: HTMLElement | null;
		triggerBounds?: DOMRect | G.Coordinates | null;
	}
) => T.FlyoutData | undefined;

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

type UseFlyout = (args: {
	width?: T.Width;
	position?: T.Position;
	defaultActive?: boolean;
	fallbackPositions?: T.Position[];
	contentGap?: number;
	contentShift?: number;
	container?: HTMLElement | null;
	triggerElRef: React.RefObject<HTMLElement | null>;
	flyoutElRef: React.RefObject<HTMLElement | null>;
	triggerBounds?: DOMRect | G.Coordinates | null;
}) => Pick<T.State, "styles" | "position" | "status"> & {
	updatePosition: (options?: { sync?: boolean }) => void;
	render: () => void;
	hide: () => void;
	remove: () => void;
	show: () => void;
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
	zIndex: "var(--rs-z-index-flyout)",
};

const resetStyles: T.Styles = {
	left: 0,
	top: 0,
	position: "absolute",
	visibility: "hidden",
	animation: "none",
	transition: "none",
	zIndex: "var(--rs-z-index-tooltip)",
};

/**
 * Set position of the target element to fit on the screen
 */
const flyout: Flyout = (args) => {
	const {
		triggerEl,
		flyoutEl,
		triggerBounds: passedTriggerBounds,
		contentShift = 0,
		contentGap = 0,
		...options
	} = args;
	const { position, fallbackPositions, width, container, lastUsedFallback, onFallback } = options;
	const targetClone = flyoutEl.cloneNode(true) as HTMLElement;
	const baseUnit = getComputedStyle(flyoutEl).getPropertyValue("--rs-unit-x1");
	const unitModifier = baseUnit ? parseInt(baseUnit) : 0;
	const internalTriggerBounds = triggerEl?.getBoundingClientRect();
	const triggerBounds = passedTriggerBounds || internalTriggerBounds;

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

	if (width) {
		if (width === "trigger") {
			targetClone.style.width = `${resolvedTriggerBounds.width}px`;
		} else if (width !== "full") {
			targetClone.style.width = width;
		}
	}

	const shadowRoot = triggerEl && getShadowRoot(triggerEl);

	// Insert inside shadow root if possible to make sure styles are applied correctly
	(shadowRoot || document.body).appendChild(targetClone);

	const flyoutBounds = targetClone.getBoundingClientRect();
	const closestRenderContainer =
		!container && triggerEl ? findClosestRenderContainer({ el: triggerEl }) : undefined;
	const containerParent =
		container ||
		// Only render inside non-scrollable container to make sure it doesn't get clipped by overflow auto
		// We render those cases in the document root and then sync the position on scroll instead
		(!closestRenderContainer?.scrollable ? closestRenderContainer?.el : undefined) ||
		document.body;
	const containerBounds = containerParent.getBoundingClientRect();

	const scopeOffset = {
		top: containerBounds.top + document.documentElement.scrollTop - containerParent.scrollTop,
		left: containerBounds.left + document.documentElement.scrollLeft - containerParent.scrollLeft,
	};

	let calculated: ReturnType<typeof calculatePosition> | null = null;
	const testOrder = getPositionFallbacks(position, fallbackPositions);

	testOrder.some((currentPosition) => {
		const tested = calculatePosition({
			...options,
			triggerBounds: resolvedTriggerBounds,
			flyoutBounds,
			scopeOffset,
			position: currentPosition,
			contentGap: contentGap * unitModifier,
			contentShift: contentShift * unitModifier,
		});
		const visible = isFullyVisible({ ...tested, container });
		const validPosition = visible || fallbackPositions?.length === 0;

		// Saving first try in case non of the options work
		if (validPosition || lastUsedFallback === currentPosition) {
			calculated = tested;
			onFallback(currentPosition);
		}

		return validPosition;
	});

	if (!calculated) {
		throw new Error(`[Reshaped] Can't calculate styles for the ${position} position`);
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
			throw new Error("[Reshaped] Invalid flyout reducer type");
	}
};

const useFlyout: UseFlyout = (args) => {
	const { triggerElRef, flyoutElRef, triggerBounds, contentGap, contentShift, ...options } = args;
	const { position: defaultPosition = "bottom", fallbackPositions, width, container } = options;
	const lastUsedFallbackRef = React.useRef(defaultPosition);
	// Memo the array internally to avoid new arrays triggering useCallback
	const cachedFallbackPositions = React.useMemo(
		() => fallbackPositions,
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[fallbackPositions?.join(" ")]
	);
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

	const handleFallback = React.useCallback((position: T.Position) => {
		lastUsedFallbackRef.current = position;
	}, []);

	const updatePosition = React.useCallback(
		(options?: { sync?: boolean }) => {
			if (!flyoutElRef.current) return;

			const nextFlyoutData = flyout({
				triggerEl: triggerElRef.current,
				flyoutEl: flyoutElRef.current,
				triggerBounds,
				width,
				position: defaultPosition,
				fallbackPositions: cachedFallbackPositions,
				lastUsedFallback: lastUsedFallbackRef.current,
				onFallback: handleFallback,
				rtl: isRTL,
				container,
				contentGap,
				contentShift,
			});

			if (nextFlyoutData) {
				dispatch({ type: "position", payload: { ...nextFlyoutData, sync: options?.sync } });
			}
		},
		[
			container,
			defaultPosition,
			cachedFallbackPositions,
			isRTL,
			flyoutElRef,
			triggerElRef,
			triggerBounds,
			width,
			contentGap,
			contentShift,
			handleFallback,
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
