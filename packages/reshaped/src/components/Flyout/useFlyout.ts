import { Flyout } from "@reshaped/utilities";
import { useCallback, useMemo, useRef, useState } from "react";

import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";

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
		triggerCoordinatesRef: React.RefObject<DOMRect | G.Coordinates | null>;
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
		triggerCoordinatesRef,
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

	const getFlyoutOptions = useCallback(() => {
		if (!flyoutElRef.current) return;

		const baseUnit = getComputedStyle(flyoutElRef.current).getPropertyValue("--rs-unit-x1");
		const unitModifier = baseUnit ? parseInt(baseUnit) : 4;

		const handleClose = () => {
			onClose?.({});
			hide();
		};

		return {
			trigger: triggerElRef.current,
			content: flyoutElRef.current,
			container,
			triggerCoordinates: triggerCoordinatesRef.current,
			width,
			position: defaultPosition,
			fallbackPositions: cachedFallbackPositions,
			fallbackAdjustLayout,
			fallbackMinHeight,
			contentGap: (contentGap ?? 0) * unitModifier,
			contentShift: (contentShift ?? 0) * unitModifier,
			onDeactivate: handleClose,
		};
	}, [
		cachedFallbackPositions,
		container,
		contentGap,
		contentShift,
		defaultPosition,
		fallbackAdjustLayout,
		fallbackMinHeight,
		triggerCoordinatesRef,
		triggerElRef,
		width,
		hide,
		onClose,
		flyoutElRef,
	]);

	const show = useCallback(() => {
		const flyoutOptions = getFlyoutOptions();

		if (!flyoutOptions) return;
		flyoutRef.current = new Flyout(flyoutOptions);

		const result = flyoutRef.current.activate();

		setPosition(result.position);
		setStatus("visible");
	}, [getFlyoutOptions]);

	const remove = useCallback(() => {
		if (!flyoutRef.current) return;

		flyoutRef.current.deactivate();
		setStatus("idle");
	}, []);

	const updatePosition = useCallback(() => {
		const flyoutOptions = getFlyoutOptions();

		if (!flyoutRef.current) return;
		if (!flyoutOptions) return;

		const result = flyoutRef.current.update(flyoutOptions);
		setPosition(result.position);
	}, [getFlyoutOptions]);

	useIsomorphicLayoutEffect(() => {
		updatePosition();
	}, [defaultPosition]);

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
