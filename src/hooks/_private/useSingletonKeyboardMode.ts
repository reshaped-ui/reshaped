import React from "react";
import * as keys from "constants/keys";
import { enableKeyboardMode, disableKeyboardMode } from "utilities/a11y";

const useSingletonKeyboardMode = () => {
	React.useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.metaKey || e.altKey || e.ctrlKey) return;
			// Prevent focus ring from appearing when using mouse but closing with esc
			if (e.key === keys.ESC) return;
			enableKeyboardMode();
		};

		const handleClick = () => {
			disableKeyboardMode();
		};

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("mousedown", handleClick);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("mousedown", handleClick);
		};
	}, []);
};

export default useSingletonKeyboardMode;
