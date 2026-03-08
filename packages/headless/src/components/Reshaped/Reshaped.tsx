"use client";

import React from "react";

import { SingletonHotkeysProvider } from "@/hooks/_internal/useSingletonHotkeys";
import { SingletonKeyboardModeProvider } from "@/hooks/_internal/useSingletonKeyboardMode";
import { SingletonRTLProvider } from "@/hooks/_internal/useSingletonRTL";

import type * as T from "./Reshaped.types";

const Reshaped: React.FC<T.Props> = (props) => {
	const { children, defaultRTL } = props;

	return (
		<SingletonRTLProvider defaultRTL={defaultRTL}>
			<SingletonKeyboardModeProvider>
				<SingletonHotkeysProvider>{children}</SingletonHotkeysProvider>
			</SingletonKeyboardModeProvider>
		</SingletonRTLProvider>
	);
};

Reshaped.displayName = "Headless.ReshapedProvider";

export default Reshaped;
