import { useHandlerRef } from "@reshaped/headless";
import React from "react";

import * as keys from "constants/keys";

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

	React.useEffect(() => {
		/**
		 * Not checking for disabled here since some components can enable the hook
		 * after it was clicked
		 */

		const handleMouseDown = (event: MouseEvent | TouchEvent | KeyboardEvent) => {
			isMouseDownInsideRef.current = false;

			const clickedEl = event.composedPath()[0] as HTMLElement;

			refs.forEach((elRef) => {
				if (!elRef.current) return;
				if (elRef.current === clickedEl || elRef.current.contains(clickedEl as HTMLElement)) {
					isMouseDownInsideRef.current = true;
				}
			});
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [...refs]);

	React.useEffect(() => {
		if (!handlerRef.current) return;
		if (disabled) return;

		const handleClick = (event: MouseEvent | TouchEvent) => {
			if ("button" in event && event.button === 2) return;
			if (isMouseDownInsideRef.current) return;
			handlerRef.current?.(event);
		};

		document.addEventListener("click", handleClick);
		return () => {
			document.removeEventListener("click", handleClick);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [handlerRef, disabled, ...refs]);
};

export default useOnClickOutside;
