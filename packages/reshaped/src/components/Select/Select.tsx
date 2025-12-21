"use client";

import React from "react";

import SelectNative from "./SelectNative";
import SelectRoot from "./SelectRoot";
import SelectTrigger from "./SelectTrigger";

import type * as T from "./Select.types";

const Select: React.FC<T.NativeProps> = (props) => {
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

export default Select;
