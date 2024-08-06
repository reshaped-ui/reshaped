import useHandlerRef from "hooks/useHandlerRef";
import React from "react";

const useOnClickOutside = (
	refs: React.RefObject<HTMLElement>[],
	handler: (event: Event) => void
) => {
	const handlerRef = useHandlerRef(handler);

	React.useEffect(() => {
		if (!handlerRef.current) return;

		const handleClick = (event: Event) => {
			let isInside = false;

			refs.forEach((elRef) => {
				if (
					!elRef.current ||
					elRef.current === event.target ||
					elRef.current.contains(event.target as HTMLElement)
				) {
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
