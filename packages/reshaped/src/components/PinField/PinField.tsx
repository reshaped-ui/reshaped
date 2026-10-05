import type * as T from "./PinField.types.js";
import PinFieldControlled from "./PinFieldControlled.js";
import PinFieldUncontrolled from "./PinFieldUncontrolled.js";

const PinField: React.FC<T.Props> = (props) => {
	const { value } = props;

	if (value !== undefined) return <PinFieldControlled {...props} />;
	return <PinFieldUncontrolled {...props} />;
};

PinField.displayName = "PinField";

export default PinField;
