import React from "react";
import { classNames } from "utilities/helpers";
import s from "./HiddenInput.module.css";
import type * as T from "./HiddenInput.types";

const HiddenInput = (props: T.Props) => {
	const {
		name,
		value,
		type,
		onChange,
		onFocus,
		onBlur,
		checked,
		defaultChecked,
		disabled,
		className,
		attributes,
	} = props;
	const rootClassNames = classNames(s.root, className);

	return (
		<input
			{...attributes}
			className={rootClassNames}
			type={type}
			name={name}
			value={value}
			checked={checked}
			defaultChecked={defaultChecked}
			disabled={disabled}
			onChange={onChange}
			onFocus={onFocus || attributes?.onFocus}
			onBlur={onBlur || attributes?.onBlur}
		/>
	);
};

export default HiddenInput;
