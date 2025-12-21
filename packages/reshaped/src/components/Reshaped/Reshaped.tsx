"use client";

import React from "react";

import { GlobalColorMode, PrivateTheme } from "components/Theme";
import { useGlobalColorMode } from "components/Theme/useTheme";
import { ToastProvider } from "components/Toast";
import {
	SingletonEnvironmentContext,
	useSingletonEnvironment,
} from "hooks/_private/useSingletonEnvironment";
import { SingletonHotkeysProvider } from "hooks/_private/useSingletonHotkeys";
import { SingletonKeyboardModeProvider } from "hooks/_private/useSingletonKeyboardMode";
import { classNames } from "utilities/props";

import s from "./Reshaped.module.css";

import type * as T from "./Reshaped.types";

import "./Reshaped.css";

const ReshapedInner: React.FC<T.Props> = (props) => {
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

const Reshaped: React.FC<T.Props> = (props) => {
	const {
		theme,
		defaultTheme = "reshaped",
		colorMode,
		defaultColorMode,
		scoped,
		className,
	} = props;
	const rootClassNames = classNames(s.root, className);
	const scopeRef = React.useRef<HTMLDivElement>(null);
	const parentGlobalColorMode = useGlobalColorMode();

	return (
		<GlobalColorMode
			defaultMode={defaultColorMode || parentGlobalColorMode.mode || "light"}
			mode={colorMode}
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

Reshaped.displayName = "Reshaped";

export default Reshaped;
