import type * as T from "./ToggleButtonGroup.types.js";
import ToggleButtonGroupControlled from "./ToggleButtonGroupControlled.js";
import ToggleButtonGroupUncontrolled from "./ToggleButtonGroupUncontrolled.js";

const ToggleButtonGroup: React.FC<T.Props> = (props) => {
	const { value } = props;

	if (value !== undefined) return <ToggleButtonGroupControlled {...props} />;
	return <ToggleButtonGroupUncontrolled {...props} />;
};

ToggleButtonGroup.displayName = "ToggleButtonGroup";

export default ToggleButtonGroup;
