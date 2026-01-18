"use client";

import { useMemo } from "react";

import useViewport from "hooks/useViewport";

import type * as G from "types/global";

const useResponsiveClientValue = <T>(value: G.Responsive<T>): T | undefined => {
	const viewport = useViewport();

	return useMemo(() => {
		if (typeof value !== "object" || value === null || !("s" in value)) {
			return value as T;
		}

		if (viewport === "xl") return value.xl ?? value.l ?? value.m ?? value.s;
		if (viewport === "l") return value.l ?? value.m ?? value.s;
		if (viewport === "m") return value.m ?? value.s;
		return value.s;
	}, [viewport, value]);
};

export default useResponsiveClientValue;
