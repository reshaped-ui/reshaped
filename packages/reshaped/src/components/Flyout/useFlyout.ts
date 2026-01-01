import { Flyout } from "@reshaped/utilities";
import { useCallback, useMemo, useRef, useState } from "react";

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
		| "onClose"
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
	const {
		triggerElRef,
		flyoutElRef,
		triggerBoundsRef,
		contentGap,
		contentShift,
		onClose,
		...options
	} = args;
	const {
		position: defaultPosition = "bottom",
		fallbackPositions,
		fallbackAdjustLayout,
		fallbackMinHeight,
		width,
		container,
	} = options;
	const [status, setStatus] = useState<T.State["status"]>("idle");
	const [position, setPosition] = useState<T.Position>(defaultPosition);
	const flyoutRef = useRef<Flyout | null>(null);
	// Memo the array internally to avoid new arrays triggering useCallback
	const cachedFallbackPositions = useMemo(
		() => fallbackPositions,
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[fallbackPositions?.join(" ")]
	);

	const render = useCallback(() => {
		setStatus("rendered");
	}, []);

	const hide = useCallback(() => {
		setStatus("hidden");
	}, []);

	const show = useCallback(() => {
		if (!flyoutElRef.current) return;

		const baseUnit = getComputedStyle(flyoutElRef.current).getPropertyValue("--rs-unit-x1");
		const unitModifier = baseUnit ? parseInt(baseUnit) : 4;

		const handleClose = () => {
			onClose?.({});
			hide();
		};

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
			contentGap: (contentGap ?? 0) * unitModifier,
			contentShift: (contentShift ?? 0) * unitModifier,
			onClose: handleClose,
		});

		const result = flyoutRef.current.open();

		setPosition(result.position);
		setStatus("visible");
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
		hide,
		onClose,
		flyoutElRef,
	]);

	const remove = useCallback(() => {
		if (!flyoutRef.current) return;

		flyoutRef.current.close();
		setStatus("idle");
	}, []);

	const updatePosition = useCallback((options?: { fallback?: boolean }) => {
		if (!flyoutRef.current) return;

		const result = flyoutRef.current.update(options);
		setPosition(result.position);
	}, []);

	return useMemo(
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
