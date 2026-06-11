"use client";

import React from "react";
import { classNames } from "@reshaped/utilities";

import { GlobalColorMode, PrivateTheme } from "@/components/Theme";
import { useGlobalColorMode } from "@/components/Theme/useTheme";
import { ToastProvider } from "@/components/Toast";
import { SingletonHotkeysProvider } from "@/hooks/_internal/useSingletonHotkeys";
import { SingletonKeyboardModeProvider } from "@/hooks/_internal/useSingletonKeyboardMode";
import { SingletonRTLProvider } from "@/hooks/_internal/useSingletonRTL";
import { SingletonViewportProvider } from "@/hooks/_internal/useSingletonViewport";
import type * as T from "./Reshaped.types";
import "./Reshaped.css";
import s from "./Reshaped.module.css";

const Reshaped: React.FC<T.Props> = (props) => {
	const {
		theme,
		defaultTheme = "slate",
		colorMode,
		defaultColorMode,
		defaultViewport,
		defaultRTL,
		scoped,
		className,
	} = props;
	const rootClassNames = classNames(s.root, className);
	const scopeRef = React.useRef<HTMLDivElement>(null);
	const parentGlobalColorMode = useGlobalColorMode();

	return (
		<SingletonRTLProvider defaultRTL={defaultRTL}>
			<SingletonKeyboardModeProvider>
				<SingletonHotkeysProvider>
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
								<ToastProvider>{props.children}</ToastProvider>
							</SingletonViewportProvider>
						</PrivateTheme>
					</GlobalColorMode>
				</SingletonHotkeysProvider>
			</SingletonKeyboardModeProvider>
		</SingletonRTLProvider>
	);
};

Reshaped.displayName = "Reshaped";

export default Reshaped;
