"use client";

import React from "react";

import { useFormControl } from "components/FormControl";
import useElementId from "hooks/useElementId";
import { classNames, responsiveClassNames } from "utilities/props";

import s from "./TextArea.module.css";

import type * as T from "./TextArea.types";

const TextArea: React.FC<T.Props> = (props) => {
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
		resize,
		className,
		attributes,
	} = props;
	const [autogrowValue, setAutogrowValue] = React.useState(value || defaultValue || "");
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
		resize !== undefined && s[`--resize-${resize}`],
		className
	);

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const nextValue = event.target.value;

		onChange?.({ name, value: nextValue, event });
		if (resize === "auto" && typeof value !== "string") {
			setAutogrowValue(nextValue);
		}
	};

	React.useEffect(() => {
		if (typeof value !== "string" || resize !== "auto") return;
		setAutogrowValue(value);
	}, [value, resize]);

	return (
		<div
			{...attributes}
			data-rs-aligner-target
			className={rootClassName}
			data-rs-textarea-value={autogrowValue}
		>
			<textarea
				rows={3}
				{...inputAttributes}
				className={s.input}
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

TextArea.displayName = "TextArea";

export default TextArea;
