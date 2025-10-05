import React from "react";
import DropdownMenu from "components/DropdownMenu";
import type * as T from "./Select.types";
import { setComponentChildId } from "utilities/props";
import s from "./Select.module.css";

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
setComponentChildId(SelectOption, "Select.Option");

export default SelectOption;
