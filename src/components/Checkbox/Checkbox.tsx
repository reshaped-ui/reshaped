"use client";

import React from "react";
import { classNames } from "utilities/helpers";
import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";
import HiddenInput from "components/_private/HiddenInput";
import { useFormControl } from "components/FormControl";
import { useCheckboxGroup } from "components/CheckboxGroup";
import Icon from "components/Icon";
import IconCheckmark from "icons/Checkmark";
import type * as T from "./Checkbox.types";
import s from "./Checkbox.module.css";

const Checkbox = (props: T.Props) => {
	const {
		children,
		value,
		onChange,
		onFocus,
		onBlur,
		indeterminate,
		className,
		attributes,
		inputAttributes,
	} = props;

	const checkboxGroup = useCheckboxGroup();
	const formControl = useFormControl();
	const hasError = formControl?.hasError || props.hasError || checkboxGroup?.hasError;
	const disabled = formControl?.disabled || props.disabled || checkboxGroup?.disabled;
	const checked = checkboxGroup ? checkboxGroup.value?.includes(value!) : props.checked;
	const defaultChecked = checkboxGroup ? undefined : props.defaultChecked;
	const name = checkboxGroup ? checkboxGroup.name : props.name;
	const inputRef = React.useRef<HTMLInputElement>(null);
	const rootClassName = classNames(
		s.root,
		className,
		hasError && s["--error"],
		disabled && s["--disabled"]
	);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!name) return;
		const { checked } = event.target;
		const changeArgs = { name, value, checked, event };

		if (onChange) onChange(changeArgs);
		if (checkboxGroup?.onChange) checkboxGroup.onChange(changeArgs);
	};

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
					onChange={handleChange}
					onFocus={onFocus}
					onBlur={onBlur}
					attributes={{
						...inputAttributes,
						ref: inputRef,
					}}
				/>
				<div className={s.decorator}>
					<Icon svg={IconCheckmark} className={s.icon} />
				</div>
			</span>

			{children && <span className={s.text}>{children}</span>}
		</label>
	);
};

Checkbox.displayName = "Checkbox";

export default Checkbox;
