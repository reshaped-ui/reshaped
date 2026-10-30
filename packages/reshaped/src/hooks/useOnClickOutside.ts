import React from "react";
import { keys } from "@reshaped/utilities";

import useHandlerRef from "./useHandlerRef";

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
	 * before we checked if it's inside the refs.
	 * Null means there was no mousedown since the hook got enabled
	 */
	const isMouseDownInsideRef = React.useRef<boolean | null>(null);

	const checkEventInsideRefs = (event: Event) => {
		const eventEl = event.composedPath()[0] as HTMLElement | undefined;
		if (!eventEl) return false;

		return refs.some(
			(elRef) => !!elRef.current && (elRef.current === eventEl || elRef.current.contains(eventEl))
		);
	};

	React.useEffect(() => {
		if (disabled) return;

		/**
		 * Some components can enable the hook after the mousedown of the click,
		 * e.g. Flyout with focus trigger, so the click target is checked until the next mousedown
		 */
		isMouseDownInsideRef.current = null;

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
			if (isMouseDownInsideRef.current ?? checkEventInsideRefs(event)) return;
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
