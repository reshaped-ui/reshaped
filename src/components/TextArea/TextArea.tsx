"use client";

import React from "react";
import { classNames, responsiveClassNames } from "utilities/helpers";
import { useFormControl } from "components/FormControl";
import Aligner from "components/_private/Aligner";
import useElementId from "hooks/useElementId";
import type * as T from "./TextArea.types";
import s from "./TextArea.module.css";

const TextArea = (props: T.Props) => {
	const {
		onChange,
		onFocus,
		onBlur,
		name,
		value,
		defaultValue,
		placeholder,
		size = "medium",
		variant = "outline",
		className,
		attributes,
	} = props;
	const formControl = useFormControl();
	const id = useElementId(props.id);
	const inputId =
		formControl?.attributes?.id || (props.inputAttributes?.id as string | undefined) || id;
	const disabled = formControl?.disabled || props.disabled;
	const hasError = formControl?.hasError || props.hasError;
	const inputAttributes = { ...props.inputAttributes, ...formControl?.attributes };
	const rootClassName = classNames(
		s.root,
		size && responsiveClassNames(s, "--size", size),
		hasError && s["--status-error"],
		disabled && s["--disabled"],
		variant && s[`--variant-${variant}`],
		className
	);

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (!onChange) return;
		onChange({ name, value: event.target.value, event });
	};

	return (
		<div {...attributes} data-rs-aligner-target className={rootClassName}>
			<textarea
				{...inputAttributes}
				className={s.input}
				rows={3}
				disabled={disabled}
				name={name}
				placeholder={placeholder}
				value={value}
				defaultValue={defaultValue}
				onChange={handleChange}
				onFocus={onFocus || inputAttributes?.onFocus}
				onBlur={onBlur || inputAttributes?.onBlur}
				id={inputId}
			/>
		</div>
	);
};

TextArea.Aligner = Aligner;
export default TextArea;
