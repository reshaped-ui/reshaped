import React from "react";
import useRTL from "hooks/useRTL";
import { onNextFrame } from "utilities/animation";
import { getClosestFlyoutTarget } from "utilities/dom";

/**
 * Typings
 */
export type FlyoutPosition =
	| "bottom"
	| "bottom-start"
	| "bottom-end"
	| "top"
	| "top-start"
	| "top-end"
	| "start"
	| "start-top"
	| "start-bottom"
	| "end"
	| "end-top"
	| "end-bottom";
export type FlyoutWidth = "trigger" | string;
type ElementRef = React.RefObject<HTMLElement>;
type FlyoutOrderKey = "bottom" | "top" | "end" | "start";
type PassedFlyoutOptions = {
	width?: FlyoutWidth;
	position?: FlyoutPosition;
	defaultActive?: boolean;
	forcePosition?: boolean;
};
type FlyoutOptions = {
	width?: FlyoutWidth;
	position: FlyoutPosition;
	rtl: boolean;
	forcePosition?: boolean;
};
type PositionStyles = Record<"left" | "top" | "width" | "height", number>;

type CalculatePosition = (
	originBounds: ClientRect,
	targetBounds: ClientRect,
	boundsDelta: { top: number; left: number },
	options: FlyoutOptions
) => {
	styles: PositionStyles;
	position: FlyoutPosition;
};

type Flyout = (
	origin: HTMLElement,
	target: HTMLElement,
	options: FlyoutOptions
) => ReturnType<CalculatePosition>;

type FlyoutStyles = React.CSSProperties;
type FlyoutState = {
	styles: FlyoutStyles;
	position?: FlyoutPosition;
	status: "idle" | "rendered" | "positioned" | "visible" | "hidden";
};
type FlyoutRenderAction = { type: "render"; payload?: never };
type FlyoutPositionAction = {
	type: "position";
	payload: Pick<FlyoutState, "styles" | "position">;
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
	originRef: ElementRef,
	targetRef: ElementRef,
	options: PassedFlyoutOptions
) => Pick<FlyoutState, "styles" | "position" | "status"> & {
	updatePosition: () => void;
	render: () => void;
	hide: () => void;
	remove: () => void;
};

const SCREEN_OFFSET = 16;

const topPos: FlyoutPosition[] = ["top-start", "top", "top-end"];
const bottomPos: FlyoutPosition[] = ["bottom-start", "bottom", "bottom-end"];
const startPos: FlyoutPosition[] = ["start", "start-bottom", "start-top"];
const endPos: FlyoutPosition[] = ["end", "end-bottom", "end-top"];
const order: Record<FlyoutOrderKey, FlyoutPosition[]> = {
	top: [...topPos, ...bottomPos, ...endPos, ...startPos],
	bottom: [...bottomPos, ...topPos, ...endPos, ...startPos],
	start: [...startPos, ...endPos, ...topPos, ...bottomPos],
	end: [...endPos, ...startPos, ...topPos, ...bottomPos],
};

const getRTLPosition = (position: FlyoutPosition) => {
	if (position.includes("start")) return position.replace("start", "end") as FlyoutPosition;
	if (position.includes("end")) return position.replace("end", "start") as FlyoutPosition;
	return position;
};

/**
 * Get a position value which centers 2 elements vertically or horizontally
 */
const centerBySize = (originSize: number, targetSize: number) => {
	return Math.floor(originSize / 2 - targetSize / 2);
};

/**
 * Get an order of positions to try to fit popover on the screen based on its starting position
 */
const getPositionOrder = (position: FlyoutPosition) => {
	const types: Array<FlyoutOrderKey> = ["top", "bottom", "start", "end"];
	const type = types.find((type) => position.startsWith(type)) || "bottom";
	return order[type];
};

/**
 * Check if element visually fits on the screen
 */
const fullyVisible = (bounds: PositionStyles) => {
	const htmlEl = document.documentElement;
	const pageLeft = htmlEl.scrollLeft;
	const pageRight = pageLeft + htmlEl.clientWidth;
	const pageTop = htmlEl.scrollTop;
	const pageBottom = pageTop + htmlEl.clientHeight;

	return (
		bounds.left >= pageLeft &&
		bounds.left + bounds.width <= pageRight &&
		bounds.top >= pageTop &&
		bounds.top + bounds.height <= pageBottom
	);
};

/**
 * Calculate styles for the current position
 */
const calculatePosition: CalculatePosition = (
	originBounds,
	targetBounds,
	parentOffset,
	options
) => {
	const { position: passedPosition, rtl, width } = options;
	let left = 0;
	let top = 0;

	let position = passedPosition;
	if (rtl) position = getRTLPosition(position);
	if (width === "full" || width === "trigger") {
		position = position.includes("top") ? "top" : "bottom";
	}

	switch (position) {
		case "bottom":
		case "top":
			left = centerBySize(originBounds.width, targetBounds.width) + originBounds.left;
			break;

		case "start":
		case "start-top":
		case "start-bottom":
			left = originBounds.left - targetBounds.width;
			break;

		case "end":
		case "end-top":
		case "end-bottom":
			left = originBounds.right;
			break;

		case "top-start":
		case "bottom-start":
			left = originBounds.left;
			break;

		case "top-end":
		case "bottom-end":
			left = originBounds.right - targetBounds.width;
			break;

		default:
			break;
	}

	switch (position) {
		case "top":
		case "top-start":
		case "top-end":
			top = originBounds.top - targetBounds.height;
			break;

		case "bottom":
		case "bottom-start":
		case "bottom-end":
			top = originBounds.bottom;
			break;

		case "start":
		case "end":
			top = centerBySize(originBounds.height, targetBounds.height) + originBounds.top;
			break;

		case "start-top":
		case "end-top":
			top = originBounds.top;
			break;

		case "start-bottom":
		case "end-bottom":
			top = originBounds.bottom - targetBounds.height;
			break;

		default:
			break;
	}

	if (top === undefined || left === undefined) {
		throw Error(`[Reshaped, flyout]: ${position} position is not valid`);
	}

	top = Math.round(top + (window.scrollY || 0) - parentOffset.top);
	left = Math.round(left + (window.scrollX || 0) - parentOffset.left);
	let widthStyle = Math.ceil(targetBounds.width);
	const height = Math.ceil(targetBounds.height);

	if (width === "full") {
		left = SCREEN_OFFSET;
		widthStyle = window.innerWidth - SCREEN_OFFSET * 2;
	} else if (width === "trigger") {
		widthStyle = originBounds.width;
	}

	const styles = { left, top, width: widthStyle, height };

	return { styles, position };
};

/**
 * Order of keys here is responsible for the order of styles applied
 */
const defaultStyles: FlyoutStyles = {
	left: 0,
	top: 0,
	width: "auto",
	height: "auto",
	// z-index doesn't accept strings
	zIndex: "var(--rs-z-index-flyout)" as any,
};

const resetStyles: FlyoutStyles = {
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
const flyout: Flyout = (origin, target, options) => {
	const { position, forcePosition, width } = options;
	const targetClone = target.cloneNode(true) as any;
	const originBounds = origin.getBoundingClientRect();

	// Reset all styles applied on the previous hook execution
	targetClone.style = "";

	Object.keys(resetStyles).forEach((key) => {
		const value = resetStyles[key as keyof FlyoutStyles];
		targetClone.style[key as any] = value!.toString();
	});

	if (width) {
		if (width === "trigger") {
			targetClone.style.width = `${originBounds.width}px`;
		} else if (width !== "full") {
			targetClone.style.width = width;
		}
	}

	document.body.appendChild(targetClone);

	const targetBounds = targetClone.getBoundingClientRect();
	const scrollableParent = getClosestFlyoutTarget(origin);
	const boundsDelta = scrollableParent.getBoundingClientRect();

	const parentOffset = {
		top: boundsDelta.top + document.documentElement.scrollTop - scrollableParent.scrollTop,
		left: boundsDelta.left + document.documentElement.scrollLeft - scrollableParent.scrollLeft,
	};

	let calculated = calculatePosition(originBounds, targetBounds, parentOffset, options);

	if (!fullyVisible(calculated.styles) && !forcePosition) {
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

				const tested = calculatePosition(
					originBounds,
					targetBounds,
					parentOffset,
					calculateOptions
				);

				if (fullyVisible(tested.styles)) {
					calculated = tested;
					return true;
				}

				return false;
			});
		};

		test(order);
		if (!fullyVisible(calculated.styles)) {
			test(mobileOrder, { fullWidth: true });
		}
	}

	targetClone.parentNode.removeChild(targetClone);
	return calculated;
};

const flyoutReducer = (state: FlyoutState, action: FlyoutAction): FlyoutState => {
	switch (action.type) {
		case "render":
			// Disable events before it's positioned to avoid mouseleave getting triggered
			return { ...state, status: "rendered", styles: { pointerEvents: "none" } };
		case "position":
			return {
				...state,
				status: state.status === "visible" ? "visible" : "positioned",
				position: action.payload.position,
				styles: { ...defaultStyles, ...action.payload.styles },
			};
		case "show":
			return { ...state, status: "visible" };
		case "hide":
			return { ...state, status: state.status === "idle" ? "idle" : "hidden" };
		case "remove":
			return { ...state, status: "idle", styles: resetStyles };

		default:
			throw new Error("Invalid reducer type");
	}
};

const useFlyout: UseFlyout = (originRef, targetRef, options) => {
	const { position: defaultPosition = "bottom", forcePosition, width } = options;
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

	const updatePosition = React.useCallback(() => {
		if (!originRef.current || !targetRef.current) return;

		const nextFlyoutData = flyout(originRef.current, targetRef.current, {
			width,
			position: defaultPosition,
			forcePosition,
			rtl: isRTL,
		});

		dispatch({ type: "position", payload: nextFlyoutData });
	}, [originRef, targetRef, defaultPosition, isRTL, forcePosition, width]);

	React.useEffect(() => {
		if (state.status === "rendered") updatePosition();
		// Wait after positioning before show is triggered to animate flyout from the right side
		if (state.status === "positioned") onNextFrame(() => show());
	}, [state.status, updatePosition, show]);

	return React.useMemo(
		() => ({
			position: state.position,
			styles: state.styles,
			status: state.status,
			updatePosition,
			render,
			hide,
			remove,
		}),
		[render, updatePosition, hide, remove, state.position, state.styles, state.status]
	);
};

export default useFlyout;
