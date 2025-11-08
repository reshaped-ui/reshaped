"use client";

import React from "react";

import * as keys from "constants/keys";
import { activateKeyboardMode, deactivateKeyboardMode } from "utilities/a11y";

type ContextProps = {
	disabledRef: React.RefObject<boolean> | null;
	disable: () => void;
	enable: () => void;
	activate: () => void;
	deactivate: () => void;
};

export const SingletonKeyboardModeContext = React.createContext<ContextProps>({
	disabledRef: null,
	disable: () => {},
	enable: () => {},
	activate: () => {},
	deactivate: () => {},
});

export const SingletonKeyboardModeProvider: React.FC<{ children: React.ReactNode }> = (props) => {
	const disabledRef = React.useRef(false);

	const disable = React.useCallback(() => {
		disabledRef.current = true;
	}, []);

	const enable = React.useCallback(() => {
		disabledRef.current = false;
	}, []);

	const activate = React.useCallback(() => {
		if (disabledRef.current) return;
		activateKeyboardMode();
	}, []);

	const deactivate = React.useCallback(() => {
		if (disabledRef.current) return;
		deactivateKeyboardMode();
	}, []);

	const handleKeyDown = React.useCallback(
		(e: KeyboardEvent) => {
			if (e.metaKey || e.altKey || e.ctrlKey) return;
			// Prevent focus ring from appearing when using mouse but closing with esc
			if (e.key === keys.ESC) return;
			activate();
		},
		[activate]
	);

	const handleClick = React.useCallback(() => {
		deactivate();
	}, [deactivate]);

	React.useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("mousedown", handleClick);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("mousedown", handleClick);
		};
	}, [handleClick, handleKeyDown]);

	const value = React.useMemo(
		() => ({
			disabledRef,
			disable,
			enable,
			activate,
			deactivate,
		}),
		[disable, enable, activate, deactivate]
	);

	return (
		<SingletonKeyboardModeContext.Provider value={value}>
			{props.children}
		</SingletonKeyboardModeContext.Provider>
	);
};
