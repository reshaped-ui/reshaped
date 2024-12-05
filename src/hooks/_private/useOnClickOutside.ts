import useHandlerRef from "hooks/useHandlerRef";
import React from "react";

const useOnClickOutside = (
	refs: React.RefObject<HTMLElement>[],
	handler: (event: Event) => void
) => {
	const handlerRef = useHandlerRef(handler);

	React.useEffect(() => {
		if (!handlerRef.current) return;

		const handleClick = (event: MouseEvent | TouchEvent) => {
			if (event instanceof MouseEvent && event.button === 2) {
				return;
			}

			let isInside = false;
			const clickedEl = event.composedPath()[0];

			refs.forEach((elRef) => {
				if (!elRef.current) return;
				if (elRef.current === clickedEl || elRef.current.contains(clickedEl as HTMLElement)) {
					isInside = true;
				}
			});

			if (isInside) return;
			handlerRef.current?.(event);
		};

		// Using events that happen before click to handle cases when element is hidden on click
		document.addEventListener("mousedown", handleClick);
		document.addEventListener("touchstart", handleClick);

		return () => {
			document.removeEventListener("mousedown", handleClick);
			document.removeEventListener("touchstart", handleClick);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [handlerRef, ...refs]);
};

export default useOnClickOutside;
