"use client";

import { classNames } from "utilities/helpers";
import { GlobalColorMode, PrivateTheme } from "components/Theme";
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
	const { theme, defaultTheme = "reshaped", defaultColorMode, scoped, className } = props;
	const rootClassNames = classNames(s.root, className);

	return (
		<GlobalColorMode defaultMode={defaultColorMode}>
			<PrivateTheme
				name={theme}
				defaultName={defaultTheme}
				className={rootClassNames}
				scoped={scoped}
			>
				<ReshapedInner {...props}>{props.children}</ReshapedInner>
			</PrivateTheme>
		</GlobalColorMode>
	);
};

export default Reshaped;
