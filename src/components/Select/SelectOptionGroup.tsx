import React from "react";
import View from "components/View";
import Text from "components/Text";
import type * as T from "./Select.types";

const SelectOptionGroup: React.FC<T.OptionGroupProps> = (props) => {
	const { label, children } = props;

	return (
		<View attributes={{ role: "group" }} gap={1}>
			<View paddingInline={3} paddingTop={3}>
				<Text variant="caption-1" color="neutral-faded">
					{label}
				</Text>
			</View>
			<View.Item>{children}</View.Item>
		</View>
	);
};

SelectOptionGroup.displayName = "Select.OptionGroup";

export default SelectOptionGroup;
