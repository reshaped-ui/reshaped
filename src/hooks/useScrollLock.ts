"use client";

import React from "react";

const getScrollbarWidth = (() => {
	let scrollbarWidth: number;

	return () => {
		if (scrollbarWidth) return scrollbarWidth;

		const scrollDiv = document.createElement("div");
		scrollDiv.style.position = "absolute";
		scrollDiv.style.top = "-9999px";
		scrollDiv.style.width = "50px";
		scrollDiv.style.height = "50px";
		scrollDiv.style.overflow = "scroll";
		document.body.appendChild(scrollDiv);
		scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
		document.body.removeChild(scrollDiv);

		return scrollbarWidth;
	};
})();

const useScrollLock = () => {
	const [locked, setLocked] = React.useState(false);
	const overflowStyleRef = React.useRef<string | undefined>();
	const isOverflowingRef = React.useRef(false);

	const lockScroll = React.useCallback(() => {
		const { body } = document;
		const rect = body.getBoundingClientRect();

		isOverflowingRef.current = rect.left + rect.right < window.innerWidth;
		overflowStyleRef.current = body.style.overflow;
		body.style.overflow = "hidden";

		if (isOverflowingRef.current) {
			const scrollBarWidth = getScrollbarWidth();
			document.body.style.paddingRight = `${scrollBarWidth}px`;
		}

		setLocked(true);
	}, [setLocked, isOverflowingRef, overflowStyleRef]);

	const unlockScroll = React.useCallback(() => {
		document.body.style.overflow = overflowStyleRef.current || "";
		if (isOverflowingRef.current) document.body.style.paddingRight = "";

		setLocked(false);
	}, [setLocked, isOverflowingRef, overflowStyleRef]);

	return { scrollLocked: locked, lockScroll, unlockScroll };
};

export default useScrollLock;
