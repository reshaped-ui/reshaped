"use client";

import React from "react";

import { SingletonKeyboardModeContext } from "hooks/_private/useSingletonKeyboardMode";

const useKeyboardMode = () => {
	const singletonKeyboardMode = React.useContext(SingletonKeyboardModeContext);

	return React.useMemo(
		() => ({
			enable: singletonKeyboardMode.enable,
			disable: singletonKeyboardMode.disable,
			activate: singletonKeyboardMode.activate,
			deactivate: singletonKeyboardMode.deactivate,
		}),
		[singletonKeyboardMode]
	);
};

export default useKeyboardMode;
