"use client";

import React from "react";

import { useFormControl } from "components/FormControl";
import Text from "components/Text";
import useElementId from "hooks/useElementId";
import { classNames, responsiveClassNames, responsivePropDependency } from "utilities/props";

import s from "./Switch.module.css";

import type * as T from "./Switch.types";

const Switch: React.FC<T.Props> = (props) => {
	const {
		children,
		name,
		checked,
		size = "medium",
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
		size && responsiveClassNames(s, "--size", size),
		reversed && s["--reversed"],
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
				<span className={s.hitbox} />
				<span className={s.thumb} />
			</span>
			{children && (
				<Text
					variant={responsivePropDependency(size, (value) => {
						if (value === "large") return "body-2";
						if (value === "medium") return "body-3";
						return "caption-1";
					})}
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
