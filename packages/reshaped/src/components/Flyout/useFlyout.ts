import React from "react";

import useRTL from "hooks/useRTL";

import flyout from "./utilities/flyout";

import type * as T from "./Flyout.types";
import type * as G from "types/global";

/**
 * Typings
 */
type FlyoutRenderAction = { type: "render"; payload?: never };
type FlyoutPositionAction = {
	type: "position";
	payload: Pick<T.State, "position"> & { sync?: boolean };
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
	args: Pick<
		T.Props,
		| "width"
		| "position"
		| "defaultActive"
		| "fallbackAdjustLayout"
		| "fallbackMinWidth"
		| "fallbackMinHeight"
		| "contentGap"
		| "contentShift"
	> & {
		fallbackPositions?: T.Position[];
		container?: HTMLElement | null;
		triggerElRef: React.RefObject<HTMLElement | null>;
		flyoutElRef: React.RefObject<HTMLElement | null>;
		triggerBoundsRef: React.RefObject<DOMRect | G.Coordinates | null>;
	}
) => Pick<T.State, "position" | "status"> & {
	updatePosition: (options?: { sync?: boolean }) => void;
	render: () => void;
	hide: () => void;
	remove: () => void;
	show: () => void;
};

const flyoutReducer = (state: T.State, action: FlyoutAction): T.State => {
	switch (action.type) {
		case "render":
			// Disable events before it's positioned to avoid mouseleave getting triggered
			return { ...state, status: "rendered" };
		case "position":
			return {
				...state,
				status: action.payload.sync ? state.status : "positioned",
				position: action.payload.position,
			};
		case "show":
			// Checking because we're positioning inside nextAnimationFrame
			if (state.status !== "positioned") return state;
			return { ...state, status: "visible" };
		case "hide":
			return { ...state, status: "hidden" };
		case "remove":
			return { ...state, status: "idle" };

		default:
			throw new Error("[Reshaped] Invalid flyout reducer type");
	}
};

const useFlyout: UseFlyout = (args) => {
	const { triggerElRef, flyoutElRef, triggerBoundsRef, contentGap, contentShift, ...options } =
		args;
	const {
		position: defaultPosition = "bottom",
		fallbackPositions,
		fallbackAdjustLayout,
		fallbackMinWidth,
		fallbackMinHeight,
		width,
		container,
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
				triggerBounds: triggerBoundsRef.current,
				width,
				position: changePositon ? defaultPosition : lastUsedPositionRef.current,
				fallbackPositions: changePositon ? cachedFallbackPositions : [],
				fallbackAdjustLayout,
				fallbackMinWidth,
				fallbackMinHeight,
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
			triggerBoundsRef,
			width,
			contentGap,
			contentShift,
			handlePosition,
			fallbackMinWidth,
			fallbackMinHeight,
		]
	);

	React.useEffect(() => {
		if (state.status === "rendered") updatePosition();
	}, [state.status, updatePosition]);

	return React.useMemo(
		() => ({
			position: state.position,
			status: state.status,
			updatePosition,
			render,
			hide,
			remove,
			show,
		}),
		[render, updatePosition, hide, remove, show, state.position, state.status]
	);
};

export default useFlyout;
