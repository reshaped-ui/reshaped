"use client";

import React from "react";

import { GlobalColorMode, PrivateTheme } from "@/components/Theme";
import { useGlobalColorMode } from "@/components/Theme/useTheme";
import { ToastProvider } from "@/components/Toast";
import { SingletonHotkeysProvider } from "@/hooks/_private/useSingletonHotkeys";
import { SingletonKeyboardModeProvider } from "@/hooks/_private/useSingletonKeyboardMode";
import { SingletonRTLProvider } from "@/hooks/_private/useSingletonRTL";
import { SingletonViewportProvider } from "@/hooks/_private/useSingletonViewport";
import { classNames } from "@/utilities/css";

import s from "./Reshaped.module.css";

import type * as T from "./Reshaped.types";

import "./Reshaped.css";

const ReshapedInner: React.FC<T.Props> = (props) => {
	const { children, defaultRTL, defaultViewport = "s", toastOptions } = props;

	return (
		<SingletonKeyboardModeProvider>
			<SingletonViewportProvider defaultViewport={defaultViewport}>
				<SingletonRTLProvider defaultRTL={defaultRTL}>
					<SingletonHotkeysProvider>
						<ToastProvider options={toastOptions}>{children}</ToastProvider>
					</SingletonHotkeysProvider>
				</SingletonRTLProvider>
			</SingletonViewportProvider>
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

export default Reshaped;
