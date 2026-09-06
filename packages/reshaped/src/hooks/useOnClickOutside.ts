import React from "react";
import { keys } from "@reshaped/utilities";

import useHandlerRef from "./useHandlerRef";

type Refs = React.RefObject<HTMLElement | null>[];

const checkEventInsideRefs = (refs: Refs, event: Event) => {
	const targetEl = event.composedPath()[0] as HTMLElement | undefined;
	if (!targetEl) return false;

	return refs.some((elRef) => {
		const el = elRef.current;
		return !!el && (el === targetEl || el.contains(targetEl));
	});
};

const useOnClickOutside = (
	refs: Refs,
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

	React.useEffect(() => {
		/**
		 * Not checking for disabled here since some components can enable the hook
		 * after it was clicked
		 */

		const handleMouseDown = (event: MouseEvent | TouchEvent | KeyboardEvent) => {
			isMouseDownInsideRef.current = checkEventInsideRefs(refs, event);
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
	}, [...refs]);

	React.useEffect(() => {
		if (!handlerRef.current) return;
		if (disabled) return;

		const handleClick = (event: MouseEvent | TouchEvent) => {
			// Right click doesn't trigger the click event in most browsers, it's handled with the contextmenu event
			if ("button" in event && event.button === 2) return;
			if (isMouseDownInsideRef.current) return;
			handlerRef.current?.(event);
		};

		/**
		 * Right click doesn't produce a click event, so we handle it separately.
		 * Checking the target synchronously since the contextmenu event can also be triggered
		 * with a keyboard, without a preceding mousedown event.
		 */
		const handleContextMenu = (event: MouseEvent) => {
			if (checkEventInsideRefs(refs, event)) return;
			handlerRef.current?.(event);
		};

		document.addEventListener("click", handleClick);
		/**
		 * Using the capture phase to close the currently rendered content
		 * before another component opens its own content on the same event,
		 * e.g. when right clicking between multiple context menus
		 */
		document.addEventListener("contextmenu", handleContextMenu, { capture: true });

		return () => {
			document.removeEventListener("click", handleClick);
			document.removeEventListener("contextmenu", handleContextMenu, { capture: true });
		};
		// oxlint-disable-next-line react-hooks/exhaustive-deps
	}, [handlerRef, disabled, ...refs]);
};

export default useOnClickOutside;
