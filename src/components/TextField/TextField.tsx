"use client";

import React from "react";
import { classNames, responsiveClassNames, responsivePropDependency } from "utilities/props";
import useElementId from "hooks/useElementId";
import { useFormControl } from "components/FormControl";
import Icon from "components/Icon";
import Aligner from "components/_private/Aligner";
import type * as T from "./TextField.types";
import s from "./TextField.module.css";

const TextFieldSlot: React.FC<T.SlotProps> = (props) => {
	const { slot, icon, size, affix, position, id } = props;

	if (!icon && !slot && !affix) return null;

	// In case fragment is used, map over its children instead
	const renderedSlot =
		React.isValidElement(slot) && slot.type === React.Fragment
			? (slot.props as React.PropsWithChildren).children
			: slot;

	const slotNode =
		slot &&
		React.Children.map(renderedSlot, (child) => (
			<div className={classNames(s.slot, s[`slot--position-${position}`])} key="slot">
				{child}
			</div>
		));
	const iconNode = icon && (
		<label className={s.icon} key="icon" htmlFor={id}>
			<Icon
				size={responsivePropDependency(size, (size) => {
					if (size === "large") return 5;
					if (size === "xlarge") return 6;
					return 4;
				})}
				svg={icon}
			/>
		</label>
	);
	const affixNode = affix && (
		<label
			className={classNames(s.affix, s[`affix--position-${position}`])}
			key="affix"
			htmlFor={id}
		>
			{affix}
		</label>
	);

	/**
	 * Start position:
	 * - Icon is first to indicate a role of the input
	 * - Affix is last to stay next ot the text
	 * End position:
	 * - Icon is first in case it's used for indicating states
	 * - Slot is the last one in case it's used as a field action
	 */
	const content =
		position === "start" ? [iconNode, slotNode, affixNode] : [iconNode, affixNode, slotNode];

	return content.filter(Boolean);
};

const TextField: React.FC<T.Props> & {
	Aligner: typeof Aligner;
} = (props) => {
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
		rounded,
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
		rounded && s["--rounded"],
		variant && s[`--variant-${variant}`]
	);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!onChange) return;
		onChange({ name, value: event.target.value, event });
	};

	return (
		<div {...attributes} data-rs-aligner-target className={rootClassName}>
			<TextFieldSlot
				position="start"
				icon={icon}
				slot={startSlot}
				size={size}
				affix={prefix}
				id={id}
			/>

			<input
				type="text"
				{...inputAttributes}
				className={classNames(s.input, inputAttributes.className)}
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

			<TextFieldSlot
				position="end"
				icon={endIcon}
				slot={endSlot}
				size={size}
				affix={suffix}
				id={id}
			/>
		</div>
	);
};

TextField.Aligner = Aligner;

TextField.displayName = "TextField";

export default TextField;
