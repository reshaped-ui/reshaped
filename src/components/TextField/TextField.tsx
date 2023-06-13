"use client";

import React from "react";
import { classNames, responsiveClassNames, responsivePropDependency } from "utilities/helpers";
import useElementId from "hooks/useElementId";
import { useFormControl } from "components/FormControl";
import Icon from "components/Icon";
import type * as T from "./TextField.types";
import s from "./TextField.module.css";

const TextFieldSlot = (props: T.SlotProps) => {
	const { slot, icon, size } = props;

	if (!icon && !slot) return null;

	if (icon) {
		return (
			<div className={s.icon}>
				<Icon
					size={responsivePropDependency(size, (size) => {
						if (size === "large") return 5;
						if (size === "xlarge") return 6;
						return 4;
					})}
					svg={icon}
				/>
			</div>
		);
	}

	return <div className={s.slot}>{slot}</div>;
};

const TextField = (props: T.Props) => {
	const {
		onChange,
		onFocus,
		onBlur,
		name,
		value,
		defaultValue,
		placeholder,
		icon,
		endIcon,
		startSlot,
		endSlot,
		size = "medium",
		variant = "outline",
		className,
		attributes,
	} = props;
	const formControl = useFormControl();
	const id = useElementId(props.id);
	const inputId =
		formControl?.attributes.id || (props.inputAttributes?.id as string | undefined) || id;
	const disabled = formControl?.disabled || props.disabled;
	const hasError = formControl?.hasError || props.hasError;
	const inputAttributes = { ...props.inputAttributes, ...formControl?.attributes };
	const rootClassName = classNames(
		s.root,
		className,
		size && responsiveClassNames(s, "--size", size),
		hasError && s["--status-error"],
		disabled && s["--disabled"],
		variant && s[`--variant-${variant}`]
	);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!onChange) return;
		onChange({ name, value: event.target.value, event });
	};

	return (
		<div {...attributes} className={rootClassName}>
			<TextFieldSlot icon={icon} slot={startSlot} size={size} />

			<input
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

			<TextFieldSlot icon={endIcon} slot={endSlot} size={size} />
		</div>
	);
};

export default TextField;
