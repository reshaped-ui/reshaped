import React from "react";

import type * as T from "./Select.types";
import SelectGroup from "./SelectGroup";
import SelectOption from "./SelectOption";

/**
 * Find the first enabled option, including the options rendered inside groups
 */
export const getFirstOptionValue = (children: React.ReactNode): string | undefined => {
	let result: string | undefined;

	React.Children.forEach(children, (child) => {
		if (result !== undefined || !React.isValidElement(child)) return;

		if (child.type === SelectOption) {
			const option = child.props as T.OptionProps;
			if (!option.disabled) result = option.value;
		}

		if (child.type === SelectGroup) {
			result = getFirstOptionValue((child.props as T.GroupProps).children);
		}
	});

	return result;
};
