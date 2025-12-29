import { Flyout } from "@reshaped/utilities";
import React, { useEffect } from "react";

import type * as T from "./Flyout.types";
import type * as G from "types/global";

type UseFlyout = (
	args: Pick<
		T.Props,
		| "width"
		| "position"
		| "defaultActive"
		| "fallbackAdjustLayout"
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
	updatePosition: (options?: { fallback?: boolean }) => void;
	render: () => void;
	hide: () => void;
	remove: () => void;
	show: () => void;
};

const useFlyout: UseFlyout = (args) => {
	const { triggerElRef, flyoutElRef, triggerBoundsRef, contentGap, contentShift, ...options } =
		args;
	const {
		position: defaultPosition = "bottom",
		fallbackPositions,
		fallbackAdjustLayout,
		fallbackMinHeight,
		width,
		container,
	} = options;
	const [status, setStatus] = React.useState<T.State["status"]>("idle");
	const [position, setPosition] = React.useState<T.Position>(defaultPosition);
	const flyoutRef = React.useRef<Flyout | null>(null);
	// Memo the array internally to avoid new arrays triggering useCallback
	const cachedFallbackPositions = React.useMemo(
		() => fallbackPositions,
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[fallbackPositions?.join(" ")]
	);

	const render = React.useCallback(() => {
		setStatus("rendered");
	}, []);

	const show = React.useCallback(() => {
		if (!flyoutRef.current) return;

		const result = flyoutRef.current.open();

		setPosition(result.position);
		setStatus("visible");
	}, []);

	const hide = React.useCallback(() => {
		setStatus("hidden");
	}, []);

	const remove = React.useCallback(() => {
		if (!flyoutRef.current) return;

		setStatus("idle");
		flyoutRef.current.close();
	}, []);

	const updatePosition = React.useCallback((options?: { fallback?: boolean }) => {
		if (!flyoutRef.current) return;

		const result = flyoutRef.current.update(options);
		setPosition(result.position);
	}, []);

	useEffect(() => {
		if (!flyoutElRef.current) return;

		flyoutRef.current = new Flyout({
			trigger: triggerElRef.current,
			content: flyoutElRef.current,
			container,
			triggerBounds: triggerBoundsRef.current,
			width,
			position: defaultPosition,
			fallbackPositions: cachedFallbackPositions,
			fallbackAdjustLayout,
			fallbackMinHeight,
			onClose: hide,
			contentGap,
			contentShift,
		});
	}, [
		cachedFallbackPositions,
		container,
		contentGap,
		contentShift,
		defaultPosition,
		fallbackAdjustLayout,
		fallbackMinHeight,
		triggerBoundsRef,
		triggerElRef,
		width,
		flyoutElRef,
		hide,
	]);

	return React.useMemo(
		() => ({
			position,
			status,
			updatePosition,
			render,
			hide,
			remove,
			show,
		}),
		[render, updatePosition, hide, remove, show, position, status]
	);
};

export default useFlyout;
