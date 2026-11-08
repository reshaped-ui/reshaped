"use client";

import React from "react";

import { useFormControl } from "@/components/FormControl";
import Text from "@/components/Text";
import View from "@/components/View";
import useHotkeys from "@/hooks/useHotkeys";
import { onNextFrame } from "@/utilities/animation";
import { responsivePropDependency } from "@/utilities/props";
import * as keys from "@/constants/keys";
import {
	regExpAlphabeticChar,
	regExpAlphaNumericChar,
	regExpNumericChar,
} from "./PinField.constants";
import type * as T from "./PinField.types";
import s from "./PinField.module.css";

const sizeMap: Record<T.Size, number> = {
	small: 7,
	medium: 9,
	large: 12,
	xlarge: 14,
};

const patternMap: Record<NonNullable<T.Props["pattern"]>, string> = {
	numeric: regExpNumericChar,
	alphabetic: regExpAlphabeticChar,
	alphanumeric: regExpAlphaNumericChar,
};

const PinFieldControlled: React.FC<T.ControlledProps> = (props) => {
	const {
		valueLength = 4,
		value,
		onChange,
		name,
		pattern = "numeric",
		size = "medium",
		variant = "outline",
		className,
		attributes,
		inputAttributes,
	} = props;
	const patternRegexp = patternMap[pattern];
	const responsiveInputSize = responsivePropDependency(size, (value) => sizeMap[value]);
	const responsiveTextVariant = responsivePropDependency(size, (value) => {
		if (value === "small") return "caption-1";
		if (value === "medium") return "body-2";
		return "body-1";
	});
	const responsiveRadius = responsivePropDependency(size, (value) =>
		value === "small" ? "small" : "medium"
	);
	const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null);
	const formControl = useFormControl();
	const { hasError } = formControl;
	const disabled = formControl.disabled || inputAttributes?.disabled;
	/**
	 * Most of the logic works based on this mode parameter
	 * `edit` mode means user has selected an already filled item and is changing its value,
	 * so caret position is related to the value rendered before it
	 * `type` means user is typing a new value in an empty item,
	 * so caret is positioned before the value that's going to be added
	 */
	const modeRef = React.useRef<"type" | "edit">(value.length === valueLength ? "edit" : "type");
	const inputRef = React.useRef<HTMLInputElement>(null);
	const nodes = [];

	/**
	 * Update displayed item focus based on the current caret position and current mode
	 */
	const syncSelection = React.useCallback(
		(index?: number) => {
			const el = inputRef.current;
			if (!el || el.selectionStart === null) return;

			const mode = modeRef.current;
			const selectionStart = index ?? el.selectionStart ?? 0;
			const nextSelectionStart = Math.min(
				mode === "type" ? el.value.length : el.value.length - 1,
				Math.max(0, selectionStart)
			);

			if (modeRef.current === "type") {
				el.selectionStart = nextSelectionStart;
				el.selectionEnd = nextSelectionStart;
			} else {
				el.selectionStart = nextSelectionStart;
				el.selectionEnd = nextSelectionStart + 1;
			}

			setFocusedIndex(Math.min(el.selectionStart, valueLength - 1));
		},
		[valueLength]
	);

	/**
	 * Using onNextFrame here to wait for the native behavior first
	 */
	useHotkeys<HTMLInputElement>(
		{
			[`${keys.LEFT},${keys.UP}`]: () => {
				onNextFrame(() => {
					const el = inputRef.current;
					if (!el || el.selectionStart === null) return;

					const mode = modeRef.current;
					const nextMode = !value.length ? "type" : "edit";

					modeRef.current = nextMode;
					syncSelection(
						mode === "type" && nextMode === "edit" ? el.selectionStart : el.selectionStart - 1
					);
				});
			},
			[`${keys.RIGHT},${keys.DOWN}`]: () => {
				onNextFrame(() => {
					const el = inputRef.current;
					if (!el || el.selectionStart === null) return;

					const nextMode =
						el.selectionStart === value.length && el.selectionStart !== valueLength
							? "type"
							: "edit";

					modeRef.current = nextMode;
					syncSelection(el.selectionStart);
				});
			},
		},
		[value, syncSelection, valueLength],
		{
			ref: inputRef,
		}
	);

	const handleFocus = () => {
		/**
		 * Tabing into the input might select the whole value
		 * so we're resetting that behavior
		 */

		syncSelection(value.length);
	};

	const handleBlur = () => {
		setFocusedIndex(null);
	};

	const handlePaste = (e: React.ClipboardEvent) => {
		const el = inputRef.current;
		if (focusedIndex === null || !el) return;

		/**
		 * Pasted codes are often formatted with whitespace, e.g. "123 456", so it gets removed before validation
		 */
		const pastedData = e.clipboardData.getData("text");
		const data = pastedData.replace(/\s/g, "");

		/**
		 * Input might not have enough space for pasting the value so we free up space based on the pasted value length
		 */
		const updatedValue = value.slice(0, focusedIndex) + value.slice(focusedIndex + data.length);

		if (data !== pastedData) {
			/**
			 * Native paste would insert the whitespace, so the value is inserted manually
			 * and the input event is triggered to go through the same validation as typing
			 */
			e.preventDefault();

			const nextValue = (
				updatedValue.slice(0, focusedIndex) +
				data +
				updatedValue.slice(focusedIndex)
			).slice(0, valueLength);
			const nativeValueSetter = Object.getOwnPropertyDescriptor(
				window.HTMLInputElement.prototype,
				"value"
			)!.set!;

			nativeValueSetter.call(el, nextValue);
			el.setSelectionRange(focusedIndex + data.length, focusedIndex + data.length);
			el.dispatchEvent(new Event("input", { bubbles: true }));
			return;
		}

		/**
		 * Manually update the value and selection to preserve all not affected values and keep caret in the correct position
		 */

		el.value = updatedValue;
		el.selectionEnd = focusedIndex;
	};

	const handleInput = (event: React.InputEvent<HTMLInputElement>) => {
		const el = event.currentTarget;
		const nextValue = el.value;

		const matcher = new RegExp(`^${patternRegexp}+$`);
		if (nextValue && !nextValue.match(matcher)) return;
		if (el.selectionStart === null) return;

		const nextMode =
			// Finished editing the last character
			nextValue.length === valueLength ||
			// Staying inside the sequence
			nextValue.length > el.selectionStart
				? "edit"
				: "type";

		modeRef.current = nextMode;
		onChange?.({
			event: event as unknown as React.ChangeEvent<HTMLInputElement>,
			name,
			value: nextValue,
		});
		onNextFrame(() => {
			syncSelection();
		});
	};

	/**
	 * Manually handle correct caret position when any of the items are clicked
	 */
	const handleItemClick = (event: React.MouseEvent | React.TouchEvent, index: number) => {
		if (!inputRef.current || disabled) return;

		inputRef.current.focus();

		modeRef.current = index >= value.length ? "type" : "edit";
		syncSelection(index);
	};

	for (let i = 0; i < valueLength; i++) {
		nodes.push(
			<View
				key={i}
				height={responsiveInputSize}
				width={responsiveInputSize}
				borderRadius={responsiveRadius}
				borderColor={
					hasError
						? "critical"
						: disabled
							? "disabled"
							: variant === "faded"
								? undefined
								: "neutral"
				}
				shadow={variant === "faded" ? undefined : "outline"}
				backgroundColor={variant === "faded" ? "neutral-faded" : "elevation-base"}
				align="center"
				justify="center"
				className={[s.item, focusedIndex === i && s["item--focused"]]}
				attributes={{
					// Only the input is exposed to assistive technologies, items are a visual representation of its value
					"aria-hidden": true,
					onMouseDown: (e) => {
						e.preventDefault();
						handleItemClick(e, i);
					},
					onTouchStart: (e) => {
						handleItemClick(e, i);
					},
				}}
			>
				<span className={s.caret} />
				{value[i] && (
					<Text variant={responsiveTextVariant} color={disabled ? "disabled" : undefined}>
						{value[i]}
					</Text>
				)}
			</View>
		);
	}

	return (
		<View gap={2} direction="row" className={[s.root, className]} attributes={attributes}>
			{nodes}

			<input
				{...inputAttributes}
				{...formControl.attributes}
				type="text"
				disabled={disabled}
				className={s.input}
				onFocus={handleFocus}
				onBlur={handleBlur}
				onPaste={handlePaste}
				onInput={handleInput}
				value={value}
				name={name}
				maxLength={valueLength}
				ref={inputRef}
				autoComplete={inputAttributes?.autoComplete || "one-time-code"}
				inputMode={pattern === "numeric" ? "numeric" : undefined}
				pattern={`${patternRegexp}{${valueLength}}`}
			/>
		</View>
	);
};

PinFieldControlled.displayName = "PinFieldControlled";

export default PinFieldControlled;
