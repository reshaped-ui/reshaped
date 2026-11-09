"use client";

import React from "react";
import { rafThrottle } from "@reshaped/utilities/internal";

import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import useRTL from "@/hooks/useRTL";

const useFadeSide = (
	scrollableRef: React.RefObject<HTMLElement | null>,
	options: { disabled?: boolean } = {}
) => {
	const { disabled } = options;
	const [rtl] = useRTL();
	const [fadeSide, setFadeSide] = React.useState<"start" | "end" | "both" | null>(null);

	const updateFade = React.useCallback(() => {
		const elScrollable = scrollableRef.current;
		if (!elScrollable) return;

		const isScrollable = elScrollable.clientWidth < elScrollable.scrollWidth;
		if (!isScrollable) {
			setFadeSide(null);
			return;
		}

		// scrollLeft in RTL starts from 1 instead of 0, so we compare values using this delta
		const scrollLeft = elScrollable.scrollLeft * (rtl ? -1 : 1);
		const cutOffStart = scrollLeft > 1;
		const cutOffEnd = scrollLeft + elScrollable.clientWidth < elScrollable.scrollWidth - 1;

		if (cutOffEnd && cutOffStart) return setFadeSide("both");
		if (cutOffStart) return setFadeSide("start");
		if (cutOffEnd) return setFadeSide("end");
	}, [rtl, scrollableRef]);

	useIsomorphicLayoutEffect(() => {
		const elScrollable = scrollableRef.current;

		if (!elScrollable) return;
		if (disabled) return;

		const debouncedUpdate = rafThrottle(updateFade);

		// Observe both sides of the clientWidth / scrollWidth comparison:
		// - the scrollable element catches its available width changing (container resize, siblings appearing or growing)
		// - the list element catches the content width changing (labels changing, badges appearing, fonts loading)
		// ResizeObserver also reports the initial size once observation starts, so no separate initial measurement is needed
		const resizeObserver = new ResizeObserver(debouncedUpdate);
		resizeObserver.observe(elScrollable);
		if (elScrollable.firstElementChild) resizeObserver.observe(elScrollable.firstElementChild);

		elScrollable.addEventListener("scroll", debouncedUpdate);

		return () => {
			resizeObserver.disconnect();
			elScrollable.removeEventListener("scroll", debouncedUpdate);
		};
	}, [rtl, disabled]);

	return fadeSide;
};

export default useFadeSide;
