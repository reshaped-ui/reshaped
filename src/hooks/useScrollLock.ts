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

const useScrollLock = (args?: { ref?: React.RefObject<HTMLElement | ShadowRoot> }) => {
	const { ref } = args || {};
	const [locked, setLocked] = React.useState(false);
	const overflowStyleRef = React.useRef<string | undefined>();
	const isOverflowingRef = React.useRef(false);

	let targetEl = document.body;
	if (ref?.current) {
		targetEl =
			ref?.current instanceof ShadowRoot ? (ref?.current?.host as HTMLElement) : ref.current;
	}

	const lockScroll = React.useCallback(() => {
		const rect = targetEl.getBoundingClientRect();

		isOverflowingRef.current = rect.left + rect.right < window.innerWidth;
		overflowStyleRef.current = targetEl.style.overflow;
		targetEl.style.overflow = "hidden";

		if (isOverflowingRef.current) {
			const scrollBarWidth = getScrollbarWidth();
			targetEl.style.paddingRight = `${scrollBarWidth}px`;
		}

		setLocked(true);
	}, [setLocked, isOverflowingRef, overflowStyleRef, targetEl]);

	const unlockScroll = React.useCallback(() => {
		targetEl.style.overflow = overflowStyleRef.current || "";
		if (isOverflowingRef.current) targetEl.style.paddingRight = "";

		setLocked(false);
	}, [setLocked, isOverflowingRef, overflowStyleRef, targetEl]);

	return { scrollLocked: locked, lockScroll, unlockScroll };
};

export default useScrollLock;
