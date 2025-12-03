"use client";

import React from "react";

import Actionable from "components/Actionable";
import { useFormControl } from "components/FormControl";
import Icon from "components/Icon";
import TextField, { TextFieldProps } from "components/TextField";
import * as keys from "constants/keys";
import useElementId from "hooks/useElementId";
import useHandlerRef from "hooks/useHandlerRef";
import useHotkeys from "hooks/useHotkeys";
import IconChevronDown from "icons/ChevronDown";
import IconChevronUp from "icons/ChevronUp";
import IconMinus from "icons/Minus";
import IconPlus from "icons/Plus";
import { responsiveClassNames, responsivePropDependency } from "utilities/props";

import s from "./NumberField.module.css";

import type * as T from "./NumberField.types";

const NumberFieldControlled: React.FC<T.ControlledProps> = (props) => {
	const {
		increaseAriaLabel,
		decreaseAriaLabel,
		min,
		max,
		step = 1,
		name,
		value,
		onChange,
		size = "medium",
		...textFieldProps
	} = props;
	const formControl = useFormControl();
	const id = useElementId(textFieldProps.id);
	const inputId =
		formControl?.attributes.id || (props.inputAttributes?.id as string | undefined) || id;
	const disabled = formControl?.disabled || props.disabled;
	const hasError = formControl?.hasError || props.hasError;
	const increaseDisabled = disabled || (value && max ? value >= max : false);
	const decreaseDisabled = disabled || (value && min ? value <= min : false);

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

			// Keep the right precision and avoid JS rounding errors
			const stepFloatPartLength = step.toString().split(".")[1]?.length || 0;
			const valueFloatPartLength = value?.toString().split(".")[1]?.length || 0;
			const floatPartLength = Math.max(stepFloatPartLength, valueFloatPartLength);
			return Number(nextValue.toFixed(floatPartLength));
		},
		[step, min, max]
	);

	const commitValue = React.useCallback(
		(value: number, options?: { programmatic?: boolean }) => {
			onChangeRef.current?.({ value, name });

			// Only update the ref here when typing in the input
			// Otherwise it will be updated when value changes
			if (!options?.programmatic) valueRef.current = value;
		},
		[name, onChangeRef]
	);

	const handleIncrease = React.useCallback(() => {
		const nextValue = calculateDirectionalChange(1);

		commitValue(nextValue, { programmatic: true });
	}, [calculateDirectionalChange, commitValue]);

	const handleDecrease = React.useCallback(() => {
		const nextValue = calculateDirectionalChange(-1);

		commitValue(nextValue, { programmatic: true });
	}, [calculateDirectionalChange, commitValue]);

	const handleChange: TextFieldProps["onChange"] = (args) => {
		if (!args.value.match(/^(-?)[0-9]*(\.?)[0-9]*$/)) return;

		const numberValue = parseFloat(args.value);

		if (numberValue > Number.MAX_SAFE_INTEGER) return;
		if (numberValue < Number.MIN_SAFE_INTEGER) return;

		setTextValue(args.value);

		if (isNaN(numberValue)) return;
		commitValue(numberValue);
	};

	const handleControlPointerDown = (
		e: React.PointerEvent<HTMLButtonElement>,
		callback: () => void
	) => {
		if (disabled) return;

		callback();

		if (e.pointerType !== "touch") {
			inputRef.current?.focus();
		}

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
		setTextValue(value?.toString() ?? "");
	}, [value]);

	const mouseIconSize = responsivePropDependency(size, (size) => {
		return size === "large" || size === "xlarge" ? 4 : 3;
	});
	const touchIconSize = responsivePropDependency(size, (size) => {
		return size === "small" ? 3 : 4;
	});
	const controlsNode = (
		<span className={s["controls-wrapper"]}>
			<span className={s.controls}>
				<Actionable
					className={s.control}
					disabled={increaseDisabled}
					disableFocusRing
					as="span"
					attributes={{
						"aria-label": increaseAriaLabel,
						"aria-controls": inputId,
						role: "button",
						tabIndex: increaseDisabled ? undefined : -1,
						onPointerDown: (e) => handleControlPointerDown(e, handleIncrease),
						onPointerUp: handleControlPointerUp,
						onPointerLeave: handleControlPointerUp,
						// Prevent menu from opening on long press
						onContextMenu: (e) => e.preventDefault(),
					}}
				>
					<Icon svg={IconChevronUp} size={mouseIconSize} className={s["icon--mouse"]} />
					<Icon svg={IconPlus} size={touchIconSize} className={s["icon--touch"]} />
				</Actionable>
				<Actionable
					className={s.control}
					disabled={decreaseDisabled}
					disableFocusRing
					as="span"
					attributes={{
						"aria-label": decreaseAriaLabel,
						"aria-controls": inputId,
						role: "button",
						tabIndex: decreaseDisabled ? undefined : -1,
						onPointerDown: (e) => handleControlPointerDown(e, handleDecrease),
						onPointerUp: handleControlPointerUp,
						onPointerLeave: handleControlPointerUp,
						// Prevent menu from opening on long press
						onContextMenu: (e) => e.preventDefault(),
					}}
				>
					<Icon svg={IconChevronDown} size={mouseIconSize} className={s["icon--mouse"]} />
					<Icon svg={IconMinus} size={touchIconSize} className={s["icon--touch"]} />
				</Actionable>
			</span>
		</span>
	);

	return (
		<TextField
			{...textFieldProps}
			className={[
				textFieldProps.className,
				responsiveClassNames(s, "controls--size", size),
				!(textFieldProps.variant === "faded" || textFieldProps.variant === "headless") &&
					s["--outline"],
			]}
			attributes={{
				...textFieldProps.attributes,
				role: "group",
				ref: rootRef,
			}}
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
			size={size}
			id={inputId}
			hasError={hasError}
			disabled={disabled}
			value={textValue}
			onChange={handleChange}
			name={name}
			endSlot={controlsNode}
			endSlotPadding={0}
		/>
	);
};

NumberFieldControlled.displayName = "NumberFieldControlled";

export default NumberFieldControlled;
