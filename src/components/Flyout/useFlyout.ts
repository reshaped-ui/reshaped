import React from "react";
import useRTL from "hooks/useRTL";
import flyout from "./utilities/flyout";
import { defaultStyles, resetStyles } from "./Flyout.constants";
import type * as G from "types/global";
import type * as T from "./Flyout.types";

/**
 * Typings
 */
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
	fallbackAdjustLayout?: boolean;
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
	const {
		position: defaultPosition = "bottom",
		fallbackPositions,
		width,
		container,
		fallbackAdjustLayout,
	} = options;
	const lastUsedPositionRef = React.useRef(defaultPosition);
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

	const handlePosition = React.useCallback((position: T.Position) => {
		lastUsedPositionRef.current = position;
	}, []);

	const updatePosition = React.useCallback(
		(options?: { sync?: boolean; fallback?: boolean }) => {
			if (!flyoutElRef.current) return;

			const changePositon = options?.fallback !== false;
			const nextFlyoutData = flyout({
				triggerEl: triggerElRef.current,
				flyoutEl: flyoutElRef.current,
				triggerBounds,
				width,
				position: changePositon ? defaultPosition : lastUsedPositionRef.current,
				fallbackPositions: changePositon ? cachedFallbackPositions : [],
				fallbackAdjustLayout,
				lastUsedPosition: lastUsedPositionRef.current,
				onPositionChoose: handlePosition,
				rtl: isRTL,
				container,
				contentGap,
				contentShift,
			});

			if (nextFlyoutData) {
				dispatch({
					type: "position",
					payload: { ...nextFlyoutData, sync: options?.sync },
				});
			}
		},
		[
			container,
			defaultPosition,
			cachedFallbackPositions,
			fallbackAdjustLayout,
			isRTL,
			flyoutElRef,
			triggerElRef,
			triggerBounds,
			width,
			contentGap,
			contentShift,
			handlePosition,
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
