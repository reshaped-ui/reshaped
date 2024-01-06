"use client";

import { classNames } from "utilities/helpers";
import Theme, { GlobalColorMode } from "components/Theme";
import { ToastProvider } from "components/Toast";
import useSingletonKeyboardMode from "hooks/_private/useSingletonKeyboardMode";
import {
	SingletonEnvironmentContext,
	useSingletonRTL,
} from "hooks/_private/useSingletonEnvironment";
import { SingletonHotkeysProvider } from "hooks/_private/useSingletonHotkeys";
import type * as T from "./Reshaped.types";
import "./Reshaped.css";
import s from "./Reshaped.module.css";

const ReshapedInner = (props: T.Props) => {
	const { children, defaultRTL, defaultViewport = "s", toastOptions } = props;
	const rtlState = useSingletonRTL(defaultRTL);

	useSingletonKeyboardMode();

	return (
		<SingletonEnvironmentContext.Provider value={{ rtl: rtlState, defaultViewport }}>
			<SingletonHotkeysProvider>
				<ToastProvider options={toastOptions}>{children}</ToastProvider>
			</SingletonHotkeysProvider>
		</SingletonEnvironmentContext.Provider>
	);
};

const Reshaped = (props: T.Props) => {
	const { theme, defaultTheme = "reshaped", defaultColorMode, className } = props;
	const rootClassNames = classNames(s.root, className);

	return (
		<GlobalColorMode defaultMode={defaultColorMode}>
			<Theme name={theme} defaultName={defaultTheme} className={rootClassNames}>
				<ReshapedInner {...props}>{props.children}</ReshapedInner>
			</Theme>
		</GlobalColorMode>
	);
};

export default Reshaped;
