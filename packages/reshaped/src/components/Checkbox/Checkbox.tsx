"use client";

import React from "react";
import { classNames } from "@reshaped/utilities";

import { useCheckboxGroup } from "@/components/CheckboxGroup";
import { useFormControlPrivate } from "@/components/FormControl/FormControl.context";
import { getInputAttributes } from "@/components/FormControl/FormControl.utilities";
import HiddenInput from "@/components/HiddenInput";
import Icon from "@/components/Icon";
import Text from "@/components/Text";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import { responsiveClassNames, responsivePropDependency } from "@/utilities/props";
import IconCheckmark from "@/icons/Checkmark";
import type * as T from "./Checkbox.types";
import s from "./Checkbox.module.css";

const Checkbox: React.FC<T.Props> = (props) => {
	const {
		children,
		value,
		onChange,
		indeterminate,
		size = "medium",
		className,
		attributes,
		inputAttributes,
	} = props;

	const checkboxGroup = useCheckboxGroup();
	const formControl = useFormControlPrivate();
	const hasError = formControl?.hasError || props.hasError || checkboxGroup?.hasError;
	const disabled = formControl?.disabled || props.disabled || checkboxGroup?.disabled;
	const checked = checkboxGroup ? checkboxGroup.value?.includes(value!) : props.checked;
	const defaultChecked = checkboxGroup ? undefined : props.defaultChecked;
	const name = checkboxGroup ? checkboxGroup.name : props.name;
	const inputRef = React.useRef<HTMLInputElement>(null);
	// FormControl label and captions are only linked to a single checkbox, groups use fieldset instead
	const grouped = formControl.group || !!checkboxGroup;
	const rootClassName = classNames(
		s.root,
		className,
		size && hasError && s["--error"],
		disabled && s["--disabled"],
		size && responsiveClassNames(s, "--size", size)
	);

	useIsomorphicLayoutEffect(() => {
		inputRef.current!.indeterminate = indeterminate || false;
	}, [indeterminate, checked]);

	return (
		<label {...attributes} className={rootClassName}>
			<span className={s.field}>
				<HiddenInput
					className={s.input}
					type="checkbox"
					checked={checked}
					defaultChecked={defaultChecked}
					name={name}
					disabled={disabled}
					value={value}
					onChange={onChange}
					attributes={{
						...getInputAttributes({
							attributes: inputAttributes,
							formControl: grouped ? { attributes: {} } : formControl,
							hasError,
						}),
						ref: inputRef,
					}}
				/>
				<div className={s.decorator}>
					<span className={s.dash} />
					<Icon
						svg={IconCheckmark}
						className={s.icon}
						size={responsivePropDependency(size, (size) => {
							if (size === "large") return 5;
							if (size === "small") return 3;
							return 4;
						})}
					/>
				</div>
			</span>

			{children && (
				<Text
					as="span"
					variant={responsivePropDependency(size, (size) => {
						if (size === "large") return "body-1";
						if (size === "small") return "caption-1";
						return "body-2";
					})}
				>
					{children}
				</Text>
			)}
		</label>
	);
};

Checkbox.displayName = "Checkbox";

export default Checkbox;
