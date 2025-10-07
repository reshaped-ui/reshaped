"use client";

import React from "react";
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
import ToggleButton, { ToggleButtonProps } from "components/ToggleButton";

const ToggleButtonGroupItem: React.FC<
	ToggleButtonProps & { focusable: boolean; onFocus: () => void }
> = (props) => {
	const { focusable, onFocus, ...buttonProps } = props;

	return (
		<ToggleButton
			{...buttonProps}
			attributes={{
				...buttonProps.attributes,
				tabIndex: focusable ? 0 : -1,
				onFocus,
			}}
		/>
	);
};

const ToggleButtonGroupControlled: React.FC<T.ControlledProps> = (props) => {
	const { onChange, value, selectionMode = "single", children, ...buttonGroupProps } = props;
	const focusableIndexRef = React.useRef(0);

	let toggleButtonIndex = 0;
	const renderedChildren = React.Children.map(children, (child) => {
		if (!React.isValidElement(child) || child.type !== ToggleButton || !child.props) {
			return child;
		}

		const boundIndex = toggleButtonIndex;
		// eslint-disable-next-line react-hooks/immutability
		toggleButtonIndex += 1;

		const focusable = focusableIndexRef.current === boundIndex;

		return (
			<ToggleButtonGroupItem
				{...child.props}
				focusable={focusable}
				onFocus={() => {
					focusableIndexRef.current = boundIndex;
				}}
			/>
		);
	});

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
			<Button.Group
				{...buttonGroupProps}
				attributes={{ ref: hotkeysRef, ...buttonGroupProps?.attributes }}
			>
				{renderedChildren}
			</Button.Group>
		</Context.Provider>
	);
};

ToggleButtonGroupControlled.displayName = "ToggleButtonGroupControlled";

export default ToggleButtonGroupControlled;
