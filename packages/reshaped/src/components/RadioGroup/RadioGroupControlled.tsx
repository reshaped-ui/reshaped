"use client";

import Context from "./RadioGroup.context";

import type * as T from "./RadioGroup.types";
import type * as TRadio from "components/Radio/Radio.types";

const RadioGroupControlled: React.FC<T.ControlledProps> = (props) => {
	const { onChange, name, disabled, value, children, hasError } = props;

	const handleChange: TRadio.Props["onChange"] = ({ event, value }) => {
		if (!value) return;
		if (onChange) onChange({ name, value, event });
	};

	return (
		<Context.Provider value={{ onChange: handleChange, disabled, value, name, hasError }}>
			{children}
		</Context.Provider>
	);
};

RadioGroupControlled.displayName = "RadioGroupControlled";

export default RadioGroupControlled;
