"use client";

import React from "react";
import { classNames } from "utilities/helpers";
import { GlobalColorMode, PrivateTheme } from "components/Theme";
import { ToastProvider } from "components/Toast";
import { useGlobalColorMode } from "components/Theme/useTheme";
import {
	SingletonEnvironmentContext,
	useSingletonEnvironment,
} from "hooks/_private/useSingletonEnvironment";
import { SingletonKeyboardModeProvider } from "hooks/_private/useSingletonKeyboardMode";
import { SingletonHotkeysProvider } from "hooks/_private/useSingletonHotkeys";
import type * as T from "./Reshaped.types";
import "./Reshaped.css";
import s from "./Reshaped.module.css";

const ReshapedInner = (props: T.Props) => {
	const { children, defaultRTL, defaultViewport = "s", toastOptions } = props;
	const rtlState = useSingletonEnvironment(defaultRTL);

	return (
		<SingletonKeyboardModeProvider>
			<SingletonEnvironmentContext.Provider value={{ rtl: rtlState, defaultViewport }}>
				<SingletonHotkeysProvider>
					<ToastProvider options={toastOptions}>{children}</ToastProvider>
				</SingletonHotkeysProvider>
			</SingletonEnvironmentContext.Provider>
		</SingletonKeyboardModeProvider>
	);
};

const Reshaped = (props: T.Props) => {
	const { theme, defaultTheme = "reshaped", defaultColorMode, scoped, className } = props;
	const rootClassNames = classNames(s.root, className);
	const scopeRef = React.useRef<HTMLDivElement>(null);
	const parentGlobalColorMode = useGlobalColorMode();

	return (
		<GlobalColorMode
			defaultMode={defaultColorMode || parentGlobalColorMode.mode || "light"}
			scopeRef={!!parentGlobalColorMode && scoped ? scopeRef : undefined}
		>
			<PrivateTheme
				name={theme}
				defaultName={defaultTheme}
				className={rootClassNames}
				scoped={scoped}
				scopeRef={!!parentGlobalColorMode && scoped ? scopeRef : undefined}
			>
				<ReshapedInner {...props}>{props.children}</ReshapedInner>
			</PrivateTheme>
		</GlobalColorMode>
	);
};

export default Reshaped;
