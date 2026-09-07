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
	 * before we checked if it's inside the refs
	 */
	const isMouseDownInsideRef = React.useRef(false);

	const checkEventInsideRefs = (event: Event) => {
		const eventEl = event.composedPath()[0] as HTMLElement | undefined;
		if (!eventEl) return false;

		return refs.some(
			(elRef) => !!elRef.current && (elRef.current === eventEl || elRef.current.contains(eventEl))
		);
	};

	React.useEffect(() => {
		/**
		 * Not checking for disabled here since some components can enable the hook
		 * after it was clicked
		 */

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
	}, [...refs]);

	React.useEffect(() => {
		if (!handlerRef.current) return;
		if (disabled) return;

		const handleClick = (event: MouseEvent | TouchEvent) => {
			if (event.type === "contextmenu") {
				/**
				 * Context menu events can be claimed by a handler that opens a menu of its own,
				 * which prevents the default browser behavior. Such events open a new flyout
				 * instead of dismissing the current one, so they're not outside clicks
				 */
				if (event.defaultPrevented) return;

				isMouseDownInsideRef.current = checkEventInsideRefs(event);
			}

			if (isMouseDownInsideRef.current) return;
			handlerRef.current?.(event);
		};

		document.addEventListener("click", handleClick);
		document.addEventListener("contextmenu", handleClick);
		return () => {
			document.removeEventListener("click", handleClick);
			document.removeEventListener("contextmenu", handleClick);
		};
		// oxlint-disable-next-line react-hooks/exhaustive-deps
	}, [handlerRef, disabled, ...refs]);
};

export default useOnClickOutside;
