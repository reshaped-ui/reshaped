import React from "react";

import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";

import type * as G from "types/global";

type Context = { rtl: [boolean, (state: boolean) => void]; defaultViewport: G.Viewport };

export const SingletonEnvironmentContext = React.createContext<Context>({
	rtl: [false, () => {}],
	defaultViewport: "s",
});

export const useSingletonEnvironment = (defaultRTL?: boolean) => {
	const state = React.useState(defaultRTL || false);
	const [isRTL, setRTL] = state;

	/**
	 * Handle changing dir attribute directly
	 */
	useIsomorphicLayoutEffect(() => {
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (mutation.attributeName !== "dir") return;

				const nextRTL = (mutation.target as HTMLElement).dir === "rtl";
				if (isRTL !== nextRTL) setRTL(nextRTL);
			});
		});

		observer.observe(document.documentElement, { attributes: true });
		return () => observer.disconnect();
	}, [isRTL]);

	/**
	 * Handle setRTL usage
	 */
	useIsomorphicLayoutEffect(() => {
		document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
	}, [isRTL]);

	return state;
};
