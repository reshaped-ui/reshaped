"use client";

import React from "react";
import { classNames, responsiveClassNames, responsivePropDependency } from "utilities/helpers";
import useElementId from "hooks/useElementId";
import { useFormControl } from "components/FormControl";
import Icon from "components/Icon";
import Aligner from "components/_private/Aligner";
import type * as T from "./TextField.types";
import s from "./TextField.module.css";

const TextFieldSlot = (props: T.SlotProps) => {
	const { slot, icon, size, affix, position } = props;

	if (!icon && !slot && !affix) return null;

	const content = [
		slot && (
			<div className={classNames(s.slot, s[`slot--position-${position}`])} key="slot">
				{slot}
			</div>
		),
		icon && (
			<div className={s.icon} key="icon">
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
		affix && (
			<div className={classNames(s.affix, s[`affix--position-${position}`])} key="affix">
				{affix}
			</div>
		),
	].filter(Boolean);

	return position === "end" ? content.reverse() : content;
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
		focused,
		multiline,
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
		focused && s["--focused"],
		multiline && s["--multiline"],
		variant && s[`--variant-${variant}`]
	);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!onChange) return;
		onChange({ name, value: event.target.value, event });
	};

	return (
		<div {...attributes} data-rs-aligner-target className={rootClassName}>
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

TextField.Aligner = Aligner;
export default TextField;
