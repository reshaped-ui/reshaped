"use client";

import React from "react";

import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";
import useRTL from "hooks/useRTL";
import { rafThrottle } from "utilities/helpers";

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
		if (!isScrollable) setFadeSide(null);

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

		// Use RaF when scroll to have scrollWidth calculated correctly on the first effect
		// For example: And edge case inside the complex flexbox layout
		requestAnimationFrame(() => updateFade());

		window.addEventListener("resize", debouncedUpdate);
		elScrollable.addEventListener("scroll", debouncedUpdate);

		return () => {
			window.removeEventListener("resize", debouncedUpdate);
			elScrollable.removeEventListener("scroll", debouncedUpdate);
		};
	}, [rtl, disabled]);

	return fadeSide;
};

export default useFadeSide;
