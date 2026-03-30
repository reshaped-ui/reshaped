"use client";

import { classNames } from "@reshaped/headless";
import React from "react";

import { resolveMixin } from "@/styles/mixin";
import { responsiveClassNames } from "@/utilities/props";

import s from "./Select.module.css";
import SelectEndContent from "./SelectEndContent";
import SelectStartContent from "./SelectStartContent";

import type * as T from "./Select.types";

const SelectNative: React.FC<T.NativeProps> = (props) => {
	const {
		startSlot,
		icon,
		size = "medium",
		inputAttributes,
		disabled,
		name,
		value,
		defaultValue,
		onChange,
		onClick,
		variant = "outline",
		hasError,
		className,
		attributes,
		placeholder,
		id,
		children,
	} = props;
	const mixin = resolveMixin({
		shadow: variant === "outline" ? "outline" : undefined,
		borderColor: disabled ? "disabled" : "neutral",
		border: variant === "outline" ? true : undefined,
	});
	const rootClassName = classNames(
		s.root,
		className,
		...mixin.classNames,
		size && responsiveClassNames(s, "--size", size),
		hasError && s["--status-error"],
		disabled && s["--disabled"],
		variant && s[`--variant-${variant}`]
	);
	const [empty, setEmpty] = React.useState(value === undefined ? !defaultValue : !value);
	const selectClassNames = classNames(
		s.input,
		inputAttributes?.className,
		placeholder && empty && s["input--placeholder"]
	);

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const nextValue = event.target.value;

		// Uncontrolled placeholder
		if (value === undefined) setEmpty(!nextValue);

		if (!onChange) return;
		onChange({ name, value: nextValue, event });
	};

	// Controlled placeholder
	React.useEffect(() => {
		if (value === undefined) return;
		setEmpty(!value);
	}, [value]);

	return (
		<div
			{...attributes}
			style={{
				...(attributes?.style as React.CSSProperties),
				...mixin.variables,
			}}
			data-rs-aligner-target
			className={rootClassName}
		>
			<SelectStartContent startSlot={startSlot} icon={icon} size={size} />
			<select
				{...inputAttributes}
				onClick={onClick || inputAttributes?.onClick}
				className={selectClassNames}
				disabled={disabled}
				name={name}
				value={value}
				defaultValue={defaultValue}
				onChange={handleChange}
				id={id}
			>
				{placeholder && <option value="">{placeholder}</option>}
				{children}
			</select>
			<SelectEndContent disabled={disabled} size={size} />
		</div>
	);
};

export default SelectNative;
