import React from "react";
import { enableKeyboardMode, disableKeyboardMode } from "utilities/a11y/keyboardMode";

const useSingletonKeyboardMode = () => {
	React.useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.metaKey || e.altKey || e.ctrlKey) return;
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
