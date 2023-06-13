import React from "react";

const useOnClickOutside = (
	refs: React.RefObject<HTMLElement>[],
	handler: (event: Event) => void
) => {
	React.useEffect(() => {
		if (!handler) return;

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
			handler(event);
		};

		// Using events that happen before click to handle cases when element is hidden on click
		document.addEventListener("mousedown", handleClick);
		document.addEventListener("touchstart", handleClick);

		return () => {
			document.removeEventListener("mousedown", handleClick);
			document.removeEventListener("touchstart", handleClick);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [handler, ...refs]);
};

export default useOnClickOutside;
