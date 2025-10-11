import React, { useEffect } from "react";
import {
	focusFirstElement,
	focusLastElement,
	focusNextElement,
	focusPreviousElement,
	getFocusableElements,
} from "utilities/a11y";
import useHotkeys from "./useHotkeys";

type Props = {
	ref: React.RefObject<HTMLElement | null>;
	disabled?: boolean;
	orientation?: "vertical" | "horizontal";
};

const useKeyboardArrowNavigation = (props: Props) => {
	const { ref, disabled, orientation } = props;
	const backHotkeys = [];
	const forwardHotkeys = [];

	if (!orientation || orientation === "vertical") {
		backHotkeys.push("ArrowUp");
		forwardHotkeys.push("ArrowDown");
	}

	if (!orientation || orientation === "horizontal") {
		backHotkeys.push("ArrowLeft");
		forwardHotkeys.push("ArrowRight");
	}

	const updateTabIndex = React.useCallback(
		(options: { el?: HTMLElement; focusableElements: HTMLElement[] }) => {
			const { el, focusableElements } = options;

			const activeEl = el ?? focusableElements[0];

			focusableElements.forEach((el) => el.setAttribute("tabindex", "-1"));
			activeEl?.setAttribute("tabindex", "0");
		},
		[]
	);

	useEffect(() => {
		if (!ref.current) return;

		const focusableElements = getFocusableElements(ref.current);

		updateTabIndex({ focusableElements });
	}, [ref, updateTabIndex]);

	useHotkeys<HTMLElement>(
		{
			[backHotkeys.join(", ")]: () => {
				if (!ref.current) return;
				const data = focusPreviousElement(ref.current);
				updateTabIndex(data);
			},
			[forwardHotkeys.join(", ")]: () => {
				if (!ref.current) return;
				const data = focusNextElement(ref.current);
				updateTabIndex(data);
			},
			Home: () => {
				if (!ref.current) return;
				const data = focusFirstElement(ref.current);
				updateTabIndex(data);
			},
			End: () => {
				if (!ref.current) return;
				const data = focusLastElement(ref.current);
				updateTabIndex(data);
			},
		},
		[updateTabIndex],
		{
			ref,
			preventDefault: true,
			disabled,
		}
	);
};

export default useKeyboardArrowNavigation;
