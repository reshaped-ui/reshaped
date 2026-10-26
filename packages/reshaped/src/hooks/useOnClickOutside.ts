import React from "react";
import { keys } from "@reshaped/utilities";

import useHandlerRef from "./useHandlerRef";

/**
 * Shared across all hook instances so disabled hooks don't need their own listeners.
 * Some components enable the hook between mousedown and click (e.g. Flyout with focus trigger opening on mousedown),
 * so they read the element of the last mousedown when they get enabled
 */
let lastMouseDownEl: HTMLElement | undefined;
let isTrackingMouseDown = false;

const trackMouseDown = () => {
	if (isTrackingMouseDown) return;
	isTrackingMouseDown = true;

	const handleMouseDown = (event: Event) => {
		lastMouseDownEl = event.composedPath()[0] as HTMLElement | undefined;
	};

	document.addEventListener("mousedown", handleMouseDown, { passive: true, capture: true });
	document.addEventListener("touchstart", handleMouseDown, { passive: true, capture: true });
	document.addEventListener(
		"keydown",
		(event) => {
			if (![keys.ENTER, keys.SPACE].includes(event.key)) return;
			handleMouseDown(event);
		},
		{ passive: true, capture: true }
	);
};

const useOnClickOutside = (
	refs: React.RefObject<HTMLElement | null>[],
	handler: (event: Event) => void,
	options?: { disabled?: boolean }
) => {
	const { disabled } = options || {};
	const handlerRef = useHandlerRef(handler);
	/**
	 * We're checking the element position in the DOM on mousedown to make sure
	 * it happens before any other click events that could potentially remove the clicked el
	 * before we checked if it's inside the refs
	 */
	const isMouseDownInsideRef = React.useRef(false);

	const checkElInsideRefs = (eventEl?: HTMLElement) => {
		if (!eventEl) return false;

		return refs.some(
			(elRef) => !!elRef.current && (elRef.current === eventEl || elRef.current.contains(eventEl))
		);
	};

	const checkEventInsideRefs = (event: Event) =>
		checkElInsideRefs(event.composedPath()[0] as HTMLElement | undefined);

	React.useEffect(() => {
		trackMouseDown();
	}, []);

	React.useEffect(() => {
		if (disabled) return;

		/**
		 * Some components can enable the hook after it was clicked,
		 * so the mousedown that happened before is checked here
		 */
		isMouseDownInsideRef.current = checkElInsideRefs(lastMouseDownEl);

		const handleMouseDown = (event: MouseEvent | TouchEvent | KeyboardEvent) => {
			isMouseDownInsideRef.current = checkEventInsideRefs(event);
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (![keys.ENTER, keys.SPACE].includes(event.key)) return;
			handleMouseDown(event);
		};

		document.addEventListener("mousedown", handleMouseDown, { passive: true });
		document.addEventListener("touchstart", handleMouseDown, { passive: true });
		document.addEventListener("keydown", handleKeyDown, { passive: true });

		return () => {
			document.removeEventListener("mousedown", handleMouseDown);
			document.removeEventListener("touchstart", handleMouseDown);
			document.removeEventListener("keydown", handleKeyDown);
		};
		// oxlint-disable-next-line react-hooks/exhaustive-deps
	}, [disabled, ...refs]);

	React.useEffect(() => {
		if (!handlerRef.current) return;
		if (disabled) return;

		const handleClick = (event: MouseEvent | TouchEvent) => {
			if (isMouseDownInsideRef.current) return;
			handlerRef.current?.(event);
		};

		/**
		 * Capture phase closes the content before another context menu opens on the same event,
		 * while the content opened by this event subscribes too late to get closed by it.
		 * Target is checked directly since the context menu key doesn't trigger mousedown
		 */
		const handleContextMenu = (event: MouseEvent) => {
			if (checkEventInsideRefs(event)) return;
			handlerRef.current?.(event);
		};

		document.addEventListener("click", handleClick);
		document.addEventListener("contextmenu", handleContextMenu, { capture: true });
		return () => {
			document.removeEventListener("click", handleClick);
			document.removeEventListener("contextmenu", handleContextMenu, { capture: true });
		};
		// oxlint-disable-next-line react-hooks/exhaustive-deps
	}, [handlerRef, disabled, ...refs]);
};

export default useOnClickOutside;
