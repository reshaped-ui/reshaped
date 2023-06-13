import React from "react";
import { keyboardModeAttribute } from "constants/attributes";

const useSingletonKeyboardMode = () => {
	React.useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.metaKey || e.altKey || e.ctrlKey) return;
			document.documentElement.setAttribute(keyboardModeAttribute, "true");
		};

		const handleClick = () => {
			document.documentElement.removeAttribute(keyboardModeAttribute);
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
