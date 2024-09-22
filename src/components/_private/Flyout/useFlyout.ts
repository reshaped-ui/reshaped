import React from "react";
import useRTL from "hooks/useRTL";
import { getClosestFlyoutTarget, getShadowRoot } from "utilities/dom";
import calculatePosition from "./utilities/calculatePosition";
import type * as T from "./Flyout.types";

/**
 * Typings
 */
type ElementRef = React.RefObject<HTMLElement>;
type FlyoutOrderKey = "bottom" | "top" | "end" | "start";
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
	}
) => Pick<T.State, "styles" | "position" | "status"> & {
	updatePosition: (options?: { sync?: boolean }) => void;
	render: () => void;
	hide: () => void;
	remove: () => void;
	show: () => void;
};

const topPos: T.Position[] = ["top-start", "top", "top-end"];
const bottomPos: T.Position[] = ["bottom-start", "bottom", "bottom-end"];
const startPos: T.Position[] = ["start", "start-bottom", "start-top"];
const endPos: T.Position[] = ["end", "end-bottom", "end-top"];
const order: Record<FlyoutOrderKey, T.Position[]> = {
	top: [...topPos, ...bottomPos, ...endPos, ...startPos],
	bottom: [...bottomPos, ...topPos, ...endPos, ...startPos],
	start: [...startPos, ...endPos, ...topPos, ...bottomPos],
	end: [...endPos, ...startPos, ...topPos, ...bottomPos],
};

/**
 * Get an order of positions to try to fit popover on the screen based on its starting position
 */
const getPositionOrder = (position: T.Position) => {
	const types: Array<FlyoutOrderKey> = ["top", "bottom", "start", "end"];
	const type = types.find((type) => position.startsWith(type)) || "bottom";
	return order[type];
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
	const { triggerEl, flyoutEl, triggerBounds: passedTriggerBounds, ...options } = args;
	const { position, forcePosition, width, container } = options;
	const targetClone = flyoutEl.cloneNode(true) as any;
	const triggerBounds = passedTriggerBounds || triggerEl.getBoundingClientRect();

	// Reset all styles applied on the previous hook execution
	targetClone.style = "";

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

	let calculated = calculatePosition({ triggerBounds, flyoutBounds, scopeOffset, ...options });

	if (!fullyVisible(calculated) && !forcePosition) {
		const order = getPositionOrder(position);
		const mobileOrder = order.filter((position) => position === "top" || position === "bottom");

		const test = (testOrder: typeof order, extraOptions: { fullWidth?: boolean } = {}) => {
			const { fullWidth } = extraOptions;
			testOrder.some((currentPosition) => {
				const calculateOptions = {
					...options,
					width: fullWidth ? "full" : options.width,
					position: currentPosition,
				};

				const tested = calculatePosition({
					triggerBounds,
					flyoutBounds,
					scopeOffset,
					...calculateOptions,
				});

				if (fullyVisible(tested)) {
					calculated = tested;
					return true;
				}

				return false;
			});
		};

		test(order);
		if (!fullyVisible(calculated)) {
			test(mobileOrder, { fullWidth: true });
		}
	}

	targetClone.parentNode.removeChild(targetClone);
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
	const { triggerElRef, flyoutElRef, triggerBoundsRef, ...options } = args;
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
