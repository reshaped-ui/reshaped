"use client";

import React from "react";
import Icon from "components/Icon";
import { useFormControl } from "components/FormControl";
import Actionable from "components/Actionable";
import Text from "components/Text";
import IconArrow from "icons/ChevronVertical";
import { classNames, responsiveClassNames, responsivePropDependency } from "utilities/props";
import useElementId from "hooks/useElementId";
import type * as T from "./Select.types";
import s from "./Select.module.css";

const Select: React.FC<T.Props> = (props) => {
	const {
		onChange,
		onClick,
		onFocus,
		onBlur,
		name,
		value,
		defaultValue,
		placeholder,
		options,
		children,
		icon,
		startSlot,
		size = "medium",
		variant = "outline",
		className,
		attributes,
	} = props;
	const [empty, setEmpty] = React.useState(value === undefined ? !defaultValue : !value);
	const formControl = useFormControl();
	const id = useElementId(props.id);
	const inputId = formControl?.attributes?.id || props.inputAttributes?.id || id;
	const disabled = formControl?.disabled || props.disabled;
	const hasError = formControl?.hasError || props.hasError;
	const inputAttributes = { ...props.inputAttributes, ...formControl?.attributes };
	const rootClassName = classNames(
		s.root,
		className,
		size && responsiveClassNames(s, "--size", size),
		hasError && s["--status-error"],
		disabled && s["--disabled"],
		empty && options && s["--placeholder"],
		variant && s[`--variant-${variant}`]
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

	const startContent = (startSlot || icon) && (
		<div className={s.slot}>
			{icon ? (
				<Icon
					size={responsivePropDependency(size, (size) => {
						if (size === "large") return 5;
						if (size === "xlarge") return 6;
						return 4;
					})}
					svg={icon}
				/>
			) : (
				startSlot
			)}
		</div>
	);

	return (
		<div {...attributes} className={rootClassName}>
			{options ? (
				<>
					{startContent}
					<select
						{...(inputAttributes as T.SelectTriggerProps["inputAttributes"])}
						onFocus={(onFocus || inputAttributes?.onFocus) as T.SelectTriggerProps["onFocus"]}
						onBlur={(onBlur || inputAttributes?.onBlur) as T.SelectTriggerProps["onBlur"]}
						className={s.input}
						disabled={disabled}
						name={name}
						value={value}
						defaultValue={defaultValue}
						onChange={handleChange}
						id={inputId}
					>
						{placeholder && <option value="">{placeholder}</option>}
						{options.map((option) => (
							<option key={option.value} value={option.value} disabled={option.disabled}>
								{option.label}
							</option>
						))}
					</select>
				</>
			) : (
				<>
					<Actionable
						className={s.input}
						disabled={disabled}
						disableFocusRing
						onClick={onClick}
						attributes={{
							...(inputAttributes as T.ButtonTriggerProps["inputAttributes"]),
							onFocus: onFocus || inputAttributes?.onFocus,
							onBlur: onBlur || inputAttributes?.onBlur,
						}}
					>
						{startContent}
						{children || (placeholder ? <Text color="neutral-faded">{placeholder}</Text> : null)}
					</Actionable>
					<input type="hidden" value={value} name={name} />
				</>
			)}
			<div className={s.arrow}>
				<Icon
					svg={IconArrow}
					color={disabled ? "disabled" : "neutral-faded"}
					size={responsivePropDependency(size, (size) => {
						return size === "large" || size === "xlarge" ? 5 : 4;
					})}
				/>
			</div>
		</div>
	);
};

Select.displayName = "Select";

export default Select;
