"use client";

import React from "react";
import Actionable from "components/Actionable";
import Icon from "components/Icon";
import TextField, { TextFieldProps } from "components/TextField";
import IconChevronUp from "icons/ChevronUp";
import IconChevronDown from "icons/ChevronDown";
import IconPlus from "icons/Plus";
import IconMinus from "icons/Minus";
import useElementId from "hooks/useElementId";
import useHotkeys from "hooks/useHotkeys";
import * as keys from "constants/keys";
import type * as T from "./NumberField.types";
import s from "./NumberField.module.css";
import useHandlerRef from "hooks/useHandlerRef";
import { useFormControl } from "components/FormControl";

const NumberFieldControlled = (props: T.ControlledProps) => {
	const {
		increaseAriaLabel,
		decreaseAriaLabel,
		min,
		max,
		step = 1,
		name,
		value,
		onChange,
		...textFieldProps
	} = props;
	const formControl = useFormControl();
	const id = useElementId(textFieldProps.id);
	const inputId =
		formControl?.attributes.id || (props.inputAttributes?.id as string | undefined) || id;
	const disabled = formControl?.disabled || props.disabled;
	const hasError = formControl?.hasError || props.hasError;

	const inputRef = React.useRef<HTMLInputElement>(null);
	const rootRef = React.useRef<HTMLDivElement>(null);
	const [textValue, setTextValue] = React.useState(value?.toString() || "");
	// Sync value to a ref to handle holding controlss pressed
	// And changing it without waiting for a rerender
	const valueRef = React.useRef<number | null>(value);
	const onChangeRef = useHandlerRef(onChange);
	const pressedTimeoutRef = React.useRef<ReturnType<typeof setTimeout>>(null);
	const changeIntervalRef = React.useRef<ReturnType<typeof setInterval>>(null);

	const calculateDirectionalChange = React.useCallback(
		(direction: -1 | 1) => {
			const delta = step * direction;
			const value = valueRef.current;
			let nextValue = value === null ? delta : value + delta;

			if (max !== undefined && nextValue > max) nextValue = max;
			if (min !== undefined && nextValue < min) nextValue = min;

			return nextValue;
		},
		[step, min, max]
	);

	const commitValue = React.useCallback(
		(value: number) => {
			onChangeRef.current?.({ value, name });
			valueRef.current = value;
		},
		[name, onChangeRef]
	);

	const handleIncrease = React.useCallback(() => {
		const nextValue = calculateDirectionalChange(1);

		setTextValue(nextValue.toString());
		commitValue(nextValue);
	}, [calculateDirectionalChange, commitValue]);

	const handleDecrease = React.useCallback(() => {
		const nextValue = calculateDirectionalChange(-1);

		setTextValue(nextValue.toString());
		commitValue(nextValue);
	}, [calculateDirectionalChange, commitValue]);

	const handleChange: TextFieldProps["onChange"] = (args) => {
		if (!args.value.match(/^(-?)[0-9]*(.?)[0-9]*$/)) return;

		setTextValue(args.value);

		const numberValue = parseFloat(args.value);

		if (isNaN(numberValue)) return;
		commitValue(numberValue);
	};

	const handleControlPointerDown = (callback: () => void) => {
		if (disabled) return;

		callback();
		inputRef.current?.focus();

		pressedTimeoutRef.current = setTimeout(() => {
			changeIntervalRef.current = setInterval(() => {
				callback();
			}, 50);
		}, 500);
	};

	const handleControlPointerUp = () => {
		if (disabled) return;

		if (pressedTimeoutRef.current) {
			clearTimeout(pressedTimeoutRef.current);
			pressedTimeoutRef.current = null;
		}

		if (changeIntervalRef.current) {
			clearTimeout(changeIntervalRef.current);
			changeIntervalRef.current = null;
		}
	};

	useHotkeys(
		{
			[keys.UP]: handleIncrease,
			[keys.DOWN]: handleDecrease,
		},
		[handleIncrease, handleDecrease],
		{
			preventDefault: true,
			ref: rootRef,
		}
	);

	React.useEffect(() => {
		valueRef.current = value;
	}, [value]);

	const controlsNode = (
		<span className={s.controls}>
			<Actionable
				className={s.control}
				disabled={disabled}
				disableFocusRing
				as="span"
				attributes={{
					"aria-label": increaseAriaLabel,
					"aria-controls": id,
					role: "button",
					tabIndex: disabled ? undefined : -1,
					onPointerDown: () => handleControlPointerDown(handleIncrease),
					onPointerUp: handleControlPointerUp,
					onPointerLeave: handleControlPointerUp,
					// Prevent menu from opening on long press
					onContextMenu: (e) => e.preventDefault(),
				}}
			>
				<Icon svg={IconChevronUp} size={3} className={s["icon--mouse"]} />
				<Icon svg={IconPlus} size={4} className={s["icon--touch"]} />
			</Actionable>
			<Actionable
				className={s.control}
				disabled={disabled}
				disableFocusRing
				as="span"
				attributes={{
					"aria-label": decreaseAriaLabel,
					"aria-controls": id,
					role: "button",
					tabIndex: disabled ? undefined : -1,
					onPointerDown: () => handleControlPointerDown(handleDecrease),
					onPointerUp: handleControlPointerUp,
					onPointerLeave: handleControlPointerUp,
					// Prevent menu from opening on long press
					onContextMenu: (e) => e.preventDefault(),
				}}
			>
				<Icon svg={IconChevronDown} size={3} className={s["icon--mouse"]} />
				<Icon svg={IconMinus} size={4} className={s["icon--touch"]} />
			</Actionable>
		</span>
	);

	return (
		<TextField
			attributes={{
				...textFieldProps.attributes,
				role: "group",
				ref: rootRef,
			}}
			id={inputId}
			hasError={hasError}
			inputAttributes={{
				...textFieldProps.inputAttributes,
				ref: inputRef,
				inputMode: "numeric",
				autoComplete: "off",
				autoCorrect: "off",
				spellCheck: "false",
				min,
				max,
				step,
				className: s.field,
			}}
			{...textFieldProps}
			disabled={disabled}
			value={textValue}
			onChange={handleChange}
			name={name}
			endSlot={controlsNode}
		/>
	);
};

NumberFieldControlled.displayName = "NumberFieldControlled";

export default NumberFieldControlled;
