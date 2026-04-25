"use client";

import React from "react";

import { type Hotkeys, useSingletonHotkeys } from "./_internal/useSingletonHotkeys";

const useHotkeys = <Element extends HTMLElement>(
	hotkeys: Hotkeys,
	deps: unknown[] = [],
	options?: { ref?: React.RefObject<Element | null>; disabled?: boolean; preventDefault?: boolean }
) => {
	const { addHotkeys, isPressed } = useSingletonHotkeys();
	const generatedRef = React.useRef<Element>(null);
	const elementRef = options?.ref || generatedRef;

	React.useEffect(() => {
		if (options?.disabled) return;

		const remove = addHotkeys(hotkeys, elementRef, {
			preventDefault: options?.preventDefault,
		});

		return () => remove?.();
		// oxlint-disable-next-line react-hooks/exhaustive-deps
	}, [
		addHotkeys,
		// oxlint-disable-next-line react-hooks/exhaustive-deps
		Object.keys(hotkeys).join(","),
		options?.disabled,
		options?.preventDefault,
		// oxlint-disable-next-line react-hooks/exhaustive-deps
		...deps,
	]);

	return { ref: elementRef, checkHotkeyState: isPressed };
};

export default useHotkeys;
