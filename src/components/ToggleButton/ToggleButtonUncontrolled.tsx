"use client";

import useToggle from "hooks/useToggle";
import type * as T from "./ToggleButton.types";
import ToggleButtonControlled from "./ToggleButtonControlled";

const ToggleButtonUncontrolled: React.FC<T.UncontrolledProps> = (props) => {
	const { defaultChecked, onChange, ...buttonProps } = props;
	const buttonToggle = useToggle(defaultChecked);

	const handleChange: T.Props["onChange"] = (args) => {
		onChange?.(args);
		buttonToggle.toggle(args.checked);
	};

	return (
		<ToggleButtonControlled
			{...buttonProps}
			onChange={handleChange}
			checked={buttonToggle.active}
		/>
	);
};

ToggleButtonUncontrolled.displayName = "ToggleButtonUncontrolled";

export default ToggleButtonUncontrolled;
