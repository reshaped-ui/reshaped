"use client";

import React from "react";
import {
	getVirtualKeyboardHeight,
	getVirtualKeyboardOffset,
	subscribeVirtualKeyboard,
} from "@reshaped/utilities/internal";

const getServerValue = () => 0;

/**
 * Returns the height of the area the on-screen keyboard covers at the bottom of the viewport,
 * and the offset the browser has panned the visible area down by while the keyboard is open.
 * Both are 0 when the keyboard is closed and when the browser resizes the layout to fit above it
 */
const useVirtualKeyboard = () => {
	const height = React.useSyncExternalStore(
		subscribeVirtualKeyboard,
		getVirtualKeyboardHeight,
		getServerValue
	);
	const offset = React.useSyncExternalStore(
		subscribeVirtualKeyboard,
		getVirtualKeyboardOffset,
		getServerValue
	);

	return React.useMemo(() => ({ height, offset }), [height, offset]);
};

export default useVirtualKeyboard;
