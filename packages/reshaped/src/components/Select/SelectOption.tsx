import React from "react";

import DropdownMenu from "components/DropdownMenu";

import s from "./Select.module.css";

import type * as T from "./Select.types";

const SelectOption: React.FC<T.OptionProps> = (props) => {
	const { value, ...menuItemProps } = props;

	return (
		<DropdownMenu.Item
			{...menuItemProps}
			className={[menuItemProps.className, s.option]}
			color="neutral"
			attributes={{
				...menuItemProps.attributes,
				value,
				role: "option",
			}}
		/>
	);
};

SelectOption.displayName = "Select.Option";

export default SelectOption;
