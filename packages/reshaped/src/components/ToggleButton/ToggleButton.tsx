import type * as T from "./ToggleButton.types.js";
import ToggleButtonControlled from "./ToggleButtonControlled.js";
import ToggleButtonUncontrolled from "./ToggleButtonUncontrolled.js";

const ToggleButton: React.FC<T.Props> = (props) => {
	const { checked } = props;

	if (checked !== undefined) return <ToggleButtonControlled {...props} />;
	return <ToggleButtonUncontrolled {...props} />;
};

ToggleButton.displayName = "ToggleButton";

export default ToggleButton;
