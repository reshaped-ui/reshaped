import React from "react";
import View from "components/View";
import Text from "components/Text";
import type * as T from "./Select.types";
import s from "./Select.module.css";

const SelectOptionGroup: React.FC<T.OptionGroupProps> = (props) => {
	const { label, children } = props;

	return (
		<View attributes={{ role: "group" }} gap={1} className={s.group}>
			<div className={s["group-label"]}>
				<Text variant="caption-1" color="neutral-faded">
					{label}
				</Text>
			</div>
			<View.Item>{children}</View.Item>
		</View>
	);
};

SelectOptionGroup.displayName = "Select.OptionGroup";

export default SelectOptionGroup;
