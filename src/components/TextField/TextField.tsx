"use client";

import React from "react";
import { classNames, responsiveClassNames, responsivePropDependency } from "utilities/helpers";
import useElementId from "hooks/useElementId";
import { useFormControl } from "components/FormControl";
import Icon from "components/Icon";
import type * as T from "./TextField.types";
import s from "./TextField.module.css";

const TextFieldSlot = (props: T.SlotProps) => {
	const { slot, icon, size, affix, position } = props;

	if (!icon && !slot && !affix) return null;

	const attachmentClassNames = classNames(s.attachment, s[`attachment--position-${position}`]);
	const content = [
		slot && <div className={s.slot}>{slot}</div>,
		icon && (
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
		),
		affix && <div className={s.affix}>{affix}</div>,
	].filter(Boolean);

	return (
		<span className={attachmentClassNames}>{position === "end" ? content.reverse() : content}</span>
	);
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
		prefix,
		suffix,
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
			<TextFieldSlot position="start" icon={icon} slot={startSlot} size={size} affix={prefix} />

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

			<TextFieldSlot position="end" icon={endIcon} slot={endSlot} size={size} affix={suffix} />
		</div>
	);
};

export default TextField;
