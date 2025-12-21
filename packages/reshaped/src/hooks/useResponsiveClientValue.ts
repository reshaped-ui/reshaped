"use client";

import React from "react";

import defaultBreakpoints from "constants/breakpoints";
import { SingletonEnvironmentContext } from "hooks/_private/useSingletonEnvironment";
import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";

import type * as G from "types/global";

const useResponsiveClientValue = <T>(value: G.Responsive<T>): T | undefined => {
	const { defaultViewport } = React.useContext(SingletonEnvironmentContext);
	const [viewport, setViewport] = React.useState(defaultViewport);

	useIsomorphicLayoutEffect(() => {
		const rootThemeEl = document.querySelector("[data-rs-theme]");
		const rootStyle = rootThemeEl && window.getComputedStyle(rootThemeEl);

		/**
		 * We generate variables for the viewport breakpoints in the themes
		 * We use them here in case they're custom and fallback to the default values
		 * in case there is no SSR passing the data-rs-theme attribute
		 */
		const breakpoints = {
			m:
				(rootStyle && Number(rootStyle.getPropertyValue("--rs-viewport-m-min"))) ||
				defaultBreakpoints.m,
			l:
				(rootStyle && Number(rootStyle.getPropertyValue("--rs-viewport-l-min"))) ||
				defaultBreakpoints.l,
			xl:
				(rootStyle && Number(rootStyle.getPropertyValue("--rs-viewport-xl-min"))) ||
				defaultBreakpoints.xl,
		};

		const mediaQueries = {
			s: `(max-width: ${breakpoints.m - 1}px)`,
			m: `(min-width: ${breakpoints.m}px) and (max-width: ${breakpoints.l - 1}px)`,
			l: `(min-width: ${breakpoints.l}px) and (max-width: ${breakpoints.xl - 1}px)`,
			xl: `(min-width: ${breakpoints.xl}px)`,
		};

		const viewports = Object.keys(mediaQueries) as (keyof typeof mediaQueries)[];
		const matchers = viewports.map((viewport) => {
			const mq = window.matchMedia(mediaQueries[viewport]);
			return { mq, handler: () => mq.matches && setViewport(viewport) };
		});

		matchers.forEach(({ handler, mq }) => {
			handler();
			mq.addEventListener("change", handler);
		});

		return () => {
			matchers.forEach(({ handler, mq }) => {
				mq.removeEventListener("change", handler);
			});
		};
	}, []);

	if (typeof value !== "object" || value === null || !("s" in value)) {
		return value as T;
	}

	if (viewport === "xl") return value.xl ?? value.l ?? value.m ?? value.s;
	if (viewport === "l") return value.l ?? value.m ?? value.s;
	if (viewport === "m") return value.m ?? value.s;
	return value.s;
};

export default useResponsiveClientValue;
