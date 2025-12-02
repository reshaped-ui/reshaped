"use client";

import Context from "./CheckboxGroup.context";

import type * as T from "./CheckboxGroup.types";

const CheckboxGroupControlled: React.FC<T.ControlledProps> = (props) => {
	const { onChange, name, disabled, value, children, hasError } = props;

	const handleChange: T.Context["onChange"] = (args) => {
		const { event, value: fieldValue, checked } = args;
		if (!fieldValue) return;

		let nextValue = [...value];

		if (checked) {
			nextValue.push(fieldValue);
		} else {
			nextValue = nextValue.filter((v) => v !== fieldValue);
		}

		if (onChange) onChange({ name, value: nextValue, event });
	};

	return (
		<Context.Provider value={{ onChange: handleChange, disabled, value, name, hasError }}>
			{children}
		</Context.Provider>
	);
};

CheckboxGroupControlled.displayName = "CheckboxGroupControlled";

export default CheckboxGroupControlled;
