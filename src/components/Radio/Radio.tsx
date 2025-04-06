"use client";

import React from "react";
import { classNames, responsiveClassNames } from "utilities/helpers";
import HiddenInput from "components/_private/HiddenInput";
import { useRadioGroup } from "components/RadioGroup";
import { useFormControl } from "components/FormControl";
import type * as T from "./Radio.types";
import s from "./Radio.module.css";

const Radio = (props: T.Props) => {
	const {
		children,
		value,
		onChange,
		onFocus,
		onBlur,
		size = "medium",
		className,
		attributes,
		inputAttributes,
	} = props;
	const formControl = useFormControl();
	const radioGroup = useRadioGroup();
	const hasError = formControl?.hasError || props.hasError || radioGroup?.hasError;
	const disabled = formControl?.disabled || props.disabled || radioGroup?.disabled;
	const checked = radioGroup ? radioGroup.value === value : props.checked;
	const defaultChecked = radioGroup ? undefined : props.defaultChecked;
	const name = radioGroup ? radioGroup.name : props.name;
	const rootClassName = classNames(
		s.root,
		className,
		hasError && s["--error"],
		disabled && s["--disabled"],
		size && responsiveClassNames(s, "--size", size)
	);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!name) return;

		const { checked } = event.target;
		const changeArgs = { name, value, checked, event };

		if (onChange) onChange(changeArgs);
		if (radioGroup?.onChange) radioGroup.onChange(changeArgs);
	};

	return (
		<label {...attributes} className={rootClassName}>
			<span className={s.field}>
				<HiddenInput
					className={s.input}
					type="radio"
					checked={checked}
					defaultChecked={defaultChecked}
					name={name}
					disabled={disabled}
					value={value}
					onChange={handleChange}
					onFocus={onFocus}
					onBlur={onBlur}
					attributes={inputAttributes}
				/>
				<div className={s.decorator} />
			</span>

			{children && <span className={s.text}>{children}</span>}
		</label>
	);
};

Radio.displayName = "Radio";

export default Radio;
