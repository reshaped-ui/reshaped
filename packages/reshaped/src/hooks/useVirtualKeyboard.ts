"use client";

import React from "react";
import { getVirtualKeyboardHeight, subscribeVirtualKeyboard } from "@reshaped/utilities/internal";

const getServerHeight = () => 0;

/**
 * Returns the height of the area the on-screen keyboard covers at the bottom of the viewport.
 * It's 0 when the keyboard is closed and when the browser resizes the layout to fit above it
 */
const useVirtualKeyboard = () => {
	const height = React.useSyncExternalStore(
		subscribeVirtualKeyboard,
		getVirtualKeyboardHeight,
		getServerHeight
	);

	return React.useMemo(() => ({ height }), [height]);
};

export default useVirtualKeyboard;
