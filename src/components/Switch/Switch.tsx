"use client";

import React from "react";
import { classNames } from "utilities/helpers";
import { useFormControl } from "components/FormControl";
import Text from "components/Text";
import useElementId from "hooks/useElementId";
import type * as T from "./Switch.types";
import s from "./Switch.module.css";

const Switch = (props: T.Props) => {
	const {
		children,
		name,
		checked,
		size,
		reversed,
		defaultChecked,
		onChange,
		onFocus,
		onBlur,
		className,
		attributes,
	} = props;
	const rootClassNames = classNames(
		s.root,
		size && s[`root--size-${size}`],
		reversed && s["root--reversed"],
		className
	);
	const formControl = useFormControl();
	const id = useElementId(
		formControl?.attributes.id || props.id || (props.inputAttributes?.id as string | undefined)
	);
	const inputAttributes = { ...props.inputAttributes, ...formControl?.attributes };
	const disabled = formControl?.disabled || props.disabled;

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!onChange) return;
		onChange({
			name,
			event,
			checked: event.target.checked,
		});
	};

	return (
		<label {...attributes} className={rootClassNames}>
			<input
				type="checkbox"
				{...inputAttributes}
				className={s.input}
				name={name}
				checked={checked}
				defaultChecked={defaultChecked}
				disabled={disabled}
				onChange={handleChange}
				onFocus={onFocus || inputAttributes?.onFocus}
				onBlur={onBlur || inputAttributes?.onBlur}
				id={id}
			/>
			<span className={s.area} aria-hidden="true">
				<span className={s.thumb} />
			</span>
			{children && (
				<Text
					variant={size === "small" ? "caption-1" : "body-3"}
					weight="medium"
					color={disabled ? "disabled" : undefined}
				>
					{children}
				</Text>
			)}
		</label>
	);
};

Switch.displayName = "Switch";

export default Switch;
