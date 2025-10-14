"use client";

import React from "react";
import type * as T from "./Select.types";
import SelectNative from "./SelectNative";
import SelectRoot from "./SelectRoot";
import SelectTrigger from "./SelectTrigger";
import SelectOption from "./SelectOption";
import SelectOptionGroup from "./SelectOptionGroup";
import SelectCustom from "./SelectCustom";

const Select: React.FC<T.NativeProps> & {
	Custom: typeof SelectCustom;
	Option: typeof SelectOption;
	OptionGroup: typeof SelectOptionGroup;
} = (props) => {
	const { children } = props;
	return (
		<SelectRoot {...props}>
			{(props) => {
				const { options } = props;
				const hasOptionChildren = React.Children.toArray(children).some((child) => {
					return React.isValidElement(child) && child.type === "option";
				});
				const hasOptions = Boolean(options || hasOptionChildren);

				if (!hasOptions) {
					return <SelectTrigger {...(props as T.TriggerProps)}>{children}</SelectTrigger>;
				}

				return (
					<SelectNative {...(props as T.NativeProps)}>
						{options?.map((option) => (
							<option key={option.value} value={option.value} disabled={option.disabled}>
								{option.label}
							</option>
						))}
						{children}
					</SelectNative>
				);
			}}
		</SelectRoot>
	);
};

Select.displayName = "Select";

Select.Custom = SelectCustom;
Select.Option = SelectOption;
Select.OptionGroup = SelectOptionGroup;

export default Select;
