"use client";

import React from "react";
import { rafThrottle } from "@reshaped/utilities/internal";

import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import useRTL from "@/hooks/useRTL";

const useFadeSide = (
	scrollableRef: React.RefObject<HTMLElement | null>,
	options: { contentRef?: React.RefObject<HTMLElement | null>; disabled?: boolean } = {}
) => {
	const { contentRef, disabled } = options;
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

		const resizeObserver = new ResizeObserver(() => updateFade());
		resizeObserver.observe(elScrollable);
		if (contentRef?.current) resizeObserver.observe(contentRef.current);

		elScrollable.addEventListener("scroll", debouncedUpdate);

		return () => {
			resizeObserver.disconnect();
			elScrollable.removeEventListener("scroll", debouncedUpdate);
		};
	}, [rtl, disabled]);

	return fadeSide;
};

export default useFadeSide;
