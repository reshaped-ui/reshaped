"use client";

import React from "react";
import { responsivePropDependency } from "utilities/props";
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
	const modeRef = React.useRef<"type" | "edit">(value.length === valueLength ? "edit" : "type");
	const inputRef = React.useRef<HTMLInputElement>(null);
	// Track if beforeinput is supported/firing; if not, use keydown fallback for reliability
	const supportsBeforeInputRef = React.useRef(false);
	// When focusing via pointer, remember the requested index/mode
	const pendingFocusIndexRef = React.useRef<number | null>(null);
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

		// If focus was initiated by clicking a specific item, respect that index
		if (pendingFocusIndexRef.current !== null) {
			const index = pendingFocusIndexRef.current;
			modeRef.current = index >= value.length ? "type" : "edit";
			syncSelection(index);
			pendingFocusIndexRef.current = null;
			return;
		}

		// Default behavior (e.g., focus via Tab): place caret based on current value
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
	};

	const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		const el = event.target;
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
		onChange?.({ event, name, value: nextValue });
		onNextFrame(() => {
			syncSelection();
		});
	};

	// Use onBeforeInput to enforce overwrite semantics when full and block invalid chars.
	const handleBeforeInput = (event: React.FormEvent<HTMLInputElement>) => {
		// Mark environment as supporting beforeinput to avoid double-handling in keydown
		supportsBeforeInputRef.current = true;
		const native = event.nativeEvent as InputEvent;
		const el = event.target as HTMLInputElement;
		if (!native || !el) return;

		if (native.inputType !== "insertText") return;

		const data = native.data ?? "";
		if (!data || !new RegExp(`^${patternRegexp}$`).test(data)) {
			// Block invalid characters completely to avoid DOM flicker
			event.preventDefault();
			return;
		}

		if (el.selectionStart === null || el.selectionEnd === null) return;

		const start = el.selectionStart;
		const end = el.selectionEnd;
		const current = el.value;
		let composed = current.slice(0, start) + data + current.slice(end);
		if (composed.length > valueLength) composed = composed.slice(0, valueLength);

		event.preventDefault();
		const nextPos = Math.min(start + 1, valueLength);
		const nextMode =
			nextPos === composed.length && composed.length !== valueLength ? "type" : "edit";
		modeRef.current = nextMode;
		onChange?.({
			event: event as unknown as React.ChangeEvent<HTMLInputElement>,
			name,
			value: composed,
		});
		onNextFrame(() => {
			el.setSelectionRange(nextPos, nextPos);
			syncSelection(nextPos);
		});
	};

	// Fallback for environments where beforeinput is unreliable
	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		const el = event.currentTarget;
		// If beforeinput works, prefer it to avoid duplicate handling
		if (supportsBeforeInputRef.current) return;

		// Ignore control keys and composition
		if (event.ctrlKey || event.metaKey || event.altKey) return;
		const { key } = event;
		if (!key || key.length !== 1) return; // not a printable single char

		// Validate character against pattern
		if (!new RegExp(`^${patternRegexp}$`).test(key)) {
			event.preventDefault();
			return;
		}

		if (el.selectionStart === null || el.selectionEnd === null) return;

		const start = el.selectionStart;
		const end = el.selectionEnd;
		const current = el.value;
		let composed = current.slice(0, start) + key + current.slice(end);
		if (composed.length > valueLength) composed = composed.slice(0, valueLength);

		// Prevent native insertion and update manually to enforce overwrite semantics
		event.preventDefault();
		const nextPos = Math.min(start + 1, valueLength);
		const nextMode =
			nextPos === composed.length && composed.length !== valueLength ? "type" : "edit";
		modeRef.current = nextMode;
		onChange?.({
			event: event as unknown as React.ChangeEvent<HTMLInputElement>,
			name,
			value: composed,
		});
		onNextFrame(() => {
			el.setSelectionRange(nextPos, nextPos);
			syncSelection(nextPos);
		});
	};

	/**
	 * Manually handle correct caret position when any of the items are clicked
	 */
	const handleItemClick = (event: React.MouseEvent | React.TouchEvent, index: number) => {
		if (!inputRef.current) return;

		event.preventDefault();

		const isAlreadyFocused = document.activeElement === inputRef.current;
		const nextMode = index >= value.length ? "type" : "edit";

		if (isAlreadyFocused) {
			modeRef.current = nextMode;
			syncSelection(index);
			return;
		}

		// Defer selection setup to the ensuing focus event to avoid race conditions
		pendingFocusIndexRef.current = index;
		inputRef.current.focus();
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
				onBeforeInput={handleBeforeInput}
				onKeyDown={handleKeyDown}
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
