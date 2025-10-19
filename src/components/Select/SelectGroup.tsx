import React from "react";
import View from "components/View";
import Text from "components/Text";
import type * as T from "./Select.types";
import s from "./Select.module.css";

const SelectGroup: React.FC<T.GroupProps> = (props) => {
	const { label, children } = props;

	return (
		<View attributes={{ role: "group" }} gap={1} className={s.group}>
			{label && (
				<div className={s["group-label"]}>
					<Text variant="caption-1" color="neutral-faded">
						{label}
					</Text>
				</div>
			)}
			<View.Item>{children}</View.Item>
		</View>
	);
};

SelectGroup.displayName = "Select.Group";

export default SelectGroup;
