"use client";

import React from "react";
import { responsivePropDependency } from "utilities/helpers";
import View from "components/View";
import Text from "components/Text";
import useHotkeys from "hooks/useHotkeys";
import { useFormControl } from "components/FormControl";
import { onNextFrame } from "utilities/animation";
import * as keys from "constants/keys";
import {
	regExpNumericChar,
	regExpAlphabeticChar,
	regExpAlphaNumericChar,
} from "./PinField.constants";
import type * as T from "./PinField.types";
import s from "./PinField.module.css";

const sizeMap: Record<T.Size, number> = {
	medium: 9,
	large: 12,
	xlarge: 14,
};

const patternMap: Record<NonNullable<T.Props["charPattern"]>, string> = {
	numeric: regExpNumericChar,
	alphabetic: regExpAlphabeticChar,
	alphanumeric: regExpAlphaNumericChar,
};

const PinFieldControlled = (props: T.ControlledProps) => {
	const {
		valueLength = 4,
		value,
		onChange,
		name,
		charPattern = "numeric",
		size = "medium",
		variant = "outline",
		className,
		attributes,
		inputAttributes,
	} = props;
	const pattern = patternMap[charPattern];
	const responsiveInputSize = responsivePropDependency(size, (value) => sizeMap[value]);
	const responsiveTextVariant = responsivePropDependency(size, (value) =>
		value === "medium" ? "body-3" : "body-2"
	);
	const responsiveRadius = responsivePropDependency(size, (value) =>
		value === "xlarge" ? "medium" : "small"
	);
	const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null);
	const formControl = useFormControl();
	/**
	 * Most of the logic works based on this mode parameter
	 * `edit` mode means user has selected an already filled item and is changing its value,
	 * so caret position is related to the value rendered before it
	 * `type` means user is typing a new value in an empty item,
	 * so caret is positioned before the value that's going to be added
	 */
	const modeRef = React.useRef<"type" | "edit">("type");
	const inputRef = React.useRef<HTMLInputElement | null>(null);
	const nodes = [];

	/**
	 * Update displayed item focus based on the current caret position and current mode
	 */
	const syncSelection = React.useCallback((index?: number) => {
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

		setFocusedIndex(el.selectionStart);
	}, []);

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
		if (focusedIndex === null || !inputRef.current) return;

		/**
		 * Input might not have enough space for pasting the value so we free up space based on the pasted value length
		 */
		const data = e.clipboardData.getData("text");
		const updatedValue = value.slice(0, focusedIndex) + value.slice(focusedIndex + data.length);

		/**
		 * Manually update the value and selection to preserve all not affected values and keep caret in the correct position
		 */

		inputRef.current.value = updatedValue;
		inputRef.current.selectionEnd = focusedIndex;
		inputRef.current.selectionStart = inputRef.current.selectionStart;
	};

	const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		const el = event.target;
		const nextValue = el.value;

		const matcher = new RegExp(`^${pattern}+$`);
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
		onChange?.({ event, name, value: nextValue });
		onNextFrame(() => {
			syncSelection();
		});
	};

	/**
	 * Manually handle correct caret position when any of the items are clicked
	 */
	const handleItemClick = (event: React.MouseEvent | React.TouchEvent, index: number) => {
		if (!inputRef.current) return;

		event.preventDefault();
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
				borderColor={variant === "faded" ? "transparent" : "neutral"}
				backgroundColor={variant === "faded" ? "neutral-faded" : "elevation-base"}
				align="center"
				justify="center"
				className={[s.item, focusedIndex === i && s["item--focused"]]}
				attributes={{
					onMouseDown: (e) => {
						handleItemClick(e, i);
					},
					onTouchStart: (e) => {
						handleItemClick(e, i);
					},
				}}
			>
				{value[i] && <Text variant={responsiveTextVariant}>{value[i]}</Text>}
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
				inputMode={charPattern === "numeric" ? "numeric" : undefined}
				pattern={`${pattern}{${valueLength}}`}
			/>
		</View>
	);
};

export default PinFieldControlled;
