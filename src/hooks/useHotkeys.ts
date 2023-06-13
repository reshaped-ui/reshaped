"use client";

import React from "react";
import useSingletonHotkey from "./_private/useSingletonHotkeys";

const useHotkeys = <Element extends HTMLElement>(
	hotkeys: Record<string, ((e: KeyboardEvent) => void) | null>,
	deps: unknown[] = [],
	options?: { ref?: React.RefObject<Element> }
) => {
	const { addHotkeys, isPressed } = useSingletonHotkey();
	const generatedRef = React.useRef<Element | null>(null);
	const elementRef = options?.ref || generatedRef;

	React.useEffect(() => {
		const remove = addHotkeys(hotkeys, elementRef);

		return () => remove?.();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [addHotkeys, Object.keys(hotkeys).join(","), ...deps]);

	return { ref: elementRef, checkHotkeyState: isPressed };
};

export default useHotkeys;
