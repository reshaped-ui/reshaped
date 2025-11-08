"use client";

import React from "react";

import { classNames } from "utilities/props";

import s from "./Select.module.css";
import SelectEndContent from "./SelectEndContent";
import SelectStartContent from "./SelectStartContent";

import type * as T from "./Select.types";

const SelectNative: React.FC<T.NativeProps> = (props) => {
	const {
		startSlot,
		icon,
		size,
		inputAttributes,
		onFocus,
		onBlur,
		disabled,
		name,
		value,
		defaultValue,
		onChange,
		onClick,
		placeholder,
		id,
		children,
	} = props;
	const [empty, setEmpty] = React.useState(value === undefined ? !defaultValue : !value);
	const selectClassNames = classNames(s.input, placeholder && empty && s["input--placeholder"]);

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
		<>
			<SelectStartContent startSlot={startSlot} icon={icon} size={size} />
			<select
				{...inputAttributes}
				onFocus={onFocus || inputAttributes?.onFocus}
				onBlur={onBlur || inputAttributes?.onBlur}
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
		</>
	);
};

export default SelectNative;
