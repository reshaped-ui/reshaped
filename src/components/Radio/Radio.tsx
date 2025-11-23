"use client";

import React from "react";

import { useFormControl } from "components/FormControl";
import HiddenInput from "components/HiddenInput";
import { useRadioGroup } from "components/RadioGroup";
import Text from "components/Text";
import { classNames, responsiveClassNames, responsivePropDependency } from "utilities/props";

import s from "./Radio.module.css";

import type * as T from "./Radio.types";

const Radio: React.FC<T.Props> = (props) => {
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
					onChange={onChange}
					onFocus={onFocus}
					onBlur={onBlur}
					attributes={inputAttributes}
				/>
				<div className={s.decorator} />
			</span>

			{children && (
				<Text
					as="span"
					variant={responsivePropDependency(size, (size) => {
						if (size === "large") return "body-2";
						if (size === "small") return "caption-1";
						return "body-3";
					})}
				>
					{children}
				</Text>
			)}
		</label>
	);
};

Radio.displayName = "Radio";

export default Radio;
