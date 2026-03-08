"use client";

import { classNames, Reshaped as HeadlessReshaped } from "@reshaped/headless";
import React from "react";

import { GlobalColorMode, PrivateTheme } from "@/components/Theme";
import { useGlobalColorMode } from "@/components/Theme/useTheme";
import { ToastProvider } from "@/components/Toast";
import { SingletonViewportProvider } from "@/hooks/_private/useSingletonViewport";

import "./Reshaped.css";
import s from "./Reshaped.module.css";

import type * as T from "./Reshaped.types";

const Reshaped: React.FC<T.Props> = (props) => {
	const {
		theme,
		defaultTheme = "reshaped",
		colorMode,
		defaultColorMode,
		defaultViewport,
		defaultRTL,
		toastOptions,
		scoped,
		className,
	} = props;
	const rootClassNames = classNames(s.root, className);
	const scopeRef = React.useRef<HTMLDivElement>(null);
	const parentGlobalColorMode = useGlobalColorMode();

	return (
		<HeadlessReshaped defaultRTL={defaultRTL}>
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
					<SingletonViewportProvider defaultViewport={defaultViewport}>
						<ToastProvider options={toastOptions}>{props.children}</ToastProvider>
					</SingletonViewportProvider>
				</PrivateTheme>
			</GlobalColorMode>
		</HeadlessReshaped>
	);
};

Reshaped.displayName = "Reshaped";

export default Reshaped;
