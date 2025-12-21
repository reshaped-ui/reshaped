import ToggleButtonControlled from "./ToggleButtonControlled";
import ToggleButtonUncontrolled from "./ToggleButtonUncontrolled";

import type * as T from "./ToggleButton.types";

const ToggleButton: React.FC<T.Props> = (props) => {
	const { checked } = props;

	if (checked !== undefined) return <ToggleButtonControlled {...props} />;
	return <ToggleButtonUncontrolled {...props} />;
};

ToggleButton.displayName = "ToggleButton";

export default ToggleButton;
