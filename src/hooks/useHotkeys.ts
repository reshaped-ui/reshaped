"use client";

import React from "react";

import useSingletonHotkey, { type Hotkeys } from "./_private/useSingletonHotkeys";

const useHotkeys = <Element extends HTMLElement>(
	hotkeys: Hotkeys,
	deps: unknown[] = [],
	options?: { ref?: React.RefObject<Element | null>; disabled?: boolean; preventDefault?: boolean }
) => {
	const { addHotkeys, isPressed } = useSingletonHotkey();
	const generatedRef = React.useRef<Element>(null);
	const elementRef = options?.ref || generatedRef;

	React.useEffect(() => {
		if (options?.disabled) return;

		const remove = addHotkeys(hotkeys, elementRef, {
			preventDefault: options?.preventDefault,
		});

		return () => remove?.();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		addHotkeys,
		// eslint-disable-next-line react-hooks/exhaustive-deps
		Object.keys(hotkeys).join(","),
		options?.disabled,
		options?.preventDefault,
		// eslint-disable-next-line react-hooks/exhaustive-deps
		...deps,
	]);

	return { ref: elementRef, checkHotkeyState: isPressed };
};

export default useHotkeys;
