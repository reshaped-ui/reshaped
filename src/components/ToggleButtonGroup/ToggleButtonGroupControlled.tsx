"use client";

import Button from "components/Button";
import useHotkeys from "hooks/useHotkeys";
import type * as T from "./ToggleButtonGroup.types";
import Context from "./ToggleButtonGroup.context";
import {
	focusFirstElement,
	focusLastElement,
	focusNextElement,
	focusPreviousElement,
} from "utilities/a11y";

const ToggleButtonGroupControlled: React.FC<T.ControlledProps> = (props) => {
	const { onChange, value, children, selectionMode = "single" } = props;

	const handleChange: T.Context["onChange"] = (args) => {
		const { event, value: itemValue, checked } = args;
		if (!itemValue) return;

		let nextValue = selectionMode === "single" ? [itemValue] : [...value];

		if (selectionMode === "multiple") {
			if (checked) {
				nextValue.push(itemValue);
			} else {
				nextValue = nextValue.filter((v) => v !== itemValue);
			}
		}

		if (onChange) onChange({ value: nextValue, event });
	};

	const { ref: hotkeysRef } = useHotkeys<HTMLDivElement>(
		{
			"ArrowLeft, ArrowUp": () => {
				focusPreviousElement(hotkeysRef.current!);
			},
			"ArrowRight, ArrowDown": () => {
				focusNextElement(hotkeysRef.current!);
			},
			Home: () => {
				focusFirstElement(hotkeysRef.current!);
			},
			End: () => {
				focusLastElement(hotkeysRef.current!);
			},
		},
		[],
		{
			preventDefault: true,
		}
	);

	return (
		<Context.Provider value={{ onChange: handleChange, value }}>
			<Button.Group attributes={{ ref: hotkeysRef }}>{children}</Button.Group>
		</Context.Provider>
	);
};

ToggleButtonGroupControlled.displayName = "ToggleButtonGroupControlled";

export default ToggleButtonGroupControlled;
