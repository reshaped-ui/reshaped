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
	circular?: boolean;
};

const useKeyboardArrowNavigation = (props: Props) => {
	const { ref, disabled, orientation, circular } = props;
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

			const initialEl = focusableElements.find((el) => el.getAttribute("tabindex") !== "-1");
			const activeEl = el ?? initialEl ?? focusableElements[0];

			focusableElements.forEach((el) => el.setAttribute("tabindex", "-1"));
			activeEl?.setAttribute("tabindex", "0");
		},
		[]
	);

	useEffect(() => {
		if (!ref.current) return;
		if (disabled) return;

		const focusableElements = getFocusableElements(ref.current);

		updateTabIndex({ focusableElements });
	}, [ref, updateTabIndex, disabled]);

	useHotkeys<HTMLElement>(
		{
			[backHotkeys.join(", ")]: () => {
				if (!ref.current) return;
				const data = focusPreviousElement(ref.current, { circular });
				updateTabIndex(data);
			},
			[forwardHotkeys.join(", ")]: () => {
				if (!ref.current) return;
				const data = focusNextElement(ref.current, { circular });
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
		[updateTabIndex, circular],
		{
			ref,
			preventDefault: true,
			disabled,
		}
	);
};

export default useKeyboardArrowNavigation;
