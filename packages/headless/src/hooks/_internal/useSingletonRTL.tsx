"use client";

import { isRTL } from "@reshaped/utilities";
import React from "react";

import useIsomorphicLayoutEffect from "../useIsomorphicLayoutEffect";

type Context = {
	rtl: [boolean, (state: boolean) => void];
};

const SingletonRTLContext = React.createContext<Context>({
	rtl: [false, () => {}],
});

export const useSingletonRTL = (defaultRTL?: boolean) => {
	const state = React.useState(defaultRTL || false);
	const [rtl, setRTL] = state;

	/**
	 * Handle changing dir attribute directly
	 */
	useIsomorphicLayoutEffect(() => {
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (mutation.attributeName !== "dir") return;

				const nextRTL = isRTL();
				if (rtl !== nextRTL) setRTL(nextRTL);
			});
		});

		observer.observe(document.documentElement, { attributes: true });
		return () => observer.disconnect();
	}, [rtl]);

	/**
	 * Handle setRTL usage
	 */
	useIsomorphicLayoutEffect(() => {
		document.documentElement.setAttribute("dir", rtl ? "rtl" : "ltr");
	}, [rtl]);

	return state;
};

export const SingletonRTLProvider: React.FC<{
	children: React.ReactNode;
	defaultRTL?: boolean;
}> = (props) => {
	const { children, defaultRTL } = props;
	const rtlState = useSingletonRTL(defaultRTL);

	return (
		<SingletonRTLContext.Provider value={{ rtl: rtlState }}>
			{children}
		</SingletonRTLContext.Provider>
	);
};
