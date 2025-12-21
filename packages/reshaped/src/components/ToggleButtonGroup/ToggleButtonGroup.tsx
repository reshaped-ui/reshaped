import ToggleButtonGroupControlled from "./ToggleButtonGroupControlled";
import ToggleButtonGroupUncontrolled from "./ToggleButtonGroupUncontrolled";

import type * as T from "./ToggleButtonGroup.types";

const ToggleButtonGroup: React.FC<T.Props> = (props) => {
	const { value } = props;

	if (value !== undefined) return <ToggleButtonGroupControlled {...props} />;
	return <ToggleButtonGroupUncontrolled {...props} />;
};

ToggleButtonGroup.displayName = "ToggleButtonGroup";

export default ToggleButtonGroup;
