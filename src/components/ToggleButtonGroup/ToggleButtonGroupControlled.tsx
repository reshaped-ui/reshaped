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
import buttonStyles from "components/Button/Button.module.css";
import { classNames } from "utilities/props";

const ToggleButtonGroupItem: React.FC<
	ToggleButtonProps & { focusable: boolean; onFocus: () => void; nextSelectedColor?: string }
> = (props) => {
	const { focusable, onFocus, nextSelectedColor, ...buttonProps } = props;

	// Generate className for right border color override
	const rightBorderClassName = nextSelectedColor
		? buttonStyles[`--right-border-${nextSelectedColor}`]
		: undefined;

	return (
		<ToggleButton
			{...buttonProps}
			className={classNames(buttonProps.className, rightBorderClassName)}
			attributes={{
				...buttonProps.attributes,
				tabIndex: focusable ? 0 : -1,
				onFocus,
			}}
		/>
	);
};

const ToggleButtonGroupControlled: React.FC<T.ControlledProps> = (props) => {
	const {
		onChange,
		value,
		selectionMode = "single",
		children,
		color,
		selectedColor,
		...buttonGroupProps
	} = props;
	const focusableIndexRef = React.useRef(0);

	let toggleButtonIndex = 0;
	const childrenArray = React.Children.toArray(children).filter(
		(child) => React.isValidElement(child) && child.type === ToggleButton
	) as React.ReactElement<ToggleButtonProps>[];

	const renderedChildren = React.Children.map(children, (child) => {
		if (!React.isValidElement(child) || child.type !== ToggleButton || !child.props) {
			return child;
		}

		const boundIndex = toggleButtonIndex;
		// eslint-disable-next-line react-hooks/immutability
		toggleButtonIndex += 1;

		const focusable = focusableIndexRef.current === boundIndex;

		// Check if the next button is selected and determine its effective color
		const nextChild = childrenArray[boundIndex + 1];
		const isNextSelected = nextChild && value?.includes(nextChild.props.value || "");

		// Determine the effective color of the next button using the same priority logic as ToggleButtonControlled
		let nextEffectiveColor: string | undefined;
		if (nextChild && isNextSelected) {
			// Priority: individual button color > selectedColor (when selected) > group color
			nextEffectiveColor = nextChild.props.color || selectedColor || color;
		}

		const nextSelectedColor = nextEffectiveColor;

		return (
			<ToggleButtonGroupItem
				{...child.props}
				focusable={focusable}
				nextSelectedColor={nextSelectedColor}
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
		<Context.Provider value={{ onChange: handleChange, value, color, selectedColor }}>
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
